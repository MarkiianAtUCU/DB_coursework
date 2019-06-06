from flask import Flask
from flask_cors import CORS

from books.controller import books
from library.controller import library

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(books, url_prefix='/books')
app.register_blueprint(library, url_prefix='/library')


if __name__ == "__main__":
    app.run()
