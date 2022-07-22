import logo from '../../assets/logox600.png'

const MainLayout = ({ children }) => {
    return (
        <div className="w-screen h-screen bg-white/60 overflow-y-scroll flex flex-col">
            <div className="py-5">
                <img style={{width: 250}} src={logo} alt="Ghibli Studios" className="mx-auto" />
            </div>
            <div className="p-10 flex-1">
                {children}
            </div>
        </div>
    )
}

export default MainLayout
