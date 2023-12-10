import  {useEffect, useState} from 'react';


import HeaderAdmin from "../../components/admin/HeaderAdmin";
import {Users} from "../../models/Users.ts";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

function UsersAdminPage() {


    const [usersAdmin, setUsersAdmin] = useState<Users[]>([])


    useEffect(() => {
        const getUsersDetail = async () => {


            fetch(`http://127.0.0.1:5001/users`)
                .then(response => {
                    response.json()
                        .then(data => setUsersAdmin(data))
                        .catch(error => console.log(error))
                })


        }
        getUsersDetail()
    }, [])

    const deleteUser = async ({id}: { id: string }) => {
        try {
            const response = await fetch(`http://127.0.0.1:5001/delete-user/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('User deleted successfully')
            }

            if (!response.ok) {
                toast.error('Something went wrong');
            }

            // Nếu xóa thành công, cập nhật lại danh sách sản phẩm
            const updatedUsers = usersAdmin.filter(product => product.id !== id);
            setUsersAdmin(updatedUsers);

        } catch (error) {
            toast.error('Something went wrong');
        }
    };





    return (
        <div>
            <HeaderAdmin/>

            <main className="flex flex-row h-screen">



                <div className={`basis-full px-10`}>
                    <div className=" flex flex-row-reverse ">

                    </div>


                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>



                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            {usersAdmin.length > 0 && usersAdmin.map(item =>
                                <tr>
                                    <th></th>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <div className="py-5">
                                        <Link to={`/user/admin/update-user/${item.id}`}>
                                        <button className="btn">Edit</button>
                                        </Link>
                                        <button onClick={() => deleteUser({id: item.id})} className="btn btn-error ml-5" >Delete</button>
                                    </div>


                                </tr>
                            )}


                            </tbody>
                        </table>


                    </div>



                </div>
            </main>
        </div>
    );
}

export default UsersAdminPage;