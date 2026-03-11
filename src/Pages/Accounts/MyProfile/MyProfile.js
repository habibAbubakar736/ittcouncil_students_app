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
                <div className="container-fluid px-3 px-sm-4">
                    {/* Original profile header - exactly as before */}
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src="assets/images/profile-bg.jpg" alt className="profile-wid-img" />
                            <img
                                src='/assets/images/university.png' alt='Watermark' className='position-absolute top-50 start-50 translate-middle' style={{ width: "100%", height: "97%", opacity: "0.30" }}
                            />
                        </div>
                    </div>

                    {/* Original profile info section - exactly as before */}
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                        <div className="row g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img src={profile.student_profile_url || "/assets/images/profile.png"} alt="user-img" className="img-thumbnail rounded-circle" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="p-2">
                                    <h3 className="text-white mb-1 fs-4 fs-sm-3">{profile.student_full_name}</h3>
                                    <p className="text-white text-opacity-75">Student</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div>
                                {/* Original tab header - exactly as before */}
                                <div className="d-flex profile-wrapper">
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

                                {/* Tab panes - Enhanced UI only for the content */}
                                <div className="tab-content pt-4 text-muted">
                                    {/* Profile Tab - Enhanced content only */}
                                    <div className="tab-pane active" id="profile-tab" role="tabpanel">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-header bg-transparent border-0 pt-4 pb-0">
                                                <h5 className="card-title mb-0">
                                                    <i className="ri-information-line me-2" style={{ color: primaryColor }}></i>
                                                    Personal Details
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="row g-3 g-md-4">
                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3 h-100">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-3 flex-shrink-0">
                                                                    <div className="avatar-title bg-primary bg-opacity-10 rounded-circle" style={{ color: primaryColor }}>
                                                                        <i className="ri-fingerprint-line fs-18"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 min-width-0">
                                                                    <small className="text-muted d-block">Student PRN No</small>
                                                                    <strong className="fs-15 text-break" style={{ color: primaryColor }}>{profile.student_pnr || 'N/A'}</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3 h-100">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-3 flex-shrink-0">
                                                                    <div className="avatar-title bg-success bg-opacity-10 rounded-circle text-success">
                                                                        <i className="ri-user-3-line fs-18"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 min-width-0">
                                                                    <small className="text-muted d-block">Full Name</small>
                                                                    <strong className="fs-15 text-break">{profile.student_full_name || 'N/A'}</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3 h-100">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-3 flex-shrink-0">
                                                                    <div className="avatar-title bg-info bg-opacity-10 rounded-circle text-info">
                                                                        <i className="ri-user-2-line fs-18"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 min-width-0">
                                                                    <small className="text-muted d-block">Gender</small>
                                                                    <strong className="fs-15 text-break">{profile.gender || 'N/A'}</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3 h-100">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-3 flex-shrink-0">
                                                                    <div className="avatar-title bg-warning bg-opacity-10 rounded-circle text-warning">
                                                                        <i className="ri-auction-line fs-18"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 min-width-0">
                                                                    <small className="text-muted d-block">Aadhar Number</small>
                                                                    <strong className="fs-15 text-break">
                                                                        {profile.student_aadhar_no
                                                                            ? profile.student_aadhar_no.slice(-4).padStart(profile.student_aadhar_no.length, "•")
                                                                            : 'N/A'}
                                                                    </strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3 h-100">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-3 flex-shrink-0">
                                                                    <div className="avatar-title bg-purple bg-opacity-10 rounded-circle" style={{ color: '#6f42c1' }}>
                                                                        <i className="ri-user-star-line fs-18"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 min-width-0">
                                                                    <small className="text-muted d-block">Father's Name</small>
                                                                    <strong className="fs-15 text-break">{profile.father_name || 'N/A'}</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3 h-100">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-3 flex-shrink-0">
                                                                    <div className="avatar-title bg-pink bg-opacity-10 rounded-circle" style={{ color: '#e83e8c' }}>
                                                                        <i className="ri-user-heart-line fs-18"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 min-width-0">
                                                                    <small className="text-muted d-block">Mother's Name</small>
                                                                    <strong className="fs-15 text-break">{profile.mother_name || 'N/A'}</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3 h-100">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-3 flex-shrink-0">
                                                                    <div className="avatar-title bg-secondary bg-opacity-10 rounded-circle text-secondary">
                                                                        <i className="ri-phone-line fs-18"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 min-width-0">
                                                                    <small className="text-muted d-block">Mobile Number</small>
                                                                    <strong className="fs-15 text-break">{profile.mobile_number || 'N/A'}</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className="p-3 bg-light rounded-3">
                                                            <div className="d-flex flex-column flex-sm-row align-items-start">
                                                                <div className="avatar-sm me-sm-3 mb-2 mb-sm-0 flex-shrink-0">
                                                                    <div className="avatar-title bg-primary bg-opacity-10 rounded-circle" style={{ color: primaryColor }}>
                                                                        <i className="ri-map-pin-line fs-18"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1 min-width-0 w-100">
                                                                    <small className="text-muted d-block mb-2">Address</small>
                                                                    <div className="row">
                                                                        <div className="col-md-8">
                                                                            <strong className="fs-15 d-block text-break">{profile.student_address || 'N/A'}</strong>
                                                                            <small className="text-muted text-break">{profile.student_city || 'N/A'}</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Programs Tab - Enhanced content only */}
                                    <div className="tab-pane fade" id="programs" role="tabpanel">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-header bg-transparent border-0 pt-4 pb-0">
                                                <h5 className="card-title mb-0">
                                                    <i className="ri-book-open-fill me-2" style={{ color: primaryColor }}></i>
                                                    Enrolled Programs
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                {program.length > 0 ? (
                                                    <div className="table-responsive">
                                                        <table className="table table-hover table-nowrap align-middle mb-0">
                                                            <thead className="bg-light">
                                                                <tr>
                                                                    <th className="border-0 rounded-start">Program ID</th>
                                                                    <th className="border-0">Program Code</th>
                                                                    <th className="border-0">Program Title</th>
                                                                    <th className="border-0 rounded-end">Duration</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {program.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <span className="fw-semibold" style={{ color: primaryColor }}>
                                                                                #{item.student_program_id}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="badge bg-info bg-opacity-10 text-info px-2 px-sm-3 py-2">
                                                                                {item.program_code}
                                                                            </span>
                                                                        </td>
                                                                        <td className="fw-medium text-break">{item.program_title}</td>
                                                                        <td>
                                                                            <span className="badge bg-success bg-opacity-10 text-success px-2 px-sm-3 py-2">
                                                                                <i className="ri-time-line me-1"></i>
                                                                                {item.program_duration} Days
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-4 py-sm-5">
                                                        <div className="avatar-lg mx-auto mb-4">
                                                            <div className="avatar-title bg-light rounded-circle text-muted">
                                                                <i className="ri-book-open-line fs-4"></i>
                                                            </div>
                                                        </div>
                                                        <h5 className="text-muted">No Programs Enrolled</h5>
                                                        <p className="text-muted mb-0">You haven't enrolled in any programs yet.</p>
                                                    </div>
                                                )}
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
                            <div className="text-muted">
                                <i className="ri-copyright-line"></i> {new Date().getFullYear()} Your Institution
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="text-sm-end text-muted">
                                Student Portal
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default MyProfile;