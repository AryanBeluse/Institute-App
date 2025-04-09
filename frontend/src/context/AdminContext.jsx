import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : false)
    const [subjects, setSubjects] = useState([])
    const [trainers, setTrainers] = useState([])

    const getSubjects = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/subject`, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })
            if (data.success) {
                setSubjects(data.subjects)
            }
        } catch (error) {
            console.log(error, "adminContext");
        }
    }

    const getTrainers = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/trainer`, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })
            if (data.success) {
                setTrainers(data.trainers)
            }
        } catch (error) {
            console.log(error, "adminContext");
        }
    }

    const deleteTrainer = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/admin/trainer/${id}`, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                },
            });
            if (data.success) {
                toast.success('Trainer deleted successfully');
                setTrainers(prev => prev.filter(trainer => trainer._id !== id));
            }
        } catch (error) {
            console.log(error, "adminContext");
        }
    }


    useEffect(() => {
        if (aToken) {
            localStorage.setItem('aToken', aToken);
        }
    }, [aToken]);

    useEffect(() => {
        if (aToken) {
            localStorage.setItem('aToken', aToken);
            getSubjects();
            getTrainers()
        }
    }, [aToken]);





    const value = {
        backendUrl,
        aToken, setAToken,
        subjects, setSubjects,
        getSubjects,
        trainers, setTrainers,
        getTrainers,
        deleteTrainer
    }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider