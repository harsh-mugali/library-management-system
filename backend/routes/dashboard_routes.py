from flask import Blueprint, jsonify
from utils.db import get_db_connection

dashboard_routes = Blueprint("dashboard_routes", __name__)

@dashboard_routes.route("/dashboard", methods=["GET"])
def get_dashboard_data():

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) as total_books FROM books")
    total_books = cursor.fetchone()["total_books"]

    cursor.execute("SELECT COUNT(*) as total_users FROM users")
    total_users = cursor.fetchone()["total_users"]

    cursor.execute("SELECT COUNT(*) as issued_books FROM issued_books")
    issued_books = cursor.fetchone()["issued_books"]

    cursor.execute("SELECT COUNT(*) as returned_books FROM issued_books WHERE returned=1")
    returned_books = cursor.fetchone()["returned_books"]

    cursor.close()
    connection.close()

    return jsonify({
        "total_books": total_books,
        "total_users": total_users,
        "issued_books": issued_books,
        "returned_books": returned_books
    })