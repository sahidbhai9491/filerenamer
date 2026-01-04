import { useState, useEffect, useRef, useCallback } from 'react';

function ManualRenameTool({ files, selectedFiles, settings, setSettings }) {
    const [renamedFiles, setRenamedFiles] = useState({});
    const [focusIndex, setFocusIndex] = useState(0);

    // Initialize renamed files - useCallback to prevent recreation
    useEffect(() => {
        const initialRenames = {};
        const selectedFileObjects = files.filter((_, index) => selectedFiles.includes(index));

        selectedFileObjects.forEach((file) => {
            initialRenames[file.id] = file.name;
        });

        setRenamedFiles(initialRenames);
        setSettings(prev => ({ ...prev, manualRenames: initialRenames }));
    }, [selectedFiles, files, setSettings]);

    // Memoize the rename handler
    const handleRenameChange = useCallback((fileId, newName) => {
        setRenamedFiles(prev => ({
            ...prev,
            [fileId]: newName
        }));
        setSettings(prev => ({ ...prev, manualRenames: { ...prev.manualRenames, [fileId]: newName } }));
    }, [setSettings]);

    // Get selected files data
    const selectedFileObjects = files.filter((_, index) => selectedFiles.includes(index));

    // Focus first input on mount
    useEffect(() => {
        if (selectedFileObjects.length > 0) {
            setTimeout(() => {
                const firstFile = selectedFileObjects[0];
                const inputId = `rename-${firstFile.id}`;
                const input = document.getElementById(inputId);
                if (input) {
                    input.focus();
                    input.select();
                }
            }, 100);
        }
    }, [selectedFileObjects]);

    const handleKeyDown = (e, index, fileId) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextIndex = Math.min(index + 1, selectedFileObjects.length - 1);
            if (nextIndex !== index) {
                setFocusIndex(nextIndex);
                setTimeout(() => {
                    const nextFile = selectedFileObjects[nextIndex];
                    const nextInput = document.getElementById(`rename-${nextFile.id}`);
                    if (nextInput) {
                        nextInput.focus();
                        nextInput.select();
                    }
                }, 0);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = Math.max(0, index - 1);
            if (prevIndex !== index) {
                setFocusIndex(prevIndex);
                setTimeout(() => {
                    const prevFile = selectedFileObjects[prevIndex];
                    const prevInput = document.getElementById(`rename-${prevFile.id}`);
                    if (prevInput) {
                        prevInput.focus();
                        prevInput.select();
                    }
                }, 0);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = Math.min(index + 1, selectedFileObjects.length - 1);
            if (nextIndex !== index) {
                setFocusIndex(nextIndex);
                setTimeout(() => {
                    const nextFile = selectedFileObjects[nextIndex];
                    const nextInput = document.getElementById(`rename-${nextFile.id}`);
                    if (nextInput) {
                        nextInput.focus();
                        nextInput.select();
                    }
                }, 0);
            }
        }
    };

    const handleInputClick = (index) => {
        setFocusIndex(index);
    };

    const handleInputFocus = (index) => {
        setFocusIndex(index);
    };

    return (
        <div className="space-y-6">
            {/* File List for Manual Renaming */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No.
                        </div>
                        <div className="col-span-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Original Name
                        </div>
                        <div className="col-span-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            New Name
                        </div>
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {selectedFileObjects.map((file, index) => {
                        const extension = file.name.split('.').pop();
                        const currentName = renamedFiles[file.id] || file.name;
                        const nameWithoutExt = currentName.endsWith(`.${extension}`)
                            ? currentName.slice(0, -(extension.length + 1))
                            : currentName;

                        return (
                            <div
                                key={file.id}
                                className={`px-4 py-3 border-b border-gray-100 transition-colors ${focusIndex === index ? 'bg-indigo-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                onClick={() => setFocusIndex(index)} // Add this
                            >
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-1">
                                        <div className="text-sm font-medium text-gray-500">
                                            {index + 1}
                                        </div>
                                    </div>

                                    <div className="col-span-5">
                                        <div className="flex items-center">
                                            {file.previewUrl ? (
                                                <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 mr-3 shrink-0">
                                                    <img
                                                        src={file.previewUrl}
                                                        alt={file.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded bg-gray-100 mr-3 shrink-0 flex items-center justify-center">
                                                    <span className="text-xs font-medium text-gray-500">
                                                        {file.type?.split('/')[1]?.substr(0, 3).toUpperCase() || 'FILE'}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-gray-900 truncate">
                                                    {file.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    .{extension}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="flex items-center">
                                            <div className="relative flex-1">
                                                <input
                                                    key={`rename-input-${file.id}-${renamedFiles[file.id]}`}
                                                    type="text"
                                                    value={nameWithoutExt}
                                                    autoFocus={focusIndex === index}
                                                    onChange={(e) => {
                                                        const newName = `${e.target.value}.${extension}`;
                                                        handleRenameChange(file.id, newName);
                                                    }}
                                                    onFocus={() => setFocusIndex(index)} // Add this
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            const nextIndex = Math.min(index + 1, selectedFileObjects.length - 1);
                                                            setFocusIndex(nextIndex);
                                                            // Focus will be handled by onFocus handler
                                                        } else if (e.key === 'ArrowDown') {
                                                            e.preventDefault();
                                                            const nextIndex = Math.min(index + 1, selectedFileObjects.length - 1);
                                                            setFocusIndex(nextIndex);
                                                        } else if (e.key === 'ArrowUp') {
                                                            e.preventDefault();
                                                            const prevIndex = Math.max(0, index - 1);
                                                            setFocusIndex(prevIndex);
                                                        }
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                    placeholder="Enter new name"
                                                />
                                            </div>
                                            <div className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 text-sm text-gray-500">
                                                .{extension}
                                            </div>
                                        </div>

                                        {/* Quick actions */}
                                        <div className="flex space-x-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleRenameChange(file.id, file.name);
                                                    const input = document.getElementById(`rename-${file.id}`);
                                                    if (input) {
                                                        input.focus();
                                                        input.select();
                                                    }
                                                }}
                                                className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Change Summary */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-green-800">Change Summary</h4>
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        {Object.keys(renamedFiles).filter(id => renamedFiles[id] !== files.find(f => f.id === id)?.name).length} files changed
                    </span>
                </div>

                <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedFileObjects.slice(0, 10).map((file) => {
                        const newName = renamedFiles[file.id];
                        const hasChanged = newName && newName !== file.name;

                        if (!hasChanged) return null;

                        return (
                            <div key={file.id} className="flex justify-between items-center text-sm">
                                <div className="text-gray-600 truncate flex-1 mr-2">{file.name}</div>
                                <svg className="w-4 h-4 text-gray-400 mx-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                                <div className="text-green-700 font-medium truncate flex-1 ml-2">
                                    {newName}
                                </div>
                            </div>
                        );
                    })}

                    {selectedFileObjects.length > 10 && (
                        <div className="text-xs text-green-600 text-center pt-1 border-t border-green-200">
                            ... and {selectedFileObjects.length - 10} more files
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManualRenameTool;