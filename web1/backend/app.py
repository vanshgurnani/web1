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


def add_to_cart(email, product_id, product_name, new_price, shipping_fee, quantity):
    try:
        cartdb = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='cartinfo'
        )
        # Connect to the MySQL database
        cursor = cartdb.cursor()

        # Check if a record already exists for the same product and email combination
        query = "SELECT Quantity FROM main WHERE EmailID = %s AND ProductID = %s"
        values = (email, product_id)
        cursor.execute(query, values)
        result = cursor.fetchone()

        if result:
            # Record already exists, update the quantity
            existing_quantity = result[0]
            new_quantity = existing_quantity + quantity

            update_query = "UPDATE main SET Quantity = %s WHERE EmailID = %s AND ProductID = %s"
            update_values = (new_quantity, email, product_id)
            cursor.execute(update_query, update_values)
            cartdb.commit()
            cursor.close()
            cartdb.close()
            return 2  # Indicate that the quantity is updated

        # Record does not exist, insert a new record
        insert_query = "INSERT INTO main (EmailID, ProductID, ProductName, NewPrice, ShippingFee, Quantity) VALUES (%s, %s, %s, %s, %s, %s)"
        insert_values = (email, product_id, product_name, new_price, shipping_fee, quantity)
        cursor.execute(insert_query, insert_values)
        cartdb.commit()
        cursor.close()
        cartdb.close()
        return 1  # Indicate that a new record is inserted

    except Exception as e:
        print("Error adding item to cart:", e)
        return 0


@app.route('/api/cart', methods=['POST'])
def add_to_cart_route():
    try:
        data = request.json
        email = data['EmailID']
        product_id = data['ProductID']
        product_name = data['ProductName']
        new_price = data['NewPrice']
        shipping_fee = data['ShippingFee']
        quantity = data['Quantity']

        result = add_to_cart(email, product_id, product_name, new_price, shipping_fee, quantity)

        if result == 1:
            return jsonify({"message": "Item added to cart successfully!"}), 200
        elif result == 2:
            return jsonify({"message": f"{quantity} {product_name} ,also added to cart successfully"}), 200
        else:
            return jsonify({"error": "Failed to add item to cart."}), 500

    except Exception as e:
        print("Error processing request:", e)
        return jsonify({"error": "Invalid request data."}), 400


@app.route('/api/cart/items', methods=['GET'])
def get_cart_items():
    try:
        # Get the user's email from the token in the request headers
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "No token provided."}), 401

        decoded_token = jwt.decode(token.split(' ')[1], app.secret_key, algorithms=["HS256"])
        email = decoded_token['Email']

        cartdb = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='cartinfo'
        )

        productdb = mysql.connector.connect(
        host='localhost',
        user= 'root',
        password = "",
        database = 'productinfo'
        )

        
        # Connect to the MySQL database
        cursor = cartdb.cursor()
        cursor2 = productdb.cursor()

        # Fetch cart items for the given user
        query = "SELECT * FROM main WHERE EmailID = %s"
        values = (email,)
        cursor.execute(query, values)

        # Fetch the result
        cart_items = []
        for item in cursor.fetchall():
            cart_item = {
                "ProductID": item[1],
                "ProductName": item[2],
                "NewPrice": item[3],
                "ShippingFee": item[4],
                "Quantity": item[5]
            }
            
            query2 = "SELECT MainImage FROM main WHERE ProductID = %s"
            cursor2.execute(query2, (item[1],))
            main_image = cursor2.fetchone()
            if main_image:
                cart_item["MainImage"] = main_image[0]  # The MainImage attribute is added to the cart item

            cart_items.append(cart_item)

        cursor2.close()
        productdb.close()
        cursor.close()
        cartdb.close()
        return jsonify(cart_items), 200

    except Exception as e:
        print("Error fetching cart items:", e)
        return jsonify({"error": "Failed to fetch cart items."}), 500


@app.route('/api/cart/items', methods=['DELETE'])
def remove_cart_item():
    try:
        # Get the user's email from the token in the request headers
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "No token provided."}), 401

        decoded_token = jwt.decode(token.split(' ')[1], app.secret_key, algorithms=["HS256"])
        email = decoded_token['Email']

        data = request.json
        product_id = data.get('ProductID')

        if not product_id:
            return jsonify({"error": "ProductID is required."}), 400

        cartdb = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='cartinfo'
        )
        cursor = cartdb.cursor()

        # Check if the item exists in the cart for the given user
        query = "SELECT Quantity FROM main WHERE EmailID = %s AND ProductID = %s"
        values = (email, product_id)
        cursor.execute(query, values)
        result = cursor.fetchone()

        if not result:
            cursor.close()
            cartdb.close()
            return jsonify({"error": "Item not found in the cart."}), 404

        # If the item exists, remove it from the cart
        delete_query = "DELETE FROM main WHERE EmailID = %s AND ProductID = %s"
        cursor.execute(delete_query, values)
        cartdb.commit()

        cursor.close()
        cartdb.close()

        return jsonify({"message": "Item removed from the cart successfully."}), 200

    except Exception as e:
        print("Error removing item from cart:", e)
        return jsonify({"error": "Failed to remove item from cart."}), 500
    

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
