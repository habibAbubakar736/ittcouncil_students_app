import React from 'react'

const Dashboard = () => {
    return (
        <div className='main-content'>
            <div className='page-content'>
                <div className='container-fluid'>
                    {/* Welcome Header */}
                    <div className='row'>
                        <div className='col-12'>
                            <div className='card border-0'>
                                <div className='card-body'>
                                    <div className='row align-items-center'>
                                        <div className='col-md-8'>
                                            <h2 className='card-title text-primary mb-1'>
                                                <i className="fas fa-graduation-cap me-2"></i>
                                                ITT Council
                                            </h2>
                                            <p className='text-muted mb-0'>Technical Education & Skill Development</p>
                                        </div>
                                        <div className='col-md-4 text-md-end'>
                                            <div className='bg-white rounded p-2 d-inline-block'>
                                                <small className='text-muted'>Session</small>
                                                <strong className='text-primary d-block'>2024-25</strong>
                                            </div>
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

export default Dashboard