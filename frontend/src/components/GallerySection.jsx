export default function GallerySection() {
    const galleryItems = [
        {
            id: 1,
            title: "Prompt Engineers",
            description: "Bridging the gap between human intent and machine understanding through expert prompt design.",
            image: "https://images.unsplash.com/photo-1543269865-0a740d43b90c?q=80&w=800&h=400&auto=format&fit=crop",
            color: "from-indigo-500 to-purple-500"
        },
        {
            id: 2,
            title: "Data Scientists",
            description: "Extracting insights and patterns from complex datasets to drive informed decision-making.",
            image: "https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop",
            color: "from-blue-500 to-indigo-500"
        },
        {
            id: 3,
            title: "Software Engineers",
            description: "Building scalable solutions and robust systems that power modern applications and services.",
            image: "https://images.unsplash.com/photo-1736220690062-79e12ca75262?q=80&w=800&h=400&auto=format&fit=crop",
            color: "from-violet-500 to-purple-500"
        },
    ];

    return (
        <section className="pb-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Our Latest Creations
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        A visual collection of our most recent works - each piece crafted with intention, emotion, and style.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-[400px]"
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-linear-to-t ${item.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`} />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/30 to-transparent">
                                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/90 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        {item.description}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <button className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300 inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 py-2 rounded-lg w-fit">
                                    View Project
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>

                            {/* Top Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold text-slate-900">
                                Featured
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95">
                        View All Projects
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}