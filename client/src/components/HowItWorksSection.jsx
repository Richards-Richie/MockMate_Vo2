import React from 'react';
import { UserPlus, Settings, Play, BarChart3 } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up & Create Profile',
      description: 'Create your account and set up your professional profile with your target job role and experience level.',
      step: '01'
    },
    {
      icon: Settings,
      title: 'Customize Your Session',
      description: 'Choose your interview type, difficulty level, and specific areas you want to focus on for targeted practice.',
      step: '02'
    },
    {
      icon: Play,
      title: 'Start Mock Interview',
      description: 'Begin your AI-powered interview session with real-time webcam monitoring and intelligent question generation.',
      step: '03'
    },
    {
      icon: BarChart3,
      title: 'Review & Improve',
      description: 'Get detailed feedback, review your recorded responses, and track your progress with personalized analytics.',
      step: '04'
    }
  ];

  return (
    <section id="how-it-works" className="py-5 bg-white">
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-dark mb-4">
            How MockMate
            <span className="gradient-text"> Works</span>
          </h2>
          <p className="fs-5 text-secondary mx-auto" style={{maxWidth: '600px'}}>
            Get started with MockMate in just four simple steps and transform your interview performance.
          </p>
        </div>

        {/* Steps */}
        <div className="row g-5 mb-5">
          {steps.map((step, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="step-circle">
                  <step.icon size={48} className="text-white" />
                  <div className="step-number">{step.step}</div>
                </div>
                <h3 className="h4 fw-bold text-dark mb-3">{step.title}</h3>
                <p className="text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-4 p-5 text-center" style={{background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)'}}>
          <h3 className="h2 fw-bold text-dark mb-3">Ready to Get Started?</h3>
          <p className="fs-5 text-secondary mb-4 mx-auto" style={{maxWidth: '500px'}}>
            Join thousands of job seekers who have improved their interview skills and landed their dream jobs with MockMate.
          </p>
          <button className="btn btn-gradient btn-lg">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;