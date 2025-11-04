import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../Context/ConfigContext';
import axios from 'axios';
import images from '../../Utils/Images';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { apiURL, apiHeaderJson, student_id, primaryColor } = useContext(ConfigContext);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const GetDashboard = async () => {
        try {
            setLoading(true);
            const headers = apiHeaderJson;
            const response = await axios.get(`${apiURL}Dashboard/GetDashboardStates`, { headers });
            if (response?.data?.success) {
                setData(response?.data?.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetDashboard();
    }, [student_id]);

    return (
        <div className='main-content'>
            <div className='page-content'>
                <div className='container-fluid'>
                    <div className="row dash-nft">
                        <div className="col-md-6">
                            <div className="card overflow-hidden">
                                <div className="card-body bg-marketplace d-flex">
                                    <div className="flex-grow-1">
                                        <h4 className="fs-18 lh-base mb-0">
                                            Welcome to <span className='fw-bold text-decoration-underline' style={{ color: primaryColor }}>ITT Council</span>
                                        </h4>
                                        <p className="mb-0 mt-2 pt-1 text-muted">
                                            ITT Council is a premier institution for Technical Education & Skill Development.
                                            We aim to empower students with knowledge, hands-on training, and certifications to excel
                                            in their careers and the modern workforce.
                                        </p>
                                    </div>
                                    <img src={images?.dashboard_image} alt="ITT Council" className="img-fluid" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card card-height-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-secondary-subtle rounded fs-3">
                                                <i className="bx bx-notepad" style={{ color: primaryColor }} />
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ps-3">
                                            <h5 className="text-muted text-uppercase fs-13 mb-0">Upcoming Exams</h5>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-1">
                                        <h4 className="fs-22 fw-semibold ff-secondary mb-0">{data?.total_pending_exam ?? 0}</h4>
                                        <Link to={"/Student/UpcominExam"}>
                                            <p className="mt-4 mb-0 text-muted text-uppercase text-decoration-underline">
                                                <span className="badge bg-danger-subtle text-danger mb-0 me-1">
                                                    <i className="ri-arrow-down-line align-middle" />
                                                </span> View Exam Report
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-md-3">
                            <div className="card card-height-100">
                                <div className="card-body">
                                    <div className="float-end">
                                        <div className="dropdown card-header-dropdown">
                                            <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="text-muted fs-18"><i className="mdi mdi-dots-vertical align-middle" /></span>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a className="dropdown-item" href="#">Today</a>
                                                <a className="dropdown-item" href="#">Last Week</a>
                                                <a className="dropdown-item" href="#">Last Month</a>
                                                <a className="dropdown-item" href="#">Current Year</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-primary-subtle rounded fs-3">
                                                <i className="bx bx-wallet text-primary" />
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ps-3">
                                            <h5 className="text-muted text-uppercase fs-13 mb-0">Estimated Earnings</h5>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-1">
                                        <h4 className="fs-22 fw-semibold ff-secondary mb-0">$<span className="counter-value" data-target="624562.564" /> </h4>
                                        <p className="mt-4 mb-0 text-muted">
                                            <span className="badge bg-success-subtle text-success mb-0">
                                                <i className="ri-arrow-up-line align-middle" /> 16.24 %
                                            </span> increase from last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
