import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    'Unlimited mock interviews',
    'AI-powered feedback',
    'Real-time performance tracking',
    'Secure and private sessions',
    '24/7 access to platform',
    'Mobile-friendly interface'
  ];

  return (
    <section className="cta-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Content */}
          <div className="col-lg-6">
            <h2 className="display-4 fw-bold text-white mb-4">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="fs-5 text-white-50 mb-4">
              Join thousands of professionals who have transformed their interview skills with MockMate. Start your journey to career success today.
            </p>

            {/* Benefits List */}
            <div className="row g-3 mb-5">
              {benefits.map((benefit, index) => (
                <div key={index} className="col-md-6">
                  <div className="d-flex align-items-center">
                    <CheckCircle size={20} className="text-success me-3 flex-shrink-0" />
                    <span className="text-white-50">{benefit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
              <button className="btn btn-white btn-lg">
                Start Practicing Now
                <ArrowRight size={20} className="ms-2" />
              </button>
              <button className="btn btn-outline-white btn-lg">
                Sign Up / Login
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="d-flex flex-wrap gap-4 text-white-50 small">
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
                <span>No credit card required</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
                <span>Free 7-day trial</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            <div className="cta-card">
              <div className="text-center mb-4">
                <div className="display-5 fw-bold text-white mb-2">Start Free Trial</div>
                <div className="text-white-50">No commitment, cancel anytime</div>
              </div>
              
              <div className="mb-4">
                <div className="bg-white bg-opacity-20 rounded-3 p-3 mb-3 border border-white border-opacity-30">
                  <div className="d-flex justify-content-between align-items-center text-white">
                    <span>Free Trial (7 days)</span>
                    <span className="fw-bold">$0</span>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-3 p-3 border border-white border-opacity-30">
                  <div className="d-flex justify-content-between align-items-center text-white">
                    <span>Pro Plan (after trial)</span>
                    <span className="fw-bold">$19/month</span>
                  </div>
                </div>
              </div>

              <button className="btn btn-success btn-lg w-100 mb-3">
                Get Started Now
              </button>

              <div className="text-center text-white-50 small">
                Trusted by 10,000+ professionals worldwide
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;