import Container from "../components/Container";
import RenameFileOnlineHero from "../components/RenameFileOnlineHero";
import Testimonials from "../components/Testimonials";
import { useState, useEffect, useRef } from 'react';
import FileManager from '../components/FileManager';
import ProcessingTools from '../components/ProcessingTools';
import PreviewPanel from '../components/PreviewPanel';
import FileProcessor from '../utils/fileProcessor';
import { detectBrowserCapabilities, getRecommendedMode } from '../utils/browserDetector';
import { Coffee } from "lucide-react";

function RenameFileOnline() {
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

    // Add this function in RenameFileOnline.jsx, inside the RenameFileOnline component
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
            <RenameFileOnlineHero />

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
                    {/* Introduction */}
                    <div className="mb-8">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Rename file online easily using a file renamer that works directly in your browser online. 
                            No installation needed - everything happens locally on your device for complete privacy.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        {/* What Is the Real Problem When You Try to Rename a File? */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is the Real Problem When You Try to Rename a File?</h2>
                            <p className="text-gray-700 mb-4">
                                Renaming a file sounds simple, but the problem begins when file names become unclear, duplicated, or inconsistent. 
                                Many users struggle when downloaded files, project assets, or copied folders end up with confusing names like final_v3, new_new, or random system-generated labels.
                            </p>
                            <div className="bg-gray-50 p-5 rounded-xl">
                                <p className="font-semibold text-gray-800 mb-3">People searching for file renamer or rename file usually want:</p>
                                <ul className="text-gray-700 space-y-2 list-disc pl-5">
                                    <li>Cleaner and meaningful file names</li>
                                    <li>Faster way to rename files</li>
                                    <li>Less confusion when managing folders</li>
                                </ul>
                            </div>
                            <p className="text-gray-700 mt-4">
                                The issue is not renaming one file — it's doing it correctly and consistently.
                            </p>
                        </div>

                        {/* Why Built-In Rename Options Are Often Not Enough */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Built-In Rename Options Are Often Not Enough</h2>
                            <p className="text-gray-700 mb-4">
                                Most operating systems allow basic renaming, but they fall short quickly. 
                                You can rename a single file easily, but once you work with multiple files, problems appear.
                            </p>
                            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                                <p className="font-semibold text-gray-800 mb-3">Built-in options:</p>
                                <ul className="text-gray-700 space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Offer very limited control</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Don't show clear previews</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Become risky with large folders</span>
                                    </li>
                                </ul>
                                <p className="text-gray-700 mt-4 font-medium">
                                    That's why users start looking for a dedicated file renamer instead of relying on default methods.
                                </p>
                            </div>
                        </div>

                        {/* Why People Struggle to Rename Files Correctly */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why People Struggle to Rename Files Correctly</h2>
                            <p className="text-gray-700 mb-4">
                                File renaming becomes frustrating because:
                            </p>
                            <div className="bg-yellow-50 p-6 rounded-xl">
                                <ul className="text-gray-700 space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        <span>Manual renaming is slow</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        <span>Mistakes are easy to make</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        <span>Undoing wrong names is difficult</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        <span>Command-line methods feel risky</span>
                                    </li>
                                </ul>
                                <p className="text-gray-700 mt-4 font-medium">
                                    Users want a solution that feels simple but reliable, not technical or confusing.
                                </p>
                            </div>
                        </div>

                        {/* How a File Renamer Solves This Problem */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How a File Renamer Solves This Problem</h2>
                            <p className="text-gray-700 mb-4">
                                A file renamer gives you clarity and control to rename file online. 
                                Instead of guessing outcomes, you see exactly how files will be renamed before applying changes.
                            </p>
                            <div className="bg-green-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600">⚡</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">RenameTool works as a file renamer that:</h3>
                                </div>
                                <ul className="text-gray-700 space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Lets you rename file names with preview</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Works directly on your computer</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Avoids uploads and installations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Keeps the process clear and safe</span>
                                    </li>
                                </ul>
                                <p className="text-gray-700 mt-4 font-medium">
                                    This removes uncertainty and saves time.
                                </p>
                            </div>
                        </div>

                        {/* How to Rename File Using RenameTool */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Rename File Using RenameTool</h2>
                            <p className="text-gray-700 mb-4">
                                Renaming files does not require technical knowledge:
                            </p>
                            
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">1</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Open</h4>
                                        <p className="text-gray-600 text-sm">in your browser</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">2</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Select</h4>
                                        <p className="text-gray-600 text-sm">files or folder</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">3</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Choose</h4>
                                        <p className="text-gray-600 text-sm">rename options</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">4</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Preview</h4>
                                        <p className="text-gray-600 text-sm">changes</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">5</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Apply</h4>
                                        <p className="text-gray-600 text-sm">rename instantly</p>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                                    <p className="text-blue-800 text-center font-medium">
                                        Everything happens locally, so your files remain private.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rename File Using Command Line vs File Renamer Tool */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rename File Using Command Line vs File Renamer Tool</h2>
                            <p className="text-gray-700 mb-4">
                                Compare the two approaches to understand why a dedicated file renamer tool is better for most users.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-red-500">❌</span>
                                        <h3 className="text-lg font-bold text-gray-900">Command Line Rename</h3>
                                    </div>
                                    <ul className="text-gray-700 space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            <span>Requires syntax knowledge</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            <span>No visual preview</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            <span>High risk of mistakes</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            <span>Difficult to undo</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-green-500">✅</span>
                                        <h3 className="text-lg font-bold text-gray-900">File Renamer Tool (RenameTool)</h3>
                                    </div>
                                    <ul className="text-gray-700 space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Visual and predictable</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Preview before applying</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Beginner-friendly</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Works the same on Windows, Mac, and Linux</span>
                                        </li>
                                    </ul>
                                    <p className="text-gray-700 mt-4 font-medium">
                                        This makes RenameTool suitable for both everyday users and professionals.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* When Should You Use a File Renamer? */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Should You Use a File Renamer?</h2>
                            <p className="text-gray-700 mb-4">
                                You should use a file renamer when:
                            </p>
                            <div className="bg-purple-50 p-6 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                                        <h4 className="font-semibold text-gray-900 mb-2">File Management</h4>
                                        <ul className="text-gray-700 space-y-2 text-sm">
                                            <li>• File names are unclear or messy</li>
                                            <li>• You want consistent naming</li>
                                            <li>• Manual renaming feels slow</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                                        <h4 className="font-semibold text-gray-900 mb-2">Privacy & Convenience</h4>
                                        <ul className="text-gray-700 space-y-2 text-sm">
                                            <li>• Privacy matters</li>
                                            <li>• No installation needed</li>
                                            <li>• Cross-platform compatibility</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-gray-700 mt-4 text-center font-medium">
                                    Whether you want to rename one file or organize many, a proper tool makes the process easier and safer.
                                </p>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
                            
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">What is a file renamer?</h4>
                                            <p className="text-gray-600">
                                                A file renamer is a tool that helps you change file names online easily and consistently, 
                                                often with preview and bulk options.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Is RenameTool safe to rename files?</h4>
                                            <p className="text-gray-600">
                                                Yes. All actions happen locally in your browser. Files never leave your device.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Can I rename a single file as well?</h4>
                                            <p className="text-gray-600">
                                                Yes. RenameTool supports both single file rename and folder-level renaming.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white">
                        <h3 className="text-2xl md:text-2xl font-bold mb-4">Stop struggling with confusing file names and limited rename options.</h3>
                        <p className="text-base mb-6 opacity-90">
                            Use RenameTool to rename file online easily and consistently — no uploads, no installations, full privacy.
                        </p>
                        <a 
                            href="#tool-section" 
                            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                        >
                            👉 Try Online File Renamer – Free & Private
                        </a>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default RenameFileOnline;