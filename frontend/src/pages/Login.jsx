import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Github, Lock, Mail, Shield, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    const [showPassword, setShowPassword] = useState(false);
    const { setUser, login, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (loginData) => {
        setIsLoading(true);
        try {
            setIsLoading(true);

            // Convert email to lowercase before sending to API
            const normalizedLoginData = {
                email: loginData.email.toLowerCase().trim(),
                password: loginData.password
            };

            const data = await login(normalizedLoginData);

            if (data && data.success) {
                toast.success(data.message);
                navigate(`/${data.userType}/dashboard`);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
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
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Sign in to your account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-gray-400" size={20} />
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
                                    <Lock className="text-gray-400" size={20} />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your password"
                                    {...register('password', {
                                        required: 'Password is required'
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
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    {...register('rememberMe')}
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
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
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Link
                                to="#"
                                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                            >
                                <Github className="w-5 h-5" />
                                <span className="ml-2">GitHub</span>
                            </Link>
                            <Link
                                to="#"
                                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                            >
                                <Twitter className="w-5 h-5 text-blue-400" />
                                <span className="ml-2">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center text-sm text-gray-500">
                        <Shield className="mr-2" size={16} />
                        Your data is secure and encrypted
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;