import { React, useState } from "react";
import "./App.css";
import Layout from "./components/Categories/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminProducts from "./components/Admin/AdminProducts";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminCategories from "./components/Admin/AdminCategories";
import SignupConsent from "./components/SignUp/SignUpConsent";
import SignupInformation from "./components/SignUp/SignUpInformation";
import SignUpComplete from "./components/SignUp/SignUpComplete";
import Login from "./components/Login/Login";
import MypageOrder from "./components/Mypage/MypageOrder";
import MypageInformation from "./components/Mypage/MypageInformation";
import MypageLeave from "./components/Mypage/MypageLeave";
import MypagePassword from "./components/Mypage/MypagePassword";

import Categories from "./components/Categories/Categories";
import Wine from "./components/Categories/Wine";
import Cheeses from "./components//Categories/Cheeses";
import Cart from "./components/Order/Cart";
import Order from "./components/Order/Order";
import Complete from "./components/Order/Complete";

export default function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/categories" />}
            ></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/categories/wine" element={<Wine />}></Route>
            <Route path="/categories/cheeses" element={<Cheeses />}></Route>
            <Route path="/signup/consent" element={<SignupConsent />}></Route>
            <Route
              path="/signup/information"
              element={<SignupInformation />}
            ></Route>
            <Route path="/signup/complete" element={<SignUpComplete />}></Route>
            <Route path="/Admin/users" element={<AdminUsers />}></Route>
            <Route path="/admin/orders" element={<AdminOrders />}></Route>
            <Route
              path="/admin/categories"
              element={<AdminCategories />}
            ></Route>
            <Route path="/admin/products" element={<AdminProducts />}></Route>
            <Route path="/mypage/order" element={<MypageOrder />}></Route>
            <Route
              path="/mypage/information"
              element={<MypageInformation />}
            ></Route>
            <Route path="/mypage/password" element={<MypagePassword />}></Route>
            <Route path="/mypage/leave" element={<MypageLeave />}></Route>
            <Route path="/order/cart" element={<Cart />}></Route>
            <Route path="/order/order" element={<Order />}></Route>
            <Route path="/order/complete" element={<Complete />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}
