import useSWR from 'swr'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useGenerateApiKey = () => {
    const router = useRouter()

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const generateApiKey = async () => {
        await csrf()

        try {
            const { data } = await axios.post('/api/generate-key')
            return data.key
        } catch (error) {
            if (error.response) {
                console.error('Data:', error.response.data)
                console.error('Status:', error.response.status)
                console.error('Headers:', error.response.headers)
            } else if (error.request) {
                console.error('Request:', error.request)
            } else {
                console.error('Error:', error.message)
            }
            throw error
        }
    }

    const getApiKeys = async userId => {
        await csrf()
        try {
            const { data } = await axios.get(`/api/apikeys/${userId}`)
            return data
        } catch (error) {
            console.error('Failed to fetch API keys:', error)
            throw error
        }
    }

    const deleteAPIKey = async id => {
        try {
            await axios.delete(`/api/keys/${id}`)
            mutate()
        } catch (error) {
            console.error('Failed to delete API key:', error)
        }
    }

    return {
        generateApiKey,
        getApiKeys,
        deleteAPIKey,
    }
}
