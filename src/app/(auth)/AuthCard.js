const AuthCard = ({ logo, children }) => (
    <div className="h-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div>{logo}</div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-[10px]">
            {children}
        </div>
    </div>
)

export default AuthCard
