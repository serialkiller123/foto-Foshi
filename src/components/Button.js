import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${cn(buttonVariants({ variant: 'primary' }))} bg-themecolor hover:bg-yellow-300 text-white py-2 rounded-xl flex items-center justify-center space-x-2 ${className}`}
        {...props}
    />
)

export default Button
