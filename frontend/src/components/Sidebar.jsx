import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { TrainerContext } from '../context/TrainerContext'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)
    const { empToken } = useContext(TrainerContext)

    return (
        <div className='min-h-screen bg-white border-r flex flex-col'>
            {
                aToken && <ul className='text-[#515151]  flex-grow'>

                    <NavLink
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                        to={'/dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>


                    <NavLink
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                        to={'/add-trainer'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Trainer</p>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                        to={'/add-subject'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Subject</p>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                        to={'/trainers'}>
                        <img src={assets.people_icon} alt="" />
                        <p>Trainers List</p>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                        to={'/subjects'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Subjects List</p>
                    </NavLink>

                </ul>
            }
            {
                empToken && <ul className='text-[#515151] mt-5 flex-grow'>

                    <NavLink
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                        to={'/trainer/subjects'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Subjects</p>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72  cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}
                        to={'/trainer/profile'}>
                        <img src={assets.people_icon} alt="" />
                        <p>Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
