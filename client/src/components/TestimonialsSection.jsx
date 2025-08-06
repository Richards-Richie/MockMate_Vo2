import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'MockMate completely transformed my interview preparation. The AI-generated questions were spot-on, and the real-time feedback helped me identify areas I never knew I needed to work on. I landed my dream job at Google!'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager at Microsoft',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'The webcam monitoring feature really helped me improve my body language and maintain eye contact. The detailed analytics showed my progress over time. Highly recommend MockMate to anyone serious about interview prep.'
    },
    {
      name: 'Emily Johnson',
      role: 'Data Scientist at Amazon',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'As someone who struggled with interview anxiety, MockMate was a game-changer. The ability to practice repeatedly and review my recordings built my confidence tremendously. The AI feedback was incredibly insightful.'
    },
    {
      name: 'David Kim',
      role: 'Marketing Director at Tesla',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'MockMate\'s intelligent follow-up questions really prepared me for the dynamic nature of real interviews. The platform adapted to my responses and challenged me appropriately. Worth every penny!'
    },
    {
      name: 'Lisa Thompson',
      role: 'UX Designer at Apple',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'The security features gave me peace of mind while practicing sensitive scenarios. MockMate\'s comprehensive approach to interview prep - from technical questions to soft skills - is unmatched.'
    },
    {
      name: 'James Wilson',
      role: 'Financial Analyst at JPMorgan',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'The performance analytics helped me track my improvement objectively. I could see my confidence scores increase with each session. MockMate made interview preparation systematic and effective.'
    }
  ];

  return (
    <section id="testimonials" className="py-5 bg-light">
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-dark mb-4">
            Success Stories from
            <span className="gradient-text"> Our Users</span>
          </h2>
          <p className="fs-5 text-secondary mx-auto" style={{maxWidth: '600px'}}>
            See how MockMate has helped thousands of professionals land their dream jobs at top companies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="row g-4 mb-5">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                {/* Quote Icon */}
                <div className="mb-3">
                  <Quote size={32} className="text-primary" />
                </div>

                {/* Rating */}
                <div className="d-flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="star-rating me-1" fill="currentColor" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-secondary mb-4">{testimonial.text}</p>

                {/* User Info */}
                <div className="d-flex align-items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="user-avatar me-3"
                  />
                  <div>
                    <h5 className="fw-semibold text-dark mb-0">{testimonial.name}</h5>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="row g-4 text-center">
          <div className="col-md-3 col-6">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <div className="display-5 fw-bold text-primary mb-2">10,000+</div>
              <div className="text-secondary">Successful Interviews</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <div className="display-5 fw-bold text-success mb-2">95%</div>
              <div className="text-secondary">Success Rate</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <div className="display-5 fw-bold text-warning mb-2">4.9/5</div>
              <div className="text-secondary">Average Rating</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <div className="display-5 fw-bold text-info mb-2">500+</div>
              <div className="text-secondary">Top Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;