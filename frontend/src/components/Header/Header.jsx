import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header
      className={`text-white shadow-sm py-4 d-flex align-items-center justify-content-center border-bottom-2 border-white ${styles.HeaderCard}`}
    >
      <h3 className="m-0 fw-bold d-none d-sm-block">G-Scores</h3>
      <h4 className="m-0 fw-bold d-block d-sm-none">G-Scores</h4>
    </header>
  );
}
