import React, { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../../../Context/ConfigContext';
import axios from 'axios';

const MyProfile = () => {

    const [profile, setProfile] = useState([]);
    const [program, setProgram] = useState([]);
    const { apiURL, apiHeaderJson, student_id, primaryColor } = useContext(ConfigContext);
    const headers = apiHeaderJson

    const GetStudentProfile = async () => {
        try {
            const response = await axios.get(`${apiURL}Students/GetStudentsProfile`, { params: { student_id }, headers })
            const { success, data } = response?.data;
            if (success) {
                setProfile(data[0])
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const GetPrograms = async () => {
        try {
            const response = await axios.get(`${apiURL}Students/GetStudentsProgram`, { params: { student_id }, headers })
            console.log('response', response.data)
            const { success, data } = response?.data;
            if (success) {
                setProgram(data)
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        GetStudentProfile();
        GetPrograms();
    }, []);

    return (

        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src="assets/images/profile-bg.jpg" alt className="profile-wid-img" />
                            <img
                                src='/assets/images/itt_logo.png' alt='Watermark' className='position-absolute top-50 start-50 translate-middle' style={{ width: "30%", opacity: "0.15", zIndex: 1 }}
                            />
                        </div>
                    </div>
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                        <div className="row g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img src="/assets/images/profile.png" alt="user-img" className="img-thumbnail rounded-circle" />
                                </div>
                            </div>
                            {/*end col*/}
                            <div className="col">
                                <div className="p-2">
                                    <h3 className="text-white mb-1">Abubakar</h3>
                                    <p className="text-white text-opacity-75">Owner &amp; Founder</p>
                                    <div className="hstack text-white-50 gap-1">
                                        <div className="me-2"><i className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle" />dualsysco@gmail.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*end row*/}
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div>
                                <div className="d-flex profile-wrapper">
                                    {/* Nav tabs */}
                                    <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link fs-14 active" data-bs-toggle="tab" href="#profile-tab" role="tab">
                                                <i className="ri-airplay-fill d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">Profile</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link fs-14" data-bs-toggle="tab" href="#programs" role="tab">
                                                <i className="ri-list-unordered d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">Programs</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Tab panes */}
                                <div className="tab-content pt-4 text-muted">
                                    <div className="tab-pane active" id="profile-tab" role="tabpanel">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title mb-5 mt-2">Student Information</h5>
                                                <div className="table-responsive">
                                                    <table className="table table-striped table-bordered mb-0">
                                                        <div className='row d-flex col-12'>
                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Student ID : </strong>
                                                                    <span className="text-primary fw-bold">{profile.student_id}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Student PRN No : </strong>
                                                                    <span className="text-primary fw-bold">{profile.student_pnr}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Student Name : </strong>
                                                                    <span className="text-primary fw-bold">{profile.student_full_name}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Gender : </strong>
                                                                    <span className="text-primary fw-bold">{profile.gender}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Father Name : </strong>
                                                                    <span className="text-primary fw-bold">{profile.father_name}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Mother Name : </strong>
                                                                    <span className="text-primary fw-bold">{profile.mother_name}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Mobile No : </strong>
                                                                    <span className="text-primary fw-bold">{profile.mobile_number}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Student Address : </strong>
                                                                    <span className="text-primary fw-bold">{profile.student_address}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <div className="p-2 border rounded">
                                                                    <strong>Student City : </strong>
                                                                    <span className="text-primary fw-bold">{profile.student_city}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="programs" role="tabpanel">
                                        <div className="row">
                                            <div className="col-xxl-3">
                                                <div className="card mt-3">
                                                    <div className="card-body">
                                                        <h5 className="card-title mb-2">Complete Your Profile</h5>
                                                        <div className="progress animated-progress custom-progress progress-label">
                                                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>
                                                                <div className="label">30%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='card'>
                                                    <div className='card-header'>
                                                        <h5 className=''>Student Programs</h5>
                                                    </div>
                                                    <div className='card-body table-responsive'>
                                                        <div className='col-md-12'>
                                                            <table className='table table-striped'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Program ID</th>
                                                                        <th>Program Code</th>
                                                                        <th>Program Title</th>
                                                                        <th>Program Duration</th>
                                                                        <th>Program Fees</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        program.map((item) => {
                                                                            return (
                                                                                <tr>
                                                                                    <td className='text-primary fw-bold'>{item.student_program_id}</td>
                                                                                    <td>{item.program_code}</td>
                                                                                    <td>{item.program_title}</td>
                                                                                    <td>{item.program_duration}</td>
                                                                                    <td className='text-success fw-bold'>{item.program_fees}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*end tab-content*/}
                            </div>
                        </div>
                        {/*end col*/}
                    </div>
                    {/*end row*/}
                </div>{/* container-fluid */}
            </div>{/* End Page-content */}
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">

                        </div>
                        <div className="col-sm-6">
                            <div className="text-sm-end d-none d-sm-block">

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>


    )
}

export default MyProfile;