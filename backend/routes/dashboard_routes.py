from flask import Blueprint, jsonify
from utils.db import get_db_connection

dashboard_routes = Blueprint("dashboard_routes", __name__)

@dashboard_routes.route("/dashboard", methods=["GET"])
def get_dashboard_stats():

    conn = get_db_connection()
    cursor = conn.cursor()

    # total books
    cursor.execute("SELECT COUNT(*) FROM books")
    total_books = cursor.fetchone()[0]

    # total users
    cursor.execute("SELECT COUNT(*) FROM users")
    total_users = cursor.fetchone()[0]

    # issued books
    cursor.execute("SELECT COUNT(*) FROM issued_books WHERE returned = FALSE")
    issued_books = cursor.fetchone()[0]

    # returned books
    cursor.execute("SELECT COUNT(*) FROM issued_books WHERE returned = TRUE")
    returned_books = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return jsonify({
        "total_books": total_books,
        "total_users": total_users,
        "issued_books": issued_books,
        "returned_books": returned_books
    })


@dashboard_routes.route("/recent-activity", methods=["GET"])
def recent_activity():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT 
        users.name AS user,
        books.title AS book,
        issue_date,
        return_date,
        returned
    FROM issued_books
    JOIN users ON users.id = issued_books.user_id
    JOIN books ON books.id = issued_books.book_id
    ORDER BY issue_date DESC
    LIMIT 5
    """

    cursor.execute(query)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)


@dashboard_routes.route("/top-books", methods=["GET"])
def top_books():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT 
        books.title,
        COUNT(issued_books.book_id) AS borrow_count
    FROM issued_books
    JOIN books ON books.id = issued_books.book_id
    GROUP BY issued_books.book_id
    ORDER BY borrow_count DESC
    LIMIT 5
    """

    cursor.execute(query)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)