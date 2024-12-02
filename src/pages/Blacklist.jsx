import React from 'react';
import GetData from '../components/GetData';
import { ToastContainer} from 'react-toastify';

export default function Blacklist() {
  return ( 
    <div>
      <ToastContainer />
      <GetData category="blacklist" mainScreen={false} />
    </div>
  );
}