import Container from "../components/Container";
import BulkRenameUtilityHero from "../components/BulkRenameUtilityHero";
import Testimonials from "../components/Testimonials";
import { useState, useEffect, useRef } from 'react';
import FileManager from '../components/FileManager';
import ProcessingTools from '../components/ProcessingTools';
import PreviewPanel from '../components/PreviewPanel';
import FileProcessor from '../utils/fileProcessor';
import { detectBrowserCapabilities, getRecommendedMode } from '../utils/browserDetector';
import { Coffee } from "lucide-react";

function BulkRenameUtility() {
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

    // Add this function in BulkRenameUtility.jsx, inside the BulkRenameUtility component
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
            <BulkRenameUtilityHero />

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
                            A powerful bulk rename utility that lets you rename many files at once with privacy and control.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        {/* What Problem Does a Bulk Rename Utility Solve? */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Problem Does a Bulk Rename Utility Solve?</h2>
                            <p className="text-gray-700 mb-4">
                                When people talk about a "bulk rename utility," they are usually facing the same real frustration.
                            </p>
                            <div className="bg-red-50 p-5 rounded-xl">
                                <ul className="text-gray-700 space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Hundreds or thousands of file names are inconsistent</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Manually renaming files is slow and repetitive</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Built-in tools are too basic or limited</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Command-line tools are risky and confusing</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-gray-700 mt-4">
                                Most operating systems let you rename one or a few files easily — but once the volume grows, 
                                the task becomes painful, error-prone, and time-consuming.
                            </p>
                            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                                <p className="text-gray-700 font-medium">
                                    A proper bulk rename utility exists to eliminate this pain entirely.
                                </p>
                            </div>
                        </div>

                        {/* Why Manual Renaming Fails for Large File Sets */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Manual Renaming Fails for Large File Sets</h2>
                            <p className="text-gray-700 mb-4">
                                Renaming files one by one might work for a handful of files — but it breaks down fast when:
                            </p>
                            <div className="bg-yellow-50 p-5 rounded-xl mb-4">
                                <ul className="text-gray-700 space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-yellow-600 mr-2">•</span>
                                        <span>You have large photo folders</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-600 mr-2">•</span>
                                        <span>You are organizing project assets</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-600 mr-2">•</span>
                                        <span>You get mixed files from multiple sources</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                                <p className="font-semibold text-gray-800 mb-3">Manual methods:</p>
                                <ul className="text-gray-700 space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Waste time</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Invite mistakes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Cause inconsistent naming patterns</span>
                                    </li>
                                </ul>
                                <p className="text-gray-700 mt-4 font-medium">
                                    This is why people look for a true bulk rename utility that can handle large file sets with precision.
                                </p>
                            </div>
                        </div>

                        {/* How a Bulk Rename Utility Fixes the Problem */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How a Bulk Rename Utility Fixes the Problem</h2>
                            <p className="text-gray-700 mb-4">
                                A good bulk rename utility lets you:
                            </p>
                            <div className="bg-green-50 p-6 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-5 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-green-600">✓</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Apply consistent rules</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">to many files</p>
                                    </div>
                                    
                                    <div className="bg-white p-5 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-green-600">✓</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Preview changes</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">before renaming</p>
                                    </div>
                                    
                                    <div className="bg-white p-5 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-green-600">✓</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Avoid mistakes</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">with clear visual feedback</p>
                                    </div>
                                    
                                    <div className="bg-white p-5 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-green-600">✓</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Organize instantly</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">in structured format</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mt-6 text-center font-medium">
                                    Instead of changing one file at a time manually, you define the pattern once and apply it to all selected files.
                                </p>
                            </div>
                        </div>

                        {/* Why RenameTool Is a Practical Bulk Rename Utility */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why RenameTool Is a Practical Bulk Rename Utility</h2>
                            <p className="text-gray-700 mb-4">
                                RenameTool is designed for real users, not just power users:
                            </p>
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="text-blue-600">🌐</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Browser-based</h4>
                                        <p className="text-gray-600 text-sm">Works on Windows, Mac, Linux</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="text-blue-600">🚫</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">No installation</h4>
                                        <p className="text-gray-600 text-sm">Just open and rename</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="text-blue-600">🔒</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Full privacy</h4>
                                        <p className="text-gray-600 text-sm">Files stay on your device</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="text-blue-600">👁️</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Live preview</h4>
                                        <p className="text-gray-600 text-sm">See results before applying</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mt-6 text-center font-medium">
                                    It solves the real frustrations people have with file renaming — without introducing new complexity.
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
                                            <h4 className="font-semibold text-gray-900 mb-2">Is RenameTool safe for bulk file renaming?</h4>
                                            <p className="text-gray-600">
                                                Yes. All renaming is done locally in your browser. Files never leave your device.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Do I need to install anything?</h4>
                                            <p className="text-gray-600">
                                                No. RenameTool works directly in your browser.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Can it handle large numbers of files?</h4>
                                            <p className="text-gray-600">
                                                Yes. It's designed for bulk renaming, whether it's ten or thousands of files.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Stop wasting time renaming files one by one.</h3>
                        <p className="text-base mb-6 opacity-90">
                            Use RenameTool as your bulk rename utility — safe, fast, and simple.
                        </p>
                        <a 
                            href="#tool-section" 
                            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                        >
                            👉 Try Bulk Rename Utility – Free & Secure
                        </a>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default BulkRenameUtility;