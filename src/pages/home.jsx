import axios from "axios";
import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/main";
import MovieCard from "../components/movieCard";

const HomePage = () => {
    const [films, setFilms] = useState([])
    //todo add transition hook to add loader when there is no movies

    useEffect(() => {
        axios.get('https://ghibliapi.herokuapp.com/films').then(({data}) => setFilms(data))
    }, [])

    return (
        <MainLayout>
            <div className="flex overflow-hidden rounded-lg">
                {films.map((entry, idx) => (
                    <div key={idx} className="flex-none p-5 w-full md:w-1/6 lg:w-2/12 xl:w-2/12">
                        <MovieCard title={entry.title} thumb={entry.image}></MovieCard>
                    </div>
                ))}
            </div>
        </MainLayout>
    )
}

export default HomePage