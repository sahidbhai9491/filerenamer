import Container from "../components/Container";
import AdvancedRenamerSoftwareHero from "../components/AdvancedRenamerSoftwareHero";
import { useState, useEffect, useRef } from 'react';
import FileManager from '../components/FileManager';
import ProcessingTools from '../components/ProcessingTools';
import PreviewPanel from '../components/PreviewPanel';
import FileProcessor from '../utils/fileProcessor';
import { detectBrowserCapabilities, getRecommendedMode } from '../utils/browserDetector';
import { Coffee } from "lucide-react";

function AdvancedRenamerSoftware() {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [mode, setMode] = useState('download');
    const [processing, setProcessing] = useState(false);
    const [activeTool, setActiveTool] = useState('manual-rename');
    const [previewData, setPreviewData] = useState(null);
    const [browserCapabilities, setBrowserCapabilities] = useState(null);
    const [folderHandle, setFolderHandle] = useState(null);
    const [processingResults, setProcessingResults] = useState(null);

    const fileProcessor = useRef(null);

    useEffect(() => {
        // Detect browser capabilities on mount
        const capabilities = detectBrowserCapabilities();
        setBrowserCapabilities(capabilities);

        // Set initial mode based on browser capabilities
        const initialMode = getRecommendedMode();
        setMode(initialMode);

        // Initialize file processor
        fileProcessor.current = new FileProcessor(initialMode);
    }, []);

    // Add this function in AdvancedRenamerSoftware.jsx, inside the AdvancedRenamerSoftware component
    const refreshFilesFromFolder = async () => {
        if (folderHandle && mode === 'write') {
            try {
                const files = [];
                for await (const entry of folderHandle.values()) {
                    if (entry.kind === 'file') {
                        try {
                            const file = await entry.getFile();
                            files.push({
                                id: Math.random().toString(36).substr(2, 9),
                                file: file,
                                name: entry.name,
                                size: file.size,
                                type: file.type,
                                lastModified: file.lastModified,
                                previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                                path: folderHandle.name,
                                handle: entry,
                                status: 'ready'
                            });
                        } catch (error) {
                            console.warn(`Could not read file ${entry.name}:`, error);
                        }
                    }
                }
                setFiles(files);
                setSelectedFiles(files.map((_, index) => index));
            } catch (error) {
                console.error('Error refreshing files:', error);
            }
        }
    };

    // Update processor when mode changes
    useEffect(() => {
        if (fileProcessor.current) {
            fileProcessor.current.mode = mode;
            if (folderHandle && mode === 'write') {
                fileProcessor.current.setFolderHandle(folderHandle);
            }
        }
    }, [mode, folderHandle]);

    const handleFilesSelected = (selectedFiles, handle = null) => {
        // Only update if files actually changed
        if (JSON.stringify(files) !== JSON.stringify(selectedFiles)) {
            setFiles(selectedFiles);
            setSelectedFiles(selectedFiles.map((_, index) => index));
            if (handle) {
                setFolderHandle(handle);
                if (fileProcessor.current) {
                    fileProcessor.current.setFolderHandle(handle);
                }
            }
        }
    };

    const handleProcessComplete = (results) => {
        setProcessing(false);
        setProcessingResults(results);

        if (results && results.success && results.results) {
            // Refresh files after successful write mode operation
            if (mode === 'write') {
                refreshFilesFromFolder();
            }

            const processedFiles = results.results
                .filter(r => r.success)
                .map(r => ({
                    ...r.file,
                    name: r.file.newName || r.file.name,
                    originalName: r.file.originalName || r.file.name,
                    status: 'processed',
                    action: r.action || 'processed',
                    originalDeleted: r.originalDeleted || false
                }));

            setPreviewData(processedFiles);

            // Show detailed success message
            if (mode === 'write') {
                const summary = results.summary || {};
                let message = `✅ Successfully processed ${results.successfulFiles} files!`;

                if (summary.renamed > 0) {
                    message += `\n• Renamed: ${summary.renamed} files`;
                }
                if (summary.copied > 0) {
                    message += `\n• Copied: ${summary.copied} files`;
                }
                if (summary.skipped > 0) {
                    message += `\n• Skipped: ${summary.skipped} files (no changes needed)`;
                }
                if (summary.caseChanges > 0) {
                    message += `\n\n⚠️ Note: ${summary.caseChanges} files had case changes.`;
                    message += `\nYou may need to manually delete the original files if they still exist.`;
                }

                // Check for files that couldn't be deleted
                const notDeleted = results.results
                    .filter(r => r.success && r.originalDeleted === false && r.action === 'renamed')
                    .length;

                if (notDeleted > 0) {
                    message += `\n\n⚠️ Note: ${notDeleted} original files could not be deleted automatically.`;
                    message += `\nYou may need to delete them manually to avoid duplicates.`;
                }

                alert(message);
            } else {
                alert(`✅ Files processed! Downloading ZIP file...`);
            }
        } else {
            alert('❌ Some files failed to process. Check console for details.');
            console.error('Processing failed:', results);
        }
    };

    const handleProcessStart = async (tool, settings) => {
        if (selectedFiles.length === 0) {
            alert('Please select files to process');
            return;
        }

        setProcessing(true);

        try {
            // Get selected files using indices
            const selectedFileObjects = files.filter((_, index) => selectedFiles.includes(index));

            // console.log('Processing with:', { tool, settings, files: selectedFileObjects });

            // For manual rename, validate that at least one file has been renamed
            if (tool === 'manual-rename') {
                if (!settings.manualRenames || Object.keys(settings.manualRenames).length === 0) {
                    alert('Please rename at least one file manually');
                    setProcessing(false);
                    return;
                }

                // Check if any name has actually changed
                const hasChanges = selectedFileObjects.some(file => {
                    const newName = settings.manualRenames[file.id];
                    return newName && newName !== file.name;
                });

                if (!hasChanges) {
                    alert('No changes detected. Please rename at least one file.');
                    setProcessing(false);
                    return;
                }
            }

            // Process files
            const results = await fileProcessor.current.processFiles(
                selectedFileObjects,
                tool,
                settings
            );

            // console.log('Processing completed:', results);

            handleProcessComplete(results);
        } catch (error) {
            console.error('Processing error:', error);
            setProcessing(false);

            alert(`Error: ${error.message}. You may need to reselect the folder.`);

            // Create error result object
            handleProcessComplete({
                success: false,
                error: error.message,
                results: []
            });
        }
    };

    return (
        <>
            <AdvancedRenamerSoftwareHero />

            {/* Tool Section */}
            <div id="tool-section">
                <Container className={`bg-gray-50`}>
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - File Manager */}
                            <div className="lg:col-span-1">
                                <FileManager
                                    files={files}
                                    selectedFiles={selectedFiles}
                                    setSelectedFiles={setSelectedFiles}
                                    onFilesSelected={handleFilesSelected}
                                    mode={mode}
                                    folderHandle={folderHandle}
                                    setFolderHandle={setFolderHandle}
                                />
                            </div>

                            {/* Middle Column - Preview */}
                            <div className="lg:col-span-2">
                                <PreviewPanel
                                    files={files}
                                    selectedFiles={selectedFiles}
                                    previewData={previewData}
                                    activeTool={activeTool}
                                    processingResults={processingResults}
                                />
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm text-gray-500">Total Files</div>
                                <div className="text-2xl font-bold text-gray-900">{files.length}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm text-gray-500">Selected</div>
                                <div className="text-2xl font-bold text-indigo-600">{selectedFiles.length}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm text-gray-500">Mode</div>
                                <div className="text-xl md:text-xl font-bold text-purple-600">
                                    {mode === 'write' ? 'Write Mode' : 'Download Mode'}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm text-gray-500">Tool</div>
                                <div className="text-xl md:text-xl font-bold text-gray-900 capitalize">{activeTool}</div>
                            </div>
                        </div>

                        {/* Bottom Section - Processing Tools */}
                        <div className="mt-8">
                            <ProcessingTools
                                activeTool={activeTool}
                                setActiveTool={setActiveTool}
                                files={files}
                                selectedFiles={selectedFiles}
                                mode={mode}
                                onProcessStart={handleProcessStart}
                                processing={processing}
                            />
                        </div>

                        {/* Processing Results Summary */}
                        {processingResults && (
                            <div className="mt-8">
                                <div className={`p-4 rounded-lg ${processingResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                                    }`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {processingResults.success ? '✅ Processing Complete!' : '❌ Processing Failed'}
                                            </h3>
                                            <div className="text-sm text-gray-600 mt-1">
                                                {mode === 'write'
                                                    ? `Files were modified directly in your folder.`
                                                    : `Files were downloaded as "${processingResults.zipName}".`
                                                }
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setProcessingResults(null)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>

                                    {processingResults.results && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <div className="text-gray-600">Total Files</div>
                                                    <div className="font-semibold text-gray-900">{processingResults.totalFiles || processingResults.results.length}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-600">Successful</div>
                                                    <div className="font-semibold text-green-600">
                                                        {processingResults.successfulFiles || processingResults.results.filter(r => r.success).length}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-600">Failed</div>
                                                    <div className="font-semibold text-red-600">
                                                        {processingResults.results.filter(r => !r.success).length}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Processing Overlay */}
                    {processing && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
                                <div className="text-center">
                                    <div className="mx-auto h-12 w-12 text-indigo-600 mb-4">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {mode === 'write' ? 'Applying Changes' : 'Preparing Files'}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-2">
                                            {mode === 'write'
                                                ? 'Modifying files directly in your folder...'
                                                : 'Creating ZIP file for download...'
                                            }
                                        </div>
                                        <div className="text-xs text-orange-600 mt-2 text-center flex items-center justify-center gap-2">
                                            <Coffee />
                                            <p className="block">Grab coffee, we'll rename 100 files by your first sip.</p>
                                        </div>
                                        <div className="mt-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Container>
            </div>

            {/* Content Section */}
            <Container className="bg-white">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <p className="text-gray-700 mb-6">
                            When people search for advanced renamer software, they are usually dealing with a real problem —
                            hundreds of files with messy names, duplicate formats, or inconsistent structures.
                            Manually renaming files one by one wastes time and increases the chance of mistakes.
                        </p>

                        <p className="text-gray-700 mb-6">
                            Most traditional renaming software requires installation, system access, or file uploads to external servers.
                            That creates privacy risks and slows down simple tasks. This is exactly where a modern, browser-based advanced renamer becomes necessary.
                        </p>

                        <p className="text-gray-700 mb-8">
                            RenameTool is built for users who want advanced control without complexity.
                            It lets you rename and organize files directly on your computer using your browser —
                            safely, quickly, and without sending your files anywhere.
                        </p>

                        {/* When You Need Advanced Renamer Software */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600">🔹</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">When You Need Advanced Renamer Software</h3>
                            </div>
                            <p className="text-gray-700 mb-4">You need an advanced renamer when:</p>
                            <ul className="text-gray-700 space-y-2 list-disc pl-5">
                                <li>File names are inconsistent across projects</li>
                                <li>You work with large folders regularly</li>
                                <li>Manual renaming feels slow and error-prone</li>
                                <li>Privacy matters and uploads are not an option</li>
                            </ul>
                            <p className="text-gray-700 mt-4 font-medium">
                                This is not just about renaming — it's about saving time and staying organized.
                            </p>
                        </div>

                        {/* Real-Life Scenarios */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <span className="text-indigo-600">🔹</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">3 Real-Life Scenarios</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="text-3xl mb-4">1️⃣</div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Designers & Creators</h4>
                                    <p className="text-gray-600">
                                        A designer exporting hundreds of images daily needs clean, sequential names.
                                        Manual renaming breaks workflow. Advanced renamer rules solve this instantly.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="text-3xl mb-4">2️⃣</div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Office & Project Work</h4>
                                    <p className="text-gray-600">
                                        Project folders often contain mixed files like reports, invoices, and drafts.
                                        Bulk renaming keeps everything structured and searchable.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="text-3xl mb-4">3️⃣</div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Developers & Power Users</h4>
                                    <p className="text-gray-600">
                                        Log files, backups, and assets require precise naming formats.
                                        An advanced renamer avoids command mistakes while keeping control local.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Common Mistakes */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                    <span className="text-red-600">🔹</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Common Mistakes People Make</h3>
                            </div>

                            <div className="bg-red-50 p-6 rounded-xl">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-red-500">❌</span>
                                        <span className="text-gray-700">Renaming files one by one</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-red-500">❌</span>
                                        <span className="text-gray-700">Using unsafe online tools that upload files</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-red-500">❌</span>
                                        <span className="text-gray-700">Installing heavy software for simple tasks</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-red-500">❌</span>
                                        <span className="text-gray-700">Running incorrect command-line scripts</span>
                                    </div>
                                </div>
                                <p className="text-gray-700 mt-4">
                                    These methods either waste time or risk data safety.
                                </p>
                            </div>
                        </div>

                        {/* Wrong Method vs Right Method */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600">🔹</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Wrong Method vs Right Method</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-red-500">❌</span>
                                        <h4 className="font-semibold text-gray-900">Command Line Renaming</h4>
                                    </div>
                                    <p className="text-gray-700">
                                        Powerful but risky. One wrong command can rename or delete files incorrectly.
                                    </p>
                                </div>

                                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-red-500">❌</span>
                                        <h4 className="font-semibold text-gray-900">Upload-Based Online Tools</h4>
                                    </div>
                                    <p className="text-gray-700">
                                        Fast, but unsafe. Files leave your device.
                                    </p>
                                </div>

                                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-green-500">✅</span>
                                        <h4 className="font-semibold text-gray-900">Advanced Renamer Software (RenameTool)</h4>
                                    </div>
                                    <p className="text-gray-700">
                                        Runs locally in your browser. No upload. No install. Full control.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Why RenameTool Is the Right Advanced Renamer */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600">🔹</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Why RenameTool Is the Right Advanced Renamer</h3>
                            </div>

                            <div className="bg-green-50 p-6 rounded-xl">
                                <p className="text-gray-700 mb-4">
                                    RenameTool works differently from traditional software:
                                </p>
                                <ul className="text-gray-700 space-y-3 list-disc pl-5">
                                    <li>Files never leave your computer</li>
                                    <li>No installation or setup</li>
                                    <li>Direct folder access with permission</li>
                                    <li>Manual + auto rename modes</li>
                                    <li>Built-in file manager for preview & control</li>
                                </ul>
                                <p className="text-gray-700 mt-4 font-medium">
                                    It gives you software-level power with online simplicity.
                                </p>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-600">🔹</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">FAQs</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Is RenameTool real advanced renamer software?</h4>
                                            <p className="text-gray-600">
                                                Yes. It supports bulk actions, folder-level access, rules, and manual control — without installation.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Is it safe to use in a browser?</h4>
                                            <p className="text-gray-600">
                                                Absolutely. Files stay on your device. Nothing is uploaded or stored.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Do I need technical knowledge?</h4>
                                            <p className="text-gray-600">
                                                No. The interface is simple and works for beginners and professionals alike.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white">
                        <h3 className="text-3xl font-bold mb-4">Start renaming files smarter — not harder.</h3>
                        <p className="text-base mb-6 opacity-90">
                            Experience the power of advanced file renaming without the complexity.
                        </p>
                        <a
                            href=""
                            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                        >
                            Try Advanced Renamer Now
                        </a>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default AdvancedRenamerSoftware;