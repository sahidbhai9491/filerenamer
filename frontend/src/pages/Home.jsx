import AITabSection from "../components/AITabSection";
import Container from "../components/Container";
import CTASection from "../components/CTASection";
import GallerySection from "../components/GallerySection";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import { useState, useEffect, useRef } from 'react';
import FileManager from '../components/FileManager';
import ProcessingTools from '../components/ProcessingTools';
import PreviewPanel from '../components/PreviewPanel';
import BrowserModeSelector from '../components/BrowserModeSelector';
import FileProcessor from '../utils/fileProcessor';
import { detectBrowserCapabilities, getRecommendedMode, formatFileSize } from '../utils/browserDetector';
import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
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

    // Add this function in Home.jsx, inside the Home component
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
            <Hero />

            {/* Tool section */}
            <Container className={`bg-gray-50`}>
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">

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

            {/* Video Section */}
            <section className="w-full bg-gray-50 md:pt-8">
                <Container className="max-w-7xl mx-auto px-4">

                    {/* Heading */}
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                            See How RenameTool Works
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                            Watch this quick demo to understand how RenameTool helps you rename files
                            instantly, accurately, and without any hassle.
                        </p>
                    </div>

                    {/* Responsive Video */}
                    <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                        <div className="relative w-full aspect-video bg-black">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://player.vimeo.com/video/1151318386"
                                title="Rename Tool - How It Works"
                                frameBorder="0"
                                allow="fullscreen; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>

                </Container>
            </section>

            {/* Section 1: Core Tool Function */}
            <section className="pt-16 bg-white">
                <Container className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                            Rename Files Quickly and Simply
                        </h2>
                        <p className="text-base text-gray-600 max-w-3xl mx-auto">
                            Renaming files one by one can take hours. With File Renamer, you can rename single files or large batches quickly.
                        </p>
                    </div>

                    <div className="mt-10 bg-gray-50 rounded-xl p-8 border border-gray-200 max-w-4xl mx-auto">
                        <div className="text-center">
                            <p className="text-lg text-gray-700 mb-6">
                                Just select your files, choose your rule, preview the results, and rename — it's that simple.
                            </p>

                            <div className="mt-8 p-6 bg-white rounded-lg border border-gray-300">
                                <p className="text-gray-800">
                                    Whether you want to <span className="font-semibold text-indigo-600">Rename File</span>, perform <span className="font-semibold text-indigo-600">Bulk File Rename</span>, or use <span className="font-semibold text-indigo-600">Batch File Rename</span>, the process stays consistent, safe, and predictable.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Section 2: Platform Support */}
            <section className="pt-16 bg-gray-50">
                <Container className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                            Works Perfectly on Your System
                        </h2>
                        <p className="text-base text-gray-600 max-w-3xl mx-auto">
                            No downloads, no installations. Access our file rename program directly from your browser on any device.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow duration-300">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 3h-4V2h-4v1H6C4.346 3 3 4.346 3 6v12c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-3-3zm1 15c0 .551-.449 1-1 1H6c-.551 0-1-.449-1-1V6c0-.551.449-1 1-1h12c.551 0 1 .449 1 1v12z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Windows File Rename</h3>
                            <p className="text-gray-600 mb-4">
                                Perfect for Windows users who need a reliable file name changer without downloading software.
                            </p>
                            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                Works on Windows 10 & 11
                            </span>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow duration-300">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                                <svg className="w-10 h-10 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">File Renamer for Mac</h3>
                            <p className="text-gray-600 mb-4">
                                macOS users can rename file on Mac easily with our browser-based solution—no Mac App Store needed.
                            </p>
                            <span className="inline-block px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium">
                                Compatible with all macOS <Link to={`/changelog`}>versions</Link>
                            </span>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow duration-300">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                                <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Linux File Renamer</h3>
                            <p className="text-gray-600 mb-4">
                                Linux enthusiasts get a powerful file rename online tool that works across all distributions.
                            </p>
                            <span className="inline-block px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                                All Linux distributions supported
                            </span>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-xl">
                            <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <p className="text-gray-700 font-medium">
                                Your files stay 100% local and private. No uploads to our servers—ever. See <Link to={`/how-it-works`}>how it works</Link>.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            <Testimonials />
        </>
    );
}

export default Home;