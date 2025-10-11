import React from 'react'
import ProfileHeader from '../Header/ProfileHeader'
import ProfileNavbar from '../Header/ProfileNavbar'
import StudentDetails from '../Components/StudentDetails'

const StudentProfile = () => {
    return (
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                    <ProfileNavbar />
                    <div class="row">
                        <div class="col-lg-12">
                            <div>
                                <ProfileHeader />
                                <div class="tab-content pt-4 text-muted">
                                    <div class="tab-pane active" id="overview-tab" role="tabpanel">
                                        <div class="row">
                                            <StudentDetails />
                                        </div>
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

export default StudentProfile