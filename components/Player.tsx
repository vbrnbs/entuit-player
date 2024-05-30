"use client";

import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../utils/supabase/client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

interface Payload {
     new: {
      image: string;
      command: string;
     }
    
  }

const Player = () => {
  const [videoUrl, setVideoUrl] = useState<string>("movie.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);

// const handlePlayPause = () => {
//     const video = videoRef.current;
//     if (video) {
//     // video.requestFullscreen();
//       if (video.paused || video.ended) {
//         video.play();
//       } else {
//         video.pause();
//       }
//     }
//   };

//   const handleFullscreen = () => {
//     const video = videoRef.current;
//     if (video) {
//       if (video.requestFullscreen) {
//         video.requestFullscreen();
//       } else if (video.mozRequestFullScreen) { // Firefox
//         video.mozRequestFullScreen();
//       } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
//         video.webkitRequestFullscreen();
//       } else if (video.msRequestFullscreen) { // IE/Edge
//         video.msRequestFullscreen();
//       }
//     }
//   };


const channel = supabase
    .channel('player')
    .on( 
        "postgres_changes",
        {
            event: '*',
            schema: 'public',
            table: 'player',
        },
        // : RealtimePostgresChangesPayload
        (payload: RealtimePostgresChangesPayload<any>) => {
            const url = payload.new.image;
            console.log('Change received!', payload);
            setVideoUrl(url);
            // handlePlayPause();
            // triggerChange(payload.new.image, payload.new.command);


        }
    )
    .subscribe();


    

  return (
    <div className="flex m-auto">
      <video ref={videoRef} src={videoUrl} controls autoPlay height="auto" width="900"/>
    </div>
  );
};

export default Player;
