from flask import Blueprint, jsonify, request
from models.book_model import get_all_books, add_book, update_book, delete_book

book_routes = Blueprint("book_routes", __name__)


@book_routes.route("/books", methods=["GET"])
def fetch_books():
    books = get_all_books()
    return jsonify(books)


@book_routes.route("/books", methods=["POST"])
def create_book():

    data = request.json

    title = data.get("title")
    author = data.get("author")
    category = data.get("category")
    isbn = data.get("isbn")
    published_year = data.get("published_year")
    total_copies = data.get("total_copies")

    add_book(title, author, category, isbn, published_year, total_copies)

    return jsonify({"message": "Book added successfully"})

@book_routes.route("/books/<int:book_id>", methods=["PUT"])
def edit_book(book_id):

    data = request.json

    title = data.get("title")
    author = data.get("author")
    category = data.get("category")
    isbn = data.get("isbn")
    published_year = data.get("published_year")
    total_copies = data.get("total_copies")
    available = data.get("available")

    update_book(book_id, title, author, category, isbn, published_year, total_copies, available)

    return jsonify({"message": "Book updated successfully"})

@book_routes.route("/books/<int:book_id>", methods=["DELETE"])
def remove_book(book_id):

    delete_book(book_id)

    return jsonify({"message": "Book deleted successfully"})