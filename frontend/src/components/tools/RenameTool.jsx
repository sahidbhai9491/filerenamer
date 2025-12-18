import { useState } from 'react';

function RenameTool({ settings, setSettings }) {
    const [caseType, setCaseType] = useState('keep');

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const applyCase = (text, type) => {
        switch (type) {
            case 'lower': return text.toLowerCase();
            case 'upper': return text.toUpperCase();
            case 'title': return text.replace(/\b\w/g, char => char.toUpperCase());
            default: return text;
        }
    };

    const handleCaseChange = (type) => {
        setCaseType(type);
        handleSettingChange('case', type);
    };

    return (
        <div className="space-y-6">
            {/* Prefix/Suffix */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Prefix
                    </label>
                    <input
                        type="text"
                        value={settings.prefix || ''}
                        onChange={(e) => handleSettingChange('prefix', e.target.value)}
                        placeholder="prefix_"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Text to add at the beginning</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Suffix
                    </label>
                    <input
                        type="text"
                        value={settings.suffix || ''}
                        onChange={(e) => handleSettingChange('suffix', e.target.value)}
                        placeholder="_suffix"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Text to add at the end</p>
                </div>
            </div>

            {/* Find & Replace */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                    Find & Replace
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            value={settings.find || ''}
                            onChange={(e) => handleSettingChange('find', e.target.value)}
                            placeholder="Text to find"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={settings.replace || ''}
                            onChange={(e) => handleSettingChange('replace', e.target.value)}
                            placeholder="Replacement text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                    Leave replacement empty to delete found text
                </p>
            </div>

            {/* Text Case */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Case
                </label>
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 'keep', label: 'Keep Original', icon: '🔤' },
                        { id: 'lower', label: 'lowercase', icon: '🔠' },
                        { id: 'upper', label: 'UPPERCASE', icon: '🔡' },
                        { id: 'title', label: 'Title Case', icon: '📝' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleCaseChange(option.id)}
                            className={`flex-1 min-w-0 px-4 py-3 border rounded-lg text-center transition-colors ${caseType === option.id
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-lg mb-1">{option.icon}</div>
                            <div className="text-sm font-medium">{option.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Numbering */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Numbering
                </label>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.numbering || false}
                            onChange={(e) => handleSettingChange('numbering', e.target.checked)}
                            className="h-4 w-4 text-indigo-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Add sequential numbers</span>
                    </label>

                    {settings.numbering && (
                        <>
                            <div>
                                <input
                                    type="number"
                                    value={settings.startNumber || 1}
                                    onChange={(e) => handleSettingChange('startNumber', parseInt(e.target.value) || 1)}
                                    min="1"
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Start from"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    value={settings.digits || 1}
                                    onChange={(e) => handleSettingChange('digits', parseInt(e.target.value) || 1)}
                                    min="1"
                                    max="5"
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Digits"
                                />
                            </div>
                        </>
                    )}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                    Adds sequential numbers (e.g., file_001.jpg, file_002.jpg)
                </p>
            </div>

            {/* Preview Example */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Preview Example</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-red-50 rounded">
                        <div className="font-medium text-red-700">Before:</div>
                        <div className="mt-1 text-red-600">example_file.jpg</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                        <div className="font-medium text-green-700">After:</div>
                        <div className="mt-1 text-green-600">
                            {(() => {
                                let fileName = 'example_file';
                                let extension = 'jpg';
                                let result = `${fileName}.${extension}`;

                                // Apply prefix
                                if (settings.prefix) fileName = settings.prefix + fileName;

                                // Apply suffix
                                if (settings.suffix) fileName = fileName + settings.suffix;

                                // Apply find & replace
                                if (settings.find && settings.replace) {
                                    fileName = fileName.replace(new RegExp(settings.find, 'g'), settings.replace);
                                }

                                // Apply case
                                if (settings.case && settings.case !== 'keep') {
                                    fileName = applyCase(fileName, settings.case);
                                }

                                // Apply numbering (just for preview)
                                if (settings.numbering) {
                                    const start = settings.startNumber || 1;
                                    const digits = settings.digits || 1;
                                    fileName = `${fileName}_${start.toString().padStart(digits, '0')}`;
                                }

                                result = `${fileName}.${extension}`;
                                return result;
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenameTool;