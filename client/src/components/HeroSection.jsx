import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Content */}
          <div className="col-lg-6">
            <div className="mb-4">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                <Star size={16} className="me-2" />
                AI-Powered Interview Practice
              </span>
            </div>
            
            <h1 className="hero-title text-dark mb-4">
              Master Your
              <span className="gradient-text"> Interview Skills </span>
              with AI
            </h1>
            
            <p className="fs-5 text-secondary mb-5 lh-lg">
              Practice with MockMate's AI-powered mock interviews. Get real-time feedback, webcam monitoring, and intelligent question generation to boost your confidence and land your dream job.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
              <a href="#signup" className="btn btn-gradient btn-lg">
                Start Practicing Now
                <ArrowRight size={20} className="ms-2" />
              </a>
              <a href="#demo" className="btn btn-outline-custom btn-lg">
                <Play size={20} className="me-2" />
                Watch Demo
              </a>
            </div>

            {/* Stats */}
            {/* <div className="row text-center pt-4 border-top">
              <div className="col-4">
                <div className="fs-2 fw-bold text-dark">10K+</div>
                <div className="text-secondary">Successful Interviews</div>
              </div>
              <div className="col-4">
                <div className="fs-2 fw-bold text-dark">95%</div>
                <div className="text-secondary">Success Rate</div>
              </div>
              <div className="col-4">
                <div className="fs-2 fw-bold text-dark">4.9/5</div>
                <div className="text-secondary">User Rating</div>
              </div>
            </div> */}
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            <div className="position-relative">
              <div className="bg-gradient-primary rounded-4 p-4 shadow-lg floating-element">
                <div className="bg-white rounded-3 p-4">
                  <div className="d-flex mb-3">
                    <div className="bg-danger rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                    <div className="bg-warning rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                    <div className="bg-success rounded-circle" style={{width: '12px', height: '12px'}}></div>
                  </div>
                  <div className="mb-3">
                    <div className="bg-light rounded mb-2" style={{height: '16px', width: '75%'}}></div>
                    <div className="bg-light rounded mb-2" style={{height: '16px', width: '50%'}}></div>
                    <div className="bg-primary bg-opacity-25 rounded mb-3" style={{height: '16px', width: '85%'}}></div>
                    <div className="bg-light rounded border border-2 border-dashed d-flex align-items-center justify-content-center" style={{height: '80px'}}>
                      <span className="text-muted small">AI Interview in Progress...</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="position-absolute top-0 end-0 translate-middle">
                <div className="bg-white p-3 rounded-circle shadow">
                  <div className="bg-success rounded-circle animate-pulse" style={{width: '24px', height: '24px'}}></div>
                </div>
              </div>
              <div className="position-absolute bottom-0 start-0 translate-middle">
                <div className="bg-white p-3 rounded-circle shadow">
                  <div className="bg-primary rounded-circle animate-pulse" style={{width: '24px', height: '24px'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;