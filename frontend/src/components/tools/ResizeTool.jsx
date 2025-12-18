function ResizeTool({ settings, setSettings }) {
    const resizeMethods = [
        { id: 'dimensions', name: 'Exact Dimensions', icon: '📏' },
        { id: 'percentage', name: 'Percentage', icon: '📊' },
        { id: 'max', name: 'Maximum Size', icon: '⬇️' },
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
                <h3 className="text-sm font-medium text-gray-900 mb-4">Resize Method</h3>
                <div className="flex gap-3">
                    {resizeMethods.map((method) => (
                        <button
                            key={method.id}
                            onClick={() => handleSettingChange('method', method.id)}
                            className={`flex-1 px-4 py-3 border rounded-lg text-center ${
                                settings.method === method.id
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <div className="text-lg mb-1">{method.icon}</div>
                            <div className="text-sm font-medium">{method.name}</div>
                        </button>
                    ))}
                </div>
            </div>

            {settings.method && (
                <div className="space-y-4">
                    {settings.method === 'dimensions' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Width (px)
                                </label>
                                <input
                                    type="number"
                                    value={settings.width || ''}
                                    onChange={(e) => handleSettingChange('width', parseInt(e.target.value) || null)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Auto"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Height (px)
                                </label>
                                <input
                                    type="number"
                                    value={settings.height || ''}
                                    onChange={(e) => handleSettingChange('height', parseInt(e.target.value) || null)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Auto"
                                />
                            </div>
                        </div>
                    )}

                    {settings.method === 'percentage' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Scale Percentage
                            </label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="200"
                                    value={settings.percentage || 100}
                                    onChange={(e) => handleSettingChange('percentage', parseInt(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="text-lg font-medium text-gray-900 w-16 text-center">
                                    {settings.percentage || 100}%
                                </span>
                            </div>
                        </div>
                    )}

                    {settings.method === 'max' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Dimension (px)
                            </label>
                            <input
                                type="number"
                                value={settings.maxDimension || ''}
                                onChange={(e) => handleSettingChange('maxDimension', parseInt(e.target.value) || null)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="e.g., 1920"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Image will be resized to fit within this dimension while maintaining aspect ratio
                            </p>
                        </div>
                    )}

                    {/* Common Settings */}
                    <div className="pt-4 border-t border-gray-200 space-y-3">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={settings.preserveAspectRatio !== false}
                                onChange={(e) => handleSettingChange('preserveAspectRatio', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Maintain aspect ratio</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={settings.upscale || false}
                                onChange={(e) => handleSettingChange('upscale', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Allow upscaling</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResizeTool;