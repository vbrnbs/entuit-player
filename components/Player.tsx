"use client";

import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../utils/supabase/client';

const Player = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const fetchVideoUrl = async () => {
//       const { data, error } = await supabase
//         .from('player')
//         .select('image')
//         .eq('id', 15)
//         .single();

//       if (error) {
//         console.error('Error fetching video URL:', error);
//         return;
//       }

//       setVideoUrl(data?.image);
//     };

//     fetchVideoUrl();
//     console.log(videoUrl)
//     const subscription = supabase
//       .from('player')
//       .on('UPDATE', payload  => {
//         const { url, command } = payload.new;
//         if (url) {
//           setVideoUrl(url);
//         }

//         if (command && videoRef.current) {
//           switch (command) {
//             case 'play':
//               videoRef.current.play();
//               break;
//             case 'pause':
//               videoRef.current.pause();
//               break;
//             case 'fullscreen':
//               if (videoRef.current.requestFullscreen) {
//                 videoRef.current.requestFullscreen();
//               } else if ((videoRef.current as any).mozRequestFullScreen) {
//                 (videoRef.current as any).mozRequestFullScreen();
//               } else if ((videoRef.current as any).webkitRequestFullscreen) {
//                 (videoRef.current as any).webkitRequestFullscreen();
//               } else if ((videoRef.current as any).msRequestFullscreen) {
//                 (videoRef.current as any).msRequestFullscreen();
//               }
//               break;
//           }
//         }
//       })
//       .subscribe();

//     return () => {
//       supabase.removeAllChannels();
//     };
//   }, []);

//   if (!videoUrl) {
//     return <div>Loading...</div>;
//   }

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

// const triggerChange = (videoUrl, command) => {
//     setVideoUrl(videoUrl);
//     if (command && videoRef.current) {
//                   switch (command) {
//                     case 'play':
//                       videoRef.current.play();
//                       break;
//                     case 'pause':
//                       videoRef.current.pause();
//                       break;
//                     case 'fullscreen':
//                       if (videoRef.current.requestFullscreen) {
//                         videoRef.current.requestFullscreen();
//                       } else if ((videoRef.current as any).mozRequestFullScreen) {
//                         (videoRef.current as any).mozRequestFullScreen();
//                       } else if ((videoRef.current as any).webkitRequestFullscreen) {
//                         (videoRef.current as any).webkitRequestFullscreen();
//                       } else if ((videoRef.current as any).msRequestFullscreen) {
//                         (videoRef.current as any).msRequestFullscreen();
//                       }
//                       break;
//                   }
//                 }
//               }



const channel = supabase
    .channel('player')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'player',
        },
        (payload) => {
            console.log('Change received!', payload);
            setVideoUrl(payload.new.image);
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
