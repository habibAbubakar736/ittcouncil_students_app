import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../Components/PageTitle'
import { ConfigContext } from '../../../Context/ConfigContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { DateFormater } from '../../../Components/GLobal'

const ExamDetails = () => {
    const { student_subject_id } = useParams();
    const { apiURL, apiHeaderJson, primaryColor } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [isExamDay, setIsExamDay] = useState(false);

    const GetInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiURL}Students/GetExamInfo`, {
                params: { student_subject_id },
                headers
            });

            if (response?.data?.success) {
                setInfo(response.data.data);
                checkExamDay(response.data.data.exam_date);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const checkExamDay = (examDate) => {
        if (!examDate) return;

        const today = new Date();
        const exam = new Date(examDate);

        // Compare only date parts (ignore time)
        const isSameDay = today.toDateString() === exam.toDateString();
        setIsExamDay(isSameDay);
    }

    useEffect(() => {
        GetInfo();
    }, [student_subject_id])

    const getExamStatus = () => {
        const today = new Date();
        const examDate = new Date(info.exam_date);
        const diff = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

        if (diff === 0) return { text: 'Today', color: 'danger', badge: 'bg-danger' };
        if (diff === 1) return { text: 'Tomorrow', color: 'warning', badge: 'bg-warning' };
        if (diff > 1 && diff <= 7) return { text: `${diff} Days Left`, color: 'info', badge: 'bg-info' };
        if (diff > 7) return { text: 'Upcoming', color: 'secondary', badge: 'bg-secondary' };
        if (diff < 0) return { text: 'Completed', color: 'success', badge: 'bg-success' };
    }

    const examStatus = getExamStatus();

    const handleStartExam = () => {
        // Yahan ap exam start karne ka logic add kar sakte hain
        alert('Exam starting...');
        // navigate to exam page ya exam interface
    }

    if (loading) {
        return (
            <div className='main-content'>
                <div className='page-content'>
                    <div className='container-fluid'>
                        <br />
                        <PageTitle title={"Exam Details"} primary={"Dashboard"} />
                        <div className="text-center my-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2">Loading exam details...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='main-content'>
            <div className='page-content'>
                <div className='container-fluid'>
                    <br />
                    <PageTitle title={"Exam Details"} primary={"Dashboard"} />

                    <div className="row">
                        {/* Main Exam Information Card */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-header" style={{ background: primaryColor }}>
                                    <h5 className="card-title mb-0 text-white">
                                        <i className="fas fa-file-alt me-2"></i>
                                        Exam Information
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted">Subject Name</label>
                                                <p className="fs-5 fw-bold text-dark">{info.subject_title}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted">Subject Code</label>
                                                <p className="fs-5 fw-bold" style={{ color: primaryColor }}>{info.subject_code}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted">Program</label>
                                                <p className="fs-6 fw-bold text-dark">{info.program_title} ({info.program_short_title})</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted">Program Duration</label>
                                                <p className="fs-6 fw-bold text-dark">{info.program_duration} Days</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted">Enrollment ID</label>
                                                <p className="fs-6 fw-bold" style={{ color: primaryColor }}>{info.student_program_id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Description Card */}
                            {info.subject_long_description && (
                                <div className="card shadow-sm mt-4">
                                    <div className="card-header bg-light">
                                        <h5 className="card-title mb-0">
                                            <i className="fas fa-info-circle me-2"></i>
                                            Subject Description
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="text-muted mb-0">
                                            {info.subject_long_description || info.subject_short_description || 'No description available.'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Exam Status & Actions Card */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm">
                                <div className="card-header" style={{ background: primaryColor }}>
                                    <h5 className="card-title mb-0 text-white">
                                        <i className="fas fa-calendar-check me-2"></i>
                                        Exam Status
                                    </h5>
                                </div>
                                <div className="card-body text-center">
                                    <div className={`badge ${examStatus.badge} fs-6 px-3 py-2 mb-3`}>
                                        {examStatus.text}
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted">Exam Date:</span>
                                            <strong className="fs-6">{DateFormater(info.exam_date)}</strong>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted">Duration:</span>
                                            <strong className="fs-6">{info.exam_duration || '30'} minutes</strong>
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2">
                                        {isExamDay ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={handleStartExam}
                                            >
                                                <i className="fas fa-play me-2"></i>
                                                Start Exam
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" disabled>
                                                <i className="fas fa-clock me-2"></i>
                                                {examStatus.text === 'Completed' ? 'Exam Completed' : 'Exam Not Started'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamDetails