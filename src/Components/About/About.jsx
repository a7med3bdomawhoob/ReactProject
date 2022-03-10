import React, { useContext } from 'react'
import { ContextMedia } from './../Context/Context';



export default function About() {
    let { x } = useContext(ContextMedia)


    return (
        <>
            <h1 className='bg-danger '> {x} </h1>
        </>
    )
}
