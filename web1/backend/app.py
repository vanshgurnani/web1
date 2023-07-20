import mysql.connector
from flask_cors import CORS
import bcrypt
from flask import Flask, request, jsonify, session

app = Flask(__name__)
app.secret_key = 'Arun_Chandra'
CORS(app)
# Configure MySQL connection
db = mysql.connector.connect(
    host='localhost',
    user= 'root',
    password = "",
    database = 'userdata'
)

# Route for user login
@app.route("/")
def home():
    return "Flask is running"

categories_data = {
    'tech': [
        {
            'title': 'Tech Item 1',
            'imageSrc': 'images/headphone.jpg',
            'description': 'Description of Tech Item 1',
        },
        {
            'title': 'Tech Item 2',
            'imageSrc': 'images/headphone.jpg',
            'description': 'Description of Tech Item 2',
        },
        {
            "title": "Tech Item 3",
            "imageSrc": "images/headphone.jpg",
            "description": "Description of Tech Item 3"
        },
        {
            'title': 'Tech Item 4',
            'imageSrc': 'images/headphone.jpg',
            'description': 'Description of Tech Item 4',
        },
        {
            'title': 'Tech Item 5',
            'imageSrc': 'images/headphone.jpg',
            'description': 'Description of Tech Item 5',
        },
        {
            "title": "Tech Item 6",
            "imageSrc": "images/headphone.jpg",
            "description": "Description of Tech Item 6"
        },
        {
            'title': 'Tech Item 7',
            'imageSrc': 'images/headphone.jpg',
            'description': 'Description of Tech Item 7',
        },
        {
            'title': 'Tech Item 8',
            'imageSrc': 'images/headphone.jpg',
            'description': 'Description of Tech Item 8',
        },
        {
            "title": "Tech Item 9",
            "imageSrc": "images/headphone.jpg",
            "description": "Description of Tech Item 9"
        },

        # Add more tech items as needed
    ],
    'fashion': [
        {
            'title': 'Fashion Item 1',
            'imageSrc': 'images/shirt.jpg',
            'description': 'Description of Fashion Item 1',
        },
        {
            'title': 'Fashion Item 2',
            'imageSrc': 'images/shirt.jpg',
            'description': 'Description of Fashion Item 2',
        },
        # Add more fashion items as needed
    ],
    'accessories': [
        {
            'title': 'Accessory 1',
            'imageSrc': 'images/accessories.jpg',
            'description': 'Description of Accessory 1',
        },
        {
            'title': 'Accessory 2',
            'imageSrc': 'images/accessories.jpg',
            'description': 'Description of Accessory 2',
        },
        # Add more accessory items as needed
    ],
    # Add more categories as needed
}

@app.route('/api/categories')
def get_categories():
    return jsonify(categories_data)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Invalid request body'}), 400

    firstname = data.get('firstName')
    lastname = data.get('lastName')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    confirmPassword = data.get('confirmPassword')

    if not firstname or not lastname or not email or not phone or not password:
        return jsonify({'message': 'All fields are required'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    hashed_password_str = hashed_password.decode('utf-8')
    cursor = db.cursor()

    query = 'SELECT Email FROM main WHERE Email = %s'
    cursor.execute(query, (email,))
    result = cursor.fetchone()

    if result is not None and email == result[0] :
        return jsonify({'message': 'Email Already Exist! Kindly Login'})

    if password != confirmPassword:
        return jsonify({'message':'Password do not match. Try Again'})
    try:
        cursor.execute(
            'INSERT INTO main (FirstName, LastName, Email, Phone, Password) VALUES (%s, %s, %s, %s, %s)',
            (firstname, lastname, email, phone, hashed_password_str)
        )
        db.commit()
        return jsonify({'message': '✅ User Registered Successfully, Login to Proceed'}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error occurred during registration'}), 500
    finally:
        cursor.close()

    # return jsonify({'message': "Error, Please Try Again"})
@app.route('/login', methods=['GET','POST'])
def login():
    # Retrieve data from the request
    email = request.json.get('email')
    password = request.json.get('password')

    # Perform database operations
    cursor = db.cursor()

    # Execute a query to retrieve the user based on the provided email
    query = 'SELECT Email, Password FROM main WHERE Email = %s and Password = %s'
    cursor.execute(query, (email, password))
    result = cursor.fetchone()

    if result:
        retrieved_hashedpw = bytes(result[1])
        if bcrypt.checkpw(password.encode('utf-8'), retrieved_hashedpw):
            session['Email'] = result[0]
            return jsonify({'message': 'Login successful'})
        
    cursor.close()
    return jsonify({'message': 'Invalid credentials'})


@app.route('/logout')
def logout():
    session.clear()

if __name__ == '__main__':
    app.run(debug=True)
