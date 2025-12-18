import { useState } from 'react';

function BrowserModeSelector({ mode, setMode, capabilities }) {
    const [showInfo, setShowInfo] = useState(false);

    if (!capabilities) return null;

    const isWriteModeAvailable = capabilities.canUseWriteMode;

    return (
        <div className="relative">
            <div className="flex items-center space-x-4">
                {/* Mode Indicator */}
                <div className="flex items-center">
                    <div className={`flex items-center px-3 py-2 rounded-lg ${
                        mode === 'write' 
                            ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                        {mode === 'write' ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Write Mode
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download Mode
                            </>
                        )}
                    </div>
                </div>

                {/* Mode Switch (only if write mode is available) */}
                {isWriteModeAvailable && (
                    <button
                        onClick={() => setMode(mode === 'write' ? 'download' : 'write')}
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                        Switch to {mode === 'write' ? 'Download' : 'Write'} Mode
                    </button>
                )}

                {/* Browser Info Button */}
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="text-gray-500 hover:text-gray-700"
                    title="Browser Compatibility Info"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                </button>
            </div>

            {/* Browser Info Dropdown */}
            {showInfo && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Browser Compatibility</h3>
                        
                        <div className="space-y-3">
                            {/* Chrome/Edge */}
                            <div className="flex items-start">
                                <div className={`p-2 rounded ${
                                    capabilities.isChromium ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {capabilities.isChromium ? '✓' : '✗'}
                                </div>
                                <div className="ml-3">
                                    <div className="font-medium">Chrome/Edge/Brave</div>
                                    <div className="text-sm text-gray-600">
                                        {capabilities.canUseWriteMode 
                                            ? 'Full write access supported' 
                                            : 'Limited functionality'}
                                    </div>
                                </div>
                            </div>

                            {/* Firefox */}
                            <div className="flex items-start">
                                <div className="p-2 rounded bg-yellow-100 text-yellow-800">
                                    ⚠
                                </div>
                                <div className="ml-3">
                                    <div className="font-medium">Firefox</div>
                                    <div className="text-sm text-gray-600">
                                        Read-only access, download mode required
                                    </div>
                                </div>
                            </div>

                            {/* Safari */}
                            <div className="flex items-start">
                                <div className="p-2 rounded bg-red-100 text-red-800">
                                    ✗
                                </div>
                                <div className="ml-3">
                                    <div className="font-medium">Safari</div>
                                    <div className="text-sm text-gray-600">
                                        Download mode only
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                <strong>Write Mode:</strong> Direct file system access<br />
                                <strong>Download Mode:</strong> Process → Download → Replace
                            </p>
                        </div>

                        {!capabilities.canUseWriteMode && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    💡 For direct file editing, try Chrome/Edge/Brave
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BrowserModeSelector;