import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import MainLayout from "../components/layouts/main";
import MovieCard from "../components/movieCard";
import SearchContext from "../contexts/SearchContext";
import { viewportMatchingValue } from "../utils/responsive";


const HomePage = () => {
    const [films, setFilms] = useState([])
    const carousel = useRef(null)
    const [currentFilm, setCurrentFilm] = useState('')
    const [noResults, setNoResults] = useState(false)
    const [scroll, setScroll] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)
    const context = useContext(SearchContext)
    //todo add transition hook to add loader when there is no movies

    useEffect(() => {
        axios.get('https://ghibliapi.herokuapp.com/films').then(({data}) => setFilms(data))
        // wait till the carousel node is rendered
        
        setTimeout(() => setMaxScroll(carousel.current.scrollWidth - carousel.current.clientWidth), 300)
        console.log("scroll is : ", maxScroll)
    }, [maxScroll])

    const moveCarousel = (isNext) => {
        const colSize = carousel.current?.clientWidth / viewportMatchingValue(1, 6, 6, 6)
        carousel.current.scrollBy({
            left: isNext? colSize : -colSize,
            behavior: 'smooth'
        })
    }
    const getCurrentFilm = films.find(f => f.id === currentFilm) || films[0]
    const slideNext = () => moveCarousel(true)
    const slidePrev = () => moveCarousel()
    const removeCurrentFilm = () => {
        setFilms(old => old.filter((f) => f.id !== currentFilm))
        setCurrentFilm(films[0].id)
        // todo add edge case: when there is only one film left
    }

    const handleNewFilm = newFilm => {
        setFilms(films => [newFilm, ...films])
        
        carousel.current.scrollTo({
            left: 0,
            behavior: 'smooth'
        })
        setCurrentFilm(films[0].id)
    }

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
        <MainLayout onPublish={handleNewFilm}>
            <SearchContext.Consumer>
                {searchParams => (
                    <div className="h-full flex flex-col">
                        <img src={films.length && getCurrentFilm.image} alt="" className="fixed blur-2xl w-screen h-screen object-fit" style={{zIndex: -1}} />
                        {noResults && (
                            <div className="p-3 w-1/4 mx-auto rounded bg-gray-200 text-gray-700 font-medium text-sm">
                                <i className="bx bx-sad mr-1 text-lg align-middle" />
                                We could not find any film with that search criteria
                            </div>
                        )}
                        <div className="flex items-center scroll-smooth">
                            <button disabled={scroll === 0} onClick={slidePrev} className="flex-shrink-0 w-12 h-12 enabled:bg-gray-900 bg-gray-400 rounded-full">
                                <i className='bx bx-chevron-left text-4xl text-white'></i>
                            </button>
                            <div ref={carousel} onScroll={e => setScroll(e.target.scrollLeft)} className="flex overflow-hidden mx-5 flex-grow">
                                {filteredFilms(searchParams).map((entry, idx) => (
                                    <div onClick={() => setCurrentFilm(entry.id)} key={idx} className="cursor-pointer flex-none p-5 w-full md:w-1/6 lg:w-2/12 xl:w-2/12">
                                        <MovieCard title={entry.title} thumb={entry.image}></MovieCard>
                                    </div>
                                ))}
                            </div>
                            <button disabled={scroll === maxScroll} onClick={slideNext} className="enabled:bg-gray-900 flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full">
                                <i className='bx bx-chevron-right text-4xl text-white'></i>
                            </button>
                        </div>
                        {films.length && (
                            <FilmDetails film={getCurrentFilm} onRemove={removeCurrentFilm} />
                        )}
                    </div>
                )}
            </SearchContext.Consumer>
        </MainLayout>
    )
}

const FilmDetails = ({ film, onRemove }) => {
    return (
        <div className="bg-white/90 rounded-t-xl mt-auto -mb-10 mx-auto p-10 shadow-lg w-2/4 text-gray-700">
            <div className="flex justify-between align-center">
                <div className="font-black text-2xl">
                    {film.title}
                </div>
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
            <button onClick={onRemove} className="py-2 px-5 rounded-md text-red-700 border border-red-700 text-sm font-medium hover:bg-red-700 hover:text-white">
                <i className="bx bx-trash-alt align-middle mr-2"></i>
                Delete Title
            </button>
        </div>
    )
}

export default HomePage