import React, { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const HeaderHome = ({name}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const buttonText = 'Logout';
    const buttonLink = '/logout';
    const navigate = useNavigate();
    const handleLogout = async() => {
        try{
            const res=await fetch("http://localhost:5555/logout",{
                method:'POST',
                credentials:"include",
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            if(res.status === 200){
                navigate('/');
            }else{
                console.log("Error logging out:", res.status);
                alert(res.message);
                return;
            }
        }
        catch(error){};
    };
    


    return (
        <header className="bg-white shadow-sm sticky-top">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light py-3">

                <a className="navbar-brand d-flex align-items-center" href="/">
                    <div className="bg-gradient-primary p-2 rounded me-2">
                        <Brain className="text-white" size={24} />
                    </div>
                    <span className="fs-3 fw-bold text-dark">MockMate</span>
                </a>

                <div className="ms-auto">
                    <button onClick={handleLogout} className="btn btn-gradient text-white text-decoration-none">
                        Logout
                    </button>
                </div>


            </nav>
        </div>
    </header>
    );
};

export default HeaderHome;