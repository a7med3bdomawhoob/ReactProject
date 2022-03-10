import axios from 'axios'
import React, { useState } from 'react'
import joi from 'joi';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    let [data, setData] = useState({
        first_name: '',
        last_name: '',
        age: '',
        email: '',
        password: '',
    })

    let [message, setMessage] = useState('');
    let [validateError, setvalidateerror] = useState([])
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate();
    function routingNavigate() {
        navigate('/login')
    }
    async function submitFormData(e) {
        e.preventDefault();
        setLoading(true)
        let validationResult = validationForm();
        if (validationResult.error) {
            setLoading(false)
            setvalidateerror(validationResult.error.details)

        }
        else {
            let user = await axios.post("https://routeegypt.herokuapp.com/signup", data);
            if (user.data.message == 'success') {
                setLoading(false)
                setMessage(user.data.message)
                routingNavigate()

            }
            else {
                setLoading(false)
                setMessage(user.data.message)
            }
        }

        console.log(validationResult)


    }
    function validationForm() {
        const schema = joi.object({
            first_name: joi.string().required().min(3).max(20),
            last_name: joi.string().required().max(20).min(3),
            age: joi.number().required().min(20).max(80),
            email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
            password: joi.string().required()
        })

        return schema.validate(data, { abortEarly: false })
    }

    function getData(e) {
        let newData = { ...data }
        let x = e.target.name
        newData[x] = e.target.value
        setData(newData)
        console.log(newData)
    }

    return (
        <>
            <div className="container my-5 w-75 m-auto">
                <h1 className='text-white my-3'>Registeration Form</h1>
                {validateError.map((error) => <div className='alert alert-danger'>{error.message}</div>)}
                {message != '' ? <div className="alert alert-danger">{message}</div> : ''}
                <form onSubmit={submitFormData}>
                    <div className="input_group my-2">
                        <label htmlFor="first_name">firstname :</label>
                        <input onChange={getData} className='form-control ' type="text" name='first_name' />

                    </div>


                    <div className="input_group my-2">
                        <label htmlFor="last_name">lastname :</label>
                        <input onChange={getData} className='form-control ' type="text" name='last_name' />
                    </div>
                    <div className="input_group my-2">
                        <label htmlFor="age">age :</label>
                        <input onChange={getData} className='form-control ' type="number" name='age' />
                    </div>
                    <div className="input_group my-2">
                        <label htmlFor="email">email :</label>
                        <input onChange={getData} className='form-control ' type="email" name='email' />
                    </div>
                    <div className="input_group my-2">
                        <label htmlFor="password">password :</label>
                        <input onChange={getData} className='form-control ' type="password" name='password' />
                    </div>

                    <button className='float-end btn-info btn' type='submit'>{loading ? <i className='fa fa-spinner fa-spin'></i> : 'Register'}</button>
                    <div className="clearfix"></div>

                </form>
            </div>
        </>
    )
}
