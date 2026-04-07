from utils.db import get_db_connection


def create_user(name, email, password, role):

    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO users (name, email, password, role)
    VALUES (%s, %s, %s, %s)
    """

    cursor.execute(query, (name, email, password, role))

    connection.commit()

    cursor.close()
    connection.close()


def get_user_by_email(email):

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    query = "SELECT * FROM users WHERE email = %s"

    cursor.execute(query, (email,))

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    return user