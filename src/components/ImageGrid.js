'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useImage } from '@/hooks/images'
import Image from 'next/image'

export default function ImageGrid() {
    const [images, setImages] = useState([])
    const { getImages } = useImage()

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getImages()
                if (Array.isArray(data)) {
                    setImages(data)
                } else {
                    console.error('Expected an array of images, but got:', data)
                    setImages([]) // Set to empty array if data is not as expected
                }
            } catch (error) {
                console.error('Error fetching images:', error)
                setImages([]) // Set to empty array in case of error
            }
        }
        fetchImages()
    }, [getImages])

    return (
        <div className="flex flex-wrap justify-center gap-[30px]">
            {images.length === 0 ? (
                <p className="text-center text-gray-500">
                    No images available.
                </p>
            ) : (
                images.map(image => (
                    <Link
                        key={image.id}
                        href={`/images/${image.id}`}
                        className="flex-shrink-0">
                        <img
                            src={`${backendURL}/storage/${image.filename}`}
                            alt={image.description}
                            className="w-[362px] h-[362px] object-cover rounded-[15px] shadow-md"
                        />
                    </Link>
                ))
            )}
        </div>
    )
}
