import Container from "../components/Container";
import WindowFileRenamerHero from "../components/WindowFileRenamerHero";
import Testimonials from "../components/Testimonials";
import { useState, useEffect, useRef } from 'react';
import FileManager from '../components/FileManager';
import ProcessingTools from '../components/ProcessingTools';
import PreviewPanel from '../components/PreviewPanel';
import FileProcessor from '../utils/fileProcessor';
import { detectBrowserCapabilities, getRecommendedMode } from '../utils/browserDetector';
import { Coffee } from "lucide-react";

function WindowFileRenamer() {
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

    // Add this function in WindowFileRenamer.jsx, inside the WindowFileRenamer component
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
            <WindowFileRenamerHero />

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
                            RenameTool works directly in your browser on Windows, allowing you to rename, preview, 
                            and organize files locally with full privacy and complete control over your folders.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        {/* What Is the Real Problem Windows Users Face */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is the Real Problem Windows Users Face with File Renaming?</h2>
                            <p className="text-gray-700 mb-4">
                                Windows makes it easy to rename a single file, but the problem starts when you need to rename many files at once. 
                                Default file names, copied folders, and downloaded files quickly turn into a mess. 
                                Built-in options are limited and become frustrating when consistency is required.
                            </p>
                            <div className="bg-gray-50 p-5 rounded-xl">
                                <p className="font-semibold text-gray-800 mb-3">This problem usually appears when:</p>
                                <ul className="text-gray-700 space-y-2 list-disc pl-5">
                                    <li>Files are copied from different sources</li>
                                    <li>Projects grow large over time</li>
                                    <li>Naming formats need to stay consistent</li>
                                </ul>
                            </div>
                            <p className="text-gray-700 mt-4">
                                That's why users search specifically for a <strong>Windows file renamer</strong> that goes beyond basic options.
                            </p>
                        </div>

                        {/* Why Windows' Default Rename Option Is Not Enough */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Windows' Default Rename Option Is Not Enough</h2>
                            <p className="text-gray-700 mb-4">
                                Windows allows basic bulk renaming, but it lacks flexibility and control. 
                                You can't easily preview changes, apply custom rules, or organize files properly. 
                                Once files are renamed, undoing mistakes can be difficult.
                            </p>
                            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                                <p className="font-semibold text-gray-800 mb-3">This method fails because it:</p>
                                <ul className="text-gray-700 space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Offers limited customization</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Lacks advanced preview</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Becomes risky with large folders</span>
                                    </li>
                                </ul>
                                <p className="text-gray-700 mt-4 font-medium">
                                    Users need a safer and clearer solution.
                                </p>
                            </div>
                        </div>

                        {/* How a Windows File Renamer Solves This Problem */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How a Windows File Renamer Solves This Problem</h2>
                            <p className="text-gray-700 mb-4">
                                A Windows file renamer gives you more control over how files are named. 
                                Instead of relying on basic system behavior, you define how names should look and apply changes in one step.
                            </p>
                            <div className="bg-green-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600">⚡</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">RenameTool solves this by:</h3>
                                </div>
                                <ul className="text-gray-700 space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Running directly in your browser on Windows</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Allowing folder-level access with permission</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Showing previews before applying changes</span>
                                    </li>
                                </ul>
                                <p className="text-gray-700 mt-4 font-medium">
                                    It improves control without adding complexity.
                                </p>
                            </div>
                        </div>

                        {/* How RenameTool Works on Windows */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">How RenameTool Works on Windows</h2>
                            <p className="text-gray-700 mb-4">
                                Using RenameTool on Windows is straightforward:
                            </p>
                            
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-white p-5 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">1</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Open Tool</h4>
                                        <p className="text-gray-600 text-sm">in supported browser</p>
                                    </div>
                                    
                                    <div className="bg-white p-5 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">2</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Select Files</h4>
                                        <p className="text-gray-600 text-sm">or a folder</p>
                                    </div>
                                    
                                    <div className="bg-white p-5 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">3</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Choose Rules</h4>
                                        <p className="text-gray-600 text-sm">how to rename them</p>
                                    </div>
                                    
                                    <div className="bg-white p-5 rounded-lg border border-blue-200 text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">4</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Preview & Apply</h4>
                                        <p className="text-gray-600 text-sm">apply changes</p>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                                    <p className="text-blue-800 text-center font-medium">
                                        No installation, no system modification, and no learning curve.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Command Line vs Windows File Renamer Tool */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Command Line vs Windows File Renamer Tool</h2>
                            <p className="text-gray-700 mb-4">
                                Command-line renaming on Windows is powerful but unforgiving. A small error can rename files incorrectly without warning.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-red-500">❌</span>
                                        <h3 className="text-lg font-bold text-gray-900">Command Line</h3>
                                    </div>
                                    <ul className="text-gray-700 space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            <span>Powerful but unforgiving</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            <span>No visual preview</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            <span>Small errors cause big problems</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-green-500">✅</span>
                                        <h3 className="text-lg font-bold text-gray-900">RenameTool</h3>
                                    </div>
                                    <ul className="text-gray-700 space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Visual previews</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Local file handling</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Browser-based convenience</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Safer, user-friendly control</span>
                                        </li>
                                    </ul>
                                    <p className="text-gray-700 mt-4 font-medium">
                                        This makes it suitable for both beginners and professionals.
                                    </p>
                                </div>
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
                                            <h4 className="font-semibold text-gray-900 mb-2">Is RenameTool safe to use on Windows?</h4>
                                            <p className="text-gray-600">
                                                Yes. All renaming happens locally on your Windows system. Files are never uploaded.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Does it require installation?</h4>
                                            <p className="text-gray-600">
                                                No. It runs directly in your browser.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Can it handle large folders?</h4>
                                            <p className="text-gray-600">
                                                Yes. RenameTool is designed for bulk file operations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white">
                        <h3 className="text-2xl md:text-2xl font-bold mb-4">Stop struggling with Windows' limited rename options.</h3>
                        <p className="text-base mb-6 opacity-90">
                            Use RenameTool as your Windows file renamer to rename and organize files faster, safer, and with full control.
                        </p>
                        <a 
                            href="#tool-section" 
                            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                        >
                            👉 Try Windows File Renamer – Free & Secure
                        </a>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default WindowFileRenamer;