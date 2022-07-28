import { useEffect, useState } from "react"

const Dialog = ({children, open, width}) => {
    const [showWrapper, setShowWrapper] = useState(true)

    useEffect(() => {
        // add fading animation with a delay of 3s
        setTimeout(() => setShowWrapper(open), 100)
    }, [open])

    return (
        <>
            {showWrapper && (
                <div className={`fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-center transition-all ease-in-out duration-100 ${open ? 'bg-gray-900/90 backdrop-blur-sm' : 'bg-transparent'}`}>
                    <div className={`bg-white p-5 rounded shadow self-center`} style={{width}}>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Dialog