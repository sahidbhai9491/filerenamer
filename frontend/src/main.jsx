import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdvancedRenamer from "./pages/AdvancedRenamerSoftware.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import BlogOne from './pages/BlogOne';
import BlogTwo from './pages/BlogTwo';
import { AuthProvider } from './contexts/AuthContext.jsx';
import FileRenamerProgram from "./pages/FileRenamerProgram.jsx";
import BulkFileRename from "./pages/BulkFileRename.jsx";
import BatchRenameUtility from "./pages/BatchRenameUtility.jsx";
import WindowFileRenamer from "./pages/WindowFileRenamer.jsx";
import BatchRenameFileMac from "./pages/BatchRenameFileMac.jsx";
import BulkRenameUtility from "./pages/BulkRenameUtility.jsx";
import LinuxRenameFile from "./pages/LinuxRenameFile.jsx";
import FileRenamer from "./pages/FileRenamer.jsx";
import RenameFile from "./pages/RenameFile.jsx";
import FileNameChanger from "./pages/FileNameChanger.jsx";
import RenameFileOnline from "./pages/RenameFileOnline.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import FAQs from "./pages/FAQs.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Changelog from "./pages/ChangeLog.jsx";
import Comparison from "./pages/Comparison.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index path="" element={<Home />} />
                        <Route path="/advanced-renamer-software" element={<AdvancedRenamer />} />
                        <Route path="/file-renamer-program" element={<FileRenamerProgram />} />
                        <Route path="/bulk-file-rename" element={<BulkFileRename />} />
                        <Route path="/batch-rename-utility" element={<BatchRenameUtility />} />
                        <Route path="/window-file-renamer" element={<WindowFileRenamer />} />
                        <Route path="/batch-rename-file-mac" element={<BatchRenameFileMac />} />
                        <Route path="/linux-rename-file" element={<LinuxRenameFile />} />
                        <Route path="/bulk-rename-utility" element={<BulkRenameUtility />} />
                        <Route path="/file-renamer" element={<Navigate to="/rename-file-online" replace />} />
                        <Route path="/rename-file" element={<Navigate to="/rename-file-online" replace />} />
                        <Route path="/file-name-changer" element={<FileNameChanger />} />
                        <Route path="/rename-file-online" element={<RenameFileOnline />} />
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
                        <Route path="/blog/how-i-rename-multiple-files-at-once-on-windows" element={<BlogOne />} />
                        <Route path="/blog/best-file-rename-tools-in-2026" element={<BlogTwo />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)