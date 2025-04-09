import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainerContext } from '../../context/TrainerContext';
import { FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { assets } from '../../assets/assets';

const Trainer = () => {

    const navigate = useNavigate()

    const { specificTrainer } = useContext(TrainerContext)

    return (
        <div className='w-full  py-8 px-4 sm:px-10'>
            <div className='w-full bg-white border border-gray-200 shadow-sm rounded-xl p-8 sm:p-10'>

                {/* Flex layout */}
                <div className='flex flex-col lg:flex-row gap-8'>

                    {/* Profile Picture */}
                    <div className='flex-shrink-0 w-full lg:max-w-[250px]'>
                        <img
                            className='w-full h-auto object-cover rounded-full border border-gray-300'
                            src={specificTrainer.image || assets.upload_area}
                            alt="Trainer"
                        />
                    </div>



                    {/* Profile Details */}
                    <div className='flex-1 flex flex-col justify-between'>
                        <h1 className="text-4xl font-semibold text-gray-800 mb-2 flex items-center gap-4">
                            {specificTrainer.name}
                            <span className="border border-gray-300 text-gray-800 text-xs rounded-lg px-2 py-1">Trainer</span>
                        </h1>
                        <p className='text-gray-600 mb-4 flex items-center gap-2'>
                            <FaEnvelope className='text-gray-500' /> {specificTrainer.email}
                        </p>

                        <div className='text-sm text-gray-500 flex items-center gap-2'>
                            <FaCalendarAlt className='text-gray-400' />
                            Joined on: {new Date(specificTrainer.createdAt).toLocaleDateString('en-GB')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trainer;
