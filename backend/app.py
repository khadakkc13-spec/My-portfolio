from pathlib import Path
from datetime import datetime
import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "messages.db"


# ========================================
# DATABASE
# ========================================

def create_database():
    with sqlite3.connect(DATABASE) as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        connection.commit()


# ========================================
# HOME
# ========================================

@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "Portfolio backend is running."
    }), 200


# ========================================
# CONTACT API
# ========================================

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "No data received."}), 400

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify({"error": "Please fill all fields."}), 400

    try:
        with sqlite3.connect(DATABASE) as connection:
            cursor = connection.cursor()
            cursor.execute(
                """
                INSERT INTO messages (name, email, message, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (name, email, message, datetime.now().isoformat()),
            )
            connection.commit()
    except sqlite3.Error:
        return jsonify({"error": "Unable to save your message. Please try again later."}), 500

    return jsonify({"message": "Message sent successfully!"}), 200


# ========================================
# RUN SERVER
# ========================================

if __name__ == "__main__":
    create_database()
    app.run(host="127.0.0.1", port=5000, debug=True)