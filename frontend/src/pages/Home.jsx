import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaEnvelope, FaChalkboardTeacher, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
    const { trainers, subjects } = useContext(AdminContext);
    const navigate = useNavigate();

    const reversedTrainers = [...trainers].reverse();
    const reversedSubjects = [...subjects].reverse();

    const recentTrainers = reversedTrainers.slice(0, 5);
    const recentSubjects = reversedSubjects.slice(0, 5);

    return (
        <div className="px-8 py-6 w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-lg text-gray-600">Total Trainers</h2>
                    <p className="text-3xl font-bold text-blue-600">{trainers.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-lg text-gray-600">Total Subjects</h2>
                    <p className="text-3xl font-bold text-green-600">{subjects.length}</p>
                </div>
            </div>

            {/* Recently Added Section */}
            <div className="flex gap-6">
                {/* Trainers Box */}
                <div className="w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Recently Added Trainers</h2>
                    </div>
                    <div>
                        {recentTrainers.map(trainer => (
                            <div
                                key={trainer._id}
                                className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
                                onClick={() => navigate(`/trainer/${trainer._id}`)}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={trainer.image || assets.upload_area}
                                        alt="trainer"
                                        className="w-10 h-10 object-cover rounded-full border"
                                    />
                                    <div>
                                        <p className="text-gray-800 font-medium hover:underline">{trainer.name}</p>
                                        <p className="text-sm text-gray-500 flex items-center  gap-1">
                                            <FaEnvelope className="text-gray-400" />
                                            {trainer.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subjects Box */}
                <div className="w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Recently Added Subjects</h2>
                    </div>
                    <div>
                        {recentSubjects.map(subject => (
                            <div
                                key={subject._id}
                                className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
                                onClick={() => navigate(`/subject/${subject._id}`)}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={assets.images}
                                        alt="trainer"
                                        className="w-10 h-10 object-cover rounded-full border"
                                    />
                                    <div>
                                        <p className="text-gray-800 font-medium hover:underline">{subject.name}</p>
                                        <div className={`flex items-center gap-2 font font-semibold text-sm  ${subject.status === 'Active' ? "text-green-600" : "text-gray-500"
                                            }`}>
                                            <span className={`w-2 h-2 rounded-full ${subject.status === 'Active' ? "bg-green-500" : "bg-gray-400"
                                                }`} />
                                            <span>{subject.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
