import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { user, logout, isAdmin, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const categories = [
        { name: "Home", path: "/", icon: FaHome },
        { name: "Politics", path: "/category/politics" },
        { name: "Business", path: "/category/business" },
        { name: "Technology", path: "/category/technology" },
        { name: "Sports", path: "/category/sports" },
        { name: "Entertainment", path: "/category/entertainment" },
        { name: "Health", path: "/category/health" },
    ];

    // FIX: active category highlight
    const isActive = (path) =>
        location.pathname === path ||
        (path.startsWith("/category") && location.pathname.startsWith(path));

    const handleLogout = () => {
        logout();
        navigate("/");
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItem = (name, path, Icon) => (
        <Link
            key={path}
            to={path}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isActive(path)
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
        >
            {Icon && <Icon className="text-sm" />}
            {name}
        </Link>
    );

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white py-3"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Desktop Left Menu */}
                <div className="hidden lg:flex items-center space-x-1 flex-1">
                    {categories.map((cat) => menuItem(cat.name, cat.path, cat.icon))}
                </div>

                {/* Center Search */}
                <div className="hidden lg:flex flex-1 justify-center px-6">
                    <SearchBar />
                </div>

                {/* Right Auth */}
                <div className="hidden lg:flex items-center space-x-4 flex-1 justify-end">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {user?.name?.[0]?.toUpperCase()}
                                </div>
                                <span className="text-gray-700 text-sm font-medium">
                                    {user?.name}
                                </span>
                            </div>

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                                >
                                    Dashboard
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-2xl text-gray-700"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
                    <div className="p-4 space-y-3">
                        <SearchBar onSearch={() => setMenuOpen(false)} />

                        {categories.map((cat) => menuItem(cat.name, cat.path, cat.icon))}

                        <hr />

                        {isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 bg-purple-600 text-white rounded-lg text-center"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-center hover:bg-blue-50"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
