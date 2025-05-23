import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { TrainerContext } from '../context/TrainerContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'


const SignIn = () => {
    const [formData, setFormData] = useState({})
    const [state, setState] = useState("Admin")
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [loading, setLoading] = useState(false)

    const { setAToken } = useContext(AdminContext)
    const { setEmpToken, setSpecificTrainer } = useContext(TrainerContext)

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { email, password } = formData;

        if (state === 'Trainer') {
            try {
                const { data } = await axios.post(backendUrl + '/api/auth/login-trainer', { email, password })
                if (data.success) {
                    setEmpToken(data.empToken)
                    setSpecificTrainer(data.trainer)
                    toast.success("Welcome Trainer!")
                    navigate('/trainer/subjects')
                    setLoading(false)
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Something went wrong';
                toast.error(errorMessage || 'Something went wrong')
                setLoading(false)
            }
        } else if (state === 'Admin') {
            try {
                const { data } = await axios.post(backendUrl + '/api/auth/login-admin', { email, password })
                if (data.success) {
                    toast.success("Welcome Admin!");
                    setAToken(data.aToken)
                    navigate('/dashboard');
                    setLoading(false)
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Something went wrong';
                toast.error(errorMessage || 'Something went wrong')
                setLoading(false)
            }
        }
    }

    return (
        <div className="h-screen flex justify-center items-center ">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-9 rounded-3xl shadow-xl flex w-[90%] max-w-4xl">


                <div className="hidden md:flex flex-col text-white w-1/2 p-10">
                    <h1 className="text-4xl font-bold">WELCOME</h1>
                    <p className="mt-3 text-md">
                        Please login to continue and explore your personalized dashboard !
                    </p>

                    {state === 'Admin' && <div className="hidden mt-5 md:flex flex-col p-3 text-black bg-white border w-full rounded-2xl shadow-lg ">
                        <span className='mt-2 text-sm'>For Testing:</span>
                        <span className='mt-2 text-sm'>Admin Email: admin@test.com</span>
                        <span className='mt-2 text-sm'>Admin Password: 12345678</span>
                    </div>}

                </div>


                <div className="bg-white p-8 rounded-2xl shadow-lg w-full md:w-1/2">
                    <h1 className="text-3xl text-center font-semibold mb-6">{state} Login</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <input
                            type="email" placeholder="Email" id="email"
                            onChange={handleChange} className="border p-3 rounded-lg w-full"
                        />
                        <input
                            type="password" placeholder="Password" id="password"
                            onChange={handleChange} className="border p-3 rounded-lg w-full"
                        />
                        <button className='text-white bg-[#1E3A8A] p-3 rounded-lg hover:opacity-90 w-full shadow-lg'
                        >
                            {loading ? "Logging..." : "Login"}
                        </button>
                    </form>


                    <div className="flex items-center my-2">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-3 text-gray-500 text-sm">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>


                    {state == "Trainer" ?
                        <div className="flex justify-center gap-2 mt-1 text-sm">
                            <p>Are you an admin?</p>
                            <Link onClick={() => { setState('Admin') }} className="text-blue-600 hover:underline">Login</Link>
                        </div> :
                        <div className="flex justify-center gap-2 mt-1 text-sm">
                            <p>Are you an trainer?</p>
                            <Link onClick={() => { setState('Trainer') }} className="text-blue-600 hover:underline">Login</Link>
                        </div>}

                </div>
            </div>
        </div>
    );
};

export default SignIn

