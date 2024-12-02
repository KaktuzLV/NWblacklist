import React from 'react';
import GetData from '../components/GetData';
import { ToastContainer} from 'react-toastify';

export default function Whitelist() {
  return ( 
    <div>
      <ToastContainer />
      <GetData category="whitelist" mainScreen={false} />
    </div>
  );
}