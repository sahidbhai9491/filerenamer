import { eight, five, four, one, seven, six, three, two } from "../assets";
import Container from "../components/Container";

const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            title: "Open RenameTool in Your Browser",
            description: "Start by opening RenameTool in a supported browser such as Chrome, Edge, or Brave.",
            features: [
                "No download required",
                "No signup or login",
                "No ads or tracking",
                "Works instantly when page loads"
            ],
            note: "Simply navigate to RenameTool in your browser - no installation needed.",
            imagePlaceholder: "📸 Full homepage view - Show tool interface",
            image: one
        },
        {
            number: 2,
            title: "Select the Folder Containing Your Files",
            description: "Click on 'Select Folder' to choose the directory containing files you want to rename.",
            features: [
                "Browse and select any folder on your computer",
                "All files in the folder will be ready for renaming",
                "Supports nested subfolders",
                "Multiple file types supported"
            ],
            note: "You can select any folder on your system - RenameTool will only access files you explicitly choose.",
            imagePlaceholder: "📸 Folder selection dialog - Showing folder browser",
            image: two
        },
        {
            number: 3,
            title: "Allow Website to Access the Folder",
            description: "Grant permission when your browser asks for folder access.",
            features: [
                "Browser shows permission dialog",
                "Required for local file operations",
                "Permission is temporary",
                "Can be revoked anytime"
            ],
            note: "This permission allows RenameTool to rename files locally on your device. No files are uploaded.",
            imagePlaceholder: "📸 Browser permission dialog - 'Allow folder access' prompt",
            image: three
        },
        {
            number: 4,
            title: "View Selected Files and Their Count",
            description: "See all files in your selected folder with their current names and total count.",
            features: [
                "File list shows all selected items",
                "Total file count displayed",
                "Preview current file names",
                "Filter or search if needed"
            ],
            note: "You'll see exactly how many files are ready for renaming. All files remain on your device.",
            imagePlaceholder: "📸 File manager view - Showing file list with count",
            image: four
        },
        {
            number: 5,
            title: "Choose Your Renaming Method",
            description: "Select from three main methods: Manual Rename, Auto Rename, or File Organize.",
            features: [
                "Manual Rename: Full control over each file",
                "Auto Rename: Automatic pattern-based renaming",
                "File Organize: Categorize and structure files",
                "Switch between methods anytime"
            ],
            note: "Each method is designed for different renaming needs - choose what works best for your files.",
            imagePlaceholder: "📸 Method selector - Showing three main options",
            image: five
        },
        {
            number: 6,
            title: "Manual Rename with Live Preview",
            description: "Manually edit file names with real-time preview of changes.",
            features: [
                "Edit each file name individually",
                "Live preview shows changes instantly",
                "Preserve file extensions",
                "Undo/redo support"
            ],
            note: "The preview helps avoid mistakes by showing exactly how files will be renamed before applying changes.",
            imagePlaceholder: "📸 Manual rename interface - Showing edit fields with preview",
            image: six
        },
        {
            number: 7,
            title: "Auto Rename with Pattern Preview",
            description: "Apply automatic naming patterns with preview of results.",
            features: [
                "Add prefixes or suffixes",
                "Number files sequentially",
                "Replace text in bulk",
                "Custom naming patterns"
            ],
            note: "Set your rules once and see how all files will be renamed automatically. Preview ensures accuracy.",
            imagePlaceholder: "📸 Auto rename interface - Showing pattern settings with preview",
            image: seven
        },
        {
            number: 8,
            title: "File Organize - Categorize Your Files",
            description: "Organize files into categories or apply structured naming.",
            features: [
                "Group by file type",
                "Organize by date or size",
                "Create custom categories",
                "Apply structured naming"
            ],
            note: "Perfect for organizing large collections of files with consistent structure and naming.",
            imagePlaceholder: "📸 File organize interface - Showing categorization options",
            image: eight
        }
    ];

    return (
        <Container>
            {/* Hero Section */}
            <div className="pt-16 lg:pt-20">
                <div className="max-w-full mx-auto">
                    <div className="grid grid-cols-1">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                How RenameTool Works
                            </h1>
                            
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700">Rename Files Safely in Just a Few Simple Steps</span>
                            </div>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                RenameTool is designed to make file renaming simple, fast, and secure.
                                You don't need to install any software, create an account, or upload files. 
                                Everything works directly in your browser.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8 mb-12">
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">8</div>
                    <p className="text-gray-600">Simple Steps</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">3</div>
                    <p className="text-gray-600">Renaming Methods</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
                    <p className="text-gray-600">Local Processing</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">⚡</div>
                    <p className="text-gray-600">Live Preview</p>
                </div>
            </div>

            {/* Steps Section */}
            <div className="max-w-full mx-auto mb-16">
                <div className="space-y-16">
                    {steps.map((step) => (
                        <div key={step.number} className="border-t pt-12 first:border-t-0 first:pt-0">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Step Number */}
                                <div className="shrink-0">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                                        <span className="text-3xl font-bold text-indigo-600">{step.number}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Step {step.number}: {step.title}</h2>
                                    <p className="text-gray-700 mb-4">{step.description}</p>
                                    
                                    <div className="mb-4">
                                        <ul className="text-gray-700 space-y-2">
                                            {step.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                        <p className="text-gray-700">{step.note}</p>
                                    </div>

                                    {/* Image Placeholder */}
                                    <div className="bg-gray-100 border border-gray-300 border-dashed rounded-xl p-4 text-center">
                                        {/* <div className="text-gray-500 mb-2 text-4xl">📸</div> */}
                                        {/* <p className="text-gray-600 text-sm mb-2">{step.imagePlaceholder}</p> */}
                                        {/* Add your image like this: */}
                                        <img src={step.image} alt={`Step ${step.number}: ${step.title}`} className="w-full h-auto rounded-lg mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Renaming Methods Summary */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Three Ways to Rename Your Files</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">✏️</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Manual Rename</h3>
                        <p className="text-gray-600 mb-4">Full control over each file name with live preview.</p>
                        <ul className="text-gray-700 space-y-2 text-sm">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Edit names individually</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Real-time preview</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Preserve extensions</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Auto Rename</h3>
                        <p className="text-gray-600 mb-4">Automatic pattern-based renaming for bulk files.</p>
                        <ul className="text-gray-700 space-y-2 text-sm">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Add prefixes/suffixes</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Sequential numbering</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Bulk text replacement</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">📁</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">File Organize</h3>
                        <p className="text-gray-600 mb-4">Categorize and structure files systematically.</p>
                        <ul className="text-gray-700 space-y-2 text-sm">
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <span>Group by file type</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <span>Organize by date/size</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <span>Create categories</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Safety Tips */}
            <div className="mb-16">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span>⚠️</span>
                        Important Safety Tips
                    </h3>
                    <ul className="text-gray-700 space-y-3">
                        <li className="flex items-start">
                            <span className="font-semibold mr-2">•</span>
                            <span>Always take a <strong>backup of important files</strong> before renaming</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-semibold mr-2">•</span>
                            <span>Carefully review the preview before confirming any changes</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-semibold mr-2">•</span>
                            <span>Use RenameTool only on files you control and have permission to modify</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-semibold mr-2">•</span>
                            <span>Start with a small test batch if renaming a large number of files</span>
                        </li>
                    </ul>
                    <p className="text-gray-600 mt-4 text-sm">
                        RenameTool is designed to minimize errors with live preview, but the final decision always stays with the user.
                    </p>
                </div>
            </div>

            {/* Why Different */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why RenameTool Is Different</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        "Files never leave your device - 100% local processing",
                        "No uploads, no tracking, no data collection",
                        "No signup or registration required",
                        "Works across Windows, macOS, and Linux",
                        "Beginner-friendly with live preview",
                        "100% free forever - no hidden costs"
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <span className="text-indigo-600">✓</span>
                                </div>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Speed & Performance */}
            <div className="mb-16">
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Speed & Performance</h2>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="shrink-0">
                            <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center">
                                <span className="text-4xl">⚡</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-700 mb-4">
                                <strong>Based on internal testing, RenameTool can rename approximately 7–10 PDF files in around one second.</strong>
                            </p>
                            <p className="text-gray-600">
                                Actual performance may vary depending on file size, number of selected files, 
                                system performance, browser type, and available memory. Since RenameTool processes 
                                files locally in your browser, results can differ from one device to another.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white max-w-full mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Rename Your Files?</h2>
                <p className="text-lg mb-8 opacity-90">
                    Try RenameTool today — no downloads, no signups, just fast and secure file renaming.
                </p>
                <a 
                    href="/" 
                    className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                    Try RenameTool Free
                </a>
            </div>
        </Container>
    );
};

export default HowItWorks;