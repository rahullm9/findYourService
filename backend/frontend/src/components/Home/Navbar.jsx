import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#services") {
      const timer = setTimeout(() => {
        const element = document.getElementById("services");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleServicesClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: "About", path: "/about" },
  ];

  const isActive = (link) => {
    if (link.name === "Home") {
      return location.pathname === "/" && location.hash !== "#services";
    }
    if (link.name === "Services") {
      return location.pathname === "/" && location.hash === "#services";
    }
    return location.pathname === link.path;
  };


  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    background: "white",
    borderBottom: "1px solid #f0f0f0",
    boxShadow: scrolled ? "0 1px 6px rgba(0,0,0,0.06)" : "none",
    transition: "box-shadow 0.2s",
  };

  const innerStyle = {
    maxWidth: "1100px", margin: "0 auto", padding: "0 24px",
    height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
  };

  const logoBoxStyle = {
    width: "36px", height: "36px", borderRadius: "8px",
    background: "linear-gradient(135deg, #e85d04, #f48c06)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "white", fontWeight: 900, fontSize: "11px", letterSpacing: "0.03em",
    flexShrink: 0,
  };

  return (
    <header style={navStyle}>
      <div style={innerStyle}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={logoBoxStyle}>FYS</div>
          <span style={{ fontWeight: 700, color: "#111827", fontSize: "17px", letterSpacing: "-0.02em" }}>
            FindYourService
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => {
                if (link.name === "Services") {
                  handleServicesClick(e);
                }
              }}
              style={{
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive(link) ? 600 : 500,
                color: isActive(link) ? "#111827" : "#6b7280",
                transition: "color 0.15s",
              }}
              onMouseOver={e => { e.currentTarget.style.color = "#111827"; }}
              onMouseOut={e => { if (!isActive(link)) e.currentTarget.style.color = "#6b7280"; }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden md:flex">
          <Link to="/signin" style={{ textDecoration: "none", fontSize: "14px", fontWeight: 500, color: "#6b7280" }}>
            Sign in
          </Link>
          <Link to="/contactus">
            <button
              style={{
                background: "#e85d04", color: "white", border: "none",
                padding: "10px 20px", borderRadius: "8px",
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              onMouseOver={e => { e.currentTarget.style.opacity = "0.88"; }}
              onMouseOut={e => { e.currentTarget.style.opacity = "1"; }}
            >
              Contact us
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", padding: "6px" }}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ background: "white", borderTop: "1px solid #f0f0f0", padding: "12px 24px 20px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => {
                setIsOpen(false);
                if (link.name === "Services") {
                  handleServicesClick(e);
                }
              }}
              style={{
                display: "block", padding: "12px 16px", borderRadius: "8px",
                textDecoration: "none", fontSize: "14px", fontWeight: 500,
                color: isActive(link) ? "#e85d04" : "#374151",
                background: isActive(link) ? "#fff7ed" : "transparent",
                marginBottom: "4px",
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contactus" onClick={() => setIsOpen(false)}>
            <button
              style={{
                width: "100%", marginTop: "12px", background: "#e85d04",
                color: "white", border: "none", padding: "13px", borderRadius: "8px",
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
              }}
            >
              Contact us
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
