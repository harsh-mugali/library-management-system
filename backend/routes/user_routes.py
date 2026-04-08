from flask import Blueprint,request,jsonify
from utils.db import get_db_connection

user_routes=Blueprint("user_routes",__name__)

@user_routes.route("/users",methods=["GET"])
def get_users():
    conn=get_db_connection()
    cursor=conn.cursor(dictionary=True)
    query="""
    SELECT users.id,users.name,users.email,COUNT(issued_books.id) AS borrowed_books
    FROM users
    LEFT JOIN issued_books ON users.id=issued_books.user_id AND issued_books.returned=FALSE
    GROUP BY users.id
    """
    cursor.execute(query)
    users=cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(users)

@user_routes.route("/users",methods=["POST"])
def add_user():
    data=request.json
    name=data["name"]
    email=data["email"]
    password=data["password"]
    conn=get_db_connection()
    cursor=conn.cursor()
    query="INSERT INTO users(name,email,password,role) VALUES(%s,%s,%s,'user')"
    cursor.execute(query,(name,email,password))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message":"User added successfully"})

@user_routes.route("/users/<int:id>",methods=["DELETE"])
def delete_user(id):
    conn=get_db_connection()
    cursor=conn.cursor()
    cursor.execute("DELETE FROM users WHERE id=%s",(id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message":"User deleted successfully"})

@user_routes.route("/available-books", methods=["GET"])
def available_books():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT id, title, author, category, total_copies
    FROM books
    WHERE total_copies > 0
    """

    cursor.execute(query)
    books = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(books)


@user_routes.route("/borrow-book", methods=["POST"])
def borrow_book():

    data = request.json

    book_id = data["book_id"]
    user_id = data["user_id"]

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO issued_books (book_id, user_id, issue_date, due_date)
        VALUES (%s, %s, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY))
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


@user_routes.route("/my-books/<int:user_id>", methods=["GET"])
def my_books(user_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT
        issued_books.id,
        books.title,
        issue_date,
        due_date
    FROM issued_books
    JOIN books ON books.id = issued_books.book_id
    WHERE user_id = %s AND returned = FALSE
    """

    cursor.execute(query, (user_id,))
    books = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(books)


@user_routes.route("/borrow-history/<int:user_id>", methods=["GET"])
def borrow_history(user_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT
        books.title,
        issue_date,
        due_date,
        return_date
    FROM issued_books
    JOIN books ON books.id = issued_books.book_id
    WHERE user_id = %s
    """

    cursor.execute(query, (user_id,))
    history = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(history)

@user_routes.route("/my-overdue/<int:user_id>", methods=["GET"])
def my_overdue(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
SELECT
    issued_books.id,
    books.title,
    issued_books.due_date,
    DATEDIFF(CURDATE(), issued_books.due_date) AS overdue_days,
    fines.amount
FROM issued_books
JOIN books
    ON books.id = issued_books.book_id
LEFT JOIN fines
    ON fines.issued_id = issued_books.id
WHERE issued_books.user_id = %s
    AND issued_books.returned = FALSE
    AND issued_books.due_date < CURDATE()
    AND (fines.paid IS NULL OR fines.paid = FALSE)
    """

    cursor.execute(query, (user_id,))
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

@user_routes.route("/pay-fine/<int:issued_id>", methods=["PUT"])
def pay_fine(issued_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE fines
        SET paid = TRUE
        WHERE issued_id = %s
    """, (issued_id,))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Fine paid successfully"})

@user_routes.route("/user-dashboard/<int:user_id>",methods=["GET"])
def user_dashboard(user_id):

    conn=get_db_connection()
    cursor=conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total_books FROM books")
    total_books=cursor.fetchone()["total_books"]

    cursor.execute("""
    SELECT COUNT(*) AS borrowed
    FROM issued_books
    WHERE user_id=%s AND returned=FALSE
    """,(user_id,))
    borrowed=cursor.fetchone()["borrowed"]

    cursor.execute("""
    SELECT COUNT(*) AS history
    FROM issued_books
    WHERE user_id=%s
    """,(user_id,))
    history=cursor.fetchone()["history"]

    cursor.execute("""
    SELECT COUNT(*) AS overdue
    FROM issued_books
    WHERE user_id=%s AND returned=FALSE AND due_date<CURDATE()
    """,(user_id,))
    overdue=cursor.fetchone()["overdue"]

    cursor.close()
    conn.close()

    return jsonify({
    "total_books":total_books,
    "borrowed":borrowed,
    "history":history,
    "overdue":overdue
    })


@user_routes.route("/recent-books/<int:user_id>",methods=["GET"])
def recent_books(user_id):

    conn=get_db_connection()
    cursor=conn.cursor(dictionary=True)

    query="""
    SELECT books.title,issue_date,due_date
    FROM issued_books
    JOIN books ON books.id=issued_books.book_id
    WHERE issued_books.user_id=%s
    ORDER BY issue_date DESC
    LIMIT 5
    """

    cursor.execute(query,(user_id,))
    books=cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(books)


@user_routes.route("/due-books/<int:user_id>",methods=["GET"])
def due_books(user_id):

    conn=get_db_connection()
    cursor=conn.cursor(dictionary=True)

    query="""
    SELECT books.title,due_date
    FROM issued_books
    JOIN books ON books.id=issued_books.book_id
    WHERE issued_books.user_id=%s
    AND issued_books.returned=FALSE
    ORDER BY due_date ASC
    LIMIT 5
    """

    cursor.execute(query,(user_id,))
    books=cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(books)