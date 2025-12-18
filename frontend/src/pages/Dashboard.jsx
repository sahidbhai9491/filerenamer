import { useState, useEffect, useRef } from 'react';
import FileManager from '../components/FileManager';
import ProcessingTools from '../components/ProcessingTools';
import PreviewPanel from '../components/PreviewPanel';
import BrowserModeSelector from '../components/BrowserModeSelector';
import FileProcessor from '../utils/fileProcessor';
import { detectBrowserCapabilities, getRecommendedMode, formatFileSize } from '../utils/browserDetector';

function Dashboard() {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [mode, setMode] = useState('download');
    const [processing, setProcessing] = useState(false);
    const [activeTool, setActiveTool] = useState('rename');
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
        setFiles(selectedFiles);
        setSelectedFiles(selectedFiles.map((_, index) => index));
        if (handle) {
            setFolderHandle(handle);
            if (fileProcessor.current) {
                fileProcessor.current.setFolderHandle(handle);
            }
        }
    };

    const handleProcessComplete = (results) => {
        setProcessing(false);
        setProcessingResults(results);

        if (results && results.success && results.results) {
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
            // Get selected files
            const selectedFileObjects = files.filter((_, index) => selectedFiles.includes(index));

            console.log('Processing with:', { tool, settings, files: selectedFileObjects });

            // Process files
            const results = await fileProcessor.current.processFiles(
                selectedFileObjects,
                tool,
                settings
            );

            console.log('Processing completed:', results);

            handleProcessComplete(results);
        } catch (error) {
            console.error('Processing error:', error);
            setProcessing(false);

            // Create error result object
            handleProcessComplete({
                success: false,
                error: error.message,
                results: []
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600"></div>
                            <h1 className="ml-3 text-xl font-bold text-gray-900">
                                FileFlow Pro
                            </h1>
                            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                                All-in-One File Processor
                            </span>
                        </div>

                        <BrowserModeSelector
                            mode={mode}
                            setMode={setMode}
                            capabilities={browserCapabilities}
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
                        <div className="text-2xl font-bold text-purple-600">
                            {mode === 'write' ? 'Write Mode' : 'Download Mode'}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="text-sm text-gray-500">Tool</div>
                        <div className="text-2xl font-bold text-gray-900 capitalize">{activeTool}</div>
                    </div>
                </div>

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
            </main>

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
        </div>
    );
}

export default Dashboard;