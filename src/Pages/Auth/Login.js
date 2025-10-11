import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { ConfigContext } from '../../Context/ConfigContext';
import axios from 'axios';

function Login() {
    const { apiURL, handleUpdateLogin } = useContext(ConfigContext);

    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 👈 added state

    const handleLogin = async (e) => {
        e.preventDefault();

        // ======= Validation =======
        if (!Username.trim()) {
            return Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Username is required!' });
        }

        if (!password) {
            return Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Password is required!' });
        }

        try {
            setLoader(true);

            const payload = {
                student_pnr: Username,
                login_password: password
            };

            const response = await axios.post(`${apiURL}Users/Login`, payload);

            if (response?.data?.success) {
                handleUpdateLogin(response.data.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: response.data.message || 'You are logged in!',
                    showConfirmButton: false,
                    timer: 1200,
                    timerProgressBar: true,
                });

                setTimeout(() => {
                    window.location.href = '/';
                }, 1200);




            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: response.data.message || 'Invalid credentials'
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || error.message || 'Server error'
            });
        } finally {
            setLoader(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className="vh-100" style={{ background: "url(/assets/images/login-bg.jpg)", backgroundSize: "cover" }}>
            <div className="container h-100">
                <div className="row h-100 align-items-center">

                    {/* Left info */}
                    <div className="col-12 col-md-6 text-light mb-4 mb-md-0">
                        <h1 className="fw-bold mb-3">ITT Council Delhi</h1>
                        <p className="fs-5 mb-4">Empowering innovation and technology for a brighter future.</p>
                        <div className="ittcouncil-info">
                            <div className="mb-3">
                                <h6 className="fw-bold text-warning">Key Focus Areas:</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-2">• Technology Transfer & Innovation</li>
                                    <li className="mb-2">• Research & Development</li>
                                    <li className="mb-2">• Industry-Academia Collaboration</li>
                                    <li className="mb-2">• Startup Ecosystem Development</li>
                                </ul>
                            </div>
                            <div className="mt-3">
                                <p className="small text-muted">
                                    <i className="bi bi-geo-alt me-2"></i> Delhi NCR, India | 500+ Members
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="col-12 col-md-6 col-lg-4 ms-auto">
                        <form
                            className="p-4 text-light shadow-lg rounded"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(5px)" }}
                            onSubmit={handleLogin}
                        >
                            <div className="mb-3 text-center">
                                <h5 className='text-white'>Welcome! Please login to continue.</h5>
                                <p className="text-muted small">Access the ITT Council Portal</p>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    name="username"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"} // 👈 use showPassword
                                    className="form-control"
                                    placeholder="Enter your password"
                                    name="password"
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Show Password Checkbox */}
                            <div className="d-flex justify-content-start mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={showPassword} // 👈 bind state
                                        onChange={togglePassword} // 👈 toggle function
                                        id="auth-show-password"
                                    />
                                    <label className="form-check-label" htmlFor="auth-show-password">
                                        Show Password
                                    </label>
                                </div>
                            </div>

                            <div className="d-grid mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!Username || !password || loader}
                                >
                                    {loader ? 'Please wait..' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
