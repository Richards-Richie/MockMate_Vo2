import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './headerHome';
import Footer from './footer';
import './Home.css'; // Assuming you have a CSS file for styling
import pythonlogo from './assets_icons/python.svg';
import javaLogo from './assets_icons/java.svg';
import nodejsLogo from './assets_icons/node-js.png';
import machineLearningLogo from './assets_icons/machine learning.png' ;
import djangoLogo from './assets_icons/django.svg';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../redux/questionSlice';

import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Palette,
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const interviewTopics = [
    {
      id: 'python',
      icon: pythonlogo,
      title: 'python Interview',
      description: 'Practice coding problems, algorithms, and system design questions for software engineering roles.',
      color: 'icon-white'
    },
    {
      id: 'java',
      icon: javaLogo,
      title: 'java Interview',
      description: 'Master STAR method responses and showcase your soft skills and cultural fit.',
      color: 'icon-white'
    },
    {
      id: 'nodejs',
      icon: nodejsLogo,
      title: 'nodejs Interview',
      description: 'Prepare for management roles with leadership scenarios and team management questions.',
      color: 'icon-white'
    },
    {
      id: 'django',
      icon: djangoLogo,
      title: 'Django Interview',
      description: 'Practice sales scenarios, objection handling, and demonstrate your sales methodology.',
      color: 'icon-white'
    },
    {
      id: 'machine learning',
      icon: machineLearningLogo,
      title: 'Machine Learning Interview',
      description: 'Prepare for data science, analytics, and business intelligence interview questions.',
      color: 'icon-white'
    },
    {
      id: 'communication',
      icon: MessageSquare,
      title: 'Communication Skills',
      description: 'Improve your presentation skills and learn to articulate complex ideas clearly.',
      color: 'icon-red'
    },
    {
      id: 'Hr',
      icon: Users,
      title: 'Hr Interview',
      description: 'Practice case studies and strategic problem-solving for consulting and strategy roles.',
      color: 'icon-blue'
    },
    {
      id: 'design',
      icon: Palette,
      title: 'Design Interview',
      description: 'Practice design thinking, portfolio presentation, and creative problem-solving.',
      color: 'icon-green'
    },
  ];

  const handleCardClick =async (topicId) => {

    try{
        const response = await fetch(`http://localhost:8000/interview/${topicId}/`,{
          method:'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const res=await response.json();
        if (res.status === 200){
          //console.log("Interview questions fetched successfully:", res.data);
          // console.log("home page.jsx",res.data)
          await dispatch(setQuestions(res.data));
          navigate(`/interview/${topicId}`);
        }else{
          console.log("Error fetching interview questions:", response.status);
          alert(response.message);
          return;
        } 
      }
    catch(error){
      console.error("catch block : Error fetching interview questions:", error);
      return;
    }

  };

  return (
    <div className="home-page">
    <Header />
    <div className="split-layout">
      <div className="container-fluid h-100 p-0">
        <div className="row h-100 g-0">
          {/* Left Side - Fixed Image */}
          <div className="col-lg-6 left-panel">
            <div className="image-container">
              <img 
                src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop" 
                alt="Student preparing for interview"
                className="interview-image"
              />
              
              <div className="image-overlay">
                <div className="overlay-content">
                  <h2 className="text-white fw-bold mb-3">Master Your Interview Skills</h2>
                  <p className="text-white-50 fs-5">Choose your interview topic and start practicing with AI-powered mock interviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Scrollable Cards */}
          <div className="col-lg-6 right-panel">
            <div className="cards-container">
              <div className="cards-header">
                <h1 className="display-5 fw-bold text-dark mb-2">Interview Topics</h1>
                <p className="text-secondary fs-5 mb-5">Select a topic to begin your mock interview practice</p>
              </div>
              
              <div className="cards-grid">
                {interviewTopics.map((topic) => (
                  <div 
                    key={topic.id} 
                    className="topic-card"
                    onClick={() => handleCardClick(topic.id)}
                  >
                    <div className="card-content">
                      <div className={`topic-icon ${topic.color}`}>
                        {typeof topic.icon === "string" ? (
                          <img src={topic.icon} alt={topic.title} className="topic-logo" />
                        ) : (
                          <topic.icon size={28} className="text-white" />
                        )}
                      </div>
                      <div className="card-text">
                        <h3 className="card-title">{topic.title}</h3>
                        <p className="card-description">{topic.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default HomePage;