import React, { useState } from "react";
import Header from "./Header";
import Footer from "./footer";
import { Brain, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const PageName = "Signup Page";
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("danger"); // Bootstrap alert type
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        const email = e.target.emailid.value;
        const pass1 = e.target.password1.value;
        const pass2 = e.target.password2.value;

        if (pass1 !== pass2) {
            setAlertMessage("Passwords do not match!");
            setAlertType("danger");
            return;
        }

        setAlertMessage("");
        try{
            const response =await fetch("http://localhost:5555/signup",{
                method:"POST",
                credentials:"include", 
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email:email, password: pass1 }),
            });
            const res =await response.json();
            if(response.status === 200){
                console.log("signup sucessful ",res); 
                navigate("/home"); 
            }else{
                console.log("signup failed "+res);
                alert(res.message); 
            }
        }catch (error) {
            console.log("Error during signup:", error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Header name={PageName} />
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
                    {/* Card Header */}
                    <div className="card-header bg-gradient-primary text-white text-center py-4 rounded-top">
                        <Brain size={40} className="mb-2" />
                        <h2 className="mb-0 small">Sign up for your prep</h2>
                    </div>

                    {/* Card Body */}
                    <div className="card-body p-4">
                        {/* Bootstrap Alert */}
                        

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

                            {/* Password Field */}
                            <div className="mb-3 position-relative">
                                <label htmlFor="password1" className="form-label fw-semibold">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control pe-5"
                                    id="password1"
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

                            <div className="mb-3 position-relative">
                                <label htmlFor="password2" className="form-label fw-semibold">
                                    Re-enter your password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control pe-5"
                                    id="password2"
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
                                {alertMessage && (
                                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                                    {alertMessage}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setAlertMessage("")}
                                    ></button>
                                </div>
                                )}

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <input type="checkbox" id="rememberMe" className="me-2" />
                                    <label htmlFor="rememberMe" className="small">Remember me</label>
                                </div>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-gradient text-white fw-semibold">
                                    Signup
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer className="mt-auto" />
        </div>
    );
}

export default SignupPage;
