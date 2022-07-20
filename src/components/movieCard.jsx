const MovieCard = ({title, thumb}) => {
    return (
        <div className="relative">
            <img className="h-auto w-auto rounded-lg" src={thumb} alt={title} />
            <img style={{zIndex: -1}} className="blur-lg absolute top-0" src={thumb} alt="" />
        </div>
    )
}

export default MovieCard