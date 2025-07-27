from flask import Flask, request, jsonify
from flask_cors import CORS
from google.generativeai import GenerativeModel, configure
from dotenv import load_dotenv
import os

load_dotenv()
configure(api_key="")

app = Flask(__name__)
CORS(app)

model = GenerativeModel("models/gemini-2.5-pro")

@app.route('/chat', methods=['POST'])
def chat():
    try:
        q = request.json.get("question", "").strip()
        if not q:
            return jsonify({'answer': "❗ Please ask something."}), 400

        res = model.generate_content(q)
        return jsonify({'answer': res.text})
    except Exception as e:
        print("🔥 ERROR:", e)  # Print error to terminal
        return jsonify({'answer': f"Server Error: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
