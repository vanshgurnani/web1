import mysql.connector
from flask_cors import CORS

from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)
# Configure MySQL connection
db = mysql.connector.connect(
    host='localhost',
    user= 'root',
    password = "",
    database = 'userinfo'
)

# Route for user login
@app.route("/")
def home():
    return "Flask is running"


@app.route('/login', methods=['GET','POST'])
def login():
    # Retrieve data from the request
    email = request.json.get('email')
    password = request.json.get('password')

    # Perform database operations
    cursor = db.cursor()

    # Execute a query to retrieve the user based on the provided email
    query = "SELECT * FROM main WHERE email = %s"
    cursor.execute(query, (email,))
    user = cursor.fetchone()

    if user:
        # Check if the password matches
        if user[1] == password:
            return jsonify({'message': 'Login successful'})
    
    cursor.close()
    return jsonify({'message': 'Invalid credentials'})

if __name__ == '__main__':
    app.run()
