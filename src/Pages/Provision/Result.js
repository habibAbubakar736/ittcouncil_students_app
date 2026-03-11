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

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className='main-content'>
                <div className='page-content'>
                    <div className='container-fluid'>

                        {/* PRINT BUTTON - Only visible on screen */}
                        <div className="no-print text-center mb-3">
                            <button
                                onClick={handlePrint}
                                className="btn btn-primary"
                                style={{ padding: "10px 30px", fontSize: "16px" }}
                            >
                                Print Certificate
                            </button>
                        </div>

                        {/* CERTIFICATE BOX */}
                        <div
                            className="container my-4 p-5 print-container"
                            style={{
                                background: "#ffffff",
                                border: "1px solid #dcdcdc",
                                borderRadius: "10px",
                                position: "relative",
                                boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                                maxWidth: "800px",
                                margin: "0 auto"
                            }}
                        >
                            {/* WATERMARK */}
                            <img
                                src="/assets/images/itt_logo.png"
                                alt="Watermark"
                                className="print-watermark"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    width: "60%",
                                    opacity: 0.06,
                                    transform: "translate(-50%, -50%)",
                                    pointerEvents: "none"
                                }}
                            />

                            <div style={{ position: "relative", zIndex: 10 }}>

                                {/* HEADER */}
                                <div className="text-center mb-3">
                                    <img src="/assets/images/itt_logo.png" height="90" alt="logo" />

                                    <h3 className="mt-2 mb-1"
                                        style={{ fontWeight: 600, letterSpacing: ".5px", fontSize: "20px" }}
                                    >
                                        Information technology and Technical Education Council, Delhi
                                    </h3>

                                    <h4 className="mt-1"
                                        style={{ fontSize: "18px", fontWeight: 600, textDecoration: "underline" }}
                                    >
                                        Provisional Certificate
                                    </h4>
                                </div>

                                {/* MAIN TEXT */}
                                <p className="fs-6 mt-3" style={{ lineHeight: "1.6", fontSize: "15px" }}>
                                    This is to certify that <b>{data?.student_full_name}</b>,<br />
                                    pursuing <b>{data?.program_title}</b>,<br />
                                    having Enrollment Number <b>{data?.student_subject_id}</b>, has
                                    appeared for the <b>ITT Council Examination</b> on <b>{data?.exam_date || ''}</b>.
                                </p>

                                {/* COURSE + SEMESTER TABLE */}
                                <table className="table table-bordered mt-3" style={{ fontSize: "14px", width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "100px", background: "#fafafa", padding: "8px" }}>Course</th>
                                            <td style={{ padding: "8px" }}>{data?.subject_title} (One Month)</td>
                                            <th style={{ width: "100px", background: "#fafafa", padding: "8px" }}>Semester</th>
                                            <td style={{ padding: "8px" }}>{data?.subject_title} - Semester 1</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* MARKS TABLE */}
                                <table className="table table-bordered mt-3" style={{ fontSize: "14px", width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ background: "#fafafa", padding: "8px" }}>Total Marks</th>
                                            <td style={{ padding: "8px" }}>{data?.total_marks}</td>
                                            <th style={{ background: "#fafafa", padding: "8px" }}>Passing Marks</th>
                                            <td style={{ padding: "8px" }}>{data?.passing__marks}</td>
                                            <th style={{ background: "#fafafa", padding: "8px" }}>Obtained Marks</th>
                                            <td style={{ padding: "8px" }}>{data?.obtain_marks}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* NOTE */}
                                <p className="mt-4 text-center"
                                    style={{ lineHeight: "1.5", fontSize: "13px", color: "#555", fontStyle: "italic" }}
                                >
                                    This certificate is provisionally issued on behalf of the
                                    <b> ITT Council, Delhi</b>.
                                    The final printed certificate will include photograph, signature and
                                    percentage under the official seal.
                                </p>

                                {/* SIGNATURE SECTION */}
                                <div className="row mt-4">
                                    <div className="col text-center">
                                        <p className="mb-0" style={{ fontWeight: 600, fontSize: "14px" }}>Local Controller of Examination</p>
                                        <div
                                            style={{
                                                marginTop: "35px",
                                                height: "1px",
                                                background: "#444",
                                                width: "70%",
                                                marginLeft: "auto",
                                                marginRight: "auto"
                                            }}
                                        ></div>
                                    </div>

                                    <div className="col text-center">
                                        <p className="mb-0" style={{ fontWeight: 600, fontSize: "14px" }}>Head of Institute</p>
                                        <div
                                            style={{
                                                marginTop: "35px",
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

            {/* Print Styles */}
            <style type="text/css">{`
                @media print {
                    /* Hide everything except the certificate */
                    body * {
                        visibility: hidden;
                    }
                    
                    /* Show only the certificate container and its children */
                    .print-container, .print-container * {
                        visibility: visible;
                    }
                    
                    /* Position the certificate for printing exactly as shown */
                    .print-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        max-width: 750px !important;
                        margin: 0 auto !important;
                        padding: 30px 35px !important;
                        border: 1px solid #000 !important;
                        box-shadow: none !important;
                        border-radius: 5px !important;
                        background: white !important;
                    }
                    
                    /* Hide the print button */
                    .no-print {
                        display: none !important;
                    }
                    
                    /* Ensure watermark prints */
                    .print-watermark {
                        visibility: visible !important;
                        opacity: 0.06 !important;
                    }
                    
                    /* Force background colors to print */
                    th {
                        background-color: #fafafa !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    
                    /* Ensure borders print properly */
                    .table-bordered, 
                    .table-bordered th, 
                    .table-bordered td {
                        border: 1px solid #000 !important;
                        border-collapse: collapse;
                    }
                    
                    /* Keep text colors */
                    p, h3, h4, td, th {
                        color: #000 !important;
                    }
                    
                    /* Ensure signature lines print */
                    div[style*="height: 1px"] {
                        background: #000 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    
                    /* Remove page margins and set exact sizing */
                    @page {
                        size: A4;
                        margin: 0.75in 0.5in;
                    }
                    
                    /* Ensure logo prints */
                    img {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    
                    /* Adjust table padding for print */
                    th, td {
                        padding: 6px 8px !important;
                    }
                    
                    /* Font size adjustments */
                    h3 { font-size: 20px !important; }
                    h4 { font-size: 18px !important; }
                    p { font-size: 15px !important; }
                    table { font-size: 14px !important; }
                }
            `}</style>
        </>
    );
};

export default Result;