import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { TrainerContext } from '../../context/TrainerContext'
import { toast } from 'react-toastify'

const TrainerSubjects = () => {
    const { empToken, specificTrainer } = useContext(TrainerContext)
    const [subjects, setSubjects] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const id = specificTrainer?._id

    const getTrainersBySubject = async (id) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/trainer/${id}/subjects`, {
                headers: {
                    Authorization: `Bearer ${empToken}`,
                },
            });

            if (data.success) {
                setSubjects(data.subjects)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
            console.log(error)
        }
    }



    useEffect(() => {
        if (empToken && id) {
            getTrainersBySubject(id)
        }
    }, [empToken, id])

    return (
        <div className="px-8 py-8 w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Subjects List</h1>

            <div className="flex flex-col w-full">
                {subjects.map((subject, index) => (
                    <div
                        key={subject._id}
                        className={`flex items-center w-full bg-white px-6 py-4 border border-gray-300 ${index !== subjects.length - 1 ? 'border-b-0' : ''
                            }`}
                    >
                        <img
                            src={subject.image || assets.images}
                            alt="subject"
                            className="w-16 h-16 object-cover rounded-full border border-gray-800 mr-4"
                        />

                        <div className="flex-grow">
                            <h3
                                className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline"
                                onClick={() => navigate(`/subject/${subject._id}`)}
                            >
                                {subject.name}
                            </h3>

                            <div className={`flex items-center gap-2 font-semibold text-sm mt-1 ${subject.status === 'Active' ? "text-green-600" : "text-gray-500"
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${subject.status === 'Active' ? "bg-green-500" : "bg-gray-400"}`} />
                                <span>{subject.status}</span>
                            </div>

                            <p className="text-sm text-gray-500 mt-1">{subject.email}</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate(`/trainer/subject/${subject._id}`)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrainerSubjects
