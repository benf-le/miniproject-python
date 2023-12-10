import {Users} from "../models/Users.ts";
import axiosClient from "./axiosClient";
import {BASE_URL} from "../constant/appInfo";


class HandleAuthentication {
    static postLogin = async (url: string, data: Users[])=>{
        return axiosClient.post(BASE_URL +url,data)
    }


}


export default HandleAuthentication