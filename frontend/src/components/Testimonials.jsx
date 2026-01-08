import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Container from './Container';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Mark R.",
            address: "New York, USA",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            rating: 5,
            review: "I didn’t realize how much time I was wasting renaming files until I started using RenameTool. I work with a lot of folders every week, and this tool lets me rename everything in one go without installing any software. It’s simple, fast, and I feel safe knowing my files never leave my computer."
        },
        {
            id: 2,
            name: "Rohit S.",
            address: "Mumbai, India",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            rating: 5,
            review: "RenameTool made my daily work much easier. Earlier, I had to manually rename files for every project, which was tiring and slow. Now I just select the folder, apply the rule, and everything is renamed instantly. No uploads, no confusion — it just works smoothly in the browser."
        },
        {
            id: 3,
            name: "Sophia H.",
            address: "London, UK",
            image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
            rating: 5,
            review: "I use RenameTool almost every day now. Managing files used to feel messy, especially when working on multiple tasks. This tool helps me keep everything clean and organised without any setup. I like that it runs locally and respects privacy — it feels reliable and well thought out."
        }
    ];

    const navigate = useNavigate();

    const handleGetStarted = () => {
        // Navigate to get started page or open get started modal
        // navigate('');
        scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <section
            className="pb-16 px-4 md:px-8 lg:px-16 pt-10"
            style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(46, 131, 251, 0.15) 35%, rgba(46, 131, 251, 0.15) 50%, rgba(255, 255, 255, 0.2) 100%)'
            }}
        >
            <Container>
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Users Say About RenameTool
                        </h1>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                            Discover how RenameTool helps users rename files locally and securely. Learn how RenameTool makes file renaming faster, safer, and easier.
                        </p>

                        {/* <Link
                            to="/reviews"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                            onClick={handleLeaveReview}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Leave a Review
                        </Link> */}
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <img
                                            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            loading='lazy'
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{testimonial.name}</h3>
                                        <p className="text-slate-600 text-sm flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {testimonial.address}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-6">
                                    {Array(5).fill(0).map((_, index) => (
                                        <Star
                                            key={index}
                                            size={20}
                                            className={index < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}
                                        />
                                    ))}
                                    <span className="text-sm text-slate-600 ml-2">{testimonial.rating}.0</span>
                                </div>

                                {/* Review */}
                                <blockquote className="relative">
                                    <div className="absolute -top-2 -left-2 text-4xl text-indigo-200">"</div>
                                    <p className="text-slate-700 text-lg leading-relaxed pl-4">
                                        {testimonial.review}
                                    </p>
                                    <div className="absolute -bottom-4 -right-2 text-4xl text-indigo-200">"</div>
                                </blockquote>

                                {/* Verification Badge */}
                                <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-100">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-slate-600">Verified User</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
                                <p className="text-white/90">Average Rating</p>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                                <p className="text-white/90">Happy Users</p>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
                                <p className="text-white/90">Satisfaction Rate</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <p className="text-slate-700 text-lg mb-6">
                            Rename and organise files in seconds with RenameTool.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={handleGetStarted}
                                className="inline-flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                Try RenameTool - Free & Secure
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            {/* <Link
                                to="/testimonials"
                                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-indigo-600 font-semibold px-8 py-3 rounded-lg border border-indigo-200 transition-all duration-300 hover:scale-105"
                            >
                                Read More Reviews
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;