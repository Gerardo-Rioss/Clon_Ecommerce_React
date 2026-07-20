import { Outlet } from "react-router";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import { FooterContent } from "../Footer/FooterContent";
import styles from "./Layout.module.css";
import { Header } from "../Header/header";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.appContainer}>
      <div className={styles.header}>
        <Header onToggleSidebar={toggleSidebar} />
      </div>

      {/* Overlay móvil */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} />
      )}

      {/* Sidebar colapsable (oculto por defecto como Meli) */}
      <div
        className={`${styles.sideBar} ${
          sidebarOpen ? styles.sideBarOpen : ""
        }`}
      >
        <button
          className={styles.closeButton}
          onClick={closeSidebar}
          aria-label="Cerrar filtros"
        >
          ×
        </button>
        <SideBar />
      </div>

      <div className={styles.mainContent}>
        <Outlet />
      </div>

      <div className={styles.footer}>
        <FooterContent />
      </div>
    </div>
  );
}

export default Layout;
