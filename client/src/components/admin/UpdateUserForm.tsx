
import  {useState} from "react";
import axios from "axios";


import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";

const UpdateUserForm = () => {
    let navigate = useNavigate()

    const id = useParams().id;


    const [product, setProduct] = useState({
        name: '',
        email:''

    })
    
    const [error, setError] = useState<string>()

    const onUpdateUserForm = async (error) => {

        error.preventDefault() //chặn reload trang
        try {
            
                const response = await axios.put(`http://127.0.0.1:5001/update-user/${id}`, product)


                if (response.status === 200) {

                    toast.success("Product updated successfully")
                    navigate('/user/admin/users');

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
                                UPDATE USER
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
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="input input-bordered"
                                    onChange={(e) => setProduct({...product, email: e.target.value})}

                                />
                            </div>

                            <p className="text-center text-red-500">{error}</p>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-success" onClick={onUpdateUserForm}>Update User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUserForm;
