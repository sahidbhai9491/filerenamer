import { useState } from 'react';
import {
    Check,
    Play,
    MessageSquare,
    Presentation,
    FileText,
    PenTool,
    Calculator,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AITabSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: 0,
            label: "AI Summary",
            icon: Check,
            description: "Summarize YouTube videos, PDFs, files, audio, video, and web pages to gain insights quickly.",
            image: "https://cdn.notegpt.io/notegpt/static/home/ai-summary1.png",
            alt: "AI Summary"
        },
        {
            id: 1,
            label: "AI YouTube",
            icon: Play,
            description: "Batch summarize YouTube videos and playlists, subscribe to channels, and seamlessly view and summarize content.",
            image: "https://cdn.notegpt.io/notegpt/static/home/ai-youtube4.png",
            alt: "AI YouTube"
        },
        {
            id: 2,
            label: "AI Chat",
            icon: MessageSquare,
            description: "Get personalized answers to your questions with AI-powered responses.",
            image: "https://cdn.notegpt.io/notegpt/static/home/ai-chat2.png",
            alt: "AI Chat"
        },
        {
            id: 3,
            label: "AI Presentation",
            icon: Presentation,
            description: "Generate presentations quickly and visualize your ideas with ease.",
            image: "https://cdn.notegpt.io/notegpt/static/home/ai-ppt5.png",
            alt: "AI Presentation"
        },
        {
            id: 4,
            label: "AI PDF",
            icon: FileText,
            description: "Summarize, chat & translate PDFs with original layouts. Convert between PDF, Word, Markdown, Image & Excel seamlessly.",
            image: "https://cdn.notegpt.io/notegpt/static/home/ai-pdf1.png",
            alt: "AI PDF"
        },
        {
            id: 5,
            label: "AI Writer",
            icon: PenTool,
            description: "Human-like AI writing, AI Detector, smart paraphrasing & essay assistance for flawless content.",
            image: "https://cdn.notegpt.io/notegpt/static/home/ai-writer.webp",
            alt: "AI Writer"
        },
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <section
            className="pt-16 pb-8 px-4 md:px-8 lg:px-16"
            style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(46, 131, 251, 0.15) 35%, rgba(46, 131, 251, 0.15) 50%, rgba(255, 255, 255, 0.2) 100%)'
            }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-semibold text-center text-indigo-600 mb-8">
                    More than Note
                </h2>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
                    {tabs.map((tab, index) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === index;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(index)}
                                className={`
                  flex flex-col items-center gap-2 px-6 py-4 rounded-xl transition-all cursor-pointer duration-300
                  ${isActive
                                        ? 'bg-white shadow-lg   text-indigo-600'
                                        : 'bg-white/50 hover:bg-white/70 text-slate-600 hover:text-slate-900'
                                    }
                `}
                            >
                                <div className={`p-3 rounded-lg ${isActive ? 'bg-indigo-50' : 'bg-slate-100'}`}>
                                    <Icon size={24} />
                                </div>
                                <span className="font-medium text-sm whitespace-nowrap">
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className=" overflow-hidden">
                    <div className="px-8 md:px-12">
                        {/* Description */}
                        <p className="text-xl text-slate-700 mb-8 text-center leading-relaxed">
                            {tabs[activeTab].description}
                        </p>

                        {/* Image */}
                        <div className="relative rounded-xl overflow-hidden bg-linear-to-br from-slate-50 to-indigo-50 p-8">
                            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                Live Preview
                            </div>

                            <img
                                src={tabs[activeTab].image}
                                alt={tabs[activeTab].alt}
                                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                            />

                            {/* Stats overlay */}
                            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-indigo-600">98%</div>
                                        <div className="text-xs text-slate-600">Accuracy</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-indigo-600">10x</div>
                                        <div className="text-xs text-slate-600">Faster</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-indigo-600">24/7</div>
                                        <div className="text-xs text-slate-600">Available</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="px-8 py-10">
                        <div className="max-w-3xl mx-auto text-center">

                            <Link
                                to="/workspace/home"
                                className="inline-flex items-center gap-3 text-white bg-indigo-600 hover:bg-indigo-700 font-semibold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                <img
                                    src="https://cdn.notegpt.io/notegpt/static/home/ng-home-try.png"
                                    alt="Try Now"
                                    className="w-6 h-6"
                                />
                                <span>Try Free Now</span>
                                <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AITabSection;