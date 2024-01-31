import React from 'react'
import Top_Navbar from './Top_Navbar'
import { Outlet } from 'react-router-dom'
import AppBreadCrumb from '../BreadCrum/AppBreadCrumb'

const RootLayout = () => {
  return (
    <div>
     
      <Top_Navbar/>
      <br />
      <div style={{marginLeft:'290px'}}>
      <AppBreadCrumb />
      </div>
    
     <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayout
