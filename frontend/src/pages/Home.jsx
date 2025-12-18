import AITabSection from "../components/AITabSection";
import Container from "../components/Container";
import CTASection from "../components/CTASection";
import GallerySection from "../components/GallerySection";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";

function Home() {
    return (
        <>
            <Hero />
            <Container>
                <div className="text-center mt-12">
                    <a
                        href="/dashboard"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        🚀 Launch File Processor
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </a>
                    <p className="mt-2 text-sm text-gray-600">
                        No login required • Process files directly in your browser
                    </p>
                </div>
            </Container>
            <AITabSection />
            <GallerySection />
            <Testimonials />
            {/* <CTASection /> */}
        </>
    );
}

export default Home;