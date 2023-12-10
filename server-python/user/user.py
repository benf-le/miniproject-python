from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import uuid


app = Flask(__name__)
CORS(app)

# Load CSV file as a DataFrame
csv_file = 'users.csv'
try:
    df = pd.read_csv(csv_file)
except FileNotFoundError:
    df = pd.DataFrame(columns=['id', 'name', 'email', 'password'])

@app.route('/users', methods=['GET'])
def get_users():
    global df
    return jsonify(df.to_dict(orient='records'))

@app.route('/user/<string:id>', methods=['GET'])
def get_user_by_id(id):
    global df
    user = df[df['id'] == id]
    if user.empty:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict(orient='records'))#trả về thông tin sản phẩm dưới dạng JSON.



@app.route('/register', methods=['POST'])
def register_user():
    global df
    new_user = request.json

    new_user_id = str(uuid.uuid4())
    new_user['id'] = new_user_id

    hashed_password = generate_password_hash(new_user['password'], method='sha256')
    new_user['password'] = hashed_password
    df = pd.concat([df, pd.DataFrame([new_user])], ignore_index=True)
    df.to_csv(csv_file, index=False)
    return jsonify({"message": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login_user():
    global df
    login_data = request.json
    user = df[df['email'] == login_data['email']]
    if user.empty or not check_password_hash(user['password'].iloc[0], login_data['password']):
        return jsonify({"error": "Invalid email or password"}), 401
    return jsonify({"message": "Login successful"})


@app.route('/update-user/<string:id>', methods=['PUT'])
def update_user(id):
    global df
    user = df[df['id'] == id]
    if user.empty:
        return jsonify({"error": "User not found"}), 404
    updated_user = request.json
    df.loc[df['id'] == int(id)] = [updated_user]
    df.to_csv(csv_file, index=False)
    return jsonify({"message": "User updated successfully"})

@app.route('/delete-user/<string:id>', methods=['DELETE'])
def delete_user(id):
    global df
    user = df[df['id'] == id]
    if user.empty:
        return jsonify({"error": "User not found"}), 404
    df.drop(df[df['id'] == int(id)].index, inplace=True)
    df.to_csv(csv_file, index=False)
    return jsonify({"message": "User deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
