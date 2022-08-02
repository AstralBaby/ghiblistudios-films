const MovieCard = ({title, thumb}) => {
    return (
        <img className="h-full object-cover select-none rounded-lg shadow" src={thumb} alt={title} />
    )
}

export default MovieCard