import { createContext, useState, useEffect } from "react";

export const TrainerContext = createContext();

const TrainerContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [empToken, setEmpToken] = useState(
        localStorage.getItem('empToken') || ''
    );

    const [specificTrainer, setSpecificTrainer] = useState(
        JSON.parse(localStorage.getItem('specificTrainer')) || {}
    );



    useEffect(() => {
        if (empToken) {
            localStorage.setItem('empToken', empToken);
        } else {
            localStorage.removeItem('empToken');
            setSpecificTrainer({})
        }
    }, [empToken]);

    useEffect(() => {
        if (Object.keys(specificTrainer).length > 0) {
            localStorage.setItem('specificTrainer', JSON.stringify(specificTrainer));
        } else {
            localStorage.removeItem('specificTrainer');
        }
    }, [specificTrainer]);

    const value = {
        backendUrl,
        empToken,
        setEmpToken,
        specificTrainer, setSpecificTrainer
    };

    return (
        <TrainerContext.Provider value={value}>
            {props.children}
        </TrainerContext.Provider>
    );
};

export default TrainerContextProvider;
