import React from 'react';
import CustomForm from '../components/CustomForm';
import TeamChecker from '../components/TeamChecker';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData from '../components/GetData';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <ToastContainer />
      <div className="flex-1 flex flex-col gap-4 justify-center items-center">
        <div className="w-full max-w-md">
          <CustomForm />
        </div>
        <div className="w-full max-w-md mt-4">
          <TeamChecker />
        </div>
      </div>
      <div className="flex-1 flex justify-center items-start mt-4">
        <GetData category="blacklist" mainScreen={true} />
      </div>
    </div>
  );
}

