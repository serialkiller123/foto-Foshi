'use client'

import { useForm } from 'react-hook-form'
import { useImage } from '@/hooks/images'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function Upload() {
    const { register, handleSubmit } = useForm()
    const [selectedImage, setSelectedImage] = useState(null)
    const { uploadImage } = useImage()
    const router = useRouter()
    const { toast } = useToast()

    const onSubmit = async data => {
        try {
            const response = await uploadImage(data.image[0], data.description)

            if (response && response.id) {
                // Navigate to the image detail page
                router.push(`/images/${response.id}`)
                toast({
                    title: 'Uploaded',
                    description: 'Image uploaded successfully!',
                    duration: 5000,
                    className: 'success-toast',
                })
            } else {
                console.error('Image upload did not return a valid image ID')
                toast({
                    title: 'Error',
                    description: 'Image upload did not return a valid image ID',
                    duration: 5000,
                    className: 'error-toast',
                })
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            toast({
                title: 'Error',
                description: 'Error uploading image',
                duration: 5000,
                className: 'error-toast',
            })
        }
    }

    const handleImageChange = event => {
        const file = event.target.files[0]
        if (file) {
            setSelectedImage(URL.createObjectURL(file))
        }
    }

    return (
        <div className="flex items-center justify-center h-full py-10 bg-gray-100">
            <div className="max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Upload Image
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-center justify-center w-full h-80 bg-white border border-gray-300 rounded-lg shadow-md relative overflow-hidden">
                        {!selectedImage && (
                            <label
                                htmlFor="image"
                                className={`${cn(buttonVariants({ variant: 'primary' }))} bg-gray-300 rounded-full flex items-center justify-center cursor-pointer text-sm font-medium text-gray-500 `}>
                                Select Image
                            </label>
                        )}
                        <input
                            type="file"
                            id="image"
                            {...register('image')}
                            required
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="object-cover w-full h-full"
                            />
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register('description')}
                            className="w-full p-2 border rounded"
                            rows={4}></textarea>
                    </div>
                    <button
                        type="submit"
                        className={`${cn(buttonVariants({ variant: 'primary' }))} bg-themecolor hover:bg-yellow-300 text-white w-full py-2 rounded-xl flex items-center justify-center space-x-2`}>
                        Upload
                    </button>
                </form>
            </div>
        </div>
    )
}
