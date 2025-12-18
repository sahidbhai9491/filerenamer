import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactMethods = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
            ),
            title: "Call Us",
            details: "+1 (555) 123-4567",
            color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
            ),
            title: "Email Us",
            details: "hello@flexik.com",
            color: "bg-purple-50 text-purple-600 border-purple-200"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            ),
            title: "Visit Us",
            details: "San Francisco, CA",
            color: "bg-indigo-50 text-indigo-600 border-indigo-200"
        }
    ];

    const faqItems = [
        {
            question: "How soon will you respond to my message?",
            answer: "We typically respond within 24 hours during business days. For urgent matters, feel free to call us directly."
        },
        {
            question: "Do you offer free consultations?",
            answer: "Yes, we offer a free 30-minute initial consultation to discuss your project requirements and see how we can help."
        },
        {
            question: "What types of projects do you work on?",
            answer: "We specialize in web applications, mobile apps, UI/UX design, and digital transformation projects for businesses of all sizes."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium border border-indigo-200 mb-4">
                        Get in Touch
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a question or want to work together? Send us a message and we'll get back to you as soon as possible.
                    </p>
                </div>

                {/* Contact Methods - Horizontal Row */}
                <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
                    {contactMethods.map((method, index) => (
                        <a
                            key={index}
                            href={method.title === "Call Us" ? "tel:+15551234567" : method.title === "Email Us" ? "mailto:hello@flexik.com" : "#"}
                            className={`flex flex-col items-center p-6 rounded-xl border ${method.color} hover:shadow-md transition-shadow duration-300`}
                        >
                            <div className="p-3 rounded-lg mb-4">
                                {method.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                            <p className="text-gray-700">{method.details}</p>
                        </a>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Send us a message
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Fill out the form below and we'll get back to you soon.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="flex items-center px-4 py-3 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-3">
                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="flex items-center px-4 py-3 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-3">
                                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </svg>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="w-full bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="Tell us about your project or inquiry..."
                                        className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 outline-none resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mr-2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                    <path d="M12 17h.01"></path>
                                </svg>
                                Frequently Asked Questions
                            </h3>
                            
                            <div className="space-y-4">
                                {faqItems.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                                    >
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            {item.question}
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-3">
                                    Business Hours
                                </h4>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-medium">10:00 AM - 2:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-medium text-red-500">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full">
                        <div className="bg-white rounded-full px-6 py-3">
                            <p className="text-gray-700">
                                Prefer to talk?{' '}
                                <a href="tel:+15551234567" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                                    Call us directly
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;