import os

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship

Base = declarative_base()


class Library(Base):
    __tablename__ = "libraries"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    phone_number = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)

    records = relationship("LibraryBook")


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True)
    isbn_code = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)


class LibraryBook(Base):
    __tablename__ = "libraries_books"

    library_id = Column(Integer, ForeignKey("libraries.id"), primary_key=True)
    book_id = Column(Integer, ForeignKey("books.id"), primary_key=True)
    number_of_books = Column(Integer, nullable=False)


# user = 'root'
# password = 'Ab195cyk709zw'
# database = 'library'
# host = os.environ.get('DB_HOST', 'localhost')
connection_string = "LINK"
engine = create_engine(connection_string)
Base.metadata.create_all(engine)
