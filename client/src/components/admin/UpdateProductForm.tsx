
import {useEffect, useState} from "react";
import axios from "axios";


import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {Products} from "../../models/Products.ts";

const UpdateProductForm = () => {
    let navigate = useNavigate()

    const id = useParams().id;


    const [product, setProduct] = useState({
        name: '',
        imageUrl:'' ,
        price:'',
        countInStock: '',
        description:'',
        category: '',

    });


    const [productsAdmin, setProductsAdmin] = useState<Products[]>([])


    useEffect(() => {
        const getProductsDetail = async () => {


            fetch(`http://127.0.0.1:5000/products`)
                .then(response => {
                    response.json()
                        .then(data => setProductsAdmin(data))
                        .catch(error => console.log(error))
                })


        }
        getProductsDetail()
    }, [])



    const [error, setError] = useState<string>()

    const onUpdateProductForm = async (error) => {

        error.preventDefault() //chặn reload trang
        try {

            const response = await axios.put(`http://127.0.0.1:5000/update-product/${id}`, product)


            if (response.status === 200) {

                toast.success("Product updated successfully")
                navigate('/user/admin/products');

                // window.location.reload(); // Tùy chỉnh theo nhu cầu của bạn
            } else {
                // Xử lý lỗi không rõ ràng từ backend
                setError('Something went wrong. Please try again later.');



            }
        } catch (error) {


            setError('Something went wrong. Please try again later.'); // Lỗi không rõ ràng không có phản hồi từ API

        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/product/${id}`);

                const productData = response.data[0]; // Truy cập dữ liệu chi tiết sản phẩm

                // Xử lý giá trị mặc định cho từng trường
                const defaultValues = {
                    category: '',
                    countInStock: '',
                    description: '',
                    imageUrl: '',
                    name: '',
                    price: '',
                };

                // Merges giá trị mặc định với dữ liệu từ API
                const updatedProduct = { ...defaultValues, ...productData };

                console.log(updatedProduct); // Kiểm tra giá trị đã được cập nhật

                setProduct(updatedProduct); // Cập nhật state
            } catch (error) {
                console.log(error);
            }
        };



        fetchProduct();
    }, [id]);



    return (
        <div>

            <div className="  hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse w-screen">
                    <div className=" card w-full max-w-xl flex-shrink-0 bg-base-100 shadow-2xl">
                        <div>
                            <h1 className="pt-10 text-center text-2xl font-bold">
                                UPDATE PRODUCT
                            </h1>
                        </div>
                        <div className=" card-body px-16 ">



                            <div className="form-control py-1 ">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    name="lastName"
                                    className="input input-bordered"
                                    onChange={(e) => setProduct({...product, name: e.target.value})}
                                    value={product.name}
                                />
                            </div>
                            <div className="form-control py-1">
                                <input
                                    id="imageUrl"
                                    type="text"
                                    placeholder="Image Url"
                                    name="imageUrl"
                                    className="input input-bordered"
                                    onChange={(e) => setProduct({...product, imageUrl: e.target.value})}
                                    value={product.imageUrl}
                                />
                            </div>
                            <div className="form-control py-1">
                                <input
                                    id="price"
                                    type="text"
                                    placeholder="Price"
                                    name="price"

                                    className="input input-bordered"
                                    onChange={(e) => setProduct({...product, price: e.target.value})}
                                    value={product.price}

                                />
                            </div>
                            <div className="form-control py-1">
                                <input
                                    id="countInStock"
                                    type="text"
                                    placeholder="Count In Stock"
                                    name="countInStock"
                                    className="input input-bordered"
                                    onChange={(e) => setProduct({...product, countInStock: e.target.value})}
                                    value={product.countInStock}

                                />
                            </div>
                            <div className="form-control py-1">
                                <input
                                    id="description"
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    className="input input-bordered"
                                    onChange={(e) => setProduct({...product, description: e.target.value})}
                                    value={product.description}

                                />
                            </div>
                            <div className="form-control py-1">
                                <input
                                    id="category"
                                    type="text"
                                    placeholder="Category"
                                    name="category"
                                    className="input input-bordered"
                                    onChange={(e) => setProduct({...product, category: e.target.value})}
                                    value={product.category}

                                />
                            </div>
                            <p className="text-center text-red-500">{error}</p>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-success" onClick={onUpdateProductForm}>Update Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductForm