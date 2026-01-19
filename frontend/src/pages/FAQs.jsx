import { useState } from "react";
import Container from "../components/Container";

const FAQs = () => {
    const [openSections, setOpenSections] = useState({});
    const [openGeneralFaqs, setOpenGeneralFaqs] = useState({});

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleGeneralFaq = (index) => {
        setOpenGeneralFaqs(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Alphabetical FAQs
    const alphabeticalFAQs = [
        { letter: "A", question: "What is RenameTool?", answer: "RenameTool is a free, browser-based file renaming tool that helps you rename and organize files directly on your computer without uploading them or installing software." },
        { letter: "B", question: "Can I rename multiple files at once?", answer: "Yes. RenameTool supports bulk and batch file renaming, allowing you to rename hundreds or thousands of files in one action." },
        { letter: "C", question: "Is RenameTool an alternative to command-line renaming?", answer: "Yes. RenameTool replaces risky terminal commands with a visual, preview-based interface that reduces errors." },
        { letter: "D", question: "Do my files get uploaded to any server?", answer: "No. Your files never leave your device. RenameTool works locally inside your browser." },
        { letter: "E", question: "Is RenameTool beginner-friendly?", answer: "Yes. The interface is simple and designed for users with no technical background." },
        { letter: "F", question: "Is RenameTool completely free?", answer: "Yes. RenameTool is 100% free to use with no hidden costs." },
        { letter: "G", question: "Which browsers are supported?", answer: "RenameTool works on modern browsers like Chrome, Edge, and Brave." },
        { letter: "H", question: "How does RenameTool rename files?", answer: "You select files or a folder, choose rename rules, preview the changes, and apply them instantly." },
        { letter: "I", question: "Do I need to install software?", answer: "No installation is required. RenameTool runs directly in your browser." },
        { letter: "J", question: "Does RenameTool use JavaScript?", answer: "Yes. It uses modern browser APIs to access files locally with your permission." },
        { letter: "K", question: "Can I replace or modify text in file names?", answer: "Yes. You can replace text, add prefixes, suffixes, and apply sequences." },
        { letter: "L", question: "Does RenameTool work on Linux?", answer: "Yes. It works on Linux through supported browsers without distro-specific setup." },
        { letter: "M", question: "Can I rename files on macOS without Terminal?", answer: "Yes. RenameTool lets Mac users rename files visually without using Terminal commands." },
        { letter: "N", question: "Do I need to create an account?", answer: "No. RenameTool does not require signup, login, or registration." },
        { letter: "O", question: "Is RenameTool an online tool?", answer: "Yes, but all file operations happen locally on your device, not online servers." },
        { letter: "P", question: "Can I preview changes before applying them?", answer: "Yes. RenameTool shows a live preview so you know exactly what will change." },
        { letter: "Q", question: "Is RenameTool fast?", answer: "Yes. It is optimized for speed, even with large folders." },
        { letter: "R", question: "Can I rename just one file?", answer: "Yes. RenameTool supports both single-file and bulk renaming." },
        { letter: "S", question: "Is RenameTool secure?", answer: "Yes. Since files never leave your device, your data stays private and secure." },
        { letter: "T", question: "Are there limits on file count or usage?", answer: "No artificial limits are imposed for normal use." },
        { letter: "U", question: "Can I undo a rename?", answer: "RenameTool helps prevent mistakes by previewing changes, but system-level undo depends on your OS." },
        { letter: "V", question: "Can I rename media files like images and videos?", answer: "Yes. RenameTool works with all file types." },
        { letter: "W", question: "Does RenameTool work on Windows?", answer: "Yes. It works on Windows using supported browsers." },
        { letter: "X", question: "Can I keep file extensions unchanged?", answer: "Yes. RenameTool preserves file extensions unless you choose to modify them." },
        { letter: "Y", question: "Why should I choose RenameTool over other tools?", answer: "Because it is free, secure, privacy-first, and requires no installation or signup." },
        { letter: "Z", question: "Does RenameTool show ads or track users?", answer: "No. RenameTool has no ads, no tracking, and no subscriptions." }
    ];

    // Trust FAQs
    const trustFAQs = [
        { question: "Is RenameTool free forever?", answer: "Yes. There is no subscription, no payment, and no usage lock." },
        { question: "Is login or registration required?", answer: "No. RenameTool works instantly without sign-in." },
        { question: "Are there ads?", answer: "No. The tool is completely ad-free." },
        { question: "Is my data stored anywhere?", answer: "No. Nothing is stored, logged, or uploaded." }
    ];

    // Speed FAQ
    const speedFAQ = {
        question: "How fast is RenameTool?",
        answer: "Based on internal testing, RenameTool can rename 7–10 PDF files in around one second. Speed may vary depending on file size, system performance, browser, and available memory."
    };

    // General FAQs
    const generalFAQs = [
        { question: "How to rename a file?", answer: "Renaming a file means changing its name so it's easier to identify later. On most systems, you can right-click the file, choose 'Rename,' type the new name, and press Enter. This works well for single files but becomes slow when you have many files to rename." },
        { question: "How do you rename a file on Windows?", answer: "On Windows, right-click the file and select Rename, or select the file and press F2. This method is simple, but it only works efficiently for one file at a time. Renaming many files manually can be time-consuming." },
        { question: "How do I rename files in bulk?", answer: "Bulk renaming means changing the names of multiple files at once using a rule or pattern. Instead of editing each file manually, you select all files, preview the new names, and apply the change in one step. This saves time and reduces mistakes." },
        { question: "How to batch rename files?", answer: "Batch renaming is commonly used when files follow a pattern, such as images, PDFs, or project files. You can batch rename by adding numbers, dates, or text to multiple filenames at once. This is useful for organizing large folders quickly." },
        { question: "How do I rename files without installing software?", answer: "Some tools allow you to rename files directly in the browser without installing anything. These tools work locally on your device, so your files are not uploaded. This is helpful if you want a quick solution without setup or storage concerns." },
        { question: "How to bulk rename files safely?", answer: "Safe bulk renaming means keeping your files on your own computer and previewing name changes before applying them. Always check the preview and keep a backup of important files to avoid accidental changes." },
        { question: "How to rename a PDF file online?", answer: "You can rename a PDF file online by using a browser-based file renaming tool that works locally. This allows you to change the file name without uploading the PDF, keeping your documents private and secure." },
        { question: "How do I rename files on Mac?", answer: "On macOS, select a file and press Return, or right-click and choose Rename. For multiple files, macOS provides a built-in rename option, but it has limited flexibility compared to dedicated bulk renaming tools." },
        { question: "How to rename a file in Linux?", answer: "In Linux, files can be renamed using the file manager or terminal commands like mv. While command-line methods are powerful, they can be confusing for beginners and risky without proper preview." },
        { question: "Why do users struggle with file renaming?", answer: "Users struggle because file renaming feels simple at first but becomes repetitive with large folders. Manual methods are slow, command-line tools feel complex, and upload-based tools raise privacy concerns." },
        { question: "What is the easiest way to rename many files?", answer: "The easiest way is using a bulk file rename tool that lets you select files, preview changes, and rename everything in one step. This avoids manual work and reduces errors." },
        { question: "Is it safe to rename files in the browser?", answer: "Yes, if the tool works locally and does not upload files to a server. Local browser tools allow renaming directly on your device while keeping full control over your files." },
        { question: "Should I back up files before renaming?", answer: "Yes. Even when using safe tools, it's always recommended to back up important files before bulk or batch renaming. This ensures you can restore files if something goes wrong." },
        { question: "When should I use batch renaming instead of manual renaming?", answer: "Use batch renaming when you have many files with similar names or patterns. Manual renaming is fine for one or two files, but batch renaming saves time for larger tasks." },
        { question: "Can bulk renaming improve file organization?", answer: "Yes. Consistent file names make folders easier to search, share, and manage. Bulk renaming helps keep projects organized and avoids confusion later." }
    ];

    return (
        <Container>
            {/* Hero Section */}
            <div className="pt-16 lg:pt-20">
                <div className="max-w-full mx-auto">
                    <div className="grid grid-cols-1">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Frequently Asked Questions
                            </h1>

                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                <span className="text-gray-700">Everything you need to know about RenameTool</span>
                            </div>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Find quick answers to common questions about using RenameTool, our features,
                                privacy policies, and how to get the most out of our file renaming utility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Speed FAQ - Prominent */}
            <div className="mb-12">
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{speedFAQ.question}</h3>
                            <p className="text-gray-700">{speedFAQ.answer}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust FAQs */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600">✓</span>
                    </span>
                    Trust & Security
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trustFAQs.map((faq, index) => (
                        <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-semibold text-gray-800 mb-3">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Alphabetical FAQs */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600">?</span>
                    </span>
                    Most Asked Questions About Us
                </h2>

                <div className="space-y-4">
                    {alphabeticalFAQs.map((faq) => (
                        <div key={faq.letter} className="border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggleSection(faq.letter)}
                                className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-center gap-4">
                                    {/* <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="font-bold text-indigo-600">{faq.letter}</span>
                                    </div> */}
                                    <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                                </div>
                                <span className="text-gray-400 text-xl">
                                    {openSections[faq.letter] ? '−' : '+'}
                                </span>
                            </button>
                            {openSections[faq.letter] && (
                                <div className="p-5 pt-0">
                                    <div className="">
                                        <p className="text-gray-700">{faq.answer}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* General FAQs */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600">?</span>
                    </span>
                    General File Renaming Questions
                </h2>

                <div className="space-y-4">
                    {generalFAQs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggleGeneralFaq(index)}
                                className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                            >
                                <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                                <span className="text-gray-400 text-xl ml-4">
                                    {openGeneralFaqs[index] ? '−' : '+'}
                                </span>
                            </button>
                            {openGeneralFaqs[index] && (
                                <div className="p-5 pt-0">
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white max-w-full mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-lg mb-8 opacity-90">
                    Can't find what you're looking for? Get in touch with our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/"
                        className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                    >
                        Try RenameTool Now
                    </a>
                    <a
                        href="/contact"
                        className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </Container>
    );
};

export default FAQs;