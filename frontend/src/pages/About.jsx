import { useNavigate } from "react-router-dom";
import Container from "../components/Container";

function About() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/');
    }

    return (
        <Container>
            {/* Hero Section - Split Layout */}
            <div className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                About Us
                            </h2>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Renametool is a simple, browser-based file renaming platform built to help people rename and organize files quickly and safely.
                                Our tool works directly on your computer, so your files stay private, secure, and fully under your control — with no uploads and no installations.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700">No upload</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-700">No download</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span className="text-gray-700">Fully secure</span>
                                </div>
                            </div>

                            <button onClick={handleGetStarted} className="cursor-pointer group relative px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 overflow-hidden">
                                <span className="relative z-10">Try RenameTool - Free</span>
                                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=870&auto=format&fit=crop"
                                    alt="Team Collaboration"
                                    className="w-full h-64 md:h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                            </div>

                            {/* Floating stats */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                                <div className="text-3xl font-bold text-indigo-600">10K+</div>
                                <div className="text-gray-600 text-sm">Happy Users</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-gray-200">
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">4.9/5</h3>
                    <p className="text-gray-600">Average Rating</p>
                </div>
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">10K+</h3>
                    <p className="text-gray-600">Happy Users</p>
                </div>
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">99%</h3>
                    <p className="text-gray-600">Satisfaction Ratio</p>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="max-w-6xl mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Mission */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            To make file renaming fast, simple, and secure for everyone by providing a privacy-first tool that works directly in the browser.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-2xl">🌟</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            To become a trusted, global solution for file organization by building tools that respect user privacy and save time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="py-8">
                <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {[
                        { icon: "🔒", title: "Privacy First", desc: "Your files never leave your device" },
                        { icon: "⚡", title: "Simplicity", desc: "Easy to use, no learning curve" },
                        { icon: "🚀", title: "Efficiency", desc: "Save time with bulk actions" },
                        { icon: "🤝", title: "Trust", desc: "Transparent and user-controlled" }
                    ].map((value, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
                            <div className="text-3xl mb-4">{value.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                            <p className="text-gray-600">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image & Features Section */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4 py-8">
                <img
                    className="max-w-lg w-full rounded-2xl h-auto shadow-xl"
                    src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
                    alt="Our Team at Work"
                />
                <div>
                    <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="Fast" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Rename files locally in your browser</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="Fast" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">No file uploads, No data storage</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="Fast" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">No software installation required</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="Fast" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Fast bulk file renaming</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="Fast" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Works on modern browsers</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white max-w-full mx-auto mt-8 mb-16">
                <h2 className="text-3xl font-bold mb-4">Advanced File Renamer Utility You Can Trust</h2>
                <p className="text-lg mb-8 opacity-90">
                    RenameTool helps you bulk rename and organize files safely without uploading anything.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => {navigate('/'); scrollTo({top:0, behavior: 'smooth'})}} className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 cursor-pointer">
                        Try RenameTool - Free
                    </button>
                    <button onClick={() => {navigate('/contact'); scrollTo({top:0, behavior: 'smooth'})}} className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300 cursor-pointer">
                        Contact Us
                    </button>
                </div>
            </div>
        </Container>
    );
}

export default About;