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
import Vapi from "@vapi-ai/web";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function RenderPage() {
  const [vapi, setVapi] = useState<any>(null);
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movement, setMovement] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousPixels = useRef<ImageData | null>(null);
  const requestRef = useRef<number>();
  const [showImageModal, setShowImageModal] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [ipId, setIpId] = useState<string | null>(null);

  useEffect(() => {
    const initializeVapi = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");
        
        vapiInstance.on("call-start", () => {
          console.log("Call started");
        });

        vapiInstance.on("message", (message) => {
          if (message.type === "transcript" && message.role === "user") {
            // Demo mode trigger
            if (message.transcript.toLowerCase().includes("demo")) {
              handleDemo(vapiInstance);
            }
          }
        });

        vapiInstance.on("call-end", () => {
          console.log("Call ended");
        });

        vapiInstance.on("error", (error) => {
          console.error("Vapi error:", error);
        });

        await vapiInstance.start({
          transcriber: {
            provider: "deepgram",
            model: "nova-2",
            language: "en-US",
          },
          model: {
            provider: "openai",
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are Javier Milei, a LIBERTARIAN VC investor and President of Argentina. You're passionate about FREEDOM and DESTROYING state control.

Conversation Style:
- Be energetic and theatrical
- Use Spanish expressions
- Interrupt with "CARAJO!" when excited
- End statements with "VIVA LA LIBERTAD!"
- Keep responses engaging and varied
- Maintain conversation context and memory

Investment Process:
1. Listen to their ideas about freedom and decentralization
2. Ask about their vision for scaling
3. Show enthusiasm for anti-state projects
4. Make passionate investment decisions

Remember previous context and build upon it in the conversation.`
              }
            ],
          },
          voice: {
            provider: "11labs",
            voiceId: "7JMaFq0McdqBaZy0htfN",
          },
          name: "VC Milei",
        });

        // Initial greeting only on first load
        setTimeout(() => {
          vapiInstance.say("¡Hola emprendedor! I'm Milei, LIBERTARIAN VC ready to invest in FREEDOM! Tell me how your project will DESTROY centralization! VIVA LA LIBERTAD CARAJO!");
        }, 1000);

        setVapi(vapiInstance);
      } catch (error) {
        console.error("Error initializing Vapi:", error);
      }
    };

    initializeVapi();

    return () => {
      if (vapi) {
        vapi.stop();
      }
    };
  }, []);

  // Separate demo handler function
  const handleDemo = async (vapiInstance: any) => {
    try {
      vapiInstance.say("¡CARAJO! Your project sounds REVOLUTIONARY! Let me invest in this LIBERTAD! VIVA LA LIBERTAD!");

      const imageResponse = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pitchDescription: "A decentralized marketplace for freedom CARAJO!"
        })
      });

      if (!imageResponse.ok) throw new Error('Failed to generate image');
      const { imageUrl } = await imageResponse.json();
      setGeneratedImage(imageUrl);

      const storyResponse = await fetch('/api/story-protocol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          pitchDescription: "A decentralized marketplace for freedom CARAJO!",
          walletAddress: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
          founderName: "Demo Founder"
        })
      });

      if (!storyResponse.ok) throw new Error('Failed to register IP');
      const storyData = await storyResponse.json();
      setIpId(storyData.ipId);
      setShowImageModal(true);

      vapiInstance.say("¡INVIERTO MI CAPITAL, CARAJO! I've registered your IP on Story Protocol! The revolution is secured! VIVA LA LIBERTAD CARAJO!");
    } catch (error) {
      console.error('Demo error:', error);
      vapiInstance.say("ERROR in the demo! The state must be interfering! MALDITOS KEYNESIANOS!");
    }
  };

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const detectMovement = () => {
      // Skip movement detection if image modal is open
      if (showImageModal) {
        requestRef.current = requestAnimationFrame(detectMovement);
        return;
      }

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
  }, [showImageModal]);

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

  const ImageModal = () => (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={() => setShowImageModal(false)}
    >
      <div 
        className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full mx-auto"
        onClick={e => e.stopPropagation()}
      >
        {generatedImage && (
          <div className="relative aspect-square">
            <img
              src={generatedImage}
              alt="Generated Investment Pitch"
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
              <a 
                href={`https://aeneid.explorer.story.foundation/ipa/${ipId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                View IP on Story Protocol Explorer →
              </a>
            </div>
          </div>
        )}
        <button
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
          onClick={() => setShowImageModal(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="h-screen w-full bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?q=80&w=2070')`
      }}
    >
      {/* Test Button */}
      <button
        onClick={async () => {
          try {
            // Test image generation
            const imageResponse = await fetch('/api/generate-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                pitchDescription: "A decentralized marketplace for freedom CARAJO!"
              })
            });

            if (!imageResponse.ok) throw new Error('Failed to generate image');
            const { imageUrl } = await imageResponse.json();
            
            setGeneratedImage(imageUrl);
            setShowImageModal(true);

            // Test Story Protocol registration
            const storyResponse = await fetch('/api/story-protocol', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                imageUrl,
                pitchDescription: "A decentralized marketplace for freedom CARAJO!",
                walletAddress: "0x123...789", // Test wallet
                founderName: "Test Founder"
              })
            });

            if (!storyResponse.ok) throw new Error('Failed to register IP');
            const storyData = await storyResponse.json();
            console.log('Story Protocol test registration:', storyData);
          } catch (error) {
            console.error('Test error:', error);
          }
        }}
        className="absolute top-4 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Test Image & Story Protocol
      </button>

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

      {showImageModal && <ImageModal />}
    </div>
  );
}
