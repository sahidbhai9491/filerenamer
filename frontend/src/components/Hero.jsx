import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Container from './Container';

function Hero() {
    const handleGetStarted = () => {
        // Add your get started logic here
        console.log('Get started clicked');
    };

    const handlePricing = () => {
        // Add your pricing navigation logic here
        console.log('Pricing clicked');
    };

    return (
        <Container>
            <section className="flex flex-col items-center text-sm bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat">
                <div className="flex flex-col items-center max-md:px-2 w-full">
                    {/* Announcement Badge */}
                    {/* Avatars + Stars */}
                    <div className="flex items-center mt-10">
                        <div className="flex -space-x-3 pr-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" loading='lazy' alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1" />
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" loading='lazy' alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" loading='lazy' alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-3" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" loading='lazy' alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-4" />
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" loading='lazy' alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-5" />
                        </div>

                        <div>
                            <div className="flex ">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-indigo-600" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-700">
                                Used by 1000+ users
                            </p>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-center text-3xl leading-[50px] md:text-5xl md:leading-20 font-semibold max-w-4xl text-slate-900 mt-4">
                        Bulk File Renamer <br /> File Rename Utility Online
                    </h1>

                    {/* Subheading */}
                    <p className="text-center text-base text-slate-700 max-w-4xl mt-6">
                        Rename multiple files in seconds, safely and easily, directly from your browser. Works on Windows, Mac, and Linux — no installation needed.
                    </p>

                    {/* CTA Buttons */}
                    {/* <div className="flex items-center gap-4 mt-8">
                        <button
                            onClick={handleGetStarted}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11 transition-all duration-200"
                        >
                            Get started
                            <ArrowRight size={18} />
                        </button>

                        <Link
                            to="/pricing"
                            className="flex items-center border border-slate-600 active:scale-95 hover:bg-slate-50 transition-all duration-200 text-slate-600 rounded-lg px-8 h-11"
                        >
                            Pricing
                        </Link>
                    </div> */}

                    {/* <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 my-5">
                        <div className="flex items-center gap-2">
                            <Check className="size-5 text-indigo-600" />
                            <span className="text-slate-700">No Software Installation</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Check className="size-5 text-indigo-600" />
                            <span className="text-slate-700">No upload</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Check className="size-5 text-indigo-600" />
                            <span className="text-slate-700">Full privacy</span>
                        </div>
                    </div> */}

                    <div className="flex flex-wrap justify-center items-center">
                        <p className='bg-red-100 py-2 px-5 rounded md:hidden my-5'>RenameTool works only in PC/Laptop.</p>
                    </div>

                    {/* Hero Image */}
                    {/* YouTube Video with Screenshot Preview */}
                    {/* <div className="w-full rounded-[15px] overflow-hidden max-w-4xl mt-16 shadow-2xl relative group">
                        <div className="w-full aspect-video bg-linear-to-br from-slate-900 to-indigo-900 flex items-center justify-center cursor-pointer relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30"
                                style={{
                                    backgroundImage: 'url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/dashboard-image-1.png)'
                                }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/40 to-indigo-900/30" />

                            <div className="relative z-10 flex flex-col items-center space-y-8 p-8">
                                <div className="relative">
                                    <div className="absolute -inset-6 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                                    <div className="relative w-24 h-24 bg-linear-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-indigo-500/50 group-hover:scale-110 transition-all duration-500">
                                        <div className="ml-2">
                                            <svg className="w-14 h-14 text-transparent bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-3">
                                    <h3 className="text-white text-3xl font-bold tracking-tight">
                                        Product Walkthrough
                                    </h3>
                                    <p className="text-white/80 text-lg max-w-md">
                                        See how our platform transforms your workflow in just 5 minutes
                                    </p>
                                </div>

                                <div className="flex items-center gap-8 text-white/60 text-sm">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>5:24 min</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>HD Quality</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        <span>10K+ views</span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-slate-900 to-transparent" />
                        </div>
                    </div> */}
                </div>
            </section>
        </Container>
    );
}

export default Hero;