import './style.css'
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const socket = io("http://localhost:5050");

function App()
{
    const [ stream, setStream ] = useState("");
    const [ callAccepted, setCallAccepted ] = useState(false);
    const [ callEnded, setCallEnded ] = useState(false);

    const myVideo = useRef(null);
    const otherUserVideo = useRef(null);
    const connectionRef = useRef();

    useEffect(() =>
    {
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
            .then((stream) =>
            {
                setStream(stream);

                if (myVideo.current)
                {
                    myVideo.current.srcObject = stream;
                }
            });

    }, []);

    return (
        <div className="wrapper">
            <div className="container">
                <h1 style={{ textAlign: "center" }}>Video Chat</h1>

                <div className="video-container">
                    <h4>Your camera</h4>
                    <div className="video">
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "500px" }} />}
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video playsInline ref={otherUserVideo} autoPlay style={{ width: "500px" }} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;