import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleGetStarted = () => {
        // Add your get started logic here
        navigate('/');
        scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogin = () => {
        // Add your login logic here
        console.log('Login clicked');
    };

    return (
        <>
            {/* Announcement Bar */}
            <div className="w-full py-2.5 font-medium text-sm text-white text-center bg-linear-to-r from-[#4F39F6] to-[#FDFEFF]">
                <p>
                    <span className="px-3 py-1 rounded-md text-indigo-600 bg-white mr-2">
                        Big Update!
                    </span>
                    File Organizer Feature Is Now Live (Free)
                </p>
            </div>

            {/* Navigation */}
            <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-slate-800 text-sm">
                {/* Logo */}
                <Link to="/">
                    <img src="/RenameTool.webp" className='h-8 md:h-10' alt="RenameTool Logo" />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/how-it-works"
                        className={({ isActive }) =>
                            `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                        }
                    >
                        How It Works
                    </NavLink>
                    <NavLink
                        to="/faqs"
                        className={({ isActive }) =>
                            `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                        }
                    >
                        FAQs
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                        }
                    >
                        Contact
                    </NavLink>
                    <NavLink
                        to="/comparison"
                        className={({ isActive }) =>
                            `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                        }
                    >
                        Comparison
                    </NavLink>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    <button
                        onClick={handleGetStarted}
                        className="px-6 cursor-pointer py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md"
                    >
                        Try RenameTool - Free
                    </button>
                    {/* <Link
                        to={`/login`}
                        className="hover:bg-slate-100 transition px-6 py-2 border border-indigo-600 rounded-md"
                    >
                        Login
                    </Link> */}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden active:scale-90 transition"
                >
                    <Menu size={26} />
                </button>
            </nav>

            {/* Mobile Navigation Menu */}
            <div
                className={`fixed inset-0 z-100 bg-white/60 text-slate-800 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <NavLink
                    to="/"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/how-it-works"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                    }
                >
                    How It Works
                </NavLink>
                <NavLink
                    to="/faqs"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                    }
                >
                    FAQs
                </NavLink>
                <NavLink
                    to="/contact"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                    }
                >
                    Contact
                </NavLink>
                <NavLink
                    to="/comparison"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                        `hover:text-slate-500 transition ${isActive ? 'text-indigo-600 font-medium' : ''}`
                    }
                >
                    Comparison
                </NavLink>

                <button
                    onClick={closeMenu}
                    className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
                >
                    <X size={24} />
                </button>
            </div>
        </>
    );
};

export default Header;