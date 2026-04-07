from flask import Blueprint, request, jsonify
from models.user_model import create_user, get_user_by_email
import bcrypt
from flask_jwt_extended import create_access_token

auth_routes = Blueprint("auth_routes", __name__)


# Register
@auth_routes.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    create_user(name, email, hashed_password, role)

    return jsonify({"message": "User registered successfully"})


# Login
@auth_routes.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = get_user_by_email(email)

    if not user:
        return jsonify({"message": "User not found"}), 404

    if bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):

        token = create_access_token(identity=user["id"])

        return jsonify({
            "token": token,
            "role": user["role"]
        })

    return jsonify({"message": "Invalid password"}), 401