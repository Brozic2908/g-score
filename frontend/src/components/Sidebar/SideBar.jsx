import React, { useEffect, useMemo, useState } from "react";
import styles from "./SideBar.module.css";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleNavClick = () => {
    if (isMobile) closeSidebar(); // Chỉ đóng khi là mobile
  };

  // Update mobile state on window resize
  useEffect(() => {
    const checkMobile = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);
      setIsOpen(!isNowMobile);
    };

    checkMobile(); // chạy ngay
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const navItem = useMemo(
    () => [
      { to: "/", icon: "fa-chart-line", label: "Scope Spectrum" },
      { to: "/search", icon: "fa-address-card", label: "Search Scores" },
      { to: "/topstudent", icon: "fa-ranking-star", label: "Top Students" },
      { to: "/settings", icon: "fa-gear", label: "Settings" },
    ],
    []
  );

  return (
    <div>
      <button
        className={`btn btn-primary ${styles.toggleBtn}`}
        onClick={toggleSidebar}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {isOpen && <div className={styles.overlay} onClick={toggleSidebar} />}

      <div
        className={`${styles.sideBar} ${isOpen ? styles.open : styles.closed}`}
      >
        <h5 className={styles.title}>Menu</h5>
        <ul className="nav flex-column">
          {navItem.map(({ to, icon, label }) => (
            <li className="nav-item" key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav-link text-white ${styles.navLink} ${
                    isActive ? styles.activeLink : ""
                  }`
                }
                onClick={handleNavClick}
              >
                <i className={`fa-solid ${icon} me-2`}></i>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
