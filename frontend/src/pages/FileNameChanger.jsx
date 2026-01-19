import Container from "../components/Container";
import FileNameChangerHero from "../components/FileNameChangerHero";
import Testimonials from "../components/Testimonials";
import { useState, useEffect, useRef } from 'react';
import FileManager from '../components/FileManager';
import ProcessingTools from '../components/ProcessingTools';
import PreviewPanel from '../components/PreviewPanel';
import FileProcessor from '../utils/fileProcessor';
import { detectBrowserCapabilities, getRecommendedMode } from '../utils/browserDetector';
import { Coffee } from "lucide-react";

function FileNameChanger() {
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

    // Add this function in FileNameChanger.jsx, inside the FileNameChanger component
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
            <FileNameChangerHero />

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
                            Instantly change file names with a smart file name changer that works directly in your browser.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        {/* What Is the Real Problem Users Face */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is the Real Problem Users Face When They Need a File Name Changer?</h2>
                            <p className="text-gray-700 mb-4">
                                Changing a file name sounds simple, but the frustrations begin when you must do it for many files or when the naming patterns matter.
                            </p>
                            <div className="bg-gray-50 p-5 rounded-xl">
                                <p className="font-semibold text-gray-800 mb-3">For many users:</p>
                                <ul className="text-gray-700 space-y-2 list-disc pl-5">
                                    <li>File names are inconsistent or confusing</li>
                                    <li>Files from different sources end up messy</li>
                                    <li>Manual renaming is repetitive and slow</li>
                                    <li>Default rename options don't support patterns or rules</li>
                                </ul>
                            </div>
                            <p className="text-gray-700 mt-4">
                                People searching for "file name changer" aren't just looking for a tool — they're trying to fix confusion, save time, and bring order to chaos.
                            </p>
                        </div>

                        {/* Why Renaming One File Manually Is Not Enough */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Renaming One File Manually Is Not Enough</h2>
                            <p className="text-gray-700 mb-4">
                                Renaming a single file in your operating system is usually easy — just right-click and edit the name. The real struggle begins when:
                            </p>
                            <div className="bg-red-50 p-5 rounded-xl mb-4">
                                <ul className="text-gray-700 space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>You have multiple files</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>You need a structured naming format</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>You want consistent pattern changes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>You want a safe way to preview results</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-gray-700 font-medium">
                                    Manual rename (especially for large sets) costs time and invites mistakes.
                                </p>
                            </div>
                        </div>

                        {/* How a File Name Changer Solves This Problem */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How a File Name Changer Solves This Problem</h2>
                            <p className="text-gray-700 mb-4">
                                A file name changer helps you rename files faster, more accurately, and with less effort.
                            </p>
                            <div className="bg-green-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600">⚡</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Instead of manually editing every file name:</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 text-sm">1</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Choose files</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">how many to rename</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 text-sm">2</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Apply rules</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">clear patterns and rules</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 text-sm">3</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Preview changes</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">before applying</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 text-sm">4</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Rename securely</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">privately and safely</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mt-6 text-center font-medium">
                                    RenameTool works as a powerful file name changer that makes renaming predictable and stress-free.
                                </p>
                            </div>
                        </div>

                        {/* How RenameTool Works as a File Name Changer */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">How RenameTool Works as a File Name Changer</h2>
                            <p className="text-gray-700 mb-4">
                                Using RenameTool is straightforward:
                            </p>
                            
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white p-5 rounded-lg border border-blue-200">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">1-3</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Open & Select</h4>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            <li>Open in browser</li>
                                            <li>Select files/folder</li>
                                            <li>Choose rename method</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-white p-5 rounded-lg border border-blue-200">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">4-7</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Change Options</h4>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            <li>Add prefix/suffix</li>
                                            <li>Change case</li>
                                            <li>Add sequence numbers</li>
                                            <li>Replace text patterns</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-white p-5 rounded-lg border border-blue-200">
                                        <div className="text-2xl font-bold text-blue-600 mb-3">8-9</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Review & Apply</h4>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            <li>Preview changes</li>
                                            <li>Apply instantly</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                                    <p className="text-blue-800 text-center font-medium">
                                        Everything happens locally — no uploads, no external servers, and complete privacy
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
                                            <h4 className="font-semibold text-gray-900 mb-2">What is a file name changer?</h4>
                                            <p className="text-gray-600">
                                                A file name changer is a tool that lets you rename files using rules, patterns, 
                                                and batch actions — faster and more reliably than manual methods.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-gray-700 font-medium">❓</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Is RenameTool safe to use?</h4>
                                            <p className="text-gray-600">
                                                Yes. All file name changes happen locally in your browser. Nothing is uploaded to servers.
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
                                                No. RenameTool has an intuitive interface and preview before you apply changes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Stop wasting time manually updating file names.</h3>
                        <p className="text-base mb-6 opacity-90">
                            Use RenameTool's file name changer to rename files quickly, safely, and with full control.
                        </p>
                        <a 
                            href="#tool-section" 
                            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                        >
                            👉 Try File Name Changer – Free & Secure
                        </a>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default FileNameChanger;