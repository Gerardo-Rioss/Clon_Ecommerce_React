import styles from "./header.module.css";
import { Link, useSearchParams } from "react-router";
import { updateSearchParam } from "../../utils/searchParams";
import ButtonCartWithBadge from "../MaterialComponent/ButtonCartWithBadge/ButtonCartWithBadge";
import { HiMenu, HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext";
import { useCategories } from "../../hooks/useCategories";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Categorías", href: "/" },
];

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark, toggleTheme } = useTheme();
  const { data: categories } = useCategories();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = updateSearchParam(searchParams, "search", e.target.value);
    setSearchParams(newParams);
  };

  return (
    <header className={styles.headerWrapper}>
      {/* ─── Main Header Bar (yellow) ─── */}
      <div className={styles.navHeader}>
        <div className={styles.navLeftArea}>
          <button
            className={styles.menuButton}
            onClick={onToggleSidebar}
            aria-label="Menú"
          >
            <HiMenu size={22} />
          </button>
          <Link to="/">
            <img
              className={styles.logoImagen}
              src={"LogoMercadoLibre.jpg"}
              alt="Mercado Libre"
            />
          </Link>
        </div>

        <div className={styles.navCenterArea}>
          <div className={styles.search}>
            <input
              className={styles.inputSearch}
              type="text"
              placeholder="Buscar productos, marcas y más..."
              value={searchParams.get("search") || ""}
              onChange={handleSearchChange}
            />
            <button className={styles.buttonSearch} aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.navRightArea}>
          <div className={styles.navRightAreaButtons}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={isDark ? "Modo claro" : "Modo oscuro"}
              title={isDark ? "Modo claro" : "Modo oscuro"}
            >
              {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>
            <ButtonCartWithBadge />
          </div>
        </div>
      </div>

      {/* ─── Bottom Nav Bar (white, category links) ─── */}
      <nav className={styles.navBar}>
        <div className={styles.navBarContent}>
          <div className={styles.navBarLinks}>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.href} className={styles.navBarLink}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className={styles.navBarCategories}>
            {categories?.slice(0, 5).map((cat: string) => (
              <button
                key={cat}
                className={styles.navBarCategory}
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set("category", cat);
                  setSearchParams(params);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
