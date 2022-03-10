import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import joi from 'joi'
import axios from 'axios'

export default function Login({ setUserData }) {

    let [data, setData] = useState({

        email: '',
        password: '',
    })

    let [message, setMessage] = useState('');
    let [validateError, setvalidateerror] = useState([])
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate();
    function routingNavigate() {
        navigate('/home')
    }
    async function submitFormData(e) {
        e.preventDefault();
        setLoading(true)

        let validationResult = validationForm();
        if (validationResult.error) {
            setLoading(false)
            // alert('error')
            setvalidateerror(validationResult.error.details)

        }
        else {

            let user = await axios.post("https://routeegypt.herokuapp.com/signin", data);
            if (user.data.message == 'success') {
                setLoading(false)
                localStorage.setItem('token', user.data.token)
                setUserData();//هتتنفذ هناك مش هنا
                setMessage(user.data.message)

                // console.log(user.data)



                routingNavigate()


            }
            else {

                setLoading(false)
                setMessage(user.data.message)
            }
        }

        // console.log(validationResult)


    }
    function validationForm() {
        const schema = joi.object({

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
        // console.log(newData)
    }

    return (
        <>
            <div className="container my-5 w-75 m-auto">
                <h1 className='text-white my-3'>Login Form</h1>
                {validateError.map((error) => <div className='alert alert-danger'>{error.message}</div>)}
                {message != '' ? <div className="alert alert-danger">{message}</div> : ''}
                <form onSubmit={submitFormData}>





                    <div className="input_group my-2">
                        <label htmlFor="email">email :</label>
                        <input onChange={getData} className='form-control ' type="email" name='email' />
                    </div>
                    <div className="input_group my-2">
                        <label htmlFor="password">password :</label>
                        <input onChange={getData} className='form-control ' type="password" name='password' />
                    </div>

                    <button className='float-end btn-info btn ' type='submit'>{loading ? <i className=" spinner-border text-danger bg-warning "></i> : 'Login'}</button>
                    <div className="clearfix"></div>

                </form>
            </div>
        </>
    )
}
