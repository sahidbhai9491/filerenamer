import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Main Links */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
                    <Link 
                        to="/privacy-policy" 
                        className="text-white hover:text-indigo-200 transition-colors duration-200 text-sm font-medium"
                    >
                        Privacy Policy
                    </Link>
                    
                    <Link 
                        to="/terms-conditions" 
                        className="text-white hover:text-indigo-200 transition-colors duration-200 text-sm font-medium"
                    >
                        Terms & Conditions
                    </Link>
                    
                    <Link 
                        to="/changelog" 
                        className="text-white hover:text-indigo-200 transition-colors duration-200 text-sm font-medium"
                    >
                        Changelog
                    </Link>
                </div>
                
                {/* Copyright */}
                <div className="text-center pt-6 border-t border-indigo-500 border-opacity-30">
                    <p className="text-indigo-200 text-sm">
                        &copy; {new Date().getFullYear()} RenameTool. All rights reserved.
                    </p>
                    <p className="text-indigo-300 text-xs mt-2">
                        Your files stay on your device • No uploads • No tracking
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;