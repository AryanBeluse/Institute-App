import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets.js'
import { AdminContext } from '../../context/AdminContext.jsx'
import { toast } from 'react-toastify'

const AddSubject = () => {
    const [trainerList, setTrainerList] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { aToken, trainers, getTrainers } = useContext(AdminContext)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        status: "Active",
        trainers: []
    })
    const [successMessage, setSuccessMessage] = useState('');


    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        )
    }




    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                trainers: trainerList
            };

            const { data } = await axios.post(`${backendUrl}/api/admin/subject`, updatedFormData, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            });
            if (data.success) {
                toast.success('Trainer added successfully!');
                setFormData({
                    name: "",
                    description: "",
                    category: "",
                    status: "Active",
                    trainers: []
                });
                setTrainerList([]);
                setSuccessMessage('Subject added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.log(error);
        }
    }




    useEffect(() => {
        getTrainers()
    }, [])



    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Subject</h1>

            <div className='bg-white px-8  py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                {/* <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="image">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer'
                            src={assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='image' hidden />
                    <p>Upload Trainer picture</p>
                </div> */}

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4  '>

                        <div className='flex flex-1 flex-col gap-1'>
                            <p>Subject name</p>
                            <input onChange={handleChange} id="name"
                                className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div>
                            <p className='mt-4 mb-2'>About Subject</p>
                            <textarea
                                id="description"
                                onChange={handleChange}
                                value={formData.description}
                                className='w-full px-4 pt-2 border rounded-lg bg-blue-50'
                                placeholder='Description'
                                rows={5}
                                required />
                        </div>

                        <div className='flex flex-1 flex-col gap-1'>
                            <p>Subject Category</p>
                            <select id="category"
                                onChange={handleChange}
                                value={formData.category}
                                className='border rounded px-3 py-2'
                                required >
                                <option value="Science">Science</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Programming">Programming</option>
                                <option value="Language">Language</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>


                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex flex-1 flex-col gap-1'>
                            <p>Subject Status</p>
                            <select id="status"
                                onChange={handleChange}
                                value={formData.status}
                                className='border rounded px-3 py-2'
                                required >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className='flex flex-1 flex-col gap-1'>
                            <p>Assign Trainer</p>
                            <select
                                id="trainers"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (!trainerList.includes(value)) {
                                        setTrainerList((prev) => [...prev, value]);
                                    }
                                }}
                                className='border rounded px-3 py-2'
                                required>
                                <option value="">Select Trainer</option>
                                {
                                    trainers.map((trainer) => (
                                        <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex gap-2 mt-2 flex-wrap">
                            {trainerList.map(id => {
                                const sub = trainers.find(s => s._id === id);
                                return (
                                    <span key={id} className="bg-gray-200 text-sm px-2 py-1 rounded">
                                        {sub?.name}
                                    </span>
                                )
                            })}
                        </div>

                    </div>
                </div>

                <button type='submit' className='bg-blue-500 px-10 py-3 mt-4 text-white rounded-full hover:opacity-85'>Add Subject</button>
                {successMessage && (
                    <p className="text-green-600 font-semibold mt-4">
                        {successMessage}
                    </p>
                )}
            </div>
        </form >
    )
}

export default AddSubject
