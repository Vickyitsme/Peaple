import React, { useEffect, useRef, useState } from 'react';
   import io from 'socket.io-client';

   const VideoChat = () => {
       const [localStream, setLocalStream] = useState(null);
       const [remoteStream, setRemoteStream] = useState(null);
       const localVideoRef = useRef();
       const remoteVideoRef = useRef();
       const socket = io('http://localhost:5000');

       useEffect(() => {
           // Get user media (camera and microphone)
           navigator.mediaDevices.getUserMedia({ video: true, audio: true })
               .then((stream) => {
                   setLocalStream(stream);
                   localVideoRef.current.srcObject = stream;
               });

           // Handle incoming streams
           socket.on('stream', (stream) => {
               setRemoteStream(stream);
               remoteVideoRef.current.srcObject = stream;
           });
       }, []);

       return (
           <div>
               <video ref={localVideoRef} autoPlay muted></video>
               <video ref={remoteVideoRef} autoPlay></video>
           </div>
       );
   };

   export default VideoChat;