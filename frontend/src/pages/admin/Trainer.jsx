import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { FaEnvelope, FaChalkboardTeacher, FaCalendarAlt } from 'react-icons/fa';
import { assets } from '../../assets/assets';

const Trainer = () => {
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { aToken, deleteTrainer } = useContext(AdminContext);
    const [trainer, setTrainer] = useState(null);
    const navigate = useNavigate()

    const getSpecificTrainer = async (id) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/trainer/${id}`, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                },
            });

            if (data.success) {
                setTrainer(data.trainer);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.log(error);
        }
    };

    useEffect(() => {
        getSpecificTrainer(id);
    }, [id]);

    return trainer && (
        <div className='w-full  py-8 px-4 sm:px-10'>
            <div className='w-full bg-white border border-gray-200 shadow-sm rounded-xl p-8 sm:p-10'>

                {/* Flex layout */}
                <div className='flex flex-col lg:flex-row gap-8'>

                    {/* Profile Picture */}
                    <div className='flex-shrink-0 w-full lg:max-w-[250px]'>
                        <img
                            className='w-full h-auto object-cover rounded-full border border-gray-300'
                            src={trainer.image || assets.upload_area}
                            alt="Trainer"
                        />
                    </div>



                    {/* Profile Details */}
                    <div className='flex-1 flex flex-col justify-between'>
                        <h1 className="text-4xl font-semibold text-gray-800 mb-2 flex items-center gap-4">
                            {trainer.name}
                            <span className="border border-gray-300 text-gray-800 text-xs rounded-lg px-2 py-1">Trainer</span>
                        </h1>
                        <p className='text-gray-600 mb-4 flex items-center gap-2'>
                            <FaEnvelope className='text-gray-500' /> {trainer.email}
                        </p>

                        <div className='mb-6'>
                            <h2 className='text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                                <FaChalkboardTeacher className='text-blue-600' /> Subjects
                            </h2>

                            {
                                trainer.subjects?.length > 0 ? (
                                    <div className="flex flex-wrap gap-4 pl-8">
                                        {trainer.subjects.map(subject => (
                                            <div
                                                key={subject._id}
                                                onClick={() => navigate(`/subject/${subject._id}`)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition text-gray-800 font-medium"
                                            >
                                                {subject.name}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No subjects assigned.</p>
                                )
                            }

                        </div>



                        <div className='text-sm text-gray-500 flex items-center gap-2'>
                            <FaCalendarAlt className='text-gray-400' />
                            Joined on: {new Date(trainer.createdAt).toLocaleDateString('en-GB')}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => { deleteTrainer(trainer._id), navigate("/trainers") }}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Delete Trainer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trainer;
