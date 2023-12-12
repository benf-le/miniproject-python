import  {useEffect, useState} from 'react';


import HeaderAdmin from "../../components/admin/HeaderAdmin";
import {Products} from "../../models/Products.ts";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

function ProductsAdminPage() {


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


    const deleteProduct = async ({id}: { id: string }) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/delete-product/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Product deleted successfully')
            }

            if (!response.ok) {
                toast.error('Something went wrong');
            }

            // Nếu xóa thành công, cập nhật lại danh sách sản phẩm
            const updatedProducts = productsAdmin.filter(product => product.id !== id);
            setProductsAdmin(updatedProducts);

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
                        {/*<div className="btn btn-error normal-case text-sm m-1">*/}
                        {/* Delete  </div>*/}
                        {/*<div className="btn btn-warning normal-case text-sm m-1">*/}
                        {/*  Edit </div>*/}
                        <Link to="/user/admin/add-product">
                        <div className="btn btn-active btn-accent normal-case text-sm m-1">
                         Add Product </div>
                        </Link>
                    </div>


                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Image Url</th>

                                <th>Price</th>

                                <th>Count In Stock</th>
                                <th>Description</th>
                                <th>Category</th>


                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            {productsAdmin.length > 0 && productsAdmin.map(item =>
                                <tr>
                                    <th></th>
                                    <td>{item.name}</td>
                                    <td>{item.imageUrl}</td>
                                    <td>{item.price}</td>
                                    <td>{item.countInStock}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <div className="py-5">
                                        <Link to={`/user/admin/update-product/${item.id}`}>
                                        <button className="btn">Edit</button>
                                        </Link>
                                        <button onClick={() => deleteProduct({id: item.id})} className="btn btn-error ml-5" >Delete</button>
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

export default ProductsAdminPage;