import LoginLinks from '@/app/LoginLinks'
import Header from '../../components/Header'
import ImageGrid from '@/components/ImageGrid'

export const metadata = {
    title: 'FotoFoshi',
}

const Home = () => {
    return (
        <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden items-center justify-center">
                        <Header title="Feed" />
                        <ImageGrid />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
