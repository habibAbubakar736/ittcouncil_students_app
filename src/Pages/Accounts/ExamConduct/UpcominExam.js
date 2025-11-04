import { useContext, useEffect, useState } from 'react';
import PageTitle from '../../../Components/PageTitle';
import { ConfigContext } from '../../../Context/ConfigContext';
import axios from 'axios';
import { DateFormater } from '../../../Components/GLobal';

const UpcomingExam = () => {
    const { apiURL, apiHeaderJson, primaryColor, student_id } = useContext(ConfigContext);

    const [loading, setLoading] = useState(false);
    const [exams, setExams] = useState([]);

    const getUpcomingExams = async () => {
        try {
            setLoading(true);
            const headers = apiHeaderJson;
            const response = await axios.get(`${apiURL}Students/GetUpcomingExam`, { headers });
            if (response?.data?.success) {
                setExams(response.data.data || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUpcomingExams();
    }, [student_id]);

    const today = new Date();

    const getExamStatus = (examDate) => {
        const exam = new Date(examDate);
        const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
        if (diff === 0) return { text: 'Today', color: 'danger', icon: 'ri-error-warning-line' };
        if (diff === 1) return { text: 'Tomorrow', color: 'warning', icon: 'ri-time-line' };
        if (diff <= 7) return { text: `${diff} Days Left`, color: 'info', icon: 'ri-calendar-event-line' };
        return { text: 'Upcoming', color: 'secondary', icon: 'ri-calendar-line' };
    };

    const soonExams = exams.filter((exam) => {
        const examDate = new Date(exam.exam_date);
        const diff = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
        return diff <= 2;
    });

    return (
        <div className='main-content'>
            <div className='page-content'>
                <div className='container-fluid'>
                    <br />
                    <PageTitle title={"My Upcoming Exam"} primary={"Dashboard"} />

                    {/* Cards for soon exams */}
                    <div className="row">
                        {soonExams.length === 0 ? (
                            <div className="alert alert-info col-12 text-center">
                                <i className="fas fa-info-circle fa-2x mb-2"></i>
                                <h6 className="mb-1">No Exams Soon</h6>
                                <p className="mb-0">You don't have any exams in the next 2 days.</p>
                            </div>
                        ) : (
                            soonExams.map((exam) => {
                                const status = getExamStatus(exam.exam_date);
                                return (
                                    <div key={exam.id} className="col-md-6 col-lg-4">
                                        <div className="card card-animate profile-project-card shadow none profile-project-warning material-shadow cursor-pointer">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h5 className="card-title mb-0">{exam.program_title}</h5>
                                                    <i className={`fas ${status.icon} text-${status.color} fa-lg`}></i>
                                                </div>
                                                <h6 className="card-subtitle mb-3 text-muted">{exam.subject_title}</h6>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className={`badge bg-${status.color}`}>{status.text}</span>
                                                    <p className="text-danger fw-bold text-decoration-underline mb-0"><strong>{DateFormater(exam.exam_date)}</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>


                    {/* Table for all upcoming exams */}
                    <div className="card shadow-sm">
                        <div className="card-header text-center" style={{ background: primaryColor }}>
                            <h5 className='card-title mb-0 text-white'>All Upcoming Exams</h5>
                        </div>

                        <div className="card-body">
                            {loading ? (
                                <div className="text-center my-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : exams.length === 0 ? (
                                <p className="text-center text-muted mb-0">No upcoming exams found.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className='table table-bordered table-striped table-hover align-middle mb-0'>
                                        <thead>
                                            <tr>
                                                <th>Enrollment Number</th>
                                                <th>Programs</th>
                                                <th>Subjects</th>
                                                <th>exam Duration</th>
                                                <th>Exam Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exams.map((exam, index) => {
                                                const status = getExamStatus(exam.exam_date);
                                                return (
                                                    <tr key={index}>
                                                        <td className='fw-bold' style={{ color: primaryColor }}>{exam.student_program_id}</td>
                                                        <td className='fw-bold' style={{ color: primaryColor }}>{exam.program_title}</td>
                                                        <td>{exam.subject_title}</td>
                                                        <td className='text-dark fw-bold'>{exam.exam_duration} min</td>
                                                        <td className='fw-bold' style={{ color: primaryColor }}>{DateFormater(exam.exam_date)}</td>
                                                        <td>
                                                            <span className={`badge bg-${status.color}`}>
                                                                {status.text}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <button className="btn btn-sm btn-primary">View</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UpcomingExam;
