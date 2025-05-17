// layouts/MainLayouts.jsx
import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Header trên cùng */}
      <Header />

      <div className="d-flex">
        <SideBar /> {/* Navbar bên trái*/}
        <div className={`flex-grow-1 ${styles.mainContent}`}>
          <div className="flex-grow-1 p-2 p-md-3 m-0 mx-md-4 my-md-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
