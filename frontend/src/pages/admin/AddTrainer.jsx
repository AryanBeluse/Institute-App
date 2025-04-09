import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets.js'
import { AdminContext } from '../../context/AdminContext.jsx'
import { toast } from 'react-toastify'

const AddTrainer = () => {


    const [subjectList, setSubjectList] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { aToken, subjects, getSubjects } = useContext(AdminContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        subjects: []
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
                subjects: subjectList
            };

            const { data } = await axios.post(`${backendUrl}/api/admin/trainer`, updatedFormData, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            });
            if (data.success) {
                toast.success('Trainer added successfully!');
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    subjects: []
                });
                setSubjectList([]);
                setSuccessMessage('Trainer added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.log(error);
        }
    }



    useEffect(() => {
        getSubjects()
    }, [])



    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Trainer</h1>

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
                            <p>Trainer name</p>
                            <input onChange={handleChange} id="name"
                                className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex flex-1 flex-col gap-1'>
                            <p>Trainer Email</p>
                            <input onChange={handleChange} id="email"
                                className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>

                        <div className='flex flex-1 flex-col gap-1'>
                            <p>Trainer Password</p>
                            <input onChange={handleChange} id="password"
                                className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex flex-1 flex-col gap-1'>
                            <p>Subjects</p>
                            <select
                                id="subjects"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (!subjectList.includes(value)) {
                                        setSubjectList((prev) => [...prev, value]);
                                    }
                                }}
                                className='border rounded px-3 py-2'
                                required>
                                <option value="">Select Subject</option>
                                {
                                    subjects.map((subject) => (
                                        <option key={subject._id} value={subject._id}>{subject.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex gap-2 mt-2 flex-wrap">
                            {subjectList.map(id => {
                                const sub = subjects.find(s => s._id === id);
                                return (
                                    <div key={id} className="flex items-center gap-1">
                                        <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                                            {sub?.name}
                                        </span>
                                        <p className="cursor-pointer text-gray-800 mr-2 font-semibold"
                                            onClick={() =>
                                                setSubjectList(prev => prev.filter(subId => subId !== id))}>
                                            x
                                        </p>
                                    </div>
                                );
                            })}
                        </div>


                    </div>
                </div>

                <button type='submit' className='bg-blue-500 px-10 py-3 mt-4 text-white rounded-full hover:opacity-85'>Add Trainer</button>

                {successMessage && (
                    <p className="text-green-600 font-semibold mt-4">
                        {successMessage}
                    </p>
                )}
            </div>
        </form >
    )
}

export default AddTrainer
