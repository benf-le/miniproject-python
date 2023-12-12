import Home from "../page/Home";
import Login from "../page/sign/Login";
import SignUp from "../page/sign/SignUp";
import ProductInforPage from "../page/products/info.product";
import PageProduct from "../page/products/page.product";

import NotFoundPage from "../page/NotFoundPage";

import ProductsAdminPage from "../page/admin/ProductsAdminPage.tsx";
import AddProductPage from "../page/admin/AddProductPage.tsx";
import UpdateProductPage from "../page/admin/UpdateProductPage.tsx";
import UsersAdminPage from "../page/admin/UsersAdminPage.tsx";
import UpdateUserPage from "../page/admin/UpdateUserPage.tsx";
import Dashboard from "../page/admin/Dashboard.tsx";

export const routes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true
    },
    {
        path: '/login',
        page: Login,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUp,
        isShowHeader: true
    },
    {
        path: '/products/:id',
        page: ProductInforPage,
        isShowHeader: true
    },
    {
        path: '/collections/:id',
        page: PageProduct,
        isShowHeader: true
    },

    {
        path: '/user/admin/dashboard',
        page: Dashboard,
        isShowHeader: false
    },
    {
        path: '/user/admin/products',
        page: ProductsAdminPage,
        isShowHeader: false
    },
    {
        path: '/user/admin/users',
        page: UsersAdminPage,
        isShowHeader: false
    },
    {
        path: '/user/admin/add-product',
        page: AddProductPage,
        isShowHeader: false
    },
    {
        path: '/user/admin/update-product/:id',
        page: UpdateProductPage,
        isShowHeader: false
    },
    {
        path: '/user/admin/update-user/:id',
        page: UpdateUserPage,
        isShowHeader: false
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },

]