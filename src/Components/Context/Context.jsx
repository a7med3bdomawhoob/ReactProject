import { createContext } from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'



export let ContextMedia = createContext([]);

export function ContextMediaProvider(props) {
    let [x, setx] = useState(0)
    let [trending, setTrending] = useState([])
    let [trendingTv, setTrendingTv] = useState([])
    let [trendingPeople, setTrendingPeole] = useState([])
    let [loadingHome, setloadingHome] = useState(false)


    async function getTrendingItems(mediaType, callback) {
        let api = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=24e32b480f17aca5c824d0e60c02c3d9`)
        callback(api.data.results)
        setloadingHome(true)


    }






    useEffect(() => {
        getTrendingItems('movie', setTrending)
        getTrendingItems('tv', setTrendingTv)
        getTrendingItems('person', setTrendingPeole)

    }, []);

    return <ContextMedia.Provider value={{ trending, trendingTv, trendingPeople, loadingHome, x }} >

        {props.children}

    </ContextMedia.Provider>

}