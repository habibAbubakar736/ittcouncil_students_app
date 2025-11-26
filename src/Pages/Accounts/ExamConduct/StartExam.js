import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ConfigContext } from '../../../Context/ConfigContext';
import axios from 'axios';
import Swal from "sweetalert2";
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
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);

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
                data.forEach((_, index) => {
                    initialAnswers[index] = '';
                });
                setAnswers(initialAnswers);

                // Set timer based on exam duration from API
                if (data.length > 0 && data[0].exam_duration) {
                    setTimeLeft(data[0].exam_duration * 60);
                }
            }
        } catch (error) {
            console.log("error : ", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fullscreen Enter function
    const enterFullscreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen().then(() => {
                setIsFullscreen(true);
                setShowFullscreenPrompt(false);
            }).catch(err => {
                console.log("Fullscreen error: ", err);
                setShowFullscreenPrompt(false);
            });
        }
    };

    // ✅ Exit Fullscreen function
    const exitFullscreen = () => {
        if (document.exitFullscreen) document.exitFullscreen();
    };

    // ✅ Listen to fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    useEffect(() => {
        enterFullscreen();
    }, []);

    // ✅ Timer logic
    useEffect(() => {
        if (timeLeft > 0 && !submitted) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !submitted) {
            handleSubmit();
        }
    }, [timeLeft, submitted]);

    // ✅ Fetch exam data
    useEffect(() => {
        GetExamQuestions();
        window.scrollTo(0, 0);
    }, []);

    // ✅ Preload background image
    useEffect(() => {
        const img = new Image();
        img.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80';
        img.onload = () => setBgImageLoaded(true);
        img.onerror = () => setBgImageLoaded(true);
    }, []);

    const handleAnswerSelect = (questionIndex, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }));
    };


    const handleNext = async () => {
        const currentQObj = examData[currentQuestion];
        const currentAnswer = answers[currentQuestion];

        try {
            // 🟡 Always update the current question before moving on
            if (currentQObj?.exam_answer_id) {
                const answerToSave = currentAnswer ? currentAnswer : "SKIPPED";
                await updateExamAnswer(currentQObj, answerToSave);
            }

            // 🟢 If this is NOT the last question, go to next
            if (currentQuestion < examData.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            }
            // 🔴 If this IS the last question, call submit
            else {
                handleSubmit();
            }
        } catch (error) {
            console.error("Error updating answer or submitting exam:", error);
        }
    };



    const handleSkip = async () => {
        const currentQObj = examData[currentQuestion];

        await updateExamAnswer(currentQObj, "SKIPPED");

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
        Swal.fire({
            title: "Submit Exam?",
            text: "Are you sure you want to submit the exam? You cannot change your answers after submission.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Submit",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // ✅ Perform submit actions
                setSubmitted(true);
                console.log("Submitted answers:", answers);

                Swal.fire({
                    title: "Exam Submitted!",
                    text: "Your exam has been successfully submitted.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    exitFullscreen();
                    window.location.href = "/";
                });
            }
        });
    };


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // const getAnswerStatus = (index) => answers[index] ? 'answered' : 'unanswered';

    const calculateProgress = () => {
        const answered = Object.values(answers).filter(a => a !== '').length;
        return (answered / examData.length) * 100;
    };

    const answeredCount = Object.values(answers).filter(a => a !== '').length;

    // ✅ Fullscreen Prompt Component
    if (showFullscreenPrompt && !isFullscreen) {
        return (
            <div className='main-content bg-loading'>
                <div className='page-content'>
                    <div className='container-fluid'>
                        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                            <div className="card glass-card" style={{ maxWidth: '500px' }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-4">
                                        <i className="fas fa-expand-alt text-primary fa-4x mb-3"></i>
                                        <h3 className='text-dark mb-3'>Fullscreen Mode Required</h3>
                                        <p className='text-muted'>
                                            For the best exam experience and to maintain exam integrity,
                                            please enable fullscreen mode.
                                        </p>
                                    </div>
                                    <button
                                        className='btn btn-primary btn-lg w-100'
                                        onClick={enterFullscreen}
                                    >
                                        <i className="fas fa-expand-alt me-2"></i>
                                        Enter Fullscreen Mode
                                    </button>
                                    <small className='text-muted mt-3 d-block'>
                                        You can press F11 or Esc to exit fullscreen later
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
            </div>
        );
    }

    const currentQ = examData[currentQuestion];

    const updateExamAnswer = async (questionObj, selectedAnswer) => {
        try {

            const body = {
                exam_answer_id: questionObj.exam_answer_id,
                given_answer: selectedAnswer
            }

            await axios.post(`${apiURL}Students/UpdateExamAnswer`, body, { headers });

            console.log(`✅ Answer saved for QID ${questionObj.exam_answer_id}:`, selectedAnswer);
        } catch (error) {
            console.error("❌ Failed to save answer:", error);
        }
    };

    const getAnswerStatus = (index) => {
        const currentQ = examData[index];
        const givenAnswer = answers[index];

        if (currentQuestion === index) return "current-question";  // highlight current

        if (givenAnswer === "SKIPPED") return "skipped-question";  // bg-secondary
        if (givenAnswer) return "answered-question";                // answered
        return "unanswered-question";                               // not attempted
    };



    return (
        <div className='exam-bg'>
            <div className='pt-5'>
                <div className='container-fluid'>
                    {/* Header Section */}
                    <div className='row mb-4'>
                        <div className='col-12'>
                            <div className='card glass-card card-animate'>
                                <div className='card-body'>
                                    <div className='row align-items-center'>
                                        <div className='col-md-6'>
                                            <h4 className='text-primary mb-1'>{currentQ?.subject_title || 'Programming in C'}</h4>
                                            <p className='text-muted mb-0'>{currentQ?.subject_code || 'BCA102'}</p>
                                        </div>
                                        <div className='col-md-6 text-md-end'>
                                            <div className='d-flex flex-column flex-md-row justify-content-md-end align-items-center gap-3'>
                                                <div className='time-display'>
                                                    <span className={`badge ${timeLeft < 300 ? 'bg-danger timer-glowing alert-danger' : timeLeft < 600 ? 'bg-warning timer-glowing' : 'bg-primary'} fs-6 p-3`}>
                                                        <i className="fas fa-clock me-2"></i>
                                                        {formatTime(timeLeft)}
                                                    </span>
                                                </div>
                                                <div className='progress-stats'>
                                                    <small className='text-muted'>{answeredCount}/{examData.length} answered</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        {/* Questions Navigation Panel */}
                        <div className='col-lg-3 col-md-4 mb-4'>
                            <div className='card glass-card card-animate simple-navigator-card'>
                                <div className='card-header bg-light'>
                                    <h6 className='mb-0'><i className="fas fa-list-ol me-2"></i>Question Navigator</h6>
                                </div>
                                <div className='card-body'>
                                    <div className='simple-question-grid'>
                                        {examData.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`simple-question-btn cursor-pointer ${getAnswerStatus(index)} ${currentQuestion === index ? 'active-question' : ''}`}
                                                onClick={() => handleQuestionNavigation(index)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <div className='status-indicators mt-3'>
                                        <div className='d-flex align-items-center gap-2 mb-2'>
                                            <span className='status-dot current-dot'></span>
                                            <small className='text-muted'>Current</small>
                                        </div>
                                        <div className='d-flex align-items-center gap-2 mb-2'>
                                            <span className='status-dot answered-dot'></span>
                                            <small className='text-muted'>Answered</small>
                                        </div>
                                        <div className='d-flex align-items-center gap-2'>
                                            <span className='status-dot unanswered-dot'></span>
                                            <small className='text-muted'>Unanswered</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className='card glass-card card-animate mt-3'>
                                <div className='card-body p-3'>
                                    <button
                                        className='btn btn-outline-primary w-100 mb-2'
                                        onClick={() => setShowReview(!showReview)}
                                    >
                                        <i className={`fas fa-eye${showReview ? '-slash' : ''} me-2`}></i>
                                        {showReview ? 'Hide Review' : 'Show Review'}
                                    </button>
                                    <button
                                        className='btn btn-danger w-100'
                                        onClick={handleSubmit}
                                        disabled={submitted}
                                    >
                                        <i className="fas fa-paper-plane me-2"></i>
                                        Submit Exam
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Question Display Area */}
                        <div className='col-lg-9 col-md-8'>
                            <div className='card glass-card card-animate overlay-effect'>
                                <div className='card-body p-4'>
                                    {/* Question Header */}
                                    <div className='d-flex justify-content-between align-items-start mb-4'>
                                        <div>
                                            <h5 className='text-primary mb-1'>Question {currentQuestion + 1}</h5>
                                            <small className='text-muted'>Total Questions: {examData.length}</small>
                                        </div>
                                        <span className='badge bg-info fs-6'>Marks: {currentQ?.question_mark || 1}</span>
                                    </div>

                                    {/* Question Content */}
                                    <div className='question-content mb-4'>
                                        <div
                                            className='fs-5 mb-4'
                                            dangerouslySetInnerHTML={{ __html: currentQ?.question_content }}
                                        />

                                        {/* Question Image if available */}
                                        {currentQ?.question_logo && (
                                            <div className='question-image mb-4 text-center'>
                                                <img
                                                    src={currentQ.question_logo}
                                                    alt="Question diagram"
                                                    className='img-fluid rounded'
                                                    style={{ maxHeight: '300px' }}
                                                />
                                            </div>
                                        )}

                                        {/* Options */}
                                        <div className='options-container'>
                                            {['A', 'B', 'C', 'D'].map((option) => (
                                                <div
                                                    key={option}
                                                    className={`option-card card mb-3 p-3 cursor-pointer ${answers[currentQuestion] === option ? 'option-selected border-primary' : 'border-light'}`}
                                                    onClick={() => handleAnswerSelect(currentQuestion, option)}
                                                >
                                                    <div className='d-flex align-items-start'>
                                                        <div className='me-3 mt-1'>
                                                            <div className={`rounded-circle d-flex align-items-center justify-content-center ${answers[currentQuestion] === option ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                                                                style={{ width: '24px', height: '24px', fontSize: '0.8rem', fontWeight: '600' }}>
                                                                {option}
                                                            </div>
                                                        </div>
                                                        <div className='flex-grow-1'>
                                                            <span className='fs-6'>
                                                                {currentQ?.[`objective_${option.toLowerCase()}`]}
                                                            </span>
                                                        </div>
                                                        {answers[currentQuestion] === option && (
                                                            <div className='ms-2 text-primary'>
                                                                <i className="fas fa-check-circle"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className='d-flex justify-content-between align-items-center pt-3 border-top'>
                                        <button
                                            className='btn btn-outline-primary'
                                            onClick={handlePrevious}
                                            disabled={currentQuestion === 0}
                                        >
                                            <i className="fas fa-arrow-left me-2"></i>
                                            Previous
                                        </button>

                                        <div className='text-center'>
                                            <small className='text-muted d-block'>
                                                Question {currentQuestion + 1} of {examData.length}
                                            </small>
                                            <div className="progress" style={{ width: '120px', height: '6px' }}>
                                                <div
                                                    className={`progress-bar ${calculateProgress() === 100 ? 'bg-success' : 'bg-warning'}`}
                                                    style={{ width: `${calculateProgress()}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className='d-flex gap-2'>
                                            <button
                                                className='btn btn-warning'
                                                onClick={handleSkip}
                                                disabled={currentQuestion === examData.length - 1}
                                            >
                                                <i className="fas fa-forward me-2"></i>
                                                Skip
                                            </button>

                                            <button
                                                className='btn btn-primary'
                                                onClick={handleNext}
                                                disabled={currentQuestion === examData.length - 1}
                                            >
                                                Next
                                                <i className="fas fa-arrow-right ms-2"></i>
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            {/* Review Panel */}
                            {showReview && (
                                <div className='card glass-card card-animate mt-4'>
                                    <div className='card-header bg-light'>
                                        <h6 className='mb-0'><i className="fas fa-check-circle me-2"></i>Answer Review</h6>
                                    </div>
                                    <div className='card-body'>
                                        {answers[currentQuestion] ? (
                                            <div>
                                                <p className='mb-2'>Selected Answer: <strong className='text-primary'>Option {answers[currentQuestion]}</strong></p>
                                                <p className='text-success mb-0 fs-6'>
                                                    <i className="fas fa-check me-2"></i>
                                                    Your answer has been saved
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className='text-warning mb-2 fs-6'>
                                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                                    No answer selected for this question
                                                </p>
                                                <small className='text-muted'>Click on an option above to select your answer</small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartExam;