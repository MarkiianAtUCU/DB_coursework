from flask import Blueprint, abort, jsonify, request
from data import Book, Library, Base, engine
from common import get_session, all_fields_present

library = Blueprint("library", __name__)


def validate_fields(fields):
    required_fields = ["name", "address", "phone_number", "password"]
    for field in required_fields:
        if (not fields[field]) or type(fields[field]) != str or len(fields[field]) >= 256:
            return False

    return True


@library.route("/", methods=['POST'])
def add_books():
    session = get_session(Base, engine)
    fields = request.get_json()

    if not all_fields_present(fields, ["name", "address", "phone_number", "password"]) or not validate_fields(fields):
        abort(422, "Неправильні дані")

    if session.query(Library).filter(Library.password == fields["password"]).first() is not None:
        abort(422, "Неправильні дані")

    session.add(Library(name=fields["name"], address=fields["address"], phone_number=fields["phone_number"],
                        password=fields["password"]))
    session.commit()
    return "Біліотеку успішно додано", 200
