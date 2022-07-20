const MovieCard = ({title, thumb}) => {
    return (
        <div className="relative">
            <img className="h-auto w-auto rounded-lg shadow" src={thumb} alt={title} />
        </div>
    )
}

export default MovieCard