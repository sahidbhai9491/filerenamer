import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, Eye, EyeOff, Github, Lock, Mail, Shield, Twitter, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../contexts/AuthContext';

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            userType: 'user'
        }
    });

    const [showPassword, setShowPassword] = useState(false);
    const { setUser, setLoading, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(`/${user.userType}/dashboard`);
        }
    }, [user])

    const onSubmit = async (registrationData) => {
        setIsLoading(true);
        try {
            // Prepare registration data - store both name and code
            const registrationPayload = {
                fullName: registrationData.fullName,
                email: registrationData.email,
                password: registrationData.password,
                userType: registrationData.userType || 'user',
            };

            // Send registration request
            const { data } = await axiosInstance.post('/api/v1/users/register', registrationPayload);

            if (data.success) {
                const accessToken = data.data.accessToken;
                const refreshToken = data.data.refreshToken;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(data.data.user));

                setUser(data.data.user);

                const redirectPath = data.data.user.userType === 'admin'
                    ? '/admin/dashboard'
                    : '/user/dashboard';

                navigate(redirectPath);
                toast.success(data.message);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Registration failed');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo/Header */}
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">F</span>
                    </div>
                </div>

                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Join thousands of businesses already using Flexik
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className='text-gray-400' size={20} />
                                </div>
                                <input
                                    id="fullName"
                                    type="text"
                                    autoComplete="name"
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="John Doe"
                                    {...register('fullName', {
                                        required: 'Full name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Full name must be at least 2 characters'
                                        }
                                    })}
                                />
                            </div>
                            {errors.fullName && (
                                <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className='text-gray-400' size={20} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="you@example.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className='text-gray-400' size={20} />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Create a password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        },
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                                            message: 'Password must contain at least one number and one special character'
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="text-gray-400 hover:text-gray-600 cursor-pointer" size={20} />
                                    ) : (
                                        <Eye className="text-gray-400 hover:text-gray-600 cursor-pointer" size={20} />
                                    )}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Must be at least 8 characters with a number and special character
                            </p>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Terms Notice */}
                        <div className="text-center text-sm text-gray-600 pt-2">
                            By registering, you agree to our{' '}
                            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Privacy Policy
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 cursor-pointer"
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        {/* Social Registration */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Link
                                to={`/`}
                                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                            >
                                <Github className="w-5 h-5" />
                                <span className="ml-2">GitHub</span>
                            </Link>
                            <Link
                                to={`/`}
                                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                            >
                                <Twitter className="w-5 h-5 text-blue-400" />
                                <span className="ml-2">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to={`/`} className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Why join Flexik?</h3>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <Check className="text-green-500 mr-3 mt-0.5" size={20} />
                            <span className="text-gray-600">Access premium tools and features</span>
                        </div>
                        <div className="flex items-start">
                            <Check className="text-green-500 mr-3 mt-0.5" size={20} />
                            <span className="text-gray-600">Free 14-day trial with all features</span>
                        </div>
                        <div className="flex items-start">
                            <Check className="text-green-500 mr-3 mt-0.5" size={20} />
                            <span className="text-gray-600">No credit card required to start</span>
                        </div>
                    </div>
                </div>

                {/* Security Info */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center text-sm text-gray-500">
                        <Shield className="mr-2" size={16} />
                        Enterprise-grade security & privacy
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;