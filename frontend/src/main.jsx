import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext.jsx';
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import FAQs from "./pages/FAQs.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Changelog from "./pages/Changelog.jsx";
import Comparison from "./pages/Comparison.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index path="" element={<Home />} />
                        <Route path="/advanced-renamer-software" element={<Navigate to="/" replace />} />
                        <Route path="/file-renamer-program" element={<Navigate to="/" replace />} />
                        <Route path="/bulk-file-rename" element={<Navigate to="/" replace />} />
                        <Route path="/batch-rename-utility" element={<Navigate to="/" replace />} />
                        <Route path="/window-file-renamer" element={<Navigate to="/" replace />} />
                        <Route path="/batch-rename-file-mac" element={<Navigate to="/" replace />} />
                        <Route path="/linux-rename-file" element={<Navigate to="/" replace />} />
                        <Route path="/bulk-rename-utility" element={<Navigate to="/" replace />} />
                        <Route path="/file-renamer" element={<Navigate to="/" replace />} />
                        <Route path="/rename-file" element={<Navigate to="/" replace />} />
                        <Route path="/file-name-changer" element={<Navigate to="/" replace />} />
                        <Route path="/rename-file-online" element={<Navigate to="/" replace />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-conditions" element={<TermsAndConditions />} />
                        <Route path="/faqs" element={<FAQs />} />
                        <Route path="/how-it-works" element={<HowItWorks />} />
                        <Route path="/changelog" element={<Changelog />} />
                        <Route path="/comparison" element={<Comparison />} />
                        <Route path="/blog/how-i-rename-multiple-files-at-once-on-windows" element={<Navigate to="/" replace />} />
                        <Route path="/blog/best-file-rename-tools-in-2026" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)