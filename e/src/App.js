// App.js
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './User Pages/Home';
import Mens from './User Pages/Mens';
import Womans from './User Pages/Womans';
import Kids from './User Pages/Kids';
import Login from './Form/Login';
import Registration from './Form/Registration';
import Dashboard from './Admin Pagses/Dashboard';
import Update from './Admin Pagses/Update';
import Pendings from './Admin Pagses/Pendings';
import Orders from './Admin Pagses/Orders';
import Setting from './Admin Pagses/Setting';
import Support from './Admin Pagses/Support';
import Delivered from './Admin Pagses/Delicered';
import NoPage from './User Pages/NoPage';
import Dashbord_Home from './Admin Pagses/Dashbord_Home';
import RootLayout from './Navbar/RootLayout';
import Carts from './User Pages/Carts';
import ProductsDetails from './User Pages/ProductsDetails';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<RootLayout/>}>
                <Route index element={<Home />} />
                <Route path='/mens' element={<Mens />} />
                <Route path='/mens/:title' element={<ProductsDetails category="mens" />} />
                <Route path='/womans' element={<Womans />} />
                <Route path='/womans/:title' element={<ProductsDetails category="womans" />} />
                <Route path='/kids' element={<Kids />} />
                <Route path='/kids/:title' element={<ProductsDetails category="kids" />} />
              
     <Route path='/carts' element={<Carts />} />
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Registration />} />
                </Route>

                <Route path='dashboard' element={<Dashboard />} style={{marginTop:'100px'}}>
                    <Route index element={<Dashbord_Home />} />
                    <Route path='update' element={<Update />} />
                    <Route path='pending' element={<Pendings />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='settings' element={<Setting />} />
                    <Route path='support' element={<Support />} />
                    <Route path='deliver' element={<Delivered />} />
                    </Route>
                

                <Route path='*' element={<NoPage />} />
            </Routes>
        </>
    );
}

export default App;
