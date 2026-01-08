import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index path="" element={<Home />} />
                        <Route index path="/advanced-renamer-software" element={<AdvancedRenamer />} />
                        <Route index path="/file-renamer-program" element={<FileRenamerProgram />} />
                        <Route index path="/bulk-file-rename" element={<BulkFileRename />} />
                        <Route index path="/batch-rename-utility" element={<BatchRenameUtility />} />
                        <Route index path="/window-file-renamer" element={<WindowFileRenamer />} />
                        <Route index path="/batch-rename-file-mac" element={<BatchRenameFileMac />} />
                        <Route index path="/linux-rename-file" element={<LinuxRenameFile />} />
                        <Route index path="/bulk-rename-utility" element={<BulkRenameUtility />} />
                        <Route index path="/file-renamer" element={<FileRenamer />} />
                        <Route index path="/rename-file" element={<RenameFile />} />
                        <Route index path="/file-name-changer" element={<FileNameChanger />} />
                        <Route index path="/rename-file-online" element={<RenameFileOnline />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/blog/how-i-rename-multiple-files-at-once-on-windows" element={<BlogOne />} />
                        <Route path="/blog/best-file-rename-tools-in-2026" element={<BlogTwo />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)