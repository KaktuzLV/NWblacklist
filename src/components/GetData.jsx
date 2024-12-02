import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStoreDb } from '../firebase';
import CustomTables from './customTable';
import CustomSearch from './CustomAllSearch';


function GetData({ category, mainScreen }) {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            let q;
            if (mainScreen) {
                q = query(collection(fireStoreDb, 'customForm'));
            } else {
                q = query(collection(fireStoreDb, 'customForm'), where('category', '==', category));
            }
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

    return (
        <div>
            {mainScreen ? (
                <CustomSearch data={data} />
            ) : (
                <CustomTables data={data} onReload={() => { fetchData() }} />
            )}
        </div>
    );
}

export default GetData;