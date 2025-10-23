import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../Components/PageTitle'
import { ConfigContext } from '../../../Context/ConfigContext';
import axios from 'axios';

const MyProfile = () => {

    const { apiURL, apiHeaderJson, student_id, } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const GetStudentsProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiURL}Students/GetStudentsProfile`, { params: { student_id }, headers });
            const { data, success } = response?.data;
            if (success) {
                setInfo(data[0]);
            } else {
                console.error("error");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (student_id) {
            GetStudentsProfile();
        }
    }, [student_id]);

    if (loading) {
        return (
            <div className='main-content'>
                <div className='page-content'>
                    <div className='container-fluid'>
                        <div className="d-flex justify-content-center align-items-center vh-100">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='main-content'>
            <div className='page-content'>
                <div className='container-fluid'>
                    <br />

                </div>
            </div>
        </div>
    )
}

export default MyProfile;