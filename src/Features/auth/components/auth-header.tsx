interface AuthHeaderProps {
    heading: string
    subheading: string
}

export default function AuthHeader({heading, subheading}:AuthHeaderProps) {
    return (
        <div>
        <h2 className="text-3xl text-center font-bold text-gray-500 pt-2">
            {heading}
        </h2>
        <p className="text-center text-gray-500 pb-4">                
            {subheading}
        </p>
        </div>
    )
}