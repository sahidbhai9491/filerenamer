function OrganizeTool({ settings, setSettings }) {
    const organizationModes = [
        { id: 'type', name: 'By File Type', icon: '📁', description: 'Group by extension (Images, Documents, etc.)' },
        { id: 'date', name: 'By Date', icon: '📅', description: 'Organize by creation/modification date' },
        { id: 'size', name: 'By Size', icon: '⚖️', description: 'Group by file size ranges' },
        { id: 'name', name: 'By Name', icon: '🔤', description: 'Alphabetical organization' },
    ];

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Organization Method</h3>
                <div className="grid grid-cols-2 gap-3">
                    {organizationModes.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setSettings({ ...settings, mode: mode.id })}
                            className={`p-4 border rounded-lg text-left transition-all ${
                                settings.mode === mode.id
                                    ? 'border-indigo-600 bg-indigo-50'
                                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center mb-2">
                                <span className="text-xl mr-2">{mode.icon}</span>
                                <span className="font-medium text-gray-900">{mode.name}</span>
                            </div>
                            <p className="text-xs text-gray-600">{mode.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            {settings.mode && (
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                        {organizationModes.find(m => m.id === settings.mode)?.name} Settings
                    </h4>
                    
                    {settings.mode === 'type' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Folder Structure
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="typeStructure"
                                            value="simple"
                                            checked={settings.typeStructure === 'simple' || !settings.typeStructure}
                                            onChange={(e) => handleSettingChange('typeStructure', e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Simple (Images, Documents, etc.)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="typeStructure"
                                            value="detailed"
                                            checked={settings.typeStructure === 'detailed'}
                                            onChange={(e) => handleSettingChange('typeStructure', e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Detailed (JPG, PNG, PDF, etc.)</span>
                                    </label>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    {settings.typeStructure === 'detailed' 
                                        ? 'Files will be grouped by specific file extensions'
                                        : 'Files will be grouped into general categories'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.createSubfolders || false}
                                        onChange={(e) => handleSettingChange('createSubfolders', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Create subfolders for specific formats</span>
                                </label>
                                <p className="mt-1 text-xs text-gray-500">
                                    E.g., Images/JPEG, Images/PNG, Documents/PDF
                                </p>
                            </div>
                        </div>
                    )}

                    {settings.mode === 'date' && (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Date Type</label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="dateType"
                                            checked={settings.dateType === 'created'}
                                            onChange={() => handleSettingChange('dateType', 'created')}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Creation Date</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="dateType"
                                            checked={settings.dateType === 'modified'}
                                            onChange={() => handleSettingChange('dateType', 'modified')}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Modified Date</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Group by</label>
                                <select
                                    value={settings.dateGroup || 'month'}
                                    onChange={(e) => handleSettingChange('dateGroup', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="year">Year (e.g., 2024)</option>
                                    <option value="month">Year-Month (e.g., 2024-03)</option>
                                    <option value="day">Year-Month-Day (e.g., 2024-03-15)</option>
                                    <option value="week">Year-Week (e.g., 2024-W12)</option>
                                </select>
                                <p className="mt-1 text-xs text-gray-500">
                                    How to group files by date
                                </p>
                            </div>
                            
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.includeTime || false}
                                        onChange={(e) => handleSettingChange('includeTime', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Include time in folder names</span>
                                </label>
                                <p className="mt-1 text-xs text-gray-500">
                                    E.g., 2024-03-15_14-30 for files created at 2:30 PM
                                </p>
                            </div>
                        </div>
                    )}

                    {settings.mode === 'size' && (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Size Ranges (KB)</label>
                                <input
                                    type="text"
                                    value={settings.sizeRanges || '0-100,101-1000,1001-5000,5001+'}
                                    onChange={(e) => handleSettingChange('sizeRanges', e.target.value)}
                                    placeholder="0-100,101-1000,1001+"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Comma-separated ranges. Use "+" for unlimited upper bound (e.g., "5000+")
                                </p>
                            </div>
                            
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.useHumanReadable || false}
                                        onChange={(e) => handleSettingChange('useHumanReadable', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Use human-readable folder names</span>
                                </label>
                                <p className="mt-1 text-xs text-gray-500">
                                    E.g., "Small (0-100KB)" instead of "Size_0-100"
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Unit</label>
                                <select
                                    value={settings.sizeUnit || 'kb'}
                                    onChange={(e) => handleSettingChange('sizeUnit', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="bytes">Bytes</option>
                                    <option value="kb">Kilobytes (KB)</option>
                                    <option value="mb">Megabytes (MB)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {settings.mode === 'name' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Grouping Method
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="nameMethod"
                                            value="alphabet"
                                            checked={settings.nameMethod === 'alphabet' || !settings.nameMethod}
                                            onChange={(e) => handleSettingChange('nameMethod', e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">By First Letter (A, B, C...)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="nameMethod"
                                            value="category"
                                            checked={settings.nameMethod === 'category'}
                                            onChange={(e) => handleSettingChange('nameMethod', e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">By Category (Letters, Numbers, Symbols)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="nameMethod"
                                            value="custom"
                                            checked={settings.nameMethod === 'custom'}
                                            onChange={(e) => handleSettingChange('nameMethod', e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Custom Ranges</span>
                                    </label>
                                </div>
                            </div>
                            
                            {settings.nameMethod === 'custom' && (
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Custom Letter Ranges</label>
                                    <input
                                        type="text"
                                        value={settings.nameRanges || 'A-F,G-M,N-S,T-Z'}
                                        onChange={(e) => handleSettingChange('nameRanges', e.target.value)}
                                        placeholder="A-F,G-M,N-S,T-Z"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Comma-separated letter ranges
                                    </p>
                                </div>
                            )}
                            
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.caseSensitive || false}
                                        onChange={(e) => handleSettingChange('caseSensitive', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Case-sensitive grouping</span>
                                </label>
                                <p className="mt-1 text-xs text-gray-500">
                                    Separate folders for uppercase and lowercase letters
                                </p>
                            </div>
                            
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.includeNumbers || true}
                                        onChange={(e) => handleSettingChange('includeNumbers', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Include numbers folder</span>
                                </label>
                            </div>
                        </div>
                    )}
                    
                    {/* Preview Section for all modes */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Example Organization</h5>
                        <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
                            {(() => {
                                const examples = {
                                    'type': '📁 Images/<br>📁 Documents/<br>📁 Videos/<br>📁 Other/',
                                    'date': '📁 2024-03/<br>📁 2024-02/<br>📁 2024-01/',
                                    'size': '📁 Small (0-100KB)/<br>📁 Medium (101-1000KB)/<br>📁 Large (1001+KB)/',
                                    'name': '📁 A-F/<br>📁 G-M/<br>📁 N-S/<br>📁 T-Z/<br>📁 Numbers/'
                                };
                                return <div dangerouslySetInnerHTML={{ __html: examples[settings.mode] || 'Select a mode to see preview' }} />;
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrganizeTool;