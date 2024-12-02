import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStoreDb } from '../firebase';

function GetTeamData({ teamInfo }) {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            let q;
            q = query(collection(fireStoreDb, 'customForm'), where('name', '==', teamInfo));
            const querySnapshot = await getDocs(q);
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setData(newData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);


};
export default GetTeamData;