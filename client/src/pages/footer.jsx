import React from 'react';
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return(
        <footer className="footer">
            <div className="border-top border-secondary">
                <div className="container py-4">
                <div className="row align-items-center">
                    <div className="col-md-6">
                    <div className="text-white small">
                        © 2025 MockMate. All rights reserved.
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="d-flex justify-content-md-end gap-4 small">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#cookies">Cookie Policy</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;