import { Check } from 'lucide-react';
import Container from './Container';

function FileNameChangerHero() {
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
                                Used by 10,000+ users
                            </p>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-center text-3xl leading-[50px] md:text-5xl md:leading-20 font-semibold max-w-4xl text-slate-900 mt-4">
                        File Name Changer Tool for Bulk Files Renaming
                    </h1>

                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 my-5">
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
                    </div>

                    <div className="flex flex-wrap justify-center items-center">
                        <p className='bg-red-100 py-2 px-5 rounded md:hidden my-5'>RenameTool works only in PC/Laptop.</p>
                    </div>
                </div>
            </section>
        </Container>
    );
}

export default FileNameChangerHero;