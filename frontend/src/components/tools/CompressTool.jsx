function CompressTool({ settings, setSettings }) {
    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const validateSettings = () => {
        const validated = { ...settings };

        // Ensure compression level is valid
        if (validated.compressionLevel < 1) validated.compressionLevel = 1;
        if (validated.compressionLevel > 100) validated.compressionLevel = 100;

        // Ensure dimensions are positive
        if (validated.maxWidth && validated.maxWidth < 1) validated.maxWidth = 1;
        if (validated.maxHeight && validated.maxHeight < 1) validated.maxHeight = 1;

        return validated;
    };

    // Call this before passing to FileProcessor
    const validatedSettings = validateSettings();

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compression Level
                </label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={settings.compressionLevel || 50}
                    onChange={(e) => handleSettingChange('compressionLevel', parseInt(e.target.value))}
                    className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Maximum Quality</span>
                    <span className="font-medium">{settings.compressionLevel || 50}%</span>
                    <span>Smallest Size</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                    Lower percentage = more compression = smaller file size
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Width (px)
                    </label>
                    <input
                        type="number"
                        value={settings.maxWidth || ''}
                        onChange={(e) => handleSettingChange('maxWidth', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="Auto"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Leave empty for no limit</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Height (px)
                    </label>
                    <input
                        type="number"
                        value={settings.maxHeight || ''}
                        onChange={(e) => handleSettingChange('maxHeight', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="Auto"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Leave empty for no limit</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.keepOriginalFormat || false}
                            onChange={(e) => handleSettingChange('keepOriginalFormat', e.target.checked)}
                            className="h-4 w-4 text-indigo-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Keep original format</span>
                    </label>
                    <span className="text-xs text-gray-500">If unchecked, converts to JPEG</span>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.preserveAspectRatio !== false}
                            onChange={(e) => handleSettingChange('preserveAspectRatio', e.target.checked)}
                            className="h-4 w-4 text-indigo-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Preserve aspect ratio</span>
                    </label>
                    <span className="text-xs text-gray-500">Recommended for photos</span>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.maintainQuality || false}
                            onChange={(e) => handleSettingChange('maintainQuality', e.target.checked)}
                            className="h-4 w-4 text-indigo-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Maintain visual quality</span>
                    </label>
                    <span className="text-xs text-gray-500">Slower but better results</span>
                </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for best compression:</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Use 60-80% quality for web images (good balance)</li>
                    <li>• Set max dimensions to reduce file size significantly</li>
                    <li>• Keep "Preserve aspect ratio" checked to avoid distortion</li>
                    <li>• For social media: 1080px width, 70% quality</li>
                </ul>
            </div>
        </div>
    );
}

export default CompressTool;