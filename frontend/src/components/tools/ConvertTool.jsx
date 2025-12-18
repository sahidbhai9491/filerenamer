function ConvertTool({ settings, setSettings }) {
    const formats = [
        { id: 'jpg', name: 'JPG', icon: '🖼️', color: 'bg-red-100 text-red-800' },
        { id: 'png', name: 'PNG', icon: '📷', color: 'bg-blue-100 text-blue-800' },
        { id: 'webp', name: 'WebP', icon: '🌐', color: 'bg-green-100 text-green-800' },
        { id: 'svg', name: 'SVG', icon: '🔷', color: 'bg-purple-100 text-purple-800' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Convert to Format</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {formats.map((format) => (
                        <button
                            key={format.id}
                            onClick={() => setSettings({ ...settings, format: format.id })}
                            className={`p-4 border rounded-lg text-center transition-all ${
                                settings.format === format.id
                                    ? 'border-indigo-600 ring-2 ring-indigo-100'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <div className="text-2xl mb-2">{format.icon}</div>
                            <div className="font-medium text-gray-900">{format.name}</div>
                            <div className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${format.color}`}>
                                .{format.id}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {settings.format && (
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Conversion Settings</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.preserveMetadata || false}
                                    onChange={(e) => setSettings({ ...settings, preserveMetadata: e.target.checked })}
                                    className="h-4 w-4 text-indigo-600 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">Preserve metadata</span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Quality</label>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={settings.quality || 85}
                                onChange={(e) => setSettings({ ...settings, quality: parseInt(e.target.value) })}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Low ({settings.quality || 85}%)</span>
                                <span>High</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConvertTool;