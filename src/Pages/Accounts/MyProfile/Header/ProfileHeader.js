import React from 'react'
import { Link } from 'react-router-dom'

const ProfileHeader = () => {
    return (
        <div className="d-flex profile-wrapper">
            {/* Nav tabs */}
            <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                <li className="nav-item">
                    <Link className="nav-link fs-14 active" to={"/Student/Profile"} role="tab">
                        <i className="ri-airplay-fill d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">Personal Info</span>
                    </Link>
                </li>
            </ul>
        </div>

    )
}

export default ProfileHeader