import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProfileHeader = () => {
    const location = useLocation();

    // Get current path
    const currentPath = location.pathname;

    return (
        <div className="d-flex profile-wrapper">
            {/* Nav tabs */}
            <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                <li className="nav-item">
                    <Link
                        className={`nav-link fs-14 ${currentPath === '/Student/Profile' ? 'active' : ''}`}
                        to="/Student/Profile"
                        role="tab"
                    >
                        <i className="ri-user-3-fill d-inline-block d-md-none" />{" "}
                        <span className="d-none d-md-inline-block">Personal Info</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className={`nav-link fs-14 ${currentPath === '/Student/UpcomingExam' ? 'active' : ''}`}
                        to="/Student/UpcomingExam"
                        role="tab"
                    >
                        <i className="ri-book-3-fill d-inline-block d-md-none" />{" "}
                        <span className="d-none d-md-inline-block">Upcoming Exam</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileHeader;
