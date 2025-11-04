import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../../Context/ConfigContext';
import axios from 'axios';
import images from '../../../Utils/Images';
import PageTitle from '../../../Components/PageTitle';

const MyProfile = () => {
    const { apiURL, apiHeaderJson, student_id, primaryColor } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const GetStudentsProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiURL}Students/GetStudentsProfile`, {
                params: { student_id },
                headers,
            });
            const { data, success } = response?.data;
            if (success) setInfo(data[0]);
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
                    <PageTitle title={"My Profile"} primary={"Dashboard"} />

                    <div className="row">
                        <div className="col-md-4 mb-5">
                            <div className="card shadow-sm border-0">
                                <div className="card-body text-center p-4">
                                    <img
                                        src={info?.student_profile_url || images?.user_profile}
                                        className="rounded-circle img-thumbnail mb-3"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            border: `3px solid ${primaryColor}`,
                                        }}
                                        alt="user-profile"
                                    />
                                    <h5 className="fw-bold mb-1" style={{ color: primaryColor }}>
                                        {info?.student_full_name}
                                    </h5>
                                    <p className="text-muted mb-1">{info?.student_pnr}</p>
                                    <p className="text-success fw-semibold mb-0">Active Student</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Student Info */}
                        <div className="col-md-8">
                            <div className="card shadow-sm border-0">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold mb-4" style={{ color: primaryColor }}>
                                        Personal Information
                                    </h4>

                                    <div className="row gy-3 gx-4">
                                        {[
                                            { label: 'Full Name', icon: 'ri-user-line', value: info?.student_full_name },
                                            { label: "Father's Name", icon: 'ri-men-line', value: info?.father_name },
                                            { label: "Mother's Name", icon: 'ri-women-line', value: info?.mother_name },
                                            { label: 'Gender', icon: 'ri-gender-line', value: info?.gender },
                                            { label: 'Mobile Number', icon: 'ri-phone-line', value: info?.mobile_number },
                                            { label: 'WhatsApp Number', icon: 'ri-whatsapp-line', value: info?.whatsapp_number },
                                            { label: 'Email Address', icon: 'ri-mail-line', value: info?.email_address },
                                            {
                                                label: 'Aadhar No',
                                                icon: 'ri-bank-card-line',
                                                value: info?.student_aadhar_no ? `********${info.student_aadhar_no.slice(-4)}` : '-'
                                            },
                                            { label: 'City', icon: 'ri-map-pin-line', value: info?.student_city },
                                            { label: 'Pincode', icon: 'ri-mail-open-line', value: info?.student_pincode },
                                            { label: 'Address', icon: 'ri-home-4-line', value: info?.student_address },
                                        ].map((item, index) => (
                                            <div className="col-md-6" key={index}>
                                                <label className="text-muted small mb-1">
                                                    <i className={`${item.icon} me-1`}></i> {item.label}
                                                </label>
                                                <p className="fw-semibold mb-0">{item.value || '-'}</p>
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyProfile;
