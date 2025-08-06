import React from 'react';
import { Mic, Video, Brain, Shield, MessageSquare, Award } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Questions',
      description: 'Advanced text-to-speech technology generates realistic interview questions tailored to your field and experience level.',
      iconClass: 'icon-blue'
    },
    {
      icon: Video,
      title: 'Real-time Monitoring',
      description: 'Webcam monitoring ensures you stay focused and attentive, simulating real interview conditions for better preparation.',
      iconClass: 'icon-green'
    },
    {
      icon: Mic,
      title: 'Audio Recording',
      description: 'Record your responses and review them later to identify areas for improvement and track your progress over time.',
      iconClass: 'icon-purple'
    },
    {
      icon: MessageSquare,
      title: 'Intelligent Feedback',
      description: 'Get instant, personalized feedback powered by ChatGPT API with follow-up questions based on your responses.',
      iconClass: 'icon-orange'
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'JWT-based authentication ensures your practice sessions and personal data remain completely secure and private.',
      iconClass: 'icon-red'
    },
    {
      icon: Award,
      title: 'Performance Analytics',
      description: 'Track your improvement with detailed analytics, confidence scores, and personalized recommendations.',
      iconClass: 'icon-teal'
    }
  ];

  return (
    <section id="features" className="py-5 bg-light">
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-dark mb-4">
            Powerful Features for
            <span className="gradient-text"> Interview Success</span>
          </h2>
          <p className="fs-5 text-secondary mx-auto" style={{maxWidth: '600px'}}>
            MockMate combines cutting-edge AI technology with proven interview techniques to give you the competitive edge you need.
          </p>
        </div>

        {/* Features Grid */}
        <div className="row g-4 mb-5">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="feature-card">
                <div className={`feature-icon ${feature.iconClass}`}>
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="h4 fw-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-secondary mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="btn btn-gradient btn-lg">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;