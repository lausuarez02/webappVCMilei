"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from 'three';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { useFrame } from "@react-three/fiber";
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function RenderPage() {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movement, setMovement] = useState<{ x: number, y: number }>({ x: 0.5, y: 0.5 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousPixels = useRef<ImageData | null>(null);
  const requestRef = useRef<number>();
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const detectMovement = () => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      // Only process if video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        requestRef.current = requestAnimationFrame(detectMovement);
        return;
      }

      // Match canvas size to video
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        console.log('Canvas size set to:', { width: canvas.width, height: canvas.height });
      }

      try {
        // Draw current frame
        ctx.drawImage(video, 0, 0);
        const currentPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

        if (previousPixels.current) {
          let moveX = 0;
          let moveY = 0;
          let totalDiff = 0;

          // Sample pixels for movement (every 10th pixel for performance)
          for (let i = 0; i < currentPixels.data.length; i += 40) {
            const diff = Math.abs(currentPixels.data[i] - previousPixels.current.data[i]);
            if (diff > 30) { // Threshold for movement
              const x = (i / 4) % canvas.width;
              const y = Math.floor((i / 4) / canvas.width);
              moveX += x;
              moveY += y;
              totalDiff++;
            }
          }

          if (totalDiff > 0) {
            // Calculate average movement position
            const avgX = moveX / totalDiff / canvas.width;
            const avgY = moveY / totalDiff / canvas.height;
            
            // Use avgX directly without inversion
            setMovement(prev => ({
              x: THREE.MathUtils.lerp(prev.x, avgX, 0.1),
              y: THREE.MathUtils.lerp(prev.y, avgY, 0.1)
            }));

            // console.log('Movement detected:', { x: avgX.toFixed(2), y: avgY.toFixed(2) });
          }
        }

        previousPixels.current = currentPixels;
      } catch (error) {
        console.error('Error processing video frame:', error);
      }

      requestRef.current = requestAnimationFrame(detectMovement);
    };

    navigator.mediaDevices.getUserMedia({ 
      video: { 
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user',
        frameRate: { ideal: 30 }
      } 
    })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        
        // Wait for video to be fully loaded
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded:', {
            width: videoRef.current?.videoWidth,
            height: videoRef.current?.videoHeight
          });
        };

        videoRef.current.onloadeddata = () => {
          console.log('Video data loaded, starting playback');
          videoRef.current?.play()
            .then(() => {
            //   console.log('Video playing, starting movement detection');
              detectMovement();
            })
            .catch(err => console.error("Error playing video:", err));
        };
      }
    })
    .catch((err) => {
      console.error("Error accessing webcam:", err);
    });

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const fbxLoader = new FBXLoader();

    const loadModel = async () => {
      try {
        setLoading(true);
        console.log('Starting model load...');
        
        // Load texture
        const texture = await textureLoader.loadAsync('/shaded.png');
        console.log('Texture loaded successfully');

        // Load FBX model
        const fbx = await fbxLoader.loadAsync("/lod1.fbx");
        console.log('FBX loaded successfully');
        
        fbx.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            console.log('Setting up mesh:', child.name);
            
            const material = new THREE.MeshStandardMaterial({
              map: texture,
              envMapIntensity: 2.0,
              roughness: 0.3,
              metalness: 0.7,
            });

            child.material = material;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        fbx.scale.set(0.01, 0.01, 0.01);
        fbx.position.set(0, 0, 0);
        
        console.log('Setting model...');
        setModel(fbx);
        setLoading(false);
      } catch (err) {
        console.error('Error loading model:', err);
        setError(err instanceof Error ? err.message : 'Failed to load model');
        setLoading(false);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'es-ES';

        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
          console.log('Transcribed:', transcript);
        };

        recognitionRef.current.onend = async () => {
          if (transcript) {
            // Add user message to conversation
            setConversation(prev => [...prev, `User: ${transcript}`]);
            
            try {
              // Get ChatGPT response
              const chatResponse = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: transcript })
              });
              const { response } = await chatResponse.json();
              
              // Add AI response to conversation
              setConversation(prev => [...prev, `AI: ${response}`]);

              // Generate voice using ElevenLabs
              const voiceResponse = await fetch('/api/voice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: response })
              });
              
              const audioBlob = await voiceResponse.blob();
              const audioUrl = URL.createObjectURL(audioBlob);
              
              // Play the audio
              const audio = new Audio(audioUrl);
              audio.play();
            } catch (error) {
              console.error('Error processing response:', error);
            }
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
        };
      }
    }
  }, [transcript]);

  const toggleListening = async () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      
      // Only send to OpenAI if we have a transcript
      if (transcript) {
        try {
          console.log('Sending to ChatGPT:', transcript);
          
          // Get ChatGPT response
          const chatResponse = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: transcript })
          });

          if (!chatResponse.ok) {
            throw new Error(`Chat API error: ${chatResponse.status}`);
          }

          const chatData = await chatResponse.json();
          console.log('ChatGPT response:', chatData);
          
          // Add both messages to conversation
          setConversation(prev => [
            ...prev, 
            `User: ${transcript}`,
            `AI: ${chatData.response}`
          ]);

          // Generate and play voice
          console.log('Sending to ElevenLabs:', chatData.response);
          const voiceResponse = await fetch('/api/voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: chatData.response })
          });

          if (!voiceResponse.ok) {
            throw new Error(`Voice API error: ${voiceResponse.status}`);
          }

          const audioBlob = await voiceResponse.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          
          console.log('Playing audio response');
          const audio = new Audio(audioUrl);
          await audio.play();
        } catch (error) {
          console.error('Error in conversation chain:', error);
        }
      }
    } else {
      setTranscript(''); // Clear previous transcript
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  // Animated model component
  function AnimatedModel({ model, mousePosition }: { model: THREE.Group, mousePosition: { x: number, y: number } }) {
    const modelRef = useRef<THREE.Group>(null);
    const initialY = 0;
    const time = useRef(0);

    useFrame((state, delta) => {
      if (!modelRef.current) return;

      time.current += delta;
      modelRef.current.position.y = initialY + Math.sin(time.current * 2) * 0.1;

      const targetRotationY = -((mousePosition.x - 0.5) * Math.PI * 0.75);
      const targetRotationX = ((mousePosition.y - 0.5) * Math.PI * 0.3);

      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotationY,
        0.05
      );

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    });

    return (
      <primitive 
        ref={modelRef}
        object={model} 
        scale={0.01}
        position={[0, initialY, 0]}
        castShadow
        receiveShadow
      />
    );
  }

  return (
    <div 
      className="h-screen w-full bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?q=80&w=2070')`
      }}
    >
      {/* Keep video but hide it */}
      <div className="hidden">
        <video
          ref={videoRef}
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
        />
      </div>

      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-lg ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white font-medium transition-colors`}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <div className="mt-4 p-4 bg-black/50 text-white rounded-lg max-w-md">
          {conversation.map((message, index) => (
            <p key={index} className="text-sm mb-2">{message}</p>
          ))}
          {isListening && transcript && (
            <p className="text-sm italic">Current: {transcript}</p>
          )}
        </div>
      </div>
      
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={1.0} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, 0]} intensity={0.5} />
        <pointLight position={[5, 5, 0]} intensity={0.5} />
        
        {model && <AnimatedModel model={model} mousePosition={movement} />}
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          minDistance={3}
          maxDistance={10}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
          Loading model...
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-black bg-opacity-50">
          Error: {error}
        </div>
      )}
    </div>
  );
}
