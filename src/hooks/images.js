import useSWR from 'swr'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'

export const useImage = () => {
    const router = useRouter()

    // Fetch images using SWR
    const {
        data: images,
        error,
        mutate,
    } = useSWR('/api/images', () =>
        axios
            .get('/api/images')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    // Function to get CSRF token
    const csrf = async () => axios.get('/sanctum/csrf-cookie')

    // Upload Image
    const uploadImage = async (file, description) => {
        await csrf()
        const formData = new FormData()
        formData.append('image', file)
        formData.append('description', description)

        try {
            const { data } = await axios.post('/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            mutate()
            if (data && data.id) {
                return data
            } else {
                throw new Error('Invalid response format')
            }
        } catch (error) {
            handleError(error)
            throw error
        }
    }

    // Get All Images
    const getImages = async () => {
        try {
            const { data } = await axios.get('/api/images')
            return data
        } catch (error) {
            handleError(error)
            throw error
        }
    }

    // Get Single Image
    const getImage = async id => {
        try {
            const { data } = await axios.get(`/api/images/${id}`)
            return data
        } catch (error) {
            handleError(error)
            throw error
        }
    }

    // Delete Image
    const deleteImage = async id => {
        await csrf() // Ensure CSRF token is set

        try {
            await axios.delete(`/api/images/${id}`)
            mutate() // Refresh the image list
        } catch (error) {
            handleError(error)
            throw error
        }
    }

    // Error handling function
    const handleError = error => {
        if (error.response) {
            console.error('Data:', error.response.data)
            console.error('Status:', error.response.status)
            console.error('Headers:', error.response.headers)
        } else if (error.request) {
            console.error('Request:', error.request)
        } else {
            console.error('Error', error.message)
        }
    }

    return {
        images,
        error,
        uploadImage,
        getImages,
        getImage,
        deleteImage,
    }
}
