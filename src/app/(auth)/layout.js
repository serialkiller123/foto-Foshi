'use client'
import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'

const Layout = ({ children }) => {
    const { user } = useAuth({ middleware: 'guest' })
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <Navigation user={user} />
            <div className="text-gray-900 antialiased">
                <AuthCard
                    logo={
                        <div>
                            {/* <ApplicationLogo className="w-20 h-20 fill-current" /> */}
                            <Header
                                title={
                                    pathname === '/login'
                                        ? 'Login to FotoFoshi'
                                        : pathname === '/register'
                                          ? 'Sign Up'
                                          : pathname === '/forgot-password'
                                            ? 'Reset Password'
                                            : pathname === '/verify-email'
                                              ? 'Email Verification'
                                              : 'FotoFoshi'
                                }
                                className={
                                    'font-semibold text-2xl text-gray-800 leading-tight'
                                }
                            />
                        </div>
                    }>
                    <main>{children}</main>
                </AuthCard>
                {pathname === '/login' ? (
                    <>
                        <div className="flex flex-col items-center justify-center text-center mt-6">
                            <div className="flex flex-col md:flex-row gap-1">
                                <p className=" text-sm text-gray-600 ">
                                    Don't have an account?
                                </p>
                                <Link
                                    href="/register"
                                    className="text-sm text-themecolor hover:text-gray-900">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <Link
                                href="/forgot-password"
                                className="underline text-xs text-gray-600 hover:text-gray-900">
                                Forgot your password?
                            </Link>
                        </div>
                    </>
                ) : pathname === '/register' ? (
                    <>
                        <div className="flex flex-col items-center justify-center text-center mt-6">
                            <div className="flex flex-col md:flex-row gap-1">
                                <p className=" text-sm text-gray-600 ">
                                    Already have an account?
                                </p>
                                <Link
                                    href="/login"
                                    className="text-sm text-themecolor hover:text-gray-900">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </>
                ) : pathname === '/forgot-password' ? (
                    <>
                        <div className="flex flex-col items-center justify-center text-center mt-6">
                            <div className="flex flex-col md:flex-row gap-3">
                                <Link
                                    href="/login"
                                    className="text-sm underline text-gray-600 hover:text-gray-900">
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-sm underline text-gray-600 hover:text-gray-900">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Layout
