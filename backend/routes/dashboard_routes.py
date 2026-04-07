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