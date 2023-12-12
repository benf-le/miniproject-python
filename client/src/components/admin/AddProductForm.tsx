
import  {useState} from "react";
import axios from "axios";


import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const AddProductForm = () => {
    let navigate = useNavigate()

    const [product, setProduct] = useState({
        name: '',
        imageUrl:'' ,
        price:'',
        countInStock: '',
        description:'',
        category:''

    })
    
    const [error, setError] = useState<string>()

    const onAddProductForm = async (error) => {

        error.preventDefault() //chặn reload trang
        try {
            
                const response = await axios.post(`http://127.0.0.1:5000/create-product`, product)


                if (response.status === 200) {
                    // Đăng ký thành công
                    // Sau khi đăng ký thành công, điều hướng đến một trang khác
                    toast.success("Product created successfully!")
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



    return (
        <div>

            <div className="  hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse w-screen">
                    <div className=" card w-full max-w-xl flex-shrink-0 bg-base-100 shadow-2xl">
                        <div>
                            <h1 className="pt-10 text-center text-2xl font-bold">
                                CREATE PRODUCT
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

                                    // onChange={(e) => setPassword({...password, password: e.target.value})}

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
                                />
                            </div>
                            <p className="text-center text-red-500">{error}</p>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-success" onClick={onAddProductForm}>Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductForm;
