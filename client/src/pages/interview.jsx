import React, { useState, useEffect, useRef } from "react";
import "./interview.css";
import * as faceDetection from "@tensorflow-models/face-detection";
import Header from "./headerHome";
import { useSelector } from "react-redux";
import Evaluation from "./result_evaluation";

function InterviewPage() {
    const [message, setMessage] = useState("Loading model...");
    const [question, setQuestion] = useState("...Loading question");
    const videoRef = useRef(null);
    const detectorRef = useRef(null);
    const intervalRef = useRef(null);
    const questionsList = useSelector((state) => state.questions.list);

    const mediaRecorderRef = useRef(null);
    const audioChucksRef = useRef([]);
    const [audioBlob,setAudioBlob]=useState(null);
    const [recording,setRecording]=useState(false);
    
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [buttonText,setButtonText]=useState("Start the interview");

    const startRecording =async()=>{
        try{
            const stream =await navigator.mediaDevices.getUserMedia({audio:true});
            mediaRecorderRef.current =new MediaRecorder(stream);

            audioChucksRef.current=[];
            mediaRecorderRef.current.ondataavailable=(event)=>{
                if(event.data.size>0){
                    audioChucksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop=async()=>{
                const blob=new Blob(audioChucksRef.current,{type:'audio/webm'});
                setAudioBlob(blob);
                console.log("Audio blob ready:",blob);
            };

            mediaRecorderRef.current.start();
            setRecording(true);
            console.log("Recording started");

        }catch(err){
            console.error("error : ",err);
        }
    };

    const stopRecording =()=>{
        if(mediaRecorderRef.current){
            mediaRecorderRef.current.stop();
            setRecording(false);
            console.log("Recording stopped");
        }
    };

    const submitAnswer=async()=>{
        if(!audioBlob){
            alert("Record your answer first!");
            return;
        }

        const formData = new FormData();
        const nameOfAudio = `answer_${currentQuestion}.webm`;
        formData.append("audio",audioBlob,nameOfAudio);
        formData.append("question",question);
        try{
            const response =await fetch("http://localhost:8000/interview/stt/",{
                method:"POST",
                credentials:"include",
                body:formData,
            });
            if(response.status===200){
                const data =await response.json();
                console.log("STT Response:",data);
            }
        }catch(err){
            console.error("Error submitting answer:",err);
            alert("Failed to submit answer. Please try again.");
        }
    }

    const speak = (text) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            utterance.rate = 1;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser does not support text to speech!");
        }
    };

    const questionToSpeak = (currentQuestion) => {
        if (questionsList && currentQuestion < questionsList.length) {
            window.speechSynthesis.cancel(); 
            const questionText = questionsList?.[currentQuestion]?.question;
            // setCurrentQuestion(currentQuestion + 1);
            setQuestion(questionText);
            // console.log("Speaking question:", questionText);
            speak(questionText);
        } else {
            setQuestion("Evaluating your performance.");
        }
    };

    const startButtonClicked = () => {
        if (buttonText === "Start the interview") {
            console.log(questionsList?.[currentQuestion]?.question || "No question");  // ✅ Fixed
            questionToSpeak(currentQuestion);
            setButtonText("Record the answer..");
        } else if (buttonText === "Record the answer..") {
            startRecording();
            setButtonText("Stop recording");
        } else if(buttonText === "Stop recording") {
            stopRecording();
            setButtonText("Record the answer..");
        }
    };

    const nextQuestion = ()=>{
        setCurrentQuestion(currentQuestion + 1);
        questionToSpeak(currentQuestion);

    }
    const showResult = async ()=>{
        window.speechSynthesis.cancel();
        setQuestion("Evaluating your performance.");
        setButtonText("Interview ended");
        setMessage("Thank you for attending the interview. Your responses are being evaluated.");
        if(recording){
            stopRecording();
        }
        const response = await fetch("http://localhost:8000/interview/results/",{
            method:"GET",
            credentials:"include",
        })
        .then(async(res)=>{
            if(res.status === 200){
                const resp = await res.json();
                console.log(resp.data);
                
            }
        })
        .catch((err)=>{
            console.error("Error fetching results:",err);
            alert("Failed to fetch results. Please try again later.");
        });
    }

    useEffect(() => {
        let cancelled = false;

        const setUp = async () => {
            try {
                // 1. Load webcam
                const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                }

                // 2. Load face detector once
                if (!detectorRef.current) {
                    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
                    const detectorConfig = {
                        runtime: "mediapipe",
                        solutionPath:
                        "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/",
                    };
                    detectorRef.current = await faceDetection.createDetector(
                        model,
                        detectorConfig
                    );
                }

                if (cancelled) return;

                // 3. Start detection loop
                intervalRef.current = setInterval(async () => {
                    if (!videoRef.current || !detectorRef.current) return;

                    const faces = await detectorRef.current.estimateFaces(videoRef.current);

                    if (faces.length === 0) {
                        setMessage("No face detected. Please look at the camera.");
                    } else if (faces.length > 1) {
                        setMessage("Multiple faces detected. Only one person allowed.");
                    } else {
                        const box = faces[0].box;
                        const centerX = box.xMin + box.width / 2;
                        const centerY = box.yMin + box.height / 2;

                        const frameWidth = videoRef.current.videoWidth;
                        const frameHeight = videoRef.current.videoHeight;

                        const tolerance = 0.2; // 20% margin
                        const isCentered =
                        Math.abs(centerX - frameWidth / 2) < frameWidth * tolerance &&
                        Math.abs(centerY - frameHeight / 2) < frameHeight * tolerance;

                        if (!isCentered) {
                            setMessage("⚠️ Please move to the center of the frame.");
                            } else {
                            setMessage("✅ Exactly one person detected and centered.");
                            }
                        }
                    }, 500);
            } catch (err) {
                console.error(err);
                setMessage("Error accessing webcam or face detection.");
            }
        };

        setUp();
            return () => {
                cancelled = true;
                if (intervalRef.current) clearInterval(intervalRef.current);
                if (videoRef.current?.srcObject) {
                    videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
                }
                detectorRef.current = null;
            };
        },

    []);

    return(
        <div>
            <Header />
            <div className="container-fluid vh-100 bg-white d-flex align-items-center justify-content-center">
                <div className="row w-100">
                    {/* Left side: Video */}
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="interview-video"
                        />
                    </div>

                    {/* Right side: Question + Message + Buttons */}
                    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                        {/* Question */}
                        <div className="alert alert-warning w-75 text-center mb-3">
                            {question}
                        </div>

                        {/* Message */}
                        <div className="alert alert-info w-75 text-center mb-3">
                            {message}
                        </div>

                        {/* Buttons in 2 rows */}
                        <div className="mt-3 w-75">
                            <div className="row mb-2">
                                <div className="col d-flex justify-content-center">
                                    <button type="button" onClick={startButtonClicked}  className="btn btn-outline-primary w-100">
                                        {buttonText}
                                    </button>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <button type="button" onClick={submitAnswer} className="btn btn-outline-secondary w-100">
                                        Submit answer
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                    <button type="button" onClick={nextQuestion} className="btn btn-outline-success w-100">
                                        Next question
                                    </button>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <button type="button" onClick={showResult} className="btn btn-outline-danger w-100">
                                        Show results...
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InterviewPage;
