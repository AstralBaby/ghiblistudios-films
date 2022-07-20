import logo from '../../assets/logox600.png'

const MainLayout = ({ children }) => {
    return (
        <div className="w-screen h-screen bg-white/60">
            <div>
                <img style={{width: 250}} src={logo} alt="Ghibli Studios" />
            </div>
            <div className="p-10 container mx-auto">
                {children}
            </div>
        </div>
    )
}

export default MainLayout
