import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ConfigContext } from '../../../Context/ConfigContext';
import axios from 'axios';
import './StartExam.css';

const StartExam = () => {
    const { master_subject_id } = useParams();
    const navigate = useNavigate();
    const { apiURL, apiHeaderJson } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    const [examData, setExamData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(1800);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [bgImageLoaded, setBgImageLoaded] = useState(false);

    const GetExamQuestions = async () => {
        try {
            const response = await axios.get(`${apiURL}Students/ExamQuestion`, {
                params: { master_subject_id },
                headers
            });

            if (response?.data?.success) {
                const data = response?.data?.data;
                setExamData(data);
                const initialAnswers = {};
                data.forEach((question, index) => {
                    initialAnswers[index] = '';
                });
                setAnswers(initialAnswers);
            }
        } catch (error) {
            console.log("error : ", error);
        } finally {
            setLoading(false);
        }
    }

    // Preload background image
    useEffect(() => {
        const img = new Image();
        img.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
        img.onload = () => setBgImageLoaded(true);
        img.onerror = () => {
            console.log('Background image failed to load, using gradient fallback');
            setBgImageLoaded(true);
        };
    }, []);

    const handleAnswerSelect = (questionIndex, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }));
    };

    const handleNext = () => {
        if (currentQuestion < examData.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleQuestionNavigation = (index) => {
        setCurrentQuestion(index);
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to submit the exam? You cannot change your answers after submission.")) {
            setSubmitted(true);
            console.log("Submitted answers:", answers);
            alert("Exam submitted successfully!");
            navigate('/');
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getAnswerStatus = (index) => {
        if (answers[index]) return 'answered';
        return 'unanswered';
    };

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0 && !submitted) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !submitted) {
            handleSubmit();
        }
    }, [timeLeft, submitted]);

    useEffect(() => {
        GetExamQuestions();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading || !bgImageLoaded) {
        return (
            <div className='main-content bg-loading'>
                <div className='page-content'>
                    <div className='container-fluid'>
                        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                            <div className="text-center">
                                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading exam environment...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    const currentQ = examData[currentQuestion];
    const progress = ((currentQuestion + 1) / examData.length) * 100;
    const answeredCount = Object.values(answers).filter(a => a !== '').length;

    return (
        <div className='main-content exam-bg overlay-effect'>
            <div className='page-content'>
                <div className='container-fluid'>
                    {/* Header Section */}
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <div className='card border-0 card-animate cursor-pointer'>
                                <div className='card-body'>
                                    <div className='row align-items-center'>
                                        <div className='col-md-8'>
                                            <h2 className='card-title mb-2 text-dark'>
                                                <i className="fas fa-graduation-cap me-3 text-primary"></i>
                                                Online Examination
                                            </h2>
                                            <p className='text-muted mb-0'>
                                                Test your knowledge and skills in this comprehensive assessment
                                            </p>
                                        </div>
                                        <div className='col-md-4 text-md-end'>
                                            <div className={`alert ${timeLeft < 300 ? 'alert-danger' : 'alert-warning'} mb-0 border-0 shadow timer-glowing`}>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-clock me-2 fs-5"></i>
                                                    <strong className='fs-5'>{formatTime(timeLeft)}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card border-0'>
                                <div className='card-body'>
                                    <div className='d-flex align-items-center'>
                                        <span className='fw-bold text-dark me-3'>Questions : </span>
                                        <div className='simple-question-grid'>
                                            {examData.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`simple-question-btn ${currentQuestion === index
                                                        ? 'active-question'
                                                        : getAnswerStatus(index) === 'answered'
                                                            ? 'answered'
                                                            : 'unanswered'
                                                        }`}
                                                    onClick={() => handleQuestionNavigation(index)}
                                                    title={`Question ${index + 1}`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='d-flex align-items-center justify-content-between mt-2'>
                                        <div className='status-indicators'>
                                            <div className='d-flex gap-2'>
                                                <div className='d-flex align-items-center gap-1'>
                                                    <div className='status-dot current-dot'></div>
                                                    <small className='text-muted'>Current</small>
                                                </div>
                                                <div className='d-flex align-items-center gap-1'>
                                                    <div className='status-dot answered-dot'></div>
                                                    <small className='text-muted'>Answered</small>
                                                </div>
                                                <div className='d-flex align-items-center gap-1'>
                                                    <div className='status-dot unanswered-dot'></div>
                                                    <small className='text-muted'>Unanswered</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='progress-stats'>
                                            <small className='text-muted'>
                                                <strong>{answeredCount}</strong> of <strong>{examData.length}</strong> answered
                                            </small>
                                        </div>
                                        <button
                                            className='btn btn-danger btn-sm'
                                            onClick={handleSubmit}
                                        >
                                            <i className="fas fa-paper-plane me-1"></i>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        {/* Main Question Area - Full Width */}
                        <div className='col-12'>
                            <div className='card border-0'>
                                <div className='card-header'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span className='badge bg-primary fs-6 px-3 py-2'>Question {currentQuestion + 1} of {examData.length}</span>
                                        <span className='badge bg-success ms-2 fs-6 px-3 py-2'>Mark: 1</span>
                                    </div>
                                </div>

                                <div className='card-body'>
                                    {/* Question Content */}
                                    <div className='mb-5'>
                                        <div className='d-flex align-items-start'>
                                            <div className='me-3 text-primary'>
                                                <i className="fas fa-question-circle fs-2"></i>
                                            </div>
                                            <div className='flex-grow-1'>
                                                <h6 className='text-dark mb-3'>Read the question carefully and select the correct answer:</h6>
                                                <div
                                                    className='p-4 bg-warning rounded-3 border-0 text-white'
                                                    dangerouslySetInnerHTML={{ __html: currentQ.question_content }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Options */}
                                    <div className='options-section'>
                                        <h6 className='text-dark mb-3'>
                                            <i className="fas fa-mouse-pointer me-2 text-primary"></i>
                                            Select your answer:
                                        </h6>
                                        <div className='row g-3'>
                                            {['A', 'B', 'C', 'D'].map((option) => (
                                                <div key={option} className='col-12'>
                                                    <div
                                                        className={`p-3 rounded-3 cursor-pointer option-card ${answers[currentQuestion] === option
                                                            ? 'bg-primary text-white option-selected'
                                                            : 'bg-white option-default'
                                                            } shadow-sm border`}
                                                        onClick={() => handleAnswerSelect(currentQuestion, option)}
                                                    >
                                                        <div className='d-flex align-items-center'>
                                                            <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${answers[currentQuestion] === option
                                                                ? 'bg-white bg-opacity-25 text-white border-white'
                                                                : 'bg-light text-muted border'
                                                                }`}
                                                                style={{ width: '30px', height: '30px', borderWidth: '2px' }}>
                                                                <span className={`fw-bold ${answers[currentQuestion] === option ? 'text-primary' : 'text-muted'}`}>
                                                                    {option}
                                                                </span>
                                                            </div>
                                                            <div className={`fw-medium ${answers[currentQuestion] === option ? 'text-white' : 'text-dark'}`}>
                                                                {currentQ[`objective_${option.toLowerCase()}`]}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review Section */}
                                    {showReview && (
                                        <div className='mt-4 p-3 bg-warning bg-opacity-10 rounded-3 border-start border-4 border-warning'>
                                            <h6 className='text-warning mb-2'>
                                                <i className="fas fa-lightbulb me-2"></i>
                                                Quick Review
                                            </h6>
                                            <p className='text-dark mb-0 small'>
                                                Current selection: <strong>{answers[currentQuestion] || 'Not answered'}</strong>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Footer */}
                                <div className='card-footer bg-transparent border-0'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <button
                                            className='btn btn-outline-primary px-4 py-2 navigation-btn'
                                            onClick={handlePrevious}
                                            disabled={currentQuestion === 0}
                                        >
                                            <i className="fas fa-arrow-left me-2"></i>
                                            Previous
                                        </button>

                                        <div className='d-flex gap-3'>
                                            {currentQuestion < examData.length - 1 && (
                                                <button
                                                    className='btn btn-outline-secondary px-4 py-2 navigation-btn'
                                                    onClick={() => handleQuestionNavigation(currentQuestion + 1)}
                                                >
                                                    Skip
                                                    <i className="fas fa-forward ms-2"></i>
                                                </button>
                                            )}

                                            {currentQuestion === examData.length - 1 ? (
                                                <button
                                                    className='btn btn-success px-4 py-2 submit-btn'
                                                    onClick={handleSubmit}
                                                >
                                                    <i className="fas fa-paper-plane me-2"></i>
                                                    Submit Exam
                                                </button>
                                            ) : (
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={handleNext}
                                                >
                                                    Next Question
                                                    <i className="fas fa-arrow-right ms-2"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Tips */}
                            <div className='card border-0 cursor-pointer card-animate mt-4'>
                                <div className='card-body'>
                                    <h6 className='text-dark mb-3'>
                                        <i className="fas fa-tips me-2 text-primary"></i>
                                        Exam Tips
                                    </h6>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <ul className='list-unstyled text-muted'>
                                                <li className='mb-2'>
                                                    <i className="fas fa-check-circle text-success me-2"></i>
                                                    Read questions carefully
                                                </li>
                                                <li className='mb-2'>
                                                    <i className="fas fa-check-circle text-success me-2"></i>
                                                    Manage your time wisely
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='col-md-6'>
                                            <ul className='list-unstyled text-muted'>
                                                <li className='mb-2'>
                                                    <i className="fas fa-check-circle text-success me-2"></i>
                                                    Review answers before submitting
                                                </li>
                                                <li className='mb-2'>
                                                    <i className="fas fa-check-circle text-success me-2"></i>
                                                    Flag questions for review
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Icons */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
            />
        </div>
    )
}

export default StartExam;