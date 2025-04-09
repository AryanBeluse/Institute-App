import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { FaChalkboardTeacher, FaCalendarAlt } from 'react-icons/fa';

const SpecificSubject = () => {
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { aToken } = useContext(AdminContext);
    const [subject, setSubject] = useState({});
    const navigate = useNavigate();

    const getSpecificSubject = async (id) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/subject/${id}`, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                },
            });
            if (data.success) {
                setSubject(data.subject);
            } else {
                toast.error('Failed to fetch subject');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.error(error);
        }
    };
    console.log(subject);


    useEffect(() => {
        getSpecificSubject(id);
    }, [id]);

    return subject && (
        <div className='w-full  py-8 px-4 sm:px-10'>
            <div className='w-full bg-white border border-gray-200 shadow-sm rounded-xl p-8 sm:p-10'>

                {/* Flex layout */}
                <div className='flex flex-col lg:flex-row gap-8'>

                    {/* Profile Details */}
                    <div className='flex-1 flex flex-col justify-between'>
                        <h1 className="text-4xl font-semibold text-gray-800 mb-2 flex items-center gap-4">
                            {subject.name}
                            <span className="border border-gray-300 text-gray-800 text-xs rounded-lg px-2 py-1">
                                Subject</span>
                        </h1>
                        <p className='text-gray-600 mb-4 flex items-center gap-2 max-w-3xl'>
                            {subject.description}
                        </p>

                        <p className='text-gray-600 mb-1 flex items-center gap-2'>
                            <p className='text-gray-800 font-semibold'>Category:</p> {subject.category}
                        </p>

                        <div className={`flex items-center gap-2 font-semibold  mt-1 mb-4 ${subject.status === 'Active' ? "text-green-600" : "text-gray-500"
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${subject.status === 'Active' ? "bg-green-500" : "bg-gray-400"
                                }`} />
                            <span>{subject.status}</span>
                        </div>

                        <div className='mb-6'>
                            <h2 className='text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                                <FaChalkboardTeacher className='text-blue-600' /> Trainers Assigned
                            </h2>

                            {subject.trainers?.length > 0 ? (
                                <div className="flex flex-wrap gap-4 pl-8">
                                    {subject.trainers.map(trainer => (
                                        <div
                                            key={trainer._id}
                                            onClick={() => navigate(`/trainer/${trainer._id}`)}
                                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                                        >
                                            <img
                                                className="w-7 h-7 object-cover rounded-full border"
                                                src={trainer.image || assets.upload_area}
                                                alt="Trainer"
                                            />
                                            <span className="text-gray-800 font-medium">{trainer.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No trainers assigned.</p>
                            )}


                        </div>



                        <div className='text-sm mt-4 text-gray-500 flex items-center gap-2'>
                            <FaCalendarAlt className='text-gray-400' />
                            Last updated: {new Date(subject.updatedAt).toLocaleDateString('en-GB')}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => { deletesubject(subject._id), navigate("/subjects") }}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Delete Subject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecificSubject
