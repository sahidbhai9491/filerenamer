import Container from "../components/Container";

function Comparison() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12 md:py-20">
                <Container className="relative z-10">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            RenameTool vs Other Methods
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                            Clear comparison to help you choose the right file renaming solution for your needs
                        </p>
                        <div className="inline-flex items-center justify-center bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-3"></div>
                            <span className="text-gray-700 font-medium">100% browser-based • No installations • Complete privacy</span>
                        </div>
                    </div>
                </Container>

                {/* Background decorative elements */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </section>

            {/* Main Content */}
            <Container className="bg-white">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Quick Comparison Summary */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">At a Glance: How Methods Compare</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
                                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 text-center mb-4">RenameTool</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Browser-based, no install</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Files never leave your device</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Visual previews & easy interface</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200">
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                                    <span className="text-2xl">💾</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 text-center mb-4">Offline Software</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">✓</span>
                                        <span>Installed on your computer</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">✓</span>
                                        <span>Advanced features often available</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">•</span>
                                        <span>Requires download & updates</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-linear-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
                                <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 mx-auto">
                                    <span className="text-2xl">⚠️</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 text-center mb-4">Upload-Based Tools</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Files uploaded to servers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Privacy concerns</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">•</span>
                                        <span>File size limits often apply</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Comparison Tables */}

                    {/* RenameTool vs Offline Software */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="p-2 bg-indigo-100 rounded-lg">🆚</span>
                            RenameTool vs Offline File Renaming Software
                        </h3>

                        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700 border-r border-gray-200">Feature</th>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700 border-r border-gray-200">RenameTool (Browser-Based)</th>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Offline Software</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Installation</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ❌ Not required
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                    ✅ Required
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Disk Space</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ❌ Uses none
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                    ⚠️ Uses storage
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Setup Time</td>
                                            <td className="py-4 px-6 text-green-600 font-medium">Instant</td>
                                            <td className="py-4 px-6 text-gray-600">Takes time</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Updates</td>
                                            <td className="py-4 px-6 text-green-600 font-medium">Automatic</td>
                                            <td className="py-4 px-6 text-gray-600">Manual updates</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Ease of Use</td>
                                            <td className="py-4 px-6 text-green-600 font-medium">Very easy</td>
                                            <td className="py-4 px-6 text-yellow-600">Medium to complex</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">System Compatibility</td>
                                            <td className="py-4 px-6 text-green-600 font-medium">Works on all modern OS</td>
                                            <td className="py-4 px-6 text-gray-600">OS-specific</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Best Use Case</td>
                                            <td className="py-4 px-6 font-medium text-gray-700">Quick & clean renaming</td>
                                            <td className="py-4 px-6 font-medium text-gray-700">Heavy desktop workflows</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-6 p-5 bg-indigo-50 rounded-lg border border-indigo-100">
                            <p className="text-indigo-800 font-medium">
                                💡 <strong>Key Insight:</strong> Choose RenameTool for convenience and no-install use.
                                Offline software makes sense for advanced, specialized workflows.
                            </p>
                        </div>
                    </div>

                    {/* RenameTool vs Online Upload Tools */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="p-2 bg-red-100 rounded-lg">🆚</span>
                            RenameTool vs Online File Upload Tools
                        </h3>

                        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700 border-r border-gray-200">Feature</th>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700 border-r border-gray-200">RenameTool</th>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Upload-Based Tools</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">File Upload</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ❌ Never
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                    ⚠️ Required
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Data Privacy</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ✅ High
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                                    ❌ Risk involved
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Internet Dependency</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    Low
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-red-600 font-medium">High</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">File Size Limit</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ❌ No limit
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                    ⚠️ Often limited
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Ads</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ❌ No
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                    ⚠️ Often
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Best Use Case</td>
                                            <td className="py-4 px-6 font-medium text-gray-700">Sensitive & private files</td>
                                            <td className="py-4 px-6 font-medium text-gray-700">Small, non-critical files</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-6 p-5 bg-red-50 rounded-lg border border-red-100">
                            <p className="text-red-800 font-medium">
                                🔒 <strong>Privacy Alert:</strong> RenameTool keeps files on your device.
                                Upload tools send files to external servers — risky for sensitive documents.
                            </p>
                        </div>
                    </div>

                    {/* RenameTool vs Command Line */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="p-2 bg-gray-100 rounded-lg">🆚</span>
                            RenameTool vs Command Line (Terminal)
                        </h3>

                        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700 border-r border-gray-200">Feature</th>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700 border-r border-gray-200">RenameTool</th>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Command Line</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Technical Knowledge</td>
                                            <td className="py-4 px-6 text-green-600 font-medium">Not required</td>
                                            <td className="py-4 px-6 text-red-600 font-medium">Required</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Visual Interface</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ✅ Yes
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                                    ❌ No
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Preview Before Rename</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    ✅ Yes
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                                    ❌ No
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Risk of Mistakes</td>
                                            <td className="py-4 px-6 text-green-600 font-medium">Low</td>
                                            <td className="py-4 px-6 text-red-600 font-medium">High</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Learning Curve</td>
                                            <td className="py-4 px-6 text-green-600 font-medium">Very low</td>
                                            <td className="py-4 px-6 text-red-600 font-medium">Steep</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Best Use Case</td>
                                            <td className="py-4 px-6 font-medium text-gray-700">Safe & controlled renaming</td>
                                            <td className="py-4 px-6 font-medium text-gray-700">Advanced scripting</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-gray-800 font-medium">
                                🎯 <strong>Simple Choice:</strong> RenameTool for visual safety.
                                Command line for automation when you know exactly what you're doing.
                            </p>
                        </div>
                    </div>

                    {/* Use-Case Based Comparison */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            1️⃣ Use-Case–Based Comparison
                        </h3>
                        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                            "What works best for my type of work?" — Most helpful for matching tools to real-world needs
                        </p>

                        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-linear-to-r from-indigo-50 to-purple-50">
                                        <tr>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700 border-r border-gray-200">Use Case</th>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700 border-r border-gray-200">RenameTool</th>
                                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Other Methods</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Students & assignments</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    <span className="font-medium">Easy, fast</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">Often too complex</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Designers (images)</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    <span className="font-medium">Bulk rename + preview</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">Manual or slow</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Office documents</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    <span className="font-medium">Safe & organized</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">Upload risks</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">Developers</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    <span className="font-medium">Basic needs</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">CLI offers automation</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-gray-700">
                                <span className="font-semibold">Why this helps:</span> Users immediately see where they fit.
                            </p>
                        </div>
                    </div>

                    {/* Additional Comparison Grids */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            More Ways to Compare
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Skill Level */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4 mx-auto">
                                    <span className="text-xl">👤</span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 text-center mb-4">Skill-Level Comparison</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <span className="font-medium">Beginner</span>
                                        <span className="font-bold text-green-600">RenameTool</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <span className="font-medium">Intermediate</span>
                                        <span className="font-medium text-blue-600">RenameTool / Software</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <span className="font-medium">Advanced</span>
                                        <span className="font-medium text-gray-600">Command line</span>
                                    </div>
                                </div>
                            </div>

                            {/* Privacy */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
                                    <span className="text-xl">🔒</span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 text-center mb-4">Privacy Expectation</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                                        <span className="font-medium">Very high</span>
                                        <span className="font-bold text-green-600">RenameTool</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                                        <span className="font-medium">Medium</span>
                                        <span className="font-medium text-blue-600">Offline software</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                                        <span className="font-medium">Low</span>
                                        <span className="font-medium text-red-600">Upload tools</span>
                                    </div>
                                </div>
                            </div>

                            {/* Cost */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
                                    <span className="text-xl">💰</span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 text-center mb-4">Cost-Based Comparison</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                                        <span className="font-medium">Free</span>
                                        <span className="font-bold text-green-600">RenameTool</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                                        <span className="font-medium">One-time purchase</span>
                                        <span className="font-medium text-blue-600">Offline software</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                                        <span className="font-medium">Subscription</span>
                                        <span className="font-medium text-purple-600">Paid tools</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decision Helper */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Still Not Sure? Quick Decision Helper
                        </h3>

                        <div className="bg-linear-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <span className="mr-3">✅</span>
                                        Choose RenameTool if:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">•</span>
                                            <span>You want instant access (no install)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">•</span>
                                            <span>Privacy is important (files stay local)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">•</span>
                                            <span>You prefer visual previews before changes</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">•</span>
                                            <span>You work across different computers/OS</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <span className="mr-3">🤔</span>
                                        Consider alternatives if:
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span>You need specialized automation (command line)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span>You work offline often (installed software)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-2">•</span>
                                            <span>Files aren't sensitive (upload tools)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span>You need advanced regex or scripting</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Recommendation */}
                    <div className="text-center mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">The Simple Truth</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            For <span className="font-semibold text-indigo-600">95% of users</span>, RenameTool offers the perfect balance of
                            ease, safety, and functionality without complexity.
                        </p>
                        <div className="bg-linear-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 inline-block">
                            <p className="text-green-800 font-bold text-lg">
                                🎯 Best for most people: <span className="text-green-600">RenameTool</span>
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white shadow-xl">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">
                            Ready to Rename Files the Smart Way?
                        </h3>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            Join thousands of users who choose RenameTool for its perfect balance of
                            simplicity, privacy, and power.
                        </p>
                        <a
                            href="/rename-file-online"
                            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition duration-300 text-lg shadow-lg"
                        >
                            🚀 Start Using RenameTool — It's Free & Private
                        </a>
                        <p className="mt-6 text-indigo-200 text-sm">
                            No sign-up • No installation • Files stay on your device
                        </p>
                    </div>
                </div>
            </Container>

            <style>{`
    @keyframes blob {
        0% {
            transform: translate(0px, 0px) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
            transform: translate(0px, 0px) scale(1);
        }
    }
    .animate-blob {
        animation: blob 7s infinite;
    }
    .animation-delay-2000 {
        animation-delay: 2s;
    }
    .animation-delay-4000 {
        animation-delay: 4s;
    }
`}</style>
        </>
    );
}

export default Comparison;