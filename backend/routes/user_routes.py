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