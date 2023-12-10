from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import uuid

app = Flask(__name__)#để tạo một RESTful API.
cors = CORS(app)

# Load CSV file as a DataFrame
csv_file = 'products.csv'
df = pd.read_csv(csv_file)

@app.route('/products', methods=['GET'])
def get_products():
    global df  # Khai báo df là biến toàn cục
    return jsonify(df.to_dict(orient='records')) #Chuyển đổi DataFrame thành một dictionary dạng bản ghi (records) và trả về dưới dạng JSON response


@app.route('/product/<string:id>', methods=['GET'])
def get_product_by_id(id):
    product = df[df['id'] == id] #Lọc DataFrame để tìm sản phẩm có ID trùng khớp.
    if product.empty:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict(orient='records'))#trả về thông tin sản phẩm dưới dạng JSON.


@app.route('/create-product', methods=['POST'])
def create_product():
    global df   # Khai báo df là biến toàn cục
    new_product = request.json #Lấy dữ liệu sản phẩm mới từ yêu cầu POST.
    # Tạo một UUID làm ID cho sản phẩm mới
    new_product_id = str(uuid.uuid4())

    # Thêm ID vào dữ liệu của sản phẩm mới
    new_product['id'] = new_product_id
    # Thêm sản phẩm mới vào DataFrame
    df = pd.concat([df, pd.DataFrame([new_product])], ignore_index=True)
    # Lưu lại DataFrame vào file CSV
    df.to_csv(csv_file, index=False)
    return jsonify({"message": "Product created successfully"})

@app.route('/update-product/<string:id>', methods=['PUT'])
def update_product(id):
    global df  # Khai báo df là biến toàn cục
    product_index = df[df['id'] == id].index

    if product_index.empty:
        return jsonify({"error": "Product not found"}), 404

    updated_product = request.json
    updated_product['id'] = id  # Chèn ID vào updated_product

    df.drop(df[df['id'] == id].index, inplace=True) #Xóa sản phẩm cũ từ DataFrame.
    df.loc[product_index[0]] = updated_product #Thêm sản phẩm đã cập nhật vào DataFrame tại vị trí cũ.
    df.to_csv(csv_file, index=False)
    return jsonify({"message": "Product updated successfully"})


@app.route('/delete-product/<string:id>', methods=['DELETE'])
def delete_product(id):
    global df  # Declare df as a global variable
    product = df[df['id'] == id] #Lọc DataFrame để tìm sản phẩm cần xóa.
    if product.empty:
        return jsonify({"error": "Product not found"}), 404
    df.drop(df[df['id'] == id].index, inplace=True) #Xóa sản phẩm từ DataFrame.
    df.to_csv(csv_file, index=False)
    return jsonify({"message": "Product deleted successfully"})



if __name__ == '__main__':
    app.run(debug=True, port=5000)
