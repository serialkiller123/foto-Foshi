import Image from 'next/image'
import Link from 'next/link'

const ApplicationLogo = props => (
    <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 md:py-2">
            <Image
                src="/FotoFoshiLogo.png"
                alt="logo"
                width={180}
                height={28}
            />
        </Link>
    </div>
)

export default ApplicationLogo
