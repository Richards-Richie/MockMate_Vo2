import React, { useState } from "react";
import Header from "./Header";
import Footer from "./footer";
import { Brain, Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const PageName = "Login Page";
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const submitForm = async(e) => {
        e.preventDefault(); 
        try{
                const response = await fetch("http://localhost:5555/login",{
                    method:"POST",
                    credentials:"include", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: e.target.emailid.value, password: e.target.password.value }),
                });
                const res = await response.json();
                if(response.status === 200){
                    console.log("Login successful:", res);
                    navigate("/home"); 
                }else{
                    console.error("Login failed:", res.message);
                    alert(res.message); 
                }
            }
            catch(error){
                console.error("Error during login:", error);
            }

        // Here you can add your login logic, e.g., API call
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Header name={PageName} />

            {/* Page Content */}
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
                    {/* Card Header */}
                    <div className="card-header bg-gradient-primary text-white text-center py-4 rounded-top">
                        <Brain size={40} className="mb-2" />
                        <h3 className="mb-0">Welcome Back</h3>
                        <p className="mb-0 small">Login to continue to MockMate</p>
                    </div>

                    {/* Card Body */}
                    <div className="card-body p-4">
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label htmlFor="emailid" className="form-label fw-semibold">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="emailid"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Password Field with Toggle */}
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label fw-semibold">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control pe-5"
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                                    style={{ cursor: "pointer" }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <input type="checkbox" id="rememberMe" className="me-2" />
                                    <label htmlFor="rememberMe" className="small">Remember me</label>
                                </div>
                                <a href="/forgot" className="small text-decoration-none text-primary">
                                    Forgot Password?
                                </a>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-gradient text-white fw-semibold">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Card Footer */}
                    <div className="card-footer text-center py-3 bg-light">
                        <small>
                            Don’t have an account?{" "}
                            <a href="/signup" className="text-primary fw-semibold">Sign Up</a>
                        </small>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer className="mt-auto" />
        </div>
    );
}

export default LoginPage;
