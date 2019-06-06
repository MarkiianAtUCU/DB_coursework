from data import Book, Library, LibraryBook, Base, engine
from common import get_session


s = get_session(Base, engine)
res = s.query(LibraryBook).all()[0]
res.number_of_books += 2

s.commit()
