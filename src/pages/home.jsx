import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import MainLayout from "../components/layouts/main";
import MovieCard from "../components/movieCard";
import SearchContext from "../contexts/SearchContext";
import { viewportMatchingValue } from "../utils/responsive";

const HomePage = () => {
    const carouselInitialPosition = viewportMatchingValue(1, 6, 6, 6)
    const [films, setFilms] = useState([])
    const carousel = useRef(null)
    const [carouselPosition, setCarouselPosition] = useState(carouselInitialPosition)
    const [noResults, setNoResults] = useState(false)
    //todo add transition hook to add loader when there is no movies

    useEffect(() => {
        axios.get('https://ghibliapi.herokuapp.com/films').then(({data}) => setFilms(data))
    }, [])

    const moveCarousel = (isNext) => {
        const colSize = carousel.current?.clientWidth / viewportMatchingValue(1, 6, 6, 6)
        carousel.current.scrollBy({
            left: isNext? colSize : -colSize,
            behavior: 'smooth'
        })
        setCarouselPosition(prev => isNext ? prev + 1 : prev - 1)
    }
    const slideNext = () => moveCarousel(true)
    const slidePrev = () => moveCarousel()

    const filteredFilms = (params) => {
        if (params) {
            // return films filtered, if none matches the search criteria, return all films
            // and show an alert.
            const filtered = films.filter(film => {
                let display = true
                if (params.dateFrom && params.dateTo) {
                    const releasedAt = new Date(film.release_date)
                    if (!(releasedAt >= new Date(params.dateFrom) && releasedAt <= new Date(params.dateTo))) display = false
                }
                if (params.searchQuery) {
                    const kw = new RegExp(`^${params.searchQuery}.*$`, "g")

                    if (!(film.title.toLowerCase().match(kw) ||
                          film.director.toLowerCase().match(kw) ||
                          film.director.toLowerCase().match(kw)
                        )) display = false
                }

                return display
            })

            if (filtered.length) {
                setNoResults(false)
                return filtered
            }
            else {
                setNoResults(true)
                return films
            }
        }
        return films 
    }

    
    return (
        <MainLayout>
            <SearchContext.Consumer>
                {searchParams => (
                    <div className="h-full flex flex-col">
                    <img src={films.length && films[carouselPosition].image} alt="" className="fixed blur-2xl w-screen h-screen object-fit" style={{zIndex: -1}} />
                    {noResults && (
                        <div className="p-3 w-1/4 mx-auto rounded bg-gray-200 text-gray-700 font-medium text-sm">
                            <i className="bx bx-sad mr-1 text-lg align-middle" />
                            We could not find any film with that search criteria
                        </div>
                    )}
                    <div className="flex items-center scroll-smooth">
                        <button disabled={carouselPosition === carouselInitialPosition} onClick={slidePrev} className="flex-shrink-0 w-12 h-12 enabled:bg-gray-900 bg-gray-400 rounded-full">
                            <i className='bx bx-chevron-left text-4xl text-white'></i>
                        </button>
                        <div ref={carousel} className="flex overflow-hidden mx-5 flex-grow">
                            {filteredFilms(searchParams).map((entry, idx) => (
                                <div key={idx} className="flex-none p-5 w-full md:w-1/6 lg:w-2/12 xl:w-2/12">
                                    <MovieCard title={entry.title} thumb={entry.image}></MovieCard>
                                </div>
                            ))}
                        </div>
                        <button disabled={carouselPosition === films.length} onClick={slideNext} className="enabled:bg-gray-900 flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full">
                            <i className='bx bx-chevron-right text-4xl text-white'></i>
                        </button>
                    </div>
                    {films.length && <FilmDetails film={films[carouselPosition]} />}
                </div>
                )}
            </SearchContext.Consumer>
        </MainLayout>
    )
}

const FilmDetails = ({ film }) => {
    return (
        <div className="bg-white/90 rounded-t-xl mt-auto -mb-10 mx-auto p-10 shadow-lg w-2/4 text-gray-700">
            <div className="font-black text-2xl">
                {film.title}
            </div>
            <div className="text-lg my-3">
                {film.description}
            </div>
            <div className="rounded-lg flex mb-4">
                <div className="font-bold pr-5">
                    <div className="py-2">Director</div>
                    <div className="py-2">Producer</div>
                    <div className="py-2">Release Date</div>
                </div>
                <div className="flew-grow-1">
                    <div className="py-2">{film.director}</div>
                    <div className="py-2">{film.producer}</div>
                    <div className="py-2">{film.release_date}</div>
                </div>
            </div>
            <button className="py-2 px-5 rounded-md text-red-700 border border-red-700 text-sm font-medium hover:bg-red-700 hover:text-white">
                <i className="bx bx-trash-alt align-middle mr-2"></i>
                Delete Title
            </button>
        </div>
    )
}

export default HomePage