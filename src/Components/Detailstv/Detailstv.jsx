import axios from 'axios';
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react';
// import style from './Detailstv.module.css'
export default function Detailstv() {
    let [searchParam, setsearchparam] = useSearchParams();
    let idfromsearchparam = searchParam.get('id');
    let [details, setdetails] = useState({})


    async function getdetails(movie_people_tv, id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${movie_people_tv}/${id}?api_key=24e32b480f17aca5c824d0e60c02c3d9&language=en-US`);
        console.log(data)
        setdetails(data)

    }
    useEffect(() => {
        getdetails('tv', idfromsearchparam);

    }, [])
    let firstPartOfUrl = 'https://image.tmdb.org/t/p/original/';
    return (
        <>


            <div id='boosterid' >
                {/* <div id='boosterid' className=''> */}


                <div className="row">
                    <div className="col-md-4 ">
                        <div className="film mt-5 ms-5">
                            <img className=' w-100' src={firstPartOfUrl + details.backdrop_path} alt="" />
                        </div>
                    </div>

                    <div className="col-md-8  ">
                        <div className=" mt-5">
                            {details.name}
                        </div>
                        <div className=" ">
                            {details.last_air_date + ' ' + '(US .)'}



                        </div>
                        <div className=" ">
                            {'voteCount :' + ' ' + details.vote_count}
                        </div>
                        <div className=" ">
                            {'vote Average :' + ' ' + details.vote_average}
                        </div>

                        <div className=" ">
                            {details.overview}
                        </div>
                        <div className=" ">


                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
//https://api.themoviedb.org/3/movie/840882?api_key=24e32b480f17aca5c824d0e60c02c3d9&language=en-US