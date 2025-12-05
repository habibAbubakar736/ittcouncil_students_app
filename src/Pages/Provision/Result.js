import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ConfigContext } from '../../Context/ConfigContext';

const Result = () => {

    const [data, setData] = useState({});
    const { student_subject_id } = useParams();

    const { apiURL, apiHeaderJson } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    const GetInfo = async () => {
        try {
            const response = await axios.get(`${apiURL}Students/GetProvisionExamInfo`, {
                params: { student_subject_id },
                headers
            });
            setData(response.data.exam_info);
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        GetInfo();
    }, []);

    return (
        <>
            <div className='main-content'>
                <div className='page-content'>
                    <div className='container-fluid'>

                        {/* CERTIFICATE BOX */}
                        <div
                            className="container my-4 p-5"
                            style={{
                                background: "#ffffff",
                                border: "1px solid #dcdcdc",
                                borderRadius: "10px",
                                position: "relative",
                                boxShadow: "0 0 10px rgba(0,0,0,0.05)"
                            }}
                        >
                            {/* WATERMARK */}
                            <img
                                src="/assets/images/itt_logo.png"
                                alt="Watermark"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    width: "50%",
                                    opacity: 0.06,
                                    transform: "translate(-50%, -50%)",
                                    pointerEvents: "none"
                                }}
                            />

                            <div style={{ position: "relative", zIndex: 10 }}>

                                {/* HEADER */}
                                <div className="text-center mb-4">
                                    <img src="/assets/images/itt_logo.png" height="110" alt="logo" />

                                    <h3 className="mt-3 mb-1"
                                        style={{ fontWeight: 600, letterSpacing: ".5px" }}
                                    >
                                        IT & TECHNICAL EDUCATION COUNCIL, DELHI
                                    </h3>

                                    <h4 className="mt-2"
                                        style={{ fontSize: "22px", fontWeight: 600, textDecoration: "underline" }}
                                    >
                                        Provisional Certificate
                                    </h4>
                                </div>

                                {/* MAIN TEXT */}
                                <p className="fs-5 mt-4" style={{ lineHeight: "1.7" }}>
                                    This is to certify that <b>{data?.student_full_name}</b>,<br />
                                    pursuing <b>{data?.program_title}</b>,<br />
                                    having Enrollment Number <b>{data?.student_subject_id}</b>, has
                                    appeared for the <b>ITT Council Examination</b> on <b>{data?.exam_date}</b>.
                                </p>

                                {/* COURSE + SEMESTER TABLE */}
                                <table className="table table-bordered mt-4" style={{ fontSize: "16px" }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "180px", background: "#fafafa" }}>Course</th>
                                            <td>{data?.subject_title} (One Month)</td>

                                            <th style={{ width: "180px", background: "#fafafa" }}>Semester</th>
                                            <td>{data?.subject_title} - Semester 1</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* MARKS TABLE */}
                                <table className="table table-bordered mt-4" style={{ fontSize: "16px" }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ background: "#fafafa" }}>Total Marks</th>
                                            <td>{data?.total_marks}</td>

                                            <th style={{ background: "#fafafa" }}>Passing Marks</th>
                                            <td>{data?.passing__marks}</td>

                                            <th style={{ background: "#fafafa" }}>Obtained Marks</th>
                                            <td>{data?.obtain_marks}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* NOTE */}
                                <p className="mt-5 text-center"
                                    style={{ lineHeight: "1.6", fontSize: "14px", color: "#555" }}
                                >
                                    This certificate is provisionally issued on behalf of the
                                    <b> ITT Council, Delhi</b>.
                                    The final printed certificate will include photograph, signature and
                                    percentage under the official seal.
                                </p>

                                {/* SIGNATURE SECTION */}
                                <div className="row mt-5">
                                    <div className="col text-center">
                                        <p className="mb-0" style={{ fontWeight: 600 }}>Local Controller of Examination</p>
                                        <div
                                            style={{
                                                marginTop: "40px",
                                                height: "1px",
                                                background: "#444",
                                                width: "70%",
                                                marginLeft: "auto",
                                                marginRight: "auto"
                                            }}
                                        ></div>
                                    </div>

                                    <div className="col text-center">
                                        <p className="mb-0" style={{ fontWeight: 600 }}>Head of Institute</p>
                                        <div
                                            style={{
                                                marginTop: "40px",
                                                height: "1px",
                                                background: "#444",
                                                width: "70%",
                                                marginLeft: "auto",
                                                marginRight: "auto"
                                            }}
                                        ></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Result;
