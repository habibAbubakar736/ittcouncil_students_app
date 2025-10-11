import React, { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../../../../Context/ConfigContext';
import axios from 'axios';

const StudentDetails = () => {
    const { apiURL, apiHeaderJson, student_id } = useContext(ConfigContext);
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
            <div className="col-12">
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 mb-0">Loading student profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="col-12">
            <div className="card shadow-sm border-0">
                <div className="card-header">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                        <h5 className="card-title mb-0">
                            <i className="ri-user-line me-2"></i> Student Profile
                        </h5>
                        <span className="badge bg-light text-primary px-3 py-2">
                            PNR: {info.student_pnr}
                        </span>
                    </div>
                </div>

                <div className="card-body p-3 p-md-4">
                    {/* Profile Summary */}
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start bg-light rounded-3 p-3 p-md-4 text-center text-sm-start">
                                <div className="flex-shrink-0 mb-3 mb-sm-0">
                                    <div className="avatar avatar-xxl bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mx-sm-0">
                                        {info.student_profile_url ? (
                                            <img
                                                src={info.student_profile_url}
                                                alt="Profile"
                                                className="rounded-circle w-100 h-100 object-fit-cover"
                                            />
                                        ) : (
                                            <i className="ri-user-fill text-primary fs-1"></i>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-sm-4">
                                    <h3 className="mb-2 fw-bold text-dark">{info.student_full_name}</h3>
                                    <div className="d-flex flex-column flex-md-row flex-wrap gap-2">
                                        <p className="mb-0 text-muted">
                                            <i className="ri-mail-fill me-2"></i>
                                            {info.email_address}
                                        </p>
                                        <p className="mb-0 text-muted">
                                            <i className="ri-phone-fill me-2"></i>
                                            {info.mobile_number}
                                        </p>
                                        <span className={`badge ${info.gender === 'Male' ? 'bg-info' : 'bg-pink'} fs-6`}>
                                            <i className="ri-user-fill me-1"></i>
                                            {info.gender}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Responsive Grid Section */}
                        <div className="col-12">
                            <div className="row g-3 g-md-4">
                                {/* Personal */}
                                <div className="col-12 col-md-6 col-lg-4">
                                    <InfoCard
                                        title="Personal Details"
                                        color="primary"
                                        items={[
                                            { label: 'Full Name', value: info.student_full_name },
                                            { label: 'Gender', value: info.gender },
                                            { label: 'Aadhar Number', value: info.student_aadhar_no }
                                        ]}
                                    />
                                </div>

                                {/* Contact */}
                                <div className="col-12 col-md-6 col-lg-4">
                                    <InfoCard
                                        title="Contact Details"
                                        color="success"
                                        items={[
                                            { label: 'Email Address', value: info.email_address },
                                            { label: 'Mobile Number', value: info.mobile_number },
                                            { label: 'WhatsApp Number', value: info.whatsapp_number }
                                        ]}
                                    />
                                </div>

                                {/* Address */}
                                <div className="col-12 col-md-6 col-lg-4">
                                    <InfoCard
                                        title="Address Details"
                                        color="warning"
                                        items={[
                                            { label: 'Address', value: info.student_address },
                                            { label: 'City', value: info.student_city },
                                            { label: 'Pincode', value: info.student_pincode }
                                        ]}
                                    />
                                </div>

                                {/* Family */}
                                <div className="col-12 col-md-6">
                                    <div className="card h-100 border-0 shadow-sm card-animate">
                                        <div className="card-header bg-info py-3 text-center">
                                            <h6 className="mb-0 fw-semibold text-white">
                                                <i className="ri-home-heart-line me-2"></i>
                                                Family Information
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-3">
                                                <FamilyInfo icon="ri-user-3-line" color="info" label="Father's Name" value={info.father_name} />
                                                <FamilyInfo icon="ri-user-2-line" color="pink" label="Mother's Name" value={info.mother_name} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional */}
                                <div className="col-12 col-md-6">
                                    <div className="card h-100 border-0 shadow-sm card-animate">
                                        <div className="card-header bg-secondary py-3 text-center">
                                            <h6 className="mb-0 fw-semibold text-white">
                                                <i className="ri-information-line me-2"></i>
                                                Additional Information
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-3">
                                                <AdditionalInfo
                                                    icon="ri-calendar-line"
                                                    color="primary"
                                                    label="Created Date"
                                                    value={new Date(info.created_date).toLocaleDateString('en-IN')}
                                                />
                                                <AdditionalInfo
                                                    icon="ri-shield-keyhole-line"
                                                    color="success"
                                                    label="Status"
                                                    badge={info.student_status || 'Active'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS */}
            <style jsx>{`
                .avatar {
                    width: 100px;
                    height: 100px;
                    border: 4px solid #fff;
                }
                .avatar-xxl {
                    width: 120px;
                    height: 120px;
                }
                .bg-pink {
                    background-color: #f06595 !important;
                }
                .text-pink {
                    color: #f06595 !important;
                }
                .object-fit-cover {
                    object-fit: cover;
                }
                @media (max-width: 576px) {
                    .avatar-xxl {
                        width: 90px;
                        height: 90px;
                    }
                    h3 {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
};

// ✅ Small Reusable Components
const InfoCard = ({ title, color, items }) => (
    <div className="card h-100 border-0 shadow-sm card-animate">
        <div className={`card-header bg-${color} py-3 text-center`}>
            <h6 className="mb-0 fw-semibold text-white">{title}</h6>
        </div>
        <div className="card-body">
            <div className="d-flex flex-column gap-3">
                {items.map((item, i) => (
                    <div key={i}>
                        <label className="form-label text-muted small mb-1">{item.label}</label>
                        <p className="mb-0 fw-semibold fs-6">
                            {item.value || <span className="text-muted fst-italic">Not Provided</span>}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FamilyInfo = ({ icon, color, label, value }) => (
    <div className="col-sm-6">
        <div className="text-center p-3 bg-light rounded-3">
            <i className={`${icon} fs-2 text-${color} mb-2`}></i>
            <label className="form-label text-muted small mb-1 d-block">{label}</label>
            <p className="mb-0 fw-bold fs-5">{value || 'Not Provided'}</p>
        </div>
    </div>
);

const AdditionalInfo = ({ icon, color, label, value, badge }) => (
    <div className="col-sm-6">
        <div className="text-center p-3 border rounded-3">
            <i className={`${icon} fs-2 text-${color} mb-2`}></i>
            <label className="form-label text-muted small mb-1 d-block">{label}</label>
            <p className="mb-0">
                {badge ? (
                    <span className="badge bg-success rounded-pill px-3 py-2">{badge}</span>
                ) : (
                    <span className="fw-semibold">{value}</span>
                )}
            </p>
        </div>
    </div>
);

export default StudentDetails;
