import logo from '../../assets/logox600.png'

const MainLayout = ({ children }) => {
    return (
        <div>
            <div>
                <img style={{width: 250}} src={logo} alt="Ghibli Studios" />
            </div>
            <div className="p-10 bg-white/30 container mx-auto">
                {children}
            </div>
        </div>
    )
}

export default MainLayout
