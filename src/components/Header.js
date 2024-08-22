import { cn } from '@/lib/utils'

const Header = ({ title, className }) => {
    return (
        <header>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2
                    className={cn(
                        'font-semibold text-xl text-gray-800 leading-tight',
                        className,
                    )}>
                    {title}
                </h2>
            </div>
        </header>
    )
}

export default Header
