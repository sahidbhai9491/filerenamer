import { useState, useRef, useEffect } from 'react';
import { formatFileSize } from '../utils/browserDetector';

function FileManager({
    files,
    selectedFiles,
    setSelectedFiles,
    onFilesSelected,
    mode,
    // folderHandle,
    // setFolderHandle
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [folderHandle, setFolderHandle] = useState(null);
    const [folderPath, setFolderPath] = useState('');
    const fileInputRef = useRef(null);

    // Handle drag and drop
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        processAndAddFiles(droppedFiles);
    };

    // Handle file input change
    const handleFileInputChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        processAndAddFiles(selectedFiles);
    };

    // Process and add files to state
    const processAndAddFiles = async (fileList) => {
        const processedFiles = await Promise.all(
            fileList.map(async (file) => ({
                id: Math.random().toString(36).substr(2, 9),
                file: file,
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                path: folderPath || '',
                status: 'ready'
            }))
        );

        // onFilesSelected([...files, ...processedFiles]);
        onFilesSelected(processedFiles, folderHandle);
    };

    // Folder selection using File System Access API
    const handleSelectFolder = async () => {
        try {
            if (mode === 'write' && 'showDirectoryPicker' in window) {
                const handle = await window.showDirectoryPicker({
                    mode: 'readwrite'
                });

                setFolderHandle(handle);
                setFolderPath(handle.name);

                // Read files from the directory
                const files = await readDirectory(handle);
                onFilesSelected(files, handle); // Pass handle to parent
            } else {
                // Fallback: open file input in multiple mode
                fileInputRef.current?.click();
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error selecting folder:', error);
                fileInputRef.current?.click();
            }
        }
    };

    // Read directory recursively
    const readDirectory = async (dirHandle) => {
        const files = [];

        for await (const entry of dirHandle.values()) {
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
                        path: dirHandle.name,
                        handle: entry, // Store the file handle for write mode
                        status: 'ready'
                    });
                } catch (error) {
                    console.warn(`Could not read file ${entry.name}:`, error);
                }
            } else if (entry.kind === 'directory') {
                // Optionally: read subdirectories recursively
                // const subFiles = await readDirectory(entry);
                // files.push(...subFiles);
            }
        }

        return files;
    };

    // Handle file selection
    const toggleFileSelection = (fileId) => {
        if (selectedFiles.includes(fileId)) {
            setSelectedFiles(selectedFiles.filter(id => id !== fileId));
        } else {
            setSelectedFiles([...selectedFiles, fileId]);
        }
    };

    const selectAllFiles = () => {
        if (selectedFiles.length === files.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(files.map(file => file.id));
        }
    };

    const removeFile = (fileId) => {
        const updatedFiles = files.filter(file => file.id !== fileId);
        onFilesSelected(updatedFiles);
        setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    };

    const clearAllFiles = () => {
        onFilesSelected([]);
        setSelectedFiles([]);
        setFolderHandle(null);
        setFolderPath('');
    };

    // Clean up object URLs
    useEffect(() => {
        return () => {
            files.forEach(file => {
                if (file.previewUrl) {
                    URL.revokeObjectURL(file.previewUrl);
                }
            });
        };
    }, [files]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">File Manager</h2>
                    <div className="flex items-center space-x-2">
                        {files.length > 0 && (
                            <>
                                <button
                                    onClick={selectAllFiles}
                                    className="text-sm text-indigo-600 hover:text-indigo-700"
                                >
                                    {selectedFiles.length === files.length ? 'Deselect All' : 'Select All'}
                                </button>
                                <span className="text-gray-300">|</span>
                                <button
                                    onClick={clearAllFiles}
                                    className="text-sm text-red-600 hover:text-red-700"
                                >
                                    Clear All
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mode-specific info */}
                <div className="mt-2 flex items-center">
                    <div className={`px-2 py-1 text-xs rounded-full ${mode === 'write'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                        {mode === 'write' ? '📁 Direct Access' : '📥 Download Mode'}
                    </div>
                    {folderPath && (
                        <span className="ml-2 text-sm text-gray-600 truncate" title={folderPath}>
                            Folder: {folderPath}
                        </span>
                    )}
                </div>
            </div>

            {/* File Upload Zone */}
            {files.length === 0 ? (
                <div
                    className={`p-8 border-2 border-dashed rounded-lg m-4 text-center transition-colors ${isDragging
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-300 hover:border-indigo-400'
                        }`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="max-w-sm mx-auto">
                        <div className="mx-auto h-12 w-12 text-gray-400">
                            {mode === 'write' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                                    <path d="M2 10h20"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                            )}
                        </div>

                        <p className="mt-4 text-sm text-gray-900">
                            {mode === 'write'
                                ? 'Select a folder to edit files directly'
                                : 'Drag & drop files or select individually'}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            {mode === 'write'
                                ? 'Supported: Chrome/Edge/Brave'
                                : 'All file types supported'}
                        </p>

                        <div className="mt-6">
                            <button
                                onClick={handleSelectFolder}
                                className="inline-flex items-center px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                            >
                                {mode === 'write' ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                                            <path d="M2 10h20"></path>
                                        </svg>
                                        Select Folder
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        Select Files
                                    </>
                                )}
                            </button>

                            <p className="mt-3 text-xs text-gray-500">
                                {mode === 'write'
                                    ? 'Grant folder permission once to edit directly'
                                    : 'Or drag files anywhere on this page'}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                /* File List */
                <div className="p-4 max-h-96 overflow-y-auto">
                    {/* Selection Summary */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-gray-900">
                                    {selectedFiles.length} of {files.length} files selected
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                    • {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
                                </span>
                            </div>
                            <button
                                onClick={handleSelectFolder}
                                className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                    <path d="M12 5v14"></path>
                                    <path d="M5 12h14"></path>
                                </svg>
                                Add More
                            </button>
                        </div>
                    </div>

                    {/* File List */}
                    <div className="space-y-2">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className={`flex items-center p-3 rounded-lg border transition-colors ${selectedFiles.includes(file.id)
                                        ? 'border-indigo-300 bg-indigo-50'
                                        : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={selectedFiles.includes(file.id)}
                                    onChange={() => toggleFileSelection(file.id)}
                                    className="h-4 w-4 text-indigo-600 rounded"
                                />

                                {/* File Icon/Preview */}
                                <div className="ml-3 mr-3">
                                    {file.previewUrl ? (
                                        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                                            <img
                                                src={file.previewUrl}
                                                alt={file.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                                            <span className="text-xs font-medium text-gray-500">
                                                {file.type.split('/')[1]?.substr(0, 3).toUpperCase() || 'FILE'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* File Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                                        {file.name}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span>{formatFileSize(file.size)}</span>
                                        <span className="mx-1">•</span>
                                        <span>{file.type || 'Unknown'}</span>
                                        {file.path && (
                                            <>
                                                <span className="mx-1">•</span>
                                                <span className="truncate" title={file.path}>
                                                    {file.path}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <button
                                    onClick={() => removeFile(file.id)}
                                    className="ml-2 text-gray-400 hover:text-red-500"
                                    title="Remove file"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                multiple
                className="hidden"
                accept="*/*"
            />
        </div>
    );
}

export default FileManager;