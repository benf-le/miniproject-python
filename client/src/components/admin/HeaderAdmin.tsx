
import {Link, useNavigate} from "react-router-dom";

function HeaderAdmin() {

    const navigate = useNavigate()



    function Logout() {
        navigate('/')
        window.location.reload() //nen sua cho nay de load lai trang chu
    }

    return (
        <div>
            <nav>
                <div className="navbar bg-base-100 ">
                    <div className="flex-1">
                        <Link to="/user/admin/products"> <a className="btn btn-ghost normal-case text-xl">Dashboard</a> </Link>
                        <Link to="/user/admin/products"> <a className="btn btn-ghost normal-case text-sm">Products</a> </Link>
                        <Link to="/user/admin/users"> <a className="btn btn-ghost normal-case text-sm">Users</a> </Link>
                      </div>

                    <div className="flex-none gap-2">

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost text-black">
                                {/*<div className="w-10 rounded-full">*/}
                                {/*    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg"/>*/}
                                {/*</div>*/}

                            </label>
                            <ul tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to='/user/profile'>
                                        <a className="justify-between">
                                            Profile
                                        </a></Link>
                                </li>

                                <li onClick={Logout}><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default HeaderAdmin;