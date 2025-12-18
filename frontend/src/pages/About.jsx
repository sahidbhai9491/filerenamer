import Container from "../components/Container";

function About() {
    return (
        <Container>
            {/* Hero Section - Split Layout */}
            <div className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                About Us
                                <span className="block text-indigo-600 mt-2">Starts Here</span>
                            </h2>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                We're not just developers; we're your strategic partners in digital
                                transformation. From initial concept to final deployment, we ensure
                                your digital presence stands out and delivers results.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700">Get Noticed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-700">Generate Leads</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span className="text-gray-700">Drive Downloads</span>
                                </div>
                            </div>

                            <button className="group relative px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 overflow-hidden">
                                <span className="relative z-10">Start Your Project Today</span>
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
                                <div className="text-3xl font-bold text-indigo-600">500+</div>
                                <div className="text-gray-600 text-sm">Projects Delivered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-gray-200">
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">500+</h3>
                    <p className="text-gray-600">Projects Delivered</p>
                </div>
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">98%</h3>
                    <p className="text-gray-600">Client Satisfaction</p>
                </div>
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">50K+</h3>
                    <p className="text-gray-600">Downloads Generated</p>
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
                            To empower businesses with innovative digital solutions that drive growth,
                            enhance visibility, and create meaningful connections with their audience.
                        </p>
                        <p className="text-gray-600">
                            We're committed to delivering excellence through cutting-edge technology,
                            creative design, and strategic thinking.
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
                            To be the leading partner for businesses seeking digital transformation,
                            recognized globally for our innovation, reliability, and impact.
                        </p>
                        <p className="text-gray-600">
                            We envision a world where every business, regardless of size, can leverage
                            technology to achieve extraordinary success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="py-8">
                <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {[
                        { icon: "💡", title: "Innovation", desc: "Pushing boundaries with creative solutions" },
                        { icon: "🤝", title: "Collaboration", desc: "Working together for exceptional results" },
                        { icon: "⚡", title: "Excellence", desc: "Delivering quality in everything we do" },
                        { icon: "❤️", title: "Integrity", desc: "Honest and transparent partnerships" }
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
                        <div className="flex items-start gap-4">
                            <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="Fast" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Lightning-Fast Performance</h3>
                                <p className="text-gray-600 mt-2">Optimized solutions that load quickly and perform seamlessly across all devices.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png" alt="Design" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Beautifully Designed</h3>
                                <p className="text-gray-600 mt-2">Modern, user-centric designs that captivate audiences and enhance engagement.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="Integration" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Seamless Integration</h3>
                                <p className="text-gray-600 mt-2">Easy-to-implement solutions that work perfectly with your existing systems.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white max-w-full mx-auto mt-8 mb-16">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Digital Presence?</h2>
                <p className="text-lg mb-8 opacity-90">
                    Join hundreds of successful businesses that trust us with their digital journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                        Start Your Project
                    </button>
                    <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                        Schedule a Call
                    </button>
                </div>
            </div>
        </Container>
    );
}

export default About;