import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import images from '../../Utils/Images';
import axios from 'axios';
import { ConfigContext } from '../../Context/ConfigContext';

const Result = () => {

    const [data, setData] = useState({});
    const { student_subject_id } = useParams();


    const { apiURL, apiHeaderJson } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    console.log("student_subject_id", student_subject_id)

    const GetInfo = async () => {
        try {
            const response = await axios.get(`${apiURL}Students/GetProvisionExamInfo`, {
                params: {
                    student_subject_id: student_subject_id
                }, headers
            })
            // console.log('response', response?.data)
            setData(response.data.exam_info)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        GetInfo();
    }, [])

    return (
        <>
            <div className='main-content'>
                <div className='page-content'>
                    <div className='container-fluid'>
                        <div className='container my-3 p-4 position-relative shadow-sm' style={{ background: "#fff", overflow: "hidden" }}>
                            <img
                                src='/assets/images/itt_logo.png' alt='Watermark' className='position-absolute top-50 start-50 translate-middle' style={{ width: "55%", opacity: "0.07", pointerEvents: "none", zIndex: 1 }}
                            />
                            <div className='position-relative' style={{ zIndex: 5 }}>
                                <div className='row align-items-center'>
                                    <div className='col-md-4 text-center'>
                                        <img src="/assets/images/itt_logo.png" alt='itt-logo' className='img-fluid' style={{ height: "120px" }} />
                                    </div>
                                    <div className='col-md-8 text-center'>
                                        <h3>IT & TECHNICAL EDUCATION COUNCIL <br />DELHI (ITT COUNCIL)</h3>
                                        <h2 className='mt-3 fw-semibold text-decoration-underline'>Provisional Certificate</h2>
                                    </div>
                                </div>

                                <div className="mt-4 fs-5 ps-4">
                                    <p>
                                        This is to certify that <b>Mr./Ms. {data?.student_name}</b> <br />
                                        pursuing <b>{data?.program_title}</b> <br />
                                        having Enrollment Number <b>{data?.student_subject_id}</b> has
                                        appeared for the <b>ITT Council Examination</b> <br />
                                        on <b>{data?.exam_date}</b>.
                                    </p>
                                </div>

                                <div className='table-responsive mt-2'>
                                    <table className='table table-bordered fs-6'>
                                        <tbody>
                                            <tr>
                                                <td className='fw-semibold'>Course</td>
                                                <th>{data?.subject_title} (OneMonth)</th>
                                                <td className='fw-semibold'>Semester</td>
                                                <th>{data?.subject_title} - Semester 1</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='table-responsive mt-4'>
                                    <table className='table table-bordered fs-5'>
                                        <tbody>
                                            <tr>
                                                <td className='fw-semibold'>Total Marks</td>
                                                <th>{data?.total_marks}</th>
                                                <td className='fw-semibold'>Passing Marks</td>
                                                <th>3.3</th>
                                                <td className='fw-semibold'>Obtained Marks</td>
                                                <th>{data?.obtain_marks}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='mt-5 fs-6 text-center'>
                                    <h5 className='text-center'>This certificate Is issued on behalf of the <b> Chairman, Information Technology and Technical Education  <br />
                                        Council, Delhi.</b> The final printed certificate with percentage marks with photograph and Signature of the <br /> candidate shall
                                        be issued later under seal and signature of the competent authorities of <b> ITT Council</b>, Delhi</h5>
                                </div>

                                <div className="row mt-5">
                                    <div className="col text-center">
                                        <p>
                                            <b>Local Controller of Examination</b><br /><br />
                                            __________________________
                                        </p>
                                    </div>

                                    <div className="col text-center">
                                        <p>
                                            <b>Head of Institute</b><br /><br />
                                            __________________________
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Result