import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConfigContext } from '../Context/ConfigContext'
import axios from 'axios'
import images from '../Utils/Images'

const Header = () => {

    const { apiURL, apiHeaderJson, LogoutStudent, student_id, primaryColor } = useContext(ConfigContext)
    const headers = apiHeaderJson;

    const [info, setInfo] = useState({});

    const handlLogout = () => {
        LogoutStudent()
        window.location.href = "/"
    }

    const GetStudentDetails = async () => {
        try {
            const response = await axios.get(`${apiURL}Students/GetStudentsProfile`, { params: { student_id }, headers })

            const { data, success } = response?.data

            if (success) {
                setInfo(data[0])
            }

        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        if (student_id) {
            GetStudentDetails()
        }
    }, [student_id])

    return (
        <>
            <header id="page-topbar"
            // style={{ background: primaryColor }}
            >
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex align-items-center">
                            {/* LOGO */}
                            <div className="navbar-brand-box horizontal-logo">
                                <Link to="/" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src="/assets/images/itt_logo.png" alt='logo' height={22} />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="/assets/images/itt_logo.png" alt='logo' height={60} />
                                    </span>
                                </Link>
                                <Link href="/" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src="/assets/images/itt_logo.png" alt='logo' height={22} />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="/assets/images/itt_logo.png" alt='logo' height={60} />
                                    </span>
                                </Link>
                            </div>
                            <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="topnav-hamburger-icon">
                                <span className="hamburger-icon">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>
                            <h3 className="animated-heading">Information Technology and Technical Education Council</h3>
                        </div>
                        <div className="">
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="d-flex align-items-center">
                                        <img
                                            className="rounded-circle header-profile-user"
                                            src={info?.student_profile_url ? info?.student_profile_url : images?.user_profile}
                                            alt="Header Avatar"
                                        />
                                        <span className="text-start ms-xl-2">
                                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{info?.student_full_name}</span>
                                            <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{info?.student_pnr}</span>
                                        </span>
                                    </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                    {/* item*/}
                                    <h6 className="dropdown-header">Welcome {info?.student_full_name}</h6>
                                    <div className="dropdown-divider" />
                                    <span className="dropdown-item" onClick={handlLogout}>
                                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
                                        <span className="align-middle" data-key="t-logout">
                                            Logout
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* removeNotificationModal */}
            <div id="removeNotificationModal"></div>
            {/* /.modal */}
            {/* ========== App Menu ========== */}
            <div className="app-menu navbar-menu bg-success-subtle">
                {/* LOGO */}
                <div className="navbar-brand-box">
                    {/* Dark Logo*/}
                    <a href="index.html" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="/assets/images/logo-sm.png" alt height={22} />
                        </span>
                        <span className="logo-lg">
                            <img src="/assets/images/logo-dark.png" alt height={17} />
                        </span>
                    </a>
                    {/* Light Logo*/}
                    <a href="index.html" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="/assets/images/logo-sm.png" alt height={22} />
                        </span>
                        <span className="logo-lg">
                            <img src="/assets/images/logo-light.png" alt height={17} />
                        </span>
                    </a>
                    <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                        <i className="ri-record-circle-line" />
                    </button>
                </div>
                <div id="scrollbar">
                    <div className="container-fluid">
                        <div id="two-column-menu" />
                        <ul className="navbar-nav" id="navbar-nav">

                            <li className="menu-title">
                                <span data-key="t-menu">Menu</span>
                            </li>

                            {/* Dashboard */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <i className="ri-dashboard-2-line"></i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            {/* Profile */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/Student/Profile">
                                    <i className="ri-user-3-line"></i>
                                    <span>Profile</span>
                                </Link>
                            </li>

                            {/* Reports */}
                            <li className="nav-item">
                                <a
                                    className="nav-link menu-link"
                                    href="#sidebarDashboards"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls="sidebarDashboards"
                                >
                                    <i className="ri-file-chart-line"></i>
                                    <span>Reports</span>
                                </a>

                                <div className="collapse menu-dropdown" id="sidebarDashboards">
                                    <ul className="nav nav-sm flex-column">

                                        <li className="nav-item">
                                            <Link to="/Reports/PassOut" className="nav-link">
                                                <i className="ri-award-line"></i>
                                                Passout
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to="/Reports/FailedOut" className="nav-link">
                                                <i className="ri-close-circle-line"></i>
                                                Failout
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </li>

                            {/* Provision */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/Provision">
                                    <i className="ri-file-list-3-line"></i>
                                    <span>Provision</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    {/* Sidebar */}
                </div>
                <div className="sidebar-background" />
            </div>
            {/* Left Sidebar End */}
            {/* Vertical Overlay*/}
            <div className="vertical-overlay" />



        </>
    )
}

export default Header
