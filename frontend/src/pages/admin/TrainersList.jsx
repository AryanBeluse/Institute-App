import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets.js'
import { AdminContext } from '../../context/AdminContext.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const TrainersList = () => {
    const { trainers, subjects, deleteTrainer, aToken } = useContext(AdminContext)
    const navigate = useNavigate()
    const [selectedSubject, setSelectedSubject] = useState('')
    const [filteredTrainers, setFilteredTrainers] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const fetchTrainersBySubject = async (subject) => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/admin/trainer/${subject}/topic`,
                {
                    headers: {
                        Authorization: `Bearer ${aToken}`,
                    },
                }
            )
            setFilteredTrainers(data.trainers || [])
        } catch (error) {
            toast.error("Failed to fetch trainers")
            console.error(error)
        }
    }

    useEffect(() => {
        if (selectedSubject) {
            fetchTrainersBySubject(selectedSubject)
        } else {
            setFilteredTrainers(trainers)
        }
    }, [selectedSubject, trainers])

    return (
        <div className="px-8 py-8 w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Trainers List</h1>

            {/* Subject filter */}
            <div className="mb-6 flex items-center gap-4">
                <label className="text-lg font-medium text-gray-700">Filter by Subject:</label>
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-md"
                >
                    <option value="">All Subjects</option>
                    {subjects?.map((subject) => (
                        <option key={subject._id} value={subject._id}>
                            {subject.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col w-full">
                {filteredTrainers?.map((trainer, index) => (
                    <div
                        key={trainer._id}
                        className={`flex items-center w-full bg-white px-6 py-4 border border-gray-300 ${index !== trainers.length - 1 ? 'border-b-0' : ''
                            }`}
                    >
                        {/* Image */}
                        <img
                            src={trainer.image || assets.upload_area}
                            alt="trainer"
                            className="w-16 h-16 object-cover rounded-full border border-gray-300 mr-4"
                        />

                        {/* Info */}
                        <div className="flex-grow">
                            <h3
                                className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline"
                                onClick={() => navigate(`/trainer/${trainer._id}`)}
                            >
                                {trainer.name}
                            </h3>

                            <p className="flex items-center gap-2 text-sm mt-1">{trainer.email}</p>
                        </div>

                        {/* Buttons aligned right */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate(`/trainer/${trainer._id}`)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                View Details
                            </button>
                            <button
                                onClick={() => deleteTrainer(trainer._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrainersList
