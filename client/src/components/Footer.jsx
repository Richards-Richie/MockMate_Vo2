import React from 'react';
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-gradient-primary p-2 rounded me-2">
                <Brain size={24} className="text-white" />
              </div>
              <span className="fs-3 fw-bold text-white">MockMate</span>
            </div>
            <p className="text-muted mb-4">
              AI-powered mock interview preparation platform helping job seekers enhance their confidence and performance through simulated HR interviews.
            </p>
            <div className="d-flex gap-3">
              <Facebook className="social-icon" />
              <Twitter className="social-icon" />
              <Linkedin className="social-icon" />
              <Instagram className="social-icon" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#features">Features</a></li>
              <li className="mb-2"><a href="#how-it-works">How It Works</a></li>
              <li className="mb-2"><a href="#testimonials">Testimonials</a></li>
              <li className="mb-2"><a href="#pricing">Pricing</a></li>
              <li className="mb-2"><a href="#blog">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-4">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#help">Help Center</a></li>
              <li className="mb-2"><a href="#contact">Contact Support</a></li>
              <li className="mb-2"><a href="#faq">FAQ</a></li>
              <li className="mb-2"><a href="#community">Community</a></li>
              <li className="mb-2"><a href="#status">System Status</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-5 col-md-6">
            <h5 className="text-white mb-4">Contact Us</h5>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <Mail size={20} className="text-primary me-3" />
                <span className="text-muted">support@mockmate.com</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <Phone size={20} className="text-success me-3" />
                <span className="text-muted">+1 (555) 123-4567</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <MapPin size={20} className="text-danger me-3" />
                <span className="text-muted">San Francisco, CA</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div>
              <h6 className="text-white mb-3">Stay Updated</h6>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control bg-dark border-secondary text-white"
                  placeholder="Enter your email"
                />
                <button className="btn btn-gradient" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-top border-secondary">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="text-muted small">
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
};

export default Footer;