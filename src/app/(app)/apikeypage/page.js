'use client'
import { useState, useEffect } from 'react'
import { useGenerateApiKey } from '@/hooks/apikey'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import { useAuth } from '@/hooks/auth'
import { useToast } from '@/components/ui/use-toast'
import { MdContentCopy, MdDelete } from 'react-icons/md'

export default function ApiKeyPage() {
    const { generateApiKey, getApiKeys, deleteAPIKey } = useGenerateApiKey()
    const { user } = useAuth({ middleware: 'auth' })
    const [apiKeys, setApiKeys] = useState([])
    const { toast } = useToast()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchApiKeys = async () => {
            if (user) {
                try {
                    const response = await getApiKeys(user.id)
                    const sortedKeys = response.keys.sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at),
                    )
                    setApiKeys(sortedKeys)
                    console.log(sortedKeys)
                } catch (error) {
                    console.error('Failed to fetch API keys:', error)
                }
            }
        }
        fetchApiKeys()
    }, [user, getApiKeys])

    const handleGenerateKey = async () => {
        try {
            const { key } = await generateApiKey()
            await getApiKeys(user.id)
            setApiKeys(prevKeys => [
                ...prevKeys,
                { key, created_at: new Date().toISOString() },
            ])
            toast({
                title: 'Successful',
                description: 'API Key generated successfully!',
                duration: 5000,
                className: 'success-toast',
            })
        } catch (error) {
            console.error('Failed to generate API key:', error)
        }
    }

    const handleDelete = async id => {
        if (confirm('Are you sure you want to delete this API key?')) {
            try {
                await deleteAPIKey(id)
                setApiKeys(prevKeys =>
                    prevKeys.filter(apiKey => apiKey.id !== id),
                )

                toast({
                    title: 'Dlete Successful',
                    description: 'API Key Deleted!',
                    duration: 5000,
                    className: 'success-toast',
                })
            } catch (error) {
                console.error('Failed to delete API key:', error)
            }
        }
    }

    const handleCopy = key => {
        navigator.clipboard.writeText(key)
        toast({
            title: 'Copied Successful',
            description: 'API Key coipied to clipboard successfully!',
            duration: 5000,
            className: 'success-toast',
        })
    }

    return (
        <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 justify-center items-center">
                <Header title="API Settings" className="text-center" />
                <div className="mx-auto overflow-hidden sm:rounded-lg justify-center items-center w-auto lg:w-[750px] h-auto p-5 space-y-3">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                        <h1>You have {apiKeys.length} API key(s)</h1>
                        <Button onClick={handleGenerateKey}>
                            Generate a new key
                        </Button>
                    </div>
                    <div className="mt-4">
                        {apiKeys.length > 0 ? (
                            <ul className="space-y-2">
                                {apiKeys.map((apiKey, index) => (
                                    <li
                                        key={index}
                                        className="p-2 border rounded bg-white shadow-lg flex justify-between items-start sm:items-center sm:flex-row flex-col gap-y-2">
                                        <div className="flex-1">
                                            <div className="font-semibold break-all">
                                                {apiKey.key}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Created At:{' '}
                                                {new Date(
                                                    apiKey.created_at,
                                                ).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="flex gap-5">
                                            <MdContentCopy
                                                className="text-xl cursor-pointer hover:text-blue-500"
                                                onClick={() =>
                                                    handleCopy(apiKey.key)
                                                }
                                            />
                                            <MdDelete
                                                className="text-xl cursor-pointer hover:text-red-500"
                                                onClick={() =>
                                                    handleDelete(apiKey.id)
                                                }
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                Please generate one to get started.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
