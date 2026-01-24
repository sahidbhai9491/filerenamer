import { Link } from "react-router-dom";
import Container from "../components/Container";

const TermsAndConditions = () => {
    return (
        <Container>
            {/* Hero Section */}
            <div className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Terms and Conditions
                            </h1>
                            
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700">Important legal information</span>
                            </div>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Welcome to RenameTool. These Terms and Conditions govern your use of our website 
                                and file renaming tools. By accessing or using RenameTool, you agree to comply 
                                with these terms. If you do not agree, please do not use the website.
                            </p>
                            
                            <p className="text-gray-700 font-medium">
                                Last Updated: January 19, 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-gray-200 mb-12">
                <div className="text-center">
                    <div className="text-4xl mb-3">🚫</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Account Needed</h3>
                    <p className="text-gray-600">Use without registration</p>
                </div>
                <div className="text-center">
                    <div className="text-4xl mb-3">⚖️</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">User Responsibility</h3>
                    <p className="text-gray-600">You control your files</p>
                </div>
                <div className="text-center">
                    <div className="text-4xl mb-3">📝</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Free to Use</h3>
                    <p className="text-gray-600">No charges, no subscriptions</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-full mx-auto">
                <div className="space-y-12">
                    {/* Section 1 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of the Website</h2>
                        <p className="text-gray-700 mb-4">
                            RenameTool provides a free, browser-based file renaming utility. You may use the 
                            tool only for lawful purposes and in accordance with these Terms.
                        </p>
                        <div className="bg-gray-50 p-5 rounded-xl">
                            <p className="font-semibold text-gray-800 mb-3">You agree not to:</p>
                            <ul className="text-gray-700 space-y-2 list-disc pl-5">
                                <li>Use the website for illegal or harmful activities</li>
                                <li>Attempt to misuse, reverse-engineer, or disrupt the tool</li>
                                <li>Use automated systems to overload or damage the service</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. No Account, No Registration</h2>
                        <div className="bg-green-50 p-5 rounded-xl mb-4">
                            <p className="text-green-800 font-medium">
                                RenameTool does not require any form of registration or personal information.
                            </p>
                        </div>
                        <ul className="text-gray-700 space-y-3 list-disc pl-5">
                            <li>Account creation</li>
                            <li>Login or signup</li>
                            <li>Registration or subscription</li>
                        </ul>
                        <p className="text-gray-700 mt-4 font-medium">
                            You can use the tool freely without providing personal information.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. File Handling & User Responsibility</h2>
                        <p className="text-gray-700 mb-4">
                            RenameTool works locally in your browser. Your files are not uploaded, stored, 
                            or accessed by us.
                        </p>
                        
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                            <p className="text-yellow-800 font-semibold">⚠️ IMPORTANT USER RESPONSIBILITIES</p>
                        </div>
                        
                        <div className="space-y-4 mb-4">
                            <div className="flex items-start gap-3">
                                <span className="text-red-500 text-xl mt-1">•</span>
                                <p className="text-gray-700">You are solely responsible for the files you select</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-red-500 text-xl mt-1">•</span>
                                <p className="text-gray-700">You are responsible for the rename rules you apply</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-red-500 text-xl mt-1">•</span>
                                <p className="text-gray-700">You should review the preview before confirming changes</p>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-blue-800 font-medium">
                                💡 We strongly recommend taking a backup of your files before proceeding with any rename action.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Preview & Confirmation</h2>
                        <p className="text-gray-700 mb-4">
                            RenameTool provides a preview of file name changes before they are applied.
                        </p>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-red-500">!</span>
                                </div>
                                <p className="font-semibold text-gray-800">Important Notice</p>
                            </div>
                            <p className="text-gray-700">
                                Once you confirm and apply changes, the action may not be reversible at the 
                                system level. RenameTool is not responsible for unintended results caused by user input.
                            </p>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Tool Availability</h2>
                        <p className="text-gray-700 mb-4">
                            RenameTool is provided on an "as-is" and "as-available" basis.
                        </p>
                        
                        <div className="bg-gray-100 p-5 rounded-xl mb-4">
                            <p className="font-semibold text-gray-800 mb-3">We do not guarantee that:</p>
                            <ul className="text-gray-700 space-y-2 list-disc pl-5">
                                <li>The tool will always be uninterrupted</li>
                                <li>All browser environments will behave identically</li>
                                <li>The tool will meet every specific user requirement</li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                We reserve the right to modify, suspend, or discontinue the tool at any time 
                                without prior notice.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                            <p className="text-red-800 font-semibold">🔴 LEGAL DISCLAIMER</p>
                        </div>
                        <p className="text-gray-700 mb-4">
                            To the fullest extent permitted by law:
                        </p>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-start gap-3">
                                <span className="text-gray-700">•</span>
                                <p className="text-gray-700">
                                    RenameTool shall not be liable for any data loss, file issues, or damages 
                                    resulting from the use of the tool
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-gray-700">•</span>
                                <p className="text-gray-700">
                                    Users assume full responsibility for file renaming actions
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm">
                                This includes, but is not limited to, accidental renaming, overwriting, 
                                or organizational issues.
                            </p>
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-700 mb-4">
                            All content on this website, including text, design, branding, and tool interface, 
                            is the property of RenameTool unless otherwise stated.
                        </p>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <p className="font-medium text-gray-800 text-center">
                                You may not copy, reproduce, or redistribute website content without permission.
                            </p>
                        </div>
                    </div>

                    {/* Section 8 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
                        <p className="text-gray-700 mb-4">
                            RenameTool may contain links to third-party websites.
                        </p>
                        <div className="bg-gray-50 p-5 rounded-xl">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-yellow-600">↗️</span>
                                </div>
                                <p className="font-semibold text-gray-800">External Link Disclaimer</p>
                            </div>
                            <p className="text-gray-700">
                                We are not responsible for the content, policies, or practices of external sites. 
                                Accessing third-party links is at your own risk.
                            </p>
                        </div>
                    </div>

                    {/* Section 9 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Prohibited Use</h2>
                        <p className="text-gray-700 mb-4">
                            You agree not to use RenameTool to:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-gray-700 font-medium mb-1">🚫 Violate Laws</p>
                                <p className="text-gray-600 text-sm">Any applicable laws or regulations</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-gray-700 font-medium mb-1">🚫 Infringe Rights</p>
                                <p className="text-gray-600 text-sm">Intellectual property rights</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-gray-700 font-medium mb-1">🚫 Distribute Harmful Content</p>
                                <p className="text-gray-600 text-sm">Malicious or harmful content</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-gray-700 font-medium mb-1">🚫 Unauthorized Access</p>
                                <p className="text-gray-600 text-sm">Systems or data access attempts</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 10 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacy</h2>
                        <p className="text-gray-700 mb-4">
                            Your use of RenameTool is also governed by our Privacy Policy.
                        </p>
                        <div className="bg-blue-50 p-5 rounded-xl">
                            <p className="font-medium text-blue-800 mb-3">🔒 Privacy-First Approach</p>
                            <p className="text-gray-700 mb-4">
                                Please review our Privacy Policy to understand how we handle privacy and 
                                data protection.
                            </p>
                            <Link 
                                to="/privacy-policy" 
                                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                View Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* Section 11 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to These Terms</h2>
                        <p className="text-gray-700 mb-4">
                            We may update these Terms and Conditions from time to time.
                        </p>
                        <div className="bg-gray-100 p-5 rounded-xl">
                            <p className="font-semibold text-gray-800 mb-2">📅 Update Process:</p>
                            <ul className="text-gray-700 space-y-2">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Any changes will be posted on this page with an updated revision date</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Continued use of RenameTool after changes means you accept the updated terms</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 12 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <p className="text-gray-700 text-center font-medium">
                                These Terms shall be governed and interpreted in accordance with applicable laws, 
                                without regard to conflict of law principles.
                            </p>
                        </div>
                    </div>

                    {/* Section 13 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                        <p className="text-gray-700 mb-6">
                            If you have questions about these Terms and Conditions, please contact us 
                            through the Contact Us page.
                        </p>
                        <div className="bg-linear-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                            <h3 className="font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
                            <Link 
                                to="/contact" 
                                className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Visit Contact Page
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="mt-16 pt-8 border-t">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link 
                            to="/privacy-policy" 
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link 
                            to="/about" 
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                        >
                            About Us
                        </Link>
                        <Link 
                            to="/contact" 
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white max-w-full mx-auto mt-16 mb-8">
                <h2 className="text-3xl font-bold mb-4">Try Our Free File Renaming Tool</h2>
                <p className="text-lg mb-8 opacity-90">
                    Rename files locally in your browser with our privacy-first tool.
                </p>
                <Link 
                    to="/" 
                    className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                    Use RenameTool Now
                </Link>
            </div>
        </Container>
    );
};

export default TermsAndConditions;