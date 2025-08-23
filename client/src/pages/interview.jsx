import React, { useState, useEffect, useRef } from "react";
import "./interview.css";
import * as faceDetection from "@tensorflow-models/face-detection";
import Header from "./headerHome";

function InterviewPage() {
    const [message, setMessage] = useState("Loading model...");
    const [question, setQuestion] = useState("What is your biggest strength?What is your biggest strength?What is your biggest strength?What is your biggest strength?");
    const videoRef = useRef(null);
    const detectorRef = useRef(null);
    const intervalRef = useRef(null);

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
                                    <button type="button" className="btn btn-outline-primary w-100">
                                        Record answer..
                                    </button>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <button type="button" className="btn btn-outline-secondary w-100">
                                        Submit answer
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                    <button type="button" className="btn btn-outline-success w-100">
                                        Next question
                                    </button>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <button type="button" className="btn btn-outline-danger w-100">
                                        End...
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
