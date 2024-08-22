import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MdOutlinePhotoCamera, MdSettings, MdLogout } from 'react-icons/md'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Navigation = ({ user }) => {
    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-[#FFF] border-b border-gray-100">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <ApplicationLogo />
                        </div>

                        {/* Navigation Links */}
                        {/* <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            {isloggedIn && (
                                <NavLink
                                    href="/"
                                    active={usePathname() === '/'}>
                                    Feed
                                </NavLink>
                            )}
                        </div> */}
                    </div>

                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6 gap-2">
                        <div className="ml-1">
                            <Link
                                href={'/apikeypage'}
                                className="flex items-center justify-center bg-[#F1F5F9] rounded-full h-10 w-10">
                                <MdSettings className="h-5 w-5 text-gray-600" />
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/upload"
                                className={`${cn(buttonVariants({ variant: 'primary' }))} bg-themecolor hover:bg-yellow-300 text-white rounded-xl flex items-center space-x-2`}>
                                <MdOutlinePhotoCamera className="h-5 w-5 " />
                                <span>Post a Photo</span>
                            </Link>
                        </div>
                        {user ? (
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                        <div className="flex flex-shrink-0 items-center justify-center bg-[#F1F5F9] rounded-full h-10 w-10  mr-1">
                                            <svg
                                                className="h-5 w-5 fill-current text-gray-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                        <div>{user?.name}</div>

                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>
                                {/* Authentication */}
                                <DropdownButton onClick={logout}>
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-shrink-0 items-center justify-center bg-[#F1F5F9] rounded-full h-8 w-8  mr-1">
                                            <MdLogout className="h-4 w-4 fill-current text-gray-400" />
                                        </div>
                                        Logout
                                    </div>
                                </DropdownButton>
                            </Dropdown>
                        ) : null}
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {!user ? (
                            // <ResponsiveNavLink
                            //     href="/"
                            //     active={usePathname() === '/dashboard'}>
                            //     Feed
                            // </ResponsiveNavLink>
                            <div className="items-center justify-center w-full">
                                <div className="items-center justify-center w-full p-2">
                                    <Link
                                        href="/login"
                                        className={`${cn(buttonVariants({ variant: 'primary' }))} bg-themecolor hover:bg-yellow-300 text-white rounded-xl flex items-center space-x-2 w-full`}>
                                        <MdOutlinePhotoCamera className="h-5 w-5 " />
                                        <span>Post a Photo</span>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center w-full p-2">
                                    <Link
                                        href="/login"
                                        className="text-sm text-gray-700 underline ">
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        className="ml-4 text-sm text-gray-700 underline">
                                        Register
                                    </Link>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Responsive Settings Options */}
                    {user && (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="items-center flex gap-5 justify-center w-full p-2">
                                <Link
                                    href="/login"
                                    className={`${cn(buttonVariants({ variant: 'primary' }))} bg-themecolor hover:bg-yellow-300 text-white rounded-xl flex items-center space-x-2 w-full`}>
                                    <MdOutlinePhotoCamera className="h-5 w-5 " />
                                    <span>Post a Photo</span>
                                </Link>
                                <Link
                                    href={'/apikeypage'}
                                    className="flex items-center justify-center bg-[#F1F5F9] rounded-full h-10 w-10">
                                    <MdSettings className="h-5 w-5 text-gray-600" />
                                </Link>
                            </div>
                            <div className="flex items-center px-4">
                                <div className="flex flex-shrink-0 items-center justify-center bg-[#F1F5F9] rounded-full h-10 w-10">
                                    <svg
                                        className="h-6 w-6 fill-current text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>

                                <div className="ml-3">
                                    <div className="font-medium text-base text-gray-800">
                                        {user?.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                {/* Authentication */}
                                <ResponsiveNavButton onClick={logout}>
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-shrink-0 items-center justify-center bg-[#F1F5F9] rounded-full h-8 w-8  mr-1">
                                            <MdLogout className="h-4 w-4 fill-current text-gray-400" />
                                        </div>
                                        Logout
                                    </div>
                                </ResponsiveNavButton>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navigation
