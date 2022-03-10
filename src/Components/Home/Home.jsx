import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './Home.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { ContextMedia } from './../Context/Context';

export default function Home() {
    let { trending, trendingTv, trendingPeople } = useContext(ContextMedia)
    let { loadingHome } = useContext(ContextMedia)

    // let [trending, setTrending] = useState([])
    // let [trendingTv, setTrendingTv] = useState([])
    // let [trendingPeople, setTrendingPeole] = useState([])
    // let [loadingHome, setloadingHome] = useState(false)


    // async function getTrendingItems(mediaType, callback) {
    //     let api = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=24e32b480f17aca5c824d0e60c02c3d9`)
    //     callback(api.data.results)
    //     setloadingHome(true)


    // }






    // useEffect(() => {
    //     getTrendingItems('movie', setTrending)
    //     getTrendingItems('tv', setTrendingTv)
    //     getTrendingItems('person', setTrendingPeole)

    // }, []);



    // console.log(trending)
    let firstPartOfUrl = 'https://image.tmdb.org/t/p/original/';

    let navigate = useNavigate();
    function getmovieid(id) {
        navigate({
            pathname: '/details',
            search: `?id=${id}`
        })
    }
    function gettvid(id) {
        navigate({
            pathname: '/detailstv',
            search: `?id=${id}`
        })
    }
    function getpeopleid(id) {
        navigate({
            pathname: '/detailspeople',
            search: `?id=${id}`
        })


    }

    return (
        <>
            {loadingHome ? (<div className="container ">

                <div className="row">

                    <div className=" d-flex align-items-center   col-md-4">
                        <div className="inner">
                            <div className={`w-25 ${styles.line}`}></div>
                            <h2 className=''>Trending</h2>
                            <h2>Movies</h2>
                            <h2 className='mb-1'>To Watch Now</h2>
                            <h6 className='secondColor'>Most watched movies by day</h6>
                            <div className={`w-100 ${styles.line}`}></div>
                        </div>

                    </div>

                    {trending.map((movie, index) =>


                        <div onClick={() => getmovieid(movie.id)} className={`col-md-2 my-3 ${styles.imghover}`} key={index}>

                            <div >

                                <img className='w-100' src={firstPartOfUrl + movie.backdrop_path} alt="" />
                                <h5 className='text-damger'>{movie.title}</h5>

                            </div>

                        </div>


                    )}
                </div>








                <div className="row">

                    <div className=" d-flex align-items-center   col-md-4">
                        <div className="inner">
                            <div className={` w-25 ${styles.line} `}></div>
                            <h2>Trending</h2>
                            <h2>TV</h2>
                            <h2 className='mb-1'>To Watch Now</h2>
                            <h6 className='secondColor'>Most watched Tv by day</h6>
                            <div className={` w-100 ${styles.line}`}></div>
                        </div>

                    </div>

                    {trendingTv.map((tv, index) =>
                        <div onClick={() => gettvid(tv.id)} className={`col-md-2 my-3 ${styles.imghover}`} key={index}>

                            <div>
                                <img className='w-100' src={firstPartOfUrl + tv.backdrop_path} alt="" />
                                <h5>{tv.name}</h5>
                            </div>

                        </div>
                    )}
                </div>






                <div className="row">

                    <div className=" d-flex align-items-center   col-md-4">
                        <div className="inner">
                            <div className={`w-25 ${styles.line}`}></div>
                            <h2>Trending</h2>
                            <h2>People</h2>
                            <h2 className='mb-1'>To Watch Now</h2>
                            <h6 className='secondColor'>Most watched Persons by day</h6>
                            <div className={`w-100 ${styles.line}`}></div>
                        </div>

                    </div>

                    {trendingPeople.map((person, index) =>
                        <div onClick={() => getpeopleid(person.id)} className={`col-md-2 my-3 ${styles.imghover}`} key={index}>

                            <div>
                                <img className='w-100' src={firstPartOfUrl + person.profile_path} alt="" />
                                <h5>{person.name}</h5>
                            </div>

                        </div>
                    )}
                </div>

            </div>) : (<div className="loadinghomepage text-black vh-100 bg-white d-flex justify-content-center align-items-center">

                <i className='spinner-border '></i>

            </div>)
            }



        </>
    )
}

//https://api.themoviedb.org/3/trending/all/day?api_key=24e32b480f17aca5c824d0e60c02c3d9
//https://developers.themoviedb.org/3/getting-started/images
//https://www.themoviedb.org/settings/api/new?type=developer
//moviedb api