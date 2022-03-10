import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ContextMedia } from './../Context/Context';
import styles from './People.module.css'
export default function People() {
    let { trendingPeople } = useContext(ContextMedia)
    let { loadingHome } = useContext(ContextMedia)
    // let [trendingPeople, setTrendingPeole] = useState([])


    // let [loadingHome, setloadingHome] = useState(false)


    // async function getTrendingItems(mediaType, callback) {
    //     let api = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=24e32b480f17aca5c824d0e60c02c3d9`)
    //     callback(api.data.results)
    //     setloadingHome(true)

    // }


    // useEffect(() => {

    //     getTrendingItems('person', setTrendingPeole)


    // }, []);


    let navigate = useNavigate();
    function getpeopleid(id) {
        navigate({
            pathname: '/detailspeople',
            search: `?id=${id}`
        })
    }
    // console.log(trending)
    let firstPartOfUrl = 'https://image.tmdb.org/t/p/original/'
    return (
        <>
            {loadingHome ? (<div className="container ">











                <div className="row">

                    <div className=" d-flex align-items-center   col-md-4">
                        <div className="inner">
                            <div className='line'></div>
                            <h2>Trending</h2>
                            <h2>People</h2>
                            <h2 className='mb-1'>To Watch Now</h2>
                            <h6 className='secondColor'>Most watched Persons by day</h6>
                            <div className='bigline'></div>
                        </div>

                    </div>

                    {trendingPeople.map((person, index) =>
                        <div onClick={() => getpeopleid(person.id)} className="col-md-2 my-3  " key={index}>
                            <div className={`${styles.imghover}`}>
                                <img className='w-100' src={firstPartOfUrl + person.profile_path} alt="" />
                                <h5>{person.name}</h5>
                            </div>
                        </div>
                    )}
                </div>

            </div>) : (<div className="loadinghomepage text-black vh-100 bg-white d-flex justify-content-center align-items-center">

                <i className='fas fa-spinner fa-spin fs-1 '></i>



            </div>)
            }



        </>
    )
}
