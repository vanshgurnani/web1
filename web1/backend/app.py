import mysql.connector
from flask_cors import CORS
import bcrypt
from flask import Flask, request, jsonify, session
import jwt
import datetime

app = Flask(__name__)
app.secret_key = 'Arun_Chandra'

# Allow CORS with credentials
cors = CORS(app)
# Configure MySQL connection


# Route for user login
@app.route("/")
def home():
    return "Flask is running"

@app.route('/api/categories')
def get_categories():
    

    productdb = mysql.connector.connect(
    host='localhost',
    user= 'root',
    password = "",
    database = 'productinfo'
    )

    categories_data = {}

    try:
        cursor = productdb.cursor()

        query = "SELECT ProductID, ProductName, MainImage, Description, Category FROM `main`"

        cursor.execute(query)

        for row in cursor.fetchall():
            product_id, product_name, main_image, description, category = row

            if category not in categories_data:
                categories_data[category] = []

            item = {
                'product_id': product_id,
                'title': product_name,
                'imageSrc': main_image,
                'description': description,
            }
            categories_data[category].append(item)

        cursor.close()
        productdb.close()
    except mysql.connector.Error as err:
        print("Error connecting to MySQL:", err)

    return jsonify(categories_data)

@app.route('/api/product/<int:product_id>')
def get_product_details(product_id):
    try:
        productdb = mysql.connector.connect(
        host='localhost',
        user= 'root',
        password = "",
        database = 'productinfo'
        )
        cursor = productdb.cursor()

        query = "SELECT * FROM main WHERE ProductID = %s"
        cursor.execute(query, (product_id,))
        product_data = cursor.fetchone()

        if product_data:
            product_details = {
                'ProductID': product_data[0],
                'ProductName': product_data[1],
                'MainImage': product_data[2],
                'ImageItem1': product_data[3],
                'ImageItem2': product_data[4],
                'ImageItem3': product_data[5],
                'ImageItem4': product_data[6],
                'Description': product_data[7],
                'AboutThisItem': product_data[8],
                'Ratings': product_data[9],
                'NoOfReviews': product_data[10],
                'OldPrice': product_data[11],
                'NewPrice': product_data[12],
                'Color': product_data[13],
                'Available': product_data[14],
                'Category': product_data[15],
                'ShippingArea': product_data[16],
                'ShippingFee': product_data[17],
                'Quantity': product_data[18],
            }

            print(product_details['MainImage'])
            print(product_details['ImageItem1'])
            print(product_details['ImageItem2'])
            print(product_details['ImageItem3'])
            print(product_details['ImageItem4'])

            cursor.close()
            productdb.close()
            return jsonify(product_details)
        else:
            cursor.close()
            productdb.close()
            return jsonify({'message': 'Product not found'}), 404

    except mysql.connector.Error as err:
        print("Error connecting to MySQL:", err)
        return jsonify({'message': 'Error connecting to MySQL'}), 500

@app.route('/register', methods=['POST'])
def register():
    db = mysql.connector.connect(
    host='localhost',
    user= 'root',
    password = "",
    database = 'userdata'
    )
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
        cursor.close()
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
def create_token(email):
    payload = {'Email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}
    token = jwt.encode(payload, app.secret_key, algorithm='HS256')
    return token

# Route for user login
@app.route("/login", methods=['POST'])
def login():
    db = mysql.connector.connect(
    host='localhost',
    user= 'root',
    password = "",
    database = 'userdata'
)
    # Retrieve data from the request
    email = request.json.get('email')
    password = request.json.get('password')

    # Perform database operations
    cursor = db.cursor()

    # Execute a query to retrieve the user based on the provided email
    query = 'SELECT Email, Password FROM main WHERE Email = %s'
    cursor.execute(query, (email,))
    result = cursor.fetchone()

    if result is None:
        cursor.close()
        return jsonify({'message': 'User not found'}), 404

    retrieved_hashedpw = bytes(result[1])
    if bcrypt.checkpw(password.encode('utf-8'), retrieved_hashedpw):
        # Generate a token and send it in the response
        token = create_token(email)
        cursor.close()
        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        cursor.close()
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/check_login')
def check_login():
    # Get the token from the Authorization header
    token = request.headers.get('Authorization')

    if token:
        try:
            # Decode the token and extract the email
            decoded_token = jwt.decode(token, app.secret_key, algorithms=['HS256'])
            email = decoded_token['Email']
            return jsonify({'message': 'Logged in', 'email': email}), 200
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

    return jsonify({'message': 'Not logged in'}), 401

if __name__ == '__main__':
    app.run(debug=True)
