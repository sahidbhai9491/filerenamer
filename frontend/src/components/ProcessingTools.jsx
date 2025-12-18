import { useState } from 'react';
import RenameTool from './tools/RenameTool';
import ConvertTool from './tools/ConvertTool';
import CompressTool from './tools/CompressTool';
import OrganizeTool from './tools/OrganizeTool';
import ResizeTool from './tools/ResizeTool';

function ProcessingTools({
    activeTool,
    setActiveTool,
    files,
    selectedFiles,
    mode,
    onProcessStart,
    onProcessComplete,
    processing
}) {
    const [toolSettings, setToolSettings] = useState({});

    const tools = [
        { id: 'rename', name: 'Rename', icon: '📝', color: 'text-blue-600 bg-blue-100' },
        { id: 'convert', name: 'Convert', icon: '🔄', color: 'text-purple-600 bg-purple-100' },
        { id: 'compress', name: 'Compress', icon: '🗜️', color: 'text-green-600 bg-green-100' },
        { id: 'organize', name: 'Organize', icon: '📂', color: 'text-yellow-600 bg-yellow-100' },
        { id: 'resize', name: 'Resize', icon: '📐', color: 'text-red-600 bg-red-100' },
    ];

    const handleProcess = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select files to process');
            return;
        }

        // Simply call onProcessStart with the active tool and settings
        // Let the Dashboard handle the actual processing
        try {
            await onProcessStart(activeTool, toolSettings);
        } catch (error) {
            console.error('Processing error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const renderToolContent = () => {
        switch (activeTool) {
            case 'rename':
                return <RenameTool settings={toolSettings} setSettings={setToolSettings} />;
            case 'convert':
                return <ConvertTool settings={toolSettings} setSettings={setToolSettings} />;
            case 'compress':
                return <CompressTool settings={toolSettings} setSettings={setToolSettings} />;
            case 'organize':
                return <OrganizeTool settings={toolSettings} setSettings={setToolSettings} />;
            case 'resize':
                return <ResizeTool settings={toolSettings} setSettings={setToolSettings} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {/* Tool Selection Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`flex-1 min-w-0 py-4 px-2 flex flex-col items-center transition-colors ${activeTool === tool.id
                                    ? 'text-gray-900 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <span className="text-xl mb-1">{tool.icon}</span>
                            <span className="text-sm font-medium">{tool.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tool Content */}
            <div className="p-6">
                {selectedFiles.length > 0 ? (
                    <>
                        {/* Tool Settings */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Configure {tools.find(t => t.id === activeTool)?.name} Settings
                            </h3>
                            {renderToolContent()}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">{selectedFiles.length}</span> files selected
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {mode === 'write'
                                        ? 'Changes will be applied directly to your files'
                                        : 'Files will be downloaded after processing'}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setToolSettings({})}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Reset Settings
                                </button>
                                <button
                                    onClick={handleProcess}
                                    disabled={processing}
                                    className="px-6 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            {mode === 'write' ? 'Apply Changes' : 'Process & Download'}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 inline">
                                                {mode === 'write' ? (
                                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                                ) : (
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                )}
                                                <polyline points="17 8 12 3 7 8"></polyline>
                                                <line x1="12" y1="3" x2="12" y2="15"></line>
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    /* No Files Selected State */
                    <div className="text-center py-12">
                        <div className="mx-auto h-16 w-16 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No files selected</h3>
                        <p className="mt-2 text-gray-600">
                            Select files from the file manager to start processing
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            You can select individual files or choose a whole folder
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProcessingTools;