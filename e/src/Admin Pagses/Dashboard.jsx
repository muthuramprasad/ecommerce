// Dashboard.js
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { GrUpdate } from "react-icons/gr";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatIcon from '@mui/icons-material/Chat';
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Update from './Update';
import Dashbord_Home from './Dashbord_Home';
import Pendings from './Pendings';
import Orders from './Orders';


const Dashboard = () => {
    const { collapseSidebar } = useProSidebar();

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar className="app">
                <Menu>
                    <MenuItem className="menu1" icon={<MenuRoundedIcon onClick={() => { collapseSidebar(); }} />}>
                       
                    </MenuItem>
                    <MenuItem icon={<GridViewRoundedIcon />} component={<Link to="/dashboard" className="link" />} > Dashboard </MenuItem>
                    <MenuItem icon={<GrUpdate />} component={<Link to="update" className="link" />}>
                        Update
                    </MenuItem>
                  
                        {/* <MenuItem icon={<TimelineRoundedIcon />} component={<Link to="/dashboard/pending" className="link" />} > Pending </MenuItem> */}
                        <MenuItem icon={<BubbleChartRoundedIcon /> } component={<Link to="/dashboard/orders"/>} >To Delivered </MenuItem>
              
                    {/* <SubMenu label="Message" icon={<MailOutlineIcon />}>
                        <MenuItem icon={<ChatIcon />}> Feedback </MenuItem>
                    </SubMenu> */}
                    <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />} >
                        <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem>
                </Menu>
            </Sidebar>
            <Outlet/>
<section>
</section>
        </div>
    );
}

export default Dashboard;
