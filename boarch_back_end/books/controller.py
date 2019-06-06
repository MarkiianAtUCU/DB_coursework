from flask import Blueprint, abort, jsonify, request
from data import LibraryBook, Book, Library, Base, engine
from common import get_session, all_fields_present
from isbn_api import get_book_name

books = Blueprint("books", __name__)


def get_books_amount(library, book_id):
    for record in library.records:
        if record.book_id == book_id:
            return record.number_of_books


def validate_fields(fields):
    return type(fields["password"]) == str and len(fields["password"]) < 256 \
           and type(fields["number_of_books"]) == int and fields["number_of_books"] > 0 \
           and type(fields["isbn_code"]) == str and len(fields["isbn_code"]) < 256


@books.route("/<string:isbn>")
def get_libraries(isbn):
    session = get_session(Base, engine)
    book = session.query(Book).filter(Book.isbn_code == isbn).first()

    if book is None:
        abort(422, "Книга не найдена")

    libraries = session.query(Library).all()
    result_list = []

    # fill libraries
    for library in libraries:
        books_number = get_books_amount(library, book.id)
        if books_number is not None:
            result_list.append({"name": library.name, "address": library.address, "phone_number": library.phone_number,
                                "number_of_books": books_number})

    return jsonify({"title": book.name, "libraries": result_list})


@books.route("/", methods=['POST'])
def add_books():
    session = get_session(Base, engine)
    fields = request.get_json()

    # validate input
    if not all_fields_present(fields, ["password", "number_of_books", "isbn_code"]) or not validate_fields(fields):
        abort(422, "Невірні дані")

    # validate password
    library = session.query(Library).filter(Library.password == fields["password"]).first()
    if library is None:
        abort(422, "Неправильний пароль")

    # find book or create a new one
    book = session.query(Book).filter(Book.isbn_code == fields["isbn_code"]).first()
    if book is None:
        book_name = get_book_name(fields["isbn_code"])
        if book_name is None:
            abort(422, "Неіснуючий ISBN код")

        session.add(Book(isbn_code=fields["isbn_code"], name=book_name))
        book = session.query(Book).filter(Book.isbn_code == fields["isbn_code"]).first()

    # write or update record
    record = session.query(LibraryBook).filter(LibraryBook.book_id == book.id).filter(
        LibraryBook.library_id == library.id).first()
    if record is None:
        session.add(LibraryBook(library_id=library.id, book_id=book.id, number_of_books=fields["number_of_books"]))
    else:
        record.number_of_books += fields["number_of_books"]

    session.commit()
    return "Книги успішно додано", 200


@books.route("/", methods=['Delete'])
def delete_books():
    session = get_session(Base, engine)
    fields = request.get_json()

    # validate input
    if not all_fields_present(fields, ["password", "number_of_books", "isbn_code"]) or not validate_fields(fields):
        abort(422, "Невірні дані")

    # validate password
    library = session.query(Library).filter(Library.password == fields["password"]).first()
    if library is None:
        abort(422, "Неправильний пароль")

    # validate ISBN code
    book = session.query(Book).filter(Book.isbn_code == fields["isbn_code"]).first()
    if book is None:
        abort(422, "Неіснуючий ISBN код")

    record = session.query(LibraryBook).filter(LibraryBook.book_id == book.id).filter(
        LibraryBook.library_id == library.id).first()
    if record is None:
        abort(422, "Книга відсутня у бібліотеці")
    if record.number_of_books < fields["number_of_books"]:
        abort(422, "Неможливо видалити більше книг ніж є у наявності")

    record.number_of_books -= fields["number_of_books"]
    if record.number_of_books == 0:
        session.delete(record)

    session.commit()
    return "Книги успішно видалені", 200
