from flask import Flask
from flask_cors import CORS
from routes.book_routes import book_routes
from routes.auth_routes import auth_routes
from flask_jwt_extended import JWTManager

app = Flask(__name__)

CORS(app)

app.config["JWT_SECRET_KEY"] = "library_secret_key"

jwt = JWTManager(app)

app.register_blueprint(book_routes)
app.register_blueprint(auth_routes)

@app.route("/")
def home():
    return "Library Management System Backend Running"

if __name__ == "__main__":
    app.run(debug=True)