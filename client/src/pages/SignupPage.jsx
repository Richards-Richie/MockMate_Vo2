import React from "react";
import Header from "./Header";

function SignupPage() {
    const PageName = "Signup Page";
    return(
        <div className="signup-page">
            <Header name={PageName} />
            <h1>Signup Page</h1>
        </div>
    );
}

export default SignupPage;