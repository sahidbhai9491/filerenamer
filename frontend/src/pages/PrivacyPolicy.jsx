import { Link } from "react-router-dom";
import Container from "../components/Container";

const PrivacyPolicy = () => {
    return (
        <Container>
            {/* Hero Section */}
            <div className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Privacy Policy
                            </h1>
                            
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700">No data collection</span>
                            </div>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Welcome to RenameTool. Your privacy and file security are extremely important to us. 
                                This Privacy Policy explains how RenameTool works, what data we do not collect, and 
                                what precautions users should take while using our file renaming tools.
                            </p>
                            
                            <p className="text-gray-700 font-medium">
                                Last Updated: January 19, 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-gray-200 mb-12">
                <div className="text-center">
                    <div className="text-4xl mb-3">🔒</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Uploads</h3>
                    <p className="text-gray-600">Files never leave your computer</p>
                </div>
                <div className="text-center">
                    <div className="text-4xl mb-3">📊</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Tracking</h3>
                    <p className="text-gray-600">No cookies or analytics</p>
                </div>
                <div className="text-center">
                    <div className="text-4xl mb-3">💸</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Completely Free</h3>
                    <p className="text-gray-600">No payment required</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-full mx-auto">
                <div className="space-y-12">
                    {/* Introduction */}
                    <div className="mb-8">
                        <p className="text-gray-700 mb-6">
                            By using RenameTool, you agree to the terms outlined in this Privacy Policy.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Do Not Collect</h2>
                        <div className="bg-gray-50 p-6 rounded-xl mb-4">
                            <p className="text-gray-700">
                                RenameTool is built with a privacy-first design. We do not collect, store, process, or transmit:
                            </p>
                        </div>
                        <ul className="text-gray-700 space-y-3 list-disc pl-5">
                            <li>Your files or folder contents</li>
                            <li>File names, extensions, or metadata</li>
                            <li>Personal information (name, email, phone number)</li>
                            <li>Login credentials (we do not offer accounts)</li>
                            <li>Payment information (the tool is completely free)</li>
                        </ul>
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <p className="text-blue-800 font-medium">
                                Your files never leave your computer.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How RenameTool Works</h2>
                        <p className="text-gray-700 mb-4">
                            RenameTool operates entirely inside your browser using modern browser file system permissions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <div className="text-2xl mb-3">📍</div>
                                <h3 className="font-semibold text-gray-800 mb-2">Local Processing</h3>
                                <p className="text-gray-600 text-sm">All file renaming happens locally on your device</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <div className="text-2xl mb-3">🚫</div>
                                <h3 className="font-semibold text-gray-800 mb-2">No Server Uploads</h3>
                                <p className="text-gray-600 text-sm">No uploads to any server</p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            RenameTool does not have the ability to view, copy, or store your files.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Browser Permissions</h2>
                        <p className="text-gray-700 mb-4">
                            When you select files or a folder, your browser may request permission to access them.
                        </p>
                        <div className="bg-gray-50 p-5 rounded-xl">
                            <ul className="text-gray-700 space-y-2">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Permission is required to rename files locally</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Can be revoked anytime from your browser settings</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Does not allow access without user interaction</span>
                                </li>
                            </ul>
                        </div>
                        <p className="text-gray-700 mt-4">
                            RenameTool works strictly within the permissions you grant.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Backup Recommendation (Important)</h2>
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                            <p className="text-yellow-800 font-semibold">⚠️ IMPORTANT SAFETY ADVICE</p>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Before using RenameTool, we strongly recommend taking a backup of your files, especially 
                            when renaming large folders or important data.
                        </p>
                        <p className="text-gray-700">
                            While RenameTool provides safety features like previews, file renaming actions may not always 
                            be reversible at the operating system level. Keeping a backup helps prevent accidental data issues.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Preview Before Proceeding</h2>
                        <p className="text-gray-700 mb-4">
                            RenameTool shows a preview of file name changes before applying them.
                        </p>
                        <div className="bg-green-50 p-5 rounded-xl">
                            <p className="text-green-800 font-medium mb-2">✅ Safety Check</p>
                            <p className="text-gray-700">
                                We advise users to carefully review the preview displayed on the website before 
                                confirming any rename action. This helps avoid unintended file name changes.
                            </p>
                        </div>
                        <p className="text-gray-700 mt-4">
                            Once changes are applied, RenameTool is not responsible for outcomes caused by 
                            user-selected rename rules.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Responsibility</h2>
                        <p className="text-gray-700 mb-4">
                            RenameTool is provided as a utility tool to assist with file renaming.
                            The final responsibility for file selection, rename rules, and confirmation actions 
                            remains with the user.
                        </p>
                        <div className="bg-gray-100 p-5 rounded-xl">
                            <p className="font-semibold text-gray-800 mb-3">Users are encouraged to:</p>
                            <ul className="text-gray-700 space-y-2 list-disc pl-5">
                                <li>Review previews carefully</li>
                                <li>Keep backups of important files</li>
                                <li>Use the tool with appropriate caution</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies & Tracking</h2>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-4">
                            <p className="text-gray-700 font-medium text-center">RenameTool does not use:</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-xl mb-2">🚫</div>
                                <p className="text-sm text-gray-700">Tracking cookies</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-xl mb-2">🚫</div>
                                <p className="text-sm text-gray-700">Advertising cookies</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-xl mb-2">🚫</div>
                                <p className="text-sm text-gray-700">Behavioral analytics</p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            We do not track individual users or collect browsing behavior data.
                        </p>
                    </div>

                    {/* Section 8 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Ads & Third-Party Services</h2>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-red-500 text-xl">×</span>
                                <span className="text-gray-700">No advertisements are displayed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-red-500 text-xl">×</span>
                                <span className="text-gray-700">No data is sold or shared</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-red-500 text-xl">×</span>
                                <span className="text-gray-700">No third-party services receive file access</span>
                            </div>
                        </div>
                        <p className="text-gray-700 font-medium">
                            RenameTool does not monetize user data.
                        </p>
                    </div>

                    {/* Section 9 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Security</h2>
                        <p className="text-gray-700 mb-4">
                            Since RenameTool does not upload or store files, the risk of data exposure is 
                            significantly reduced. All actions remain local to your device.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm">
                                However, users should ensure they understand the rename rules they apply before proceeding.
                            </p>
                        </div>
                    </div>

                    {/* Section 10 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
                        <p className="text-gray-700">
                            RenameTool does not knowingly collect any personal data from children under the age of 13. 
                            As no personal data is collected, the tool is safe for general use.
                        </p>
                    </div>

                    {/* Section 11 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. External Links</h2>
                        <p className="text-gray-700">
                            Our website may contain links to third-party websites. We are not responsible for 
                            the privacy practices or content of those external sites.
                        </p>
                    </div>

                    {/* Section 12 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
                        <p className="text-gray-700">
                            We may update this Privacy Policy from time to time to reflect changes in the tool 
                            or legal requirements. Any updates will be posted on this page with an updated revision date.
                        </p>
                    </div>

                    {/* Section 13 */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
                        <p className="text-gray-700 mb-6">
                            If you have any questions about this Privacy Policy or how RenameTool works, 
                            please contact us through our Contact Us page.
                        </p>
                        <div className="bg-linear-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                            <h3 className="font-bold text-gray-900 mb-3">Get in Touch</h3>
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
                            to="/terms-conditions" 
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                        >
                            Terms of Service
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
                <h2 className="text-3xl font-bold mb-4">Try Our Privacy-First File Renamer</h2>
                <p className="text-lg mb-8 opacity-90">
                    Rename files safely without uploading anything to the cloud.
                </p>
                <Link 
                    to="/" 
                    className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                    Try RenameTool - Free
                </Link>
            </div>
        </Container>
    );
};

export default PrivacyPolicy;