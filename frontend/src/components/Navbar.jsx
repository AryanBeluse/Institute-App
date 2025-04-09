import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { TrainerContext } from '../context/TrainerContext'
import { FaGraduationCap } from "react-icons/fa"

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)
    const { empToken, setEmpToken } = useContext(TrainerContext)
    const navigate = useNavigate()

    const logout = () => {

        if (aToken) {
            setAToken('');
            localStorage.removeItem('aToken');
        }
        if (empToken) {
            setEmpToken('');
            localStorage.removeItem('empToken');
        }

        navigate('/sign-in');
    };


    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm">

            <div className="flex items-center gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 cursor-pointer">
                    <FaGraduationCap className="text-blue-600 text-4xl" />
                    <span className="font-semibold text-gray-800 text-base sm:text-lg md:text-xl"
                        onClick={() => { navigate('/dashboard') }}>App Institute</span>
                </div>
                <p className="border px-2.5 py-0.5 rounded-full items-center border-gray-500 text-gray-600 text-xs sm:text-xs
                md:text-xs">
                    {aToken ? 'Admin' : 'Trainer'}
                </p>
            </div>


            <button
                onClick={logout}
                className="bg-blue-500 text-white text-sm px-6 sm:px-10 py-2 rounded-full hover:bg-blue-600 transition"
            >
                Logout
            </button>
        </div>
    );
}

export default Navbar
