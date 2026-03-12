import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../Context/ConfigContext';
import axios from 'axios';
import images from '../../Utils/Images';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ReactECharts from 'echarts-for-react';
import CountUp from "react-countup";

const Dashboard = () => {
    const { apiURL, apiHeaderJson, student_id, primaryColor } = useContext(ConfigContext);

    const [loading, setLoading] = useState(false);
    const [programsLoading, setProgramsLoading] = useState(false);
    const [data, setData] = useState({});
    const [enrolledPrograms, setEnrolledPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [programStats, setProgramStats] = useState(null);

    // Fetch dashboard stats
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

    // Fetch enrolled programs
    const GetEnrolledPrograms = async () => {
        try {
            setProgramsLoading(true);
            const headers = apiHeaderJson;
            const response = await axios.get(`${apiURL}Dashboard/GetEnrolledPrograms`, { headers });
            if (response?.data?.success) {
                const programs = response?.data?.rows?.map(program => ({
                    value: program.student_program_id,
                    label: program.program_title,
                    ...program
                }));
                setEnrolledPrograms(programs || []);
                setSelectedProgram(null);
                setProgramStats(null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setProgramsLoading(false);
        }
    };

    useEffect(() => {
        GetDashboard();
        GetEnrolledPrograms();
    }, [student_id]);

    // Handle program change
    const handleProgramChange = (selected) => {
        setSelectedProgram(selected);
        setProgramStats(selected);
    };

    // Dynamic data from API response
    const studentName = data?.student_info?.student_full_name || "Student";
    const totalPendingExam = data?.total_pending_exam || 0;
    const totalEnrolledProgram = data?.total_enrolled_program || 0;
    const totalPassedProgram = data?.total_passed_program || 0;

    // Calculate fee stats for selected program
    // Calculate tuition fee stats for selected program
    const tuitionFee = programStats?.program_tution_fees || 0;
    const paidFee = programStats?.program_tution_fees_paid || 0;
    const pendingFee = Math.max(0, tuitionFee - paidFee);
    const paidPercentage = tuitionFee > 0 ? (paidFee / tuitionFee * 100).toFixed(1) : 0;
    const pendingPercentage = tuitionFee > 0 ? (pendingFee / tuitionFee * 100).toFixed(1) : 0;

    // Chart options for donut chart
    const chartOptions = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: ₹{c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            bottom: 10,
            textStyle: {
                color: '#878a99'
            }
        },
        series: [
            {
                name: 'Tuition Fee Status',
                type: 'pie',
                radius: ['55%', '70%'],
                animationDuration: 1200,
                animationEasing: 'cubicOut',
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: paidFee || 0, name: 'Paid Fee', itemStyle: { color: '#2ab57d' } },
                    { value: pendingFee || 0, name: 'Pending Fee', itemStyle: { color: '#fd625e' } }
                ]
            }
        ],
        graphic: [
            {
                type: 'text',
                left: 'center',
                top: '46%',
                style: {
                    text: `₹${tuitionFee}`,
                    fill: '#495057',
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            },
            {
                type: 'text',
                left: 'center',
                top: '58%',
                style: {
                    text: 'Total Tuition',
                    fill: '#878a99',
                    fontSize: 12
                }
            }
        ]
    };

    // Custom styles for react-select
    const selectStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#e9ebec',
            '&:hover': {
                borderColor: primaryColor
            },
            boxShadow: 'none',
            minHeight: '40px',
            fontSize: '14px'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? primaryColor : state.isFocused ? '#f5f6f8' : 'white',
            color: state.isSelected ? 'white' : '#495057',
            cursor: 'pointer',
            fontSize: '14px',
            '&:active': {
                backgroundColor: primaryColor
            }
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999
        })
    };

    return (
        <div className='main-content'>
            <div className='page-content'>
                <div className='container-fluid px-3 px-sm-4'>
                    {/* Welcome Card - Full Width with Animation */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card welcome-card overflow-hidden rounded-4" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 100%)` }}>
                                <div className="card-body p-3 p-sm-4">
                                    <div className="row align-items-center">
                                        <div className="col-lg-8">
                                            <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start">
                                                <div className="flex-shrink-0 mb-3 mb-sm-0">
                                                    <div className="avatar-lg welcome-avatar">
                                                        <div className="avatar-title bg-white bg-opacity-25 rounded-circle">
                                                            <i className="bx bxs-graduation text-white display-6"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-sm-4">
                                                    <h2 className="text-white mb-2 welcome-title fs-4 fs-sm-2 fs-md-1">
                                                        Welcome back, <span className="fw-bold text-decoration-underline" style={{ textDecorationColor: 'rgba(255,255,255,0.5)' }}>{studentName}</span>!
                                                    </h2>
                                                    <p className="text-white text-opacity-75 mb-0 fs-15 welcome-text">
                                                        ITT Council is a premier institution for Technical Education & Skill Development.
                                                        We aim to empower students with knowledge, hands-on training, and certifications to excel
                                                        in their careers and the modern workforce.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 d-none d-lg-block">
                                            <div className="text-end welcome-image-container">
                                                <img
                                                    src="/assets/images/card-img.png"
                                                    alt="ITT Council"
                                                    className="img-fluid welcome-image"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Animated background elements */}
                                <div className="welcome-bg-shape shape-1"></div>
                                <div className="welcome-bg-shape shape-2"></div>
                                <div className="welcome-bg-shape shape-3"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3 mt-sm-4">
                        <div className="col-lg-4 col-sm-12">
                            <div className="card card-animate">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <p className="text-uppercase fw-medium text-muted text-truncate mb-2 fs-13">
                                                Upcoming Exams
                                            </p>

                                            <h4 className="fs-22 fw-semibold ff-secondary mb-2">
                                                <CountUp end={totalPendingExam} duration={1.5} />
                                            </h4>

                                            <Link to="/Student/UpcominExam" className="text-decoration-none">
                                                <p className="text-muted fs-13 mb-0">
                                                    <span className="badge bg-primary-subtle text-primary me-1">
                                                        <i className="ri-calendar-line align-middle"></i>
                                                    </span>
                                                    View Schedule
                                                </p>
                                            </Link>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <div className="avatar-sm">
                                                <span className="avatar-title rounded-circle bg-primary-subtle text-primary fs-22">
                                                    <i className="ri-calendar-todo-line"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="progress rounded-bottom rounded-0" style={{ height: "4px" }}>
                                    <div className="progress-bar bg-primary" style={{ width: "100%" }}></div>
                                </div>
                            </div>
                        </div>


                        {/* Enrolled Programs */}
                        <div className="col-lg-4 col-sm-12">
                            <div className="card card-animate">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <p className="text-uppercase fw-medium text-muted text-truncate mb-2 fs-13">
                                                Enrolled Programs
                                            </p>

                                            <h4 className="fs-22 fw-semibold ff-secondary mb-2">
                                                <CountUp end={totalEnrolledProgram} duration={1.5} />
                                            </h4>

                                            <p className="text-muted fs-13 mb-0">
                                                <span className="badge bg-info-subtle text-info me-1">
                                                    <i className="ri-user-add-line align-middle"></i>
                                                </span>
                                                Active Programs
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <div className="avatar-sm">
                                                <span className="avatar-title rounded-circle bg-info-subtle text-info fs-22">
                                                    <i className="ri-user-star-line"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="progress rounded-bottom rounded-0" style={{ height: "4px" }}>
                                    <div className="progress-bar bg-info" style={{ width: "100%" }}></div>
                                </div>
                            </div>
                        </div>


                        {/* Passed Programs */}
                        <div className="col-lg-4 col-sm-12">
                            <div className="card card-animate">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <p className="text-uppercase fw-medium text-muted text-truncate mb-2 fs-13">
                                                Passed Programs
                                            </p>

                                            <h4 className="fs-22 fw-semibold ff-secondary mb-2">
                                                <CountUp end={totalPassedProgram} duration={1.5} />
                                            </h4>

                                            <p className="text-muted fs-13 mb-0">
                                                <span className="badge bg-warning-subtle text-warning me-1">
                                                    <i className="ri-award-line align-middle"></i>
                                                </span>
                                                Certified Programs
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <div className="avatar-sm">
                                                <span className="avatar-title rounded-circle bg-warning-subtle text-warning fs-22">
                                                    <i className="ri-checkbox-circle-line"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="progress rounded-bottom rounded-0" style={{ height: "4px" }}>
                                    <div className="progress-bar bg-warning" style={{ width: "100%" }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - col-5 with Program Selector and Chart */}
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header bg-light py-3">
                                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                                        <h5 className="card-title mb-0">
                                            <i className="ri-money-dollar-circle-line me-2 text-success"></i>
                                            Tuition Fee Status ({enrolledPrograms.length})
                                        </h5>

                                        <div style={{ width: '250px' }}>
                                            <Select
                                                options={enrolledPrograms}
                                                value={selectedProgram}
                                                onChange={handleProgramChange}
                                                styles={selectStyles}
                                                placeholder={programsLoading ? "Loading programs..." : "Select Program"}
                                                isLoading={programsLoading}
                                                isDisabled={programsLoading || enrolledPrograms.length === 0}
                                                menuPlacement="auto"
                                                noOptionsMessage={() => "No programs available"}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    {!selectedProgram ? (
                                        <div className="text-center py-5">
                                            <div className="display-5 text-muted">
                                                <i className="ri-pie-chart-2-line"></i>
                                            </div>
                                            <h6 className="mt-3 text-muted">Select a program</h6>
                                            <p className="text-muted small">
                                                Please select a program from the dropdown above to view fee details.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="row align-items-center">

                                            {/* LEFT SIDE - STATS */}
                                            <div className="col-lg-6">

                                                <h6 className="fw-semibold mb-3">
                                                    {selectedProgram?.program_title}
                                                </h6>

                                                <div className="row g-3 mb-4">

                                                    <div className="col-md-4">
                                                        <div className="p-3 bg-success-subtle rounded text-center">
                                                            <small className="text-success d-block">Total Tuition</small>
                                                            <h6 className="mb-0 text-success fw-semibold">
                                                                ₹{tuitionFee}
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="p-3 bg-primary-subtle rounded text-center">
                                                            <small className="text-primary d-block">Paid</small>
                                                            <h6 className="mb-0 text-primary fw-semibold">
                                                                ₹{paidFee}
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="p-3 bg-danger-subtle rounded text-center">
                                                            <small className="text-danger d-block">Pending</small>
                                                            <h6 className="mb-0 text-danger fw-semibold">
                                                                ₹{pendingFee}
                                                            </h6>
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* PROGRESS BAR */}

                                                <div>
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <small className="text-muted">Tuition Fee Payment</small>
                                                        <small className="fw-semibold">{paidPercentage}% Paid</small>
                                                    </div>

                                                    <div className="progress" style={{ height: "10px" }}>
                                                        <div
                                                            className="progress-bar bg-success"
                                                            role="progressbar"
                                                            style={{ width: `${paidPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* RIGHT SIDE - CHART */}

                                            <div className="col-lg-6">
                                                <ReactECharts
                                                    option={chartOptions}
                                                    style={{ height: '320px', width: '100%' }}
                                                    theme="light"
                                                />
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Loading Skeleton */}
                    {loading && (
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;