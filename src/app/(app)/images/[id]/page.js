'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useImage } from '@/hooks/images'
import { useAuth } from '@/hooks/auth'
import Loading from '../../Loading'
import Header from '@/components/Header'
import { MdOutlinePerson, MdCalendarToday } from 'react-icons/md'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useToast } from '@/components/ui/use-toast'

export default function ImageDetail() {
    const [image, setImage] = useState(null)
    const [author, setAuthor] = useState(null)
    const [open, setOpen] = useState(false)
    const { user } = useAuth({ middleware: 'auth' })
    const params = useParams()
    const { id } = params
    const { getImage, deleteImage } = useImage()
    const { getUser } = useAuth()
    const router = useRouter()
    const { toast } = useToast()

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const image = await getImage(id)
                setImage(image)
                console.log(user)
            } catch (error) {
                console.error('Error fetching image:', error)
            }
        }
        if (id) fetchImage()
    }, [id])

    useEffect(() => {
        const fetchUser = async () => {
            if (image) {
                const userId = image.user_id
                const user = await getUser(userId)
                setAuthor(user)
            }
        }
        fetchUser()
    }, [image])

    const handleDelete = async () => {
        setOpen(true)
    }

    const handleDeleteConfirm = async () => {
        await deleteImage(image.id)
        setOpen(false)
        router.push('/')
        toast({
            title: 'Done',
            description: 'Image deleted successfully!',
            duration: 5000,
            className: 'error-toast',
        })
    }

    const handleDeleteCancel = () => {
        setOpen(false)
    }

    const modal = (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={handleDeleteCancel}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[515px] h-auto sm:my-8 sm:max-w-lg sm:w-full">
                                <div className="absolute top-0 right-0 p-4 z-20">
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        onClick={handleDeleteCancel}>
                                        <span className="sr-only">Close</span>
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex flex-col gap-1 items-center text-center justify-center">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg
                                                className="h-6 w-6 text-red-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900">
                                                Are you sure?
                                            </Dialog.Title>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-center text-gray-500 px-12 py-4">
                                            You cant undo this delete operation.
                                            Are you sure you want to delete this
                                            photo?
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4 items-center justify-center">
                                    <button
                                        type="button"
                                        className="w-full md:w-[191px] inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-sm"
                                        onClick={handleDeleteConfirm}>
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full md:w-[191px] inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:text-sm"
                                        onClick={handleDeleteCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )

    if (!image) return <Loading />

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-4">
                <Link
                    href={'/'}
                    className={cn(buttonVariants({ variant: 'ghost' }))}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span className="hidden sm:inline">Back</span>
                </Link>
            </div>
            <Header
                title="Foto Details"
                className="text-center text-2xl sm:text-3xl"
            />

            <img
                src={`${backendURL}/storage/${image.filename}`}
                alt={image.description}
                className="w-full h-auto max-w-full object-cover rounded-lg shadow-md mb-4"
            />
            <div className="p-4 sm:p-6">
                <p className="text-gray-700 text-sm sm:text-base">
                    {image.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                        <MdCalendarToday size={20} />
                        <time dateTime={image.created_at}>
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }).format(new Date(image.created_at))}
                        </time>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <MdOutlinePerson size={20} />
                        <p>{author?.name}</p>
                    </div>
                </div>
            </div>
            {user.id === image.user_id && (
                <div className="text-center mt-4">
                    <button
                        onClick={handleDelete}
                        className={`${cn(buttonVariants({ variant: 'primary' }))} bg-[#EEEEEF] hover:bg-gray-300 text-red-600 w-full sm:w-auto py-2 rounded-full flex items-center justify-center space-x-2`}>
                        Delete Photo
                    </button>
                </div>
            )}
            {modal}
        </div>
    )
}
