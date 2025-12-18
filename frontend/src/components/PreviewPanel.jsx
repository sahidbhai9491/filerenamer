import { useState } from 'react';
import { formatFileSize } from '../utils/browserDetector';

function PreviewPanel({ files, selectedFiles, previewData, activeTool }) {
    const [previewMode, setPreviewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedPreview, setSelectedPreview] = useState(null);

    // Filter selected files
    const selectedFileObjects = files.filter(file => selectedFiles.includes(file.id));
    
    // If we have preview data (after processing), use that
    const displayFiles = previewData || selectedFileObjects;

    if (displayFiles.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No files selected</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        Select files from the file manager to preview them here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {previewData ? 'Processed Preview' : 'File Preview'}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                            ({displayFiles.length} files)
                        </span>
                    </h2>
                    
                    <div className="flex items-center space-x-2">
                        {previewData && (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                Changes Applied
                            </span>
                        )}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setPreviewMode('grid')}
                                className={`p-2 ${previewMode === 'grid' ? 'bg-gray-100' : ''}`}
                                title="Grid view"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </button>
                            <button
                                onClick={() => setPreviewMode('list')}
                                className={`p-2 ${previewMode === 'list' ? 'bg-gray-100' : ''}`}
                                title="List view"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Active Tool Indicator */}
                {activeTool && (
                    <div className="mt-2 flex items-center">
                        <div className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                            Active: {activeTool.charAt(0).toUpperCase() + activeTool.slice(1)}
                        </div>
                        {previewData && (
                            <div className="ml-2 text-sm text-gray-600">
                                Preview shows how files will look after {activeTool}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-hidden">
                {previewMode === 'grid' ? (
                    /* Grid View */
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto max-h-[500px]">
                        {displayFiles.map((file, index) => (
                            <div
                                key={file.id || index}
                                className={`border rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
                                    selectedPreview === index 
                                        ? 'ring-2 ring-indigo-500 border-indigo-300' 
                                        : 'border-gray-200'
                                }`}
                                onClick={() => setSelectedPreview(index)}
                            >
                                {/* Image Preview */}
                                {file.previewUrl ? (
                                    <div className="h-32 bg-gray-100 overflow-hidden">
                                        <img 
                                            src={file.previewUrl} 
                                            alt={file.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-3xl text-gray-400 mb-2">
                                                {file.type?.startsWith('image/') ? '🖼️' : 
                                                 file.type?.includes('pdf') ? '📄' : 
                                                 file.type?.includes('video') ? '🎬' : 
                                                 file.type?.includes('audio') ? '🎵' : '📁'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {file.type?.split('/')[1]?.toUpperCase() || 'FILE'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* File Info */}
                                <div className="p-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                        
                                        {/* Status Indicator */}
                                        {file.status && (
                                            <div className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                                                file.status === 'processed' ? 'bg-green-100 text-green-800' :
                                                file.status === 'error' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {file.status}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Before/After Comparison (if available) */}
                                    {file.originalName && file.originalName !== file.name && (
                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                            <div className="text-xs text-gray-600">
                                                <div className="flex items-center">
                                                    <span className="text-red-500">Before:</span>
                                                    <span className="ml-1 truncate">{file.originalName}</span>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <span className="text-green-500">After:</span>
                                                    <span className="ml-1 truncate font-medium">{file.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="p-4 overflow-y-auto max-h-[500px]">
                        <div className="space-y-2">
                            {displayFiles.map((file, index) => (
                                <div
                                    key={file.id || index}
                                    className={`p-3 border rounded-lg ${
                                        selectedPreview === index 
                                            ? 'bg-indigo-50 border-indigo-300' 
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setSelectedPreview(index)}
                                >
                                    <div className="flex items-center">
                                        {/* File Icon */}
                                        <div className="mr-3">
                                            {file.previewUrl ? (
                                                <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                                                    <img 
                                                        src={file.previewUrl} 
                                                        alt={file.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {file.type?.split('/')[1]?.substr(0, 3).toUpperCase() || 'FILE'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* File Details */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {file.name}
                                                    </p>
                                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                                        <span>{formatFileSize(file.size)}</span>
                                                        <span className="mx-1">•</span>
                                                        <span>{file.type || 'Unknown type'}</span>
                                                        {file.path && (
                                                            <>
                                                                <span className="mx-1">•</span>
                                                                <span>{file.path}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {/* Status/Changes Indicator */}
                                                <div className="ml-4">
                                                    {file.originalName && file.originalName !== file.name ? (
                                                        <div className="text-xs">
                                                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                                                                Renamed
                                                            </span>
                                                        </div>
                                                    ) : file.status === 'processed' ? (
                                                        <div className="text-xs">
                                                            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                                                Processed
                                                            </span>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            
                                            {/* Before/After Comparison */}
                                            {file.originalName && file.originalName !== file.name && (
                                                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                                    <div className="bg-red-50 p-2 rounded">
                                                        <div className="font-medium text-red-700">Before</div>
                                                        <div className="truncate text-red-600">{file.originalName}</div>
                                                    </div>
                                                    <div className="bg-green-50 p-2 rounded">
                                                        <div className="font-medium text-green-700">After</div>
                                                        <div className="truncate text-green-600 font-medium">{file.name}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                        <div className="text-gray-600">Total Size</div>
                        <div className="font-semibold text-gray-900">
                            {formatFileSize(displayFiles.reduce((sum, file) => sum + file.size, 0))}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-600">Files</div>
                        <div className="font-semibold text-gray-900">{displayFiles.length}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-600">Selected</div>
                        <div className="font-semibold text-gray-900">{selectedFiles.length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewPanel;