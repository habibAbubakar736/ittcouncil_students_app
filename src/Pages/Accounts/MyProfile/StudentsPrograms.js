import React, { useContext, useEffect, useState } from 'react';
import PageTitle from '../../../Components/PageTitle';
import { ConfigContext } from '../../../Context/ConfigContext';
import axios from 'axios';

const StudentsPrograms = () => {
    const { apiURL, apiHeaderJson, student_id, primaryColor } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetStudentsProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiURL}Students/GetStudentsProgram`, { headers });
            const { data, success } = response?.data;
            if (success) setData(data);
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (student_id) GetStudentsProfile();
    }, [student_id]);

    if (loading) {
        return (
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
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
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <br />
                    <PageTitle title={"My Programs"} primary={"Dashboard"} />

                    <div className="row g-4">
                        {data?.length > 0 ? (
                            data.map((item) => (
                                <div className="col-md-4" key={item?.student_program_id}>
                                    <div className="card shadow-sm h-100">
                                        <div
                                            className="card-header text-white text-center"
                                            style={{ background: primaryColor }}
                                        >
                                            Enrolled #{item?.student_program_id}
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{item?.program_title ?? "-"}</h5>
                                            <p className="card-text">
                                                <strong>Duration: </strong>{item?.program_duration ?? "-"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center text-muted">
                                No Programs Found
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentsPrograms;
