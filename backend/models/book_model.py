from utils.db import get_db_connection


def get_all_books():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    query = "SELECT * FROM books"
    cursor.execute(query)

    books = cursor.fetchall()

    cursor.close()
    connection.close()

    return books

def add_book(title, author, category, isbn, published_year, total_copies):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO books (title, author, category, isbn, published_year, total_copies)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    cursor.execute(query, (title, author, category, isbn, published_year, total_copies))

    connection.commit()

    cursor.close()
    connection.close()

def update_book(book_id, title, author, category, isbn, published_year, total_copies, available):
    
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    UPDATE books
    SET title=%s, author=%s, category=%s, isbn=%s, published_year=%s, total_copies=%s, available=%s
    WHERE id=%s
    """

    cursor.execute(query, (title, author, category, isbn, published_year, total_copies, available, book_id))

    connection.commit()

    cursor.close()
    connection.close()


def delete_book(book_id):

    connection = get_db_connection()
    cursor = connection.cursor()

    query = "DELETE FROM books WHERE id = %s"

    cursor.execute(query, (book_id,))

    connection.commit()

    cursor.close()
    connection.close()