import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../Context/ConfigContext';
import axios from 'axios';
import images from '../../Utils/Images';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ReactECharts from 'echarts-for-react';

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
    const admissionFee = programStats?.program_addmission_fees || 0;
    const paidFee = programStats?.program_addmission_fees_paid || 0;
    const pendingFee = Math.max(0, admissionFee - paidFee);
    const paidPercentage = admissionFee > 0 ? (paidFee / admissionFee * 100).toFixed(1) : 0;
    const pendingPercentage = admissionFee > 0 ? (pendingFee / admissionFee * 100).toFixed(1) : 0;

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
                name: 'Fee Status',
                type: 'pie',
                radius: ['55%', '70%'],
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
                top: '48%',
                style: {
                    text: `₹${paidFee}`,
                    fill: '#2ab57d',
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            },
            {
                type: 'text',
                left: 'center',
                top: '58%',
                style: {
                    text: 'Paid',
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
                            <div className="card welcome-card overflow-hidden" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 100%)` }}>
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

                    {/* Main Content Row - 7 + 5 Layout */}
                    <div className="row mt-3 mt-sm-4">
                        {/* Left Side - col-7 with the 3 original cards */}
                        <div className="col-xl-7 mb-3 mb-xl-0">
                            <div className="row g-3">
                                {/* Upcoming Exams Card */}
                                <div className="col-md-12">
                                    <div className="card card-animate overflow-hidden h-100">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1">
                                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Upcoming Exams</p>
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0 mt-3">
                                                        {totalPendingExam}
                                                    </h4>
                                                    <Link to="/Student/UpcominExam" className="text-decoration-none">
                                                        <p className="text-muted mb-0 mt-2 small">
                                                            <span className="badge bg-primary-subtle text-primary me-1">
                                                                <i className="ri-arrow-right-line align-middle"></i>
                                                            </span> View Schedule
                                                        </p>
                                                    </Link>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="avatar-sm">
                                                        <span className="avatar-title bg-primary-subtle rounded-circle fs-3">
                                                            <i className="bx bx-notepad text-primary"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress rounded-bottom rounded-0" style={{ height: '3px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: totalPendingExam > 0 ? '60%' : '0%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Enrol Admission Card */}
                                <div className="col-md-12">
                                    <div className="card card-animate overflow-hidden h-100">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1">
                                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Enrolled Programs</p>
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0 mt-3">
                                                        {totalEnrolledProgram}
                                                    </h4>
                                                    <p className="text-muted mb-0 mt-2 small">
                                                        <span className="badge bg-info-subtle text-info me-1">
                                                            <i className="ri-user-add-line align-middle"></i> Active
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="avatar-sm">
                                                        <span className="avatar-title bg-info-subtle rounded-circle fs-3">
                                                            <i className="bx bx-user-plus text-info"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress rounded-bottom rounded-0" style={{ height: '3px' }}>
                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Passout Programme Card */}
                                <div className="col-md-12">
                                    <div className="card card-animate overflow-hidden h-100">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1">
                                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Passout Programs</p>
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0 mt-3">
                                                        {totalPassedProgram}
                                                    </h4>
                                                    <p className="text-muted mb-0 mt-2 small">
                                                        <span className="badge bg-warning-subtle text-warning me-1">
                                                            <i className="ri-award-line align-middle"></i> Certified
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="avatar-sm">
                                                        <span className="avatar-title bg-warning-subtle rounded-circle fs-3">
                                                            <i className="bx bxs-graduation text-warning"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress rounded-bottom rounded-0" style={{ height: '3px' }}>
                                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: totalPassedProgram > 0 ? '100%' : '0%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - col-5 with Program Selector and Chart */}
                        <div className="col-xl-5">
                            <div className="card h-100">
                                <div className="card-header bg-light py-3">
                                    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2">
                                        <h5 className="card-title mb-0">
                                            <i className="bx bxs-pie-chart-alt-2 me-2" style={{ color: primaryColor }}></i>
                                            Program Fee Status ({enrolledPrograms.length})
                                        </h5>
                                        <div style={{ width: '100%', maxWidth: '250px' }} className="w-100 w-sm-auto">
                                            <Select
                                                options={enrolledPrograms}
                                                value={selectedProgram}
                                                onChange={handleProgramChange}
                                                styles={selectStyles}
                                                placeholder={programsLoading ? "Loading programs..." : "Select Program"}
                                                isLoading={programsLoading}
                                                isDisabled={programsLoading || enrolledPrograms.length === 0}
                                                className="program-select"
                                                menuPlacement="auto"
                                                noOptionsMessage={() => "No programs available"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {!selectedProgram ? (
                                        <div className="text-center py-4 py-sm-5">
                                            <div className="display-4 text-muted">
                                                <i className="ri-pie-chart-2-line"></i>
                                            </div>
                                            <h6 className="mt-3 text-muted">Select a program</h6>
                                            <p className="text-muted mb-0 small">
                                                Please select a program from the dropdown above to view fee details.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row g-2 mb-3">
                                                    <div className="col-4">
                                                        <div className="p-2 bg-success-subtle rounded text-center">
                                                            <small className="text-success d-block text-truncate">Admission</small>
                                                            <strong className="text-success small">₹{admissionFee}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="p-2 bg-primary-subtle rounded text-center">
                                                            <small className="text-primary d-block text-truncate">Paid</small>
                                                            <strong className="text-primary small">₹{paidFee}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="p-2 bg-danger-subtle rounded text-center">
                                                            <small className="text-danger d-block text-truncate">Pending</small>
                                                            <strong className="text-danger small">₹{pendingFee}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ReactECharts
                                                    option={chartOptions}
                                                    style={{ height: '250px', width: '100%' }}
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