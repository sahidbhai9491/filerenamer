import Container from "./Container";

function CTASection() {
    return (
        <Container>
            <div className="max-w-full py-16 md:pl-20 md:w-full max-md:text-center mx-2 md:mx-auto flex flex-col md:flex-row items-center justify-between text-left bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-white">
                <div>
                    <h1
                        className="text-4xl md:text-[46px] md:leading-[60px] font-semibold text-white">
                        Ready to try-out this app?
                    </h1>
                    <p className="bg-linear-to-r from-white to-[#CAABFF] text-transparent bg-clip-text text-lg">
                        Your next favourite tool is just one click away.
                    </p>
                </div>
                <button className="px-12 py-3 text-slate-800 bg-white rounded-full text-sm mt-4">
                    Get Started
                </button>
            </div>
        </Container>
    );
};

export default CTASection;