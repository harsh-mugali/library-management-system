from flask import Blueprint, jsonify, request
from models.book_model import get_all_books, add_book, update_book, delete_book
from flask import request, jsonify
from utils.db import get_db_connection
from datetime import date

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

@book_routes.route("/assign-book", methods=["POST"])
def assign_book():

    data = request.json

    book_id = data["book_id"]
    user_id = data["user_id"]
    issue_date = data["issue_date"]
    due_date = data["due_date"]

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check available copies
    cursor.execute("SELECT total_copies FROM books WHERE id=%s", (book_id,))
    book = cursor.fetchone()

    if not book or book[0] <= 0:
        return jsonify({"error": "Book not available"}), 400

    # Insert into issued_books
    query = """
    INSERT INTO issued_books (book_id,user_id,issue_date,due_date)
    VALUES (%s,%s,%s,%s)
    """

    cursor.execute(query,(book_id,user_id,issue_date,due_date))

    # Reduce book copies
    cursor.execute(
        "UPDATE books SET total_copies = total_copies - 1 WHERE id=%s",
        (book_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Book assigned successfully"})

@book_routes.route("/return-book/<int:id>", methods=["PUT"])
def return_book(id):

    conn = get_db_connection()
    cursor = conn.cursor()

    # get book id
    cursor.execute("SELECT book_id FROM issued_books WHERE id=%s",(id,))
    book = cursor.fetchone()

    if not book:
        return jsonify({"error":"Record not found"}),404

    book_id = book[0]

    # mark returned
    cursor.execute("""
        UPDATE issued_books
        SET returned = TRUE, return_date = CURDATE()
        WHERE id=%s
    """,(id,))

    # increase copies
    cursor.execute("""
        UPDATE books
        SET total_copies = total_copies + 1
        WHERE id=%s
    """,(book_id,))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Book returned successfully"})

@book_routes.route("/issued-books", methods=["GET"])
def get_issued_books():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT
        issued_books.id,
        books.title,
        users.name AS user,
        issue_date,
        due_date
    FROM issued_books
    JOIN books ON books.id = issued_books.book_id
    JOIN users ON users.id = issued_books.user_id
    WHERE returned = FALSE
    """

    cursor.execute(query)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

@book_routes.route("/books-by-category",methods=["GET"])
def books_by_category():
    conn=get_db_connection()
    cursor=conn.cursor(dictionary=True)
    query="""
    SELECT category,title,author FROM books ORDER BY category
    """
    cursor.execute(query)
    rows=cursor.fetchall()
    categories={}
    for row in rows:
        cat=row["category"]
        if cat not in categories:
            categories[cat]=[]
        categories[cat].append({"title":row["title"],"author":row["author"]})
    cursor.close()
    conn.close()
    return jsonify(categories)

@book_routes.route("/overdue-books",methods=["GET"])
def overdue_books():
    conn=get_db_connection()
    cursor=conn.cursor(dictionary=True)
    query="""
SELECT
    issued_books.id,
    books.title,
    users.name AS user,
    issued_books.due_date,
    DATEDIFF(CURDATE(), issued_books.due_date) AS overdue_days
FROM issued_books
JOIN books
    ON books.id = issued_books.book_id
JOIN users
    ON users.id = issued_books.user_id
LEFT JOIN fines
    ON fines.issued_id = issued_books.id
WHERE issued_books.returned = FALSE
    AND issued_books.due_date < CURDATE()
    AND (fines.paid IS NULL OR fines.paid = FALSE)
"""
    cursor.execute(query)
    data=cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@book_routes.route("/apply-fine/<int:id>",methods=["POST"])
def apply_fine(id):

    conn=get_db_connection()
    cursor=conn.cursor()

    cursor.execute("SELECT due_date FROM issued_books WHERE id=%s",(id,))
    record=cursor.fetchone()

    if not record:
        return jsonify({"error":"Record not found"}),404

    overdue_days=(date.today()-record[0]).days

    if overdue_days<=0:
        return jsonify({"message":"No fine required"}),200

    fine_amount=overdue_days*10

    cursor.execute("INSERT INTO fines(issued_id,amount) VALUES(%s,%s)",(id,fine_amount))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Fine applied","amount":fine_amount})

@book_routes.route("/total-fine",methods=["GET"])
def total_fine():
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute("SELECT SUM(amount) FROM fines WHERE paid=TRUE")
    total=cursor.fetchone()[0] or 0
    cursor.close()
    conn.close()
    return jsonify({"total_fine":total})

@book_routes.route("/available-books", methods=["GET"])
def available_books():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT id,title,author,category,total_copies
    FROM books
    WHERE total_copies > 0
    """

    cursor.execute(query)
    books = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(books)

@book_routes.route("/borrow-book", methods=["POST"])
def borrow_book():
    data = request.json
    book_id = data["book_id"]
    user_id = data["user_id"]

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO issued_books(book_id,user_id,issue_date,due_date)
        VALUES(%s,%s,CURDATE(),DATE_ADD(CURDATE(),INTERVAL 7 DAY))
    """, (book_id, user_id))

    cursor.execute("""
        UPDATE books
        SET total_copies = total_copies - 1
        WHERE id = %s
    """, (book_id,))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Book borrowed successfully"})

