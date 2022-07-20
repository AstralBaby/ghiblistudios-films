import axios from "axios";
import { useEffect, useState, useRef } from "react";
import MainLayout from "../components/layouts/main";
import MovieCard from "../components/movieCard";
import { viewportMatchingValue } from "../utils/responsive";

const HomePage = () => {
    const carouselInitialPosition = viewportMatchingValue(1, 6, 6, 6)
    const [films, setFilms] = useState([])
    const carousel = useRef(null)
    const [carouselPosition, setCarouselPosition] = useState(carouselInitialPosition)
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

    return (
        <MainLayout className="">
            <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/qG3RYlIVpTYclR9TYIsy8p7m7AT.jpg" alt="" className="fixed blur-2xl w-screen h-screen object-fit" style={{zIndex: -1}} />
            <div className="flex items-center scroll-smooth">
                <button disabled={carouselPosition === carouselInitialPosition} onClick={slidePrev} className="flex-shrink-0 w-12 h-12 enabled:bg-gray-900 bg-gray-400 rounded-full">
                    <i className='bx bx-chevron-left text-4xl text-white'></i>
                </button>
                <div ref={carousel} className="flex overflow-hidden rounded-lg mx-5">
                    {films.map((entry, idx) => (
                        <div key={idx} className="flex-none p-5 w-full md:w-1/6 lg:w-2/12 xl:w-2/12">
                            <MovieCard title={entry.title} thumb={entry.image}></MovieCard>
                        </div>
                    ))}
                </div>
                <button disabled={carouselPosition === films.length} onClick={slideNext} className="enabled:bg-gray-900 flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full">
                    <i className='bx bx-chevron-right text-4xl text-white'></i>
                </button>
            </div>
        </MainLayout>
    )
}

export default HomePage