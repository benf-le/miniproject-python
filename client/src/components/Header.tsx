import { useState} from 'react'
import {Link} from "react-router-dom";

import { AiOutlineUser} from "react-icons/ai";
import {BsCart3} from "react-icons/bs";

import ButtonInputSearch from "./ButtonInputSearch";
import {useCookies} from "react-cookie";


export default function Header() {

    const [user] = useState('')

    const [cookies, removeCookie] = useCookies(['AuthToken'])

    const authToken = cookies.AuthToken
    console.log(authToken)




    function Logout() {

        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload() //nen sua cho nay de load lai trang chu
    }


    return (

        <div>

            <div>

                <header className="h-20">
                    <div
                        className=" pet-stock-color navbar  flex h-20 flex-grow bg-base-100 fixed left-0 right-0 top-0 z-10">

                        <div className="basis-1/4 justify-center">
                            <Link to="/" className="btn btn-ghost text-xl text-white">PET STOCK</Link>
                        </div>


                        <div className="basis-1/2 ">
                            <ButtonInputSearch
                                placeholder="Search"
                            />

                        </div>
                        <div className="basis-1/4 justify-center">
                            {!authToken ?
                                <Link to="/login">
                                    <button className="btn btn-ghost text-white">
                                        <AiOutlineUser/>
                                        Login
                                    </button>
                                </Link> :

                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost text-white">
                                        {/*<div className="w-10 rounded-full">*/}
                                        {/*    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg"/>*/}
                                        {/*</div>*/}
                                        {user}
                                    </label>
                                    <ul tabIndex={0}
                                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <Link to='/user/profile'>
                                                <a className="justify-between">
                                                    Profile
                                                </a></Link>
                                        </li>
                                        {/*<li><a>Settings</a></li>*/}
                                        <li onClick={Logout}><a>Logout</a></li>
                                    </ul>
                                </div>
                            }
                            {/*<Link to="/cart">*/}
                            {/*    <button className="btn btn-ghost text-white">*/}
                            {/*        <BsCart3/>*/}
                            {/*    </button>*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                </header>
                {/*<menu className="pet-stock-color navbar flex h-20 flex-grow justify-center bg-base-100">*/}
                {/*  <div className="join space-x-10">*/}
                {/*    <button className="btn btn-ghost text-white">Dog</button>*/}
                {/*    <button className="btn btn-ghost text-white">Cat</button>*/}
                {/*    <button className="btn btn-ghost text-white">Fish</button>*/}
                {/*    <button className="btn btn-ghost text-white">Horse</button>*/}
                {/*    <button className="btn btn-ghost text-white">Bird</button>*/}
                {/*    <button className="btn btn-ghost text-white">Small Animal</button>*/}
                {/*    <button className="btn btn-ghost text-white">Reptile</button>*/}
                {/*    <button className="btn btn-ghost text-white">Pet Service</button>*/}
                {/*    <button className="btn btn-ghost text-white">More</button>*/}
                {/*    <button className="btn btn-ghost bg-red-600 text-white">Sale</button>*/}
                {/*  </div>*/}
                {/*</menu>*/}




            </div>


        </div>
    );

}
