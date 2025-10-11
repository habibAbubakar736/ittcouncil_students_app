import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConfigContext } from '../Context/ConfigContext'
import axios from 'axios'
import images from '../Utils/Images'

const Header = () => {

    const { apiURL, apiHeaderJson, LogoutStudent, student_id } = useContext(ConfigContext)
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
            <header id="page-topbar">
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
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
            <div id="removeNotificationModal" className="modal fade zoomIn" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close" />
                        </div>
                        <div className="modal-body">
                            <div className="mt-2 text-center">
                                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{ width: 100, height: 100 }} />
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <h4>Are you sure ?</h4>
                                    <p className="text-muted mx-4 mb-0">
                                        Are you sure you want to remove this Notification ?
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn w-sm btn-danger" id="delete-notification">
                                    Yes, Delete It!
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
            {/* /.modal */}
            {/* ========== App Menu ========== */}
            <div className="app-menu navbar-menu">
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
                            <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <i className="ri-dashboard-2-line" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Student/Profile">
                                    <i className="ri-dashboard-2-line" />
                                    <span>Profile</span>
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
