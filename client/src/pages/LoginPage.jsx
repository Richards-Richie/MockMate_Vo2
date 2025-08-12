import React from "react";
import Header from "./Header"; // 

function LoginPage() {
    const PageName = "Login Page";
    return (
        <div className="login-page">
            <Header name = {PageName} />
            <h1>Login Page</h1>
        </div>
    );
};

export default LoginPage;