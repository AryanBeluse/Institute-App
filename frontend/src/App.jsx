import React, { useContext } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { TrainerContext } from './context/TrainerContext';
import { AdminContext } from './context/AdminContext.jsx';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Sidebar from './components/Sidebar';
import AddSubject from './pages/admin/AddSubject';
import AddTrainer from './pages/admin/AddTrainer';
import TrainersList from './pages/admin/TrainersList';
import SubjectsList from './pages/admin/SubjectsList';
import Trainer from './pages/admin/Trainer.jsx';
import SpecificSubject from './pages/admin/SpecificSubject.jsx';
import TrainerSubjects from './pages/trainer/TrainerSubjects.jsx';
import Profile from './pages/trainer/Profile.jsx';
import Subjects from './pages/trainer/Subjects.jsx';



const App = () => {
  const { aToken } = useContext(AdminContext);
  const { empToken } = useContext(TrainerContext);

  return aToken || empToken ? (
    <div className='bg-blue-50'>
      <ToastContainer autoClose={500} />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/add-trainer" element={<AddTrainer />} />
          <Route path="/add-subject" element={<AddSubject />} />
          <Route path="/trainers" element={<TrainersList />} />
          <Route path="/subjects" element={<SubjectsList />} />
          <Route path="/trainer/:id" element={<Trainer />} />
          <Route path="/subject/:id" element={<SpecificSubject />} />
          <Route path="/trainer/subjects" element={<TrainerSubjects />} />
          <Route path="/trainer/profile" element={<Profile />} />
          <Route path="trainer/subject/:id" element={<Subjects />} />

        </Routes>
      </div>
    </div>
  ) : (
    <SignIn />
  )
};

export default App
