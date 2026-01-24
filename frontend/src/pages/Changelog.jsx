import Container from "../components/Container";

const Changelog = () => {
    const updates = [
        {
            month: "January 2026",
            improvements: [
                "Improved bulk rename performance for PDF and image files",
                "Faster preview loading when selecting large folders",
                "Minor UI refinements for better clarity"
            ],
            fixes: [
                "Fixed an issue where some files were not refreshing in preview",
                "Resolved permission warning shown multiple times in some browsers"
            ]
        },
    ];

    const upcomingFeatures = [
        "AI rename suggestions",
        "Better file filtering before renaming",
        "Improved performance for very large folders",
        "Enhanced accessibility and keyboard navigation",
        "More file organization options",
        "Dark mode support",
        "Export rename history as CSV",
        "Custom rename templates"
    ];

    return (
        <Container>
            {/* Hero Section */}
            <div className="pt-16 lg:pt-20">
                <div className="max-w-full mx-auto">
                    <div className="grid grid-cols-1">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                RenameTool Changelog
                            </h1>
                            
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700">Updates, Fixes & Improvements</span>
                            </div>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Track the latest updates, bug fixes, and upcoming improvements in RenameTool. 
                                See how we continuously improve file renaming performance and usability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <div className="mb-16">
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                            <span className="text-2xl">🧠</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why We Share This</h2>
                            <p className="text-gray-700">
                                We believe transparency builds trust. This changelog helps you clearly see what has changed, 
                                what has been fixed, and why those updates matter. It also gives you a glimpse into where 
                                RenameTool is headed next. RenameTool is built with real user feedback and a strong focus 
                                on privacy, and we want you to stay informed as the tool continues to improve.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Updates */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600">📅</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
                </div>

                <div className="space-y-8">
                    {updates.map((update, index) => (
                        <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <span className="text-indigo-600">🔧</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{update.month}</h3>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Improvements */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <h4 className="font-semibold text-gray-800">Improvements</h4>
                                        </div>
                                        <ul className="space-y-3">
                                            {update.improvements.map((item, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Fixes */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            <h4 className="font-semibold text-gray-800">Fixes</h4>
                                        </div>
                                        <ul className="space-y-3">
                                            {update.fixes.map((item, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-orange-500 mr-2 mt-1">🔧</span>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Features */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600">🚀</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">What's Coming Next</h2>
                </div>

                <div className="bg-linear-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
                    <p className="text-gray-700 mb-6">
                        These features are planned and may change based on feedback. 
                        We're continuously working to make RenameTool better.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {upcomingFeatures.map((feature, index) => (
                            <div key={index} className="bg-white/70 p-4 rounded-xl border border-purple-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-purple-600">→</span>
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <p className="text-gray-700 text-sm">
                        <span className="font-semibold">Disclaimer:</span> Features listed under "Coming Next" are 
                        under development and not guaranteed timelines. Availability may vary depending on browser 
                        support and development priorities.
                    </p>
                </div>
            </div>

            {/* Feedback Section */}
            <div className="mb-16">
                <div className="bg-linear-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200">
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl">💬</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Have Feedback or Suggestions?</h3>
                        <p className="text-gray-600 mb-6">
                            RenameTool is built for you. If you have ideas for improvements or encounter any issues, 
                            we'd love to hear from you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="/contact" 
                                className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Send Feedback
                            </a>
                            <a 
                                href="/faqs" 
                                className="inline-block px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                Visit FAQs
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Version Timeline */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Version Timeline</h2>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="space-y-8">
                        {[
                            { version: "v1.2", date: "Jan 2025", description: "Added new pages for users" },
                            { version: "v1.1", date: "Jan 2025", description: "Performance improvements & bug fixes" },
                            { version: "v1.0", date: "Dec 2025", description: "Initial public release" }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-6 relative">
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white border-2 border-indigo-200 rounded-xl flex items-center justify-center">
                                        <span className="font-bold text-indigo-600">{item.version}</span>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{item.version}</h3>
                                        <span className="text-gray-500 text-sm">• {item.date}</span>
                                    </div>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white max-w-full mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-4">Try the Latest Version</h2>
                <p className="text-lg mb-8 opacity-90">
                    Experience the improvements and new features in the latest version of RenameTool.
                </p>
                <a 
                    href="/" 
                    className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                    Use RenameTool Now
                </a>
            </div>
        </Container>
    );
};

export default Changelog;