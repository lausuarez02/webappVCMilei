'use client'

import { Button } from "@/components/ui/button"
import { Zap, Send } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Marquee from 'react-fast-marquee'

const FlagBanner = ({ position }: { position: 'top' | 'bottom' }) => {
  return (
    <div className={`fixed ${position}-0 w-full bg-zinc-900/50 backdrop-blur-sm border-zinc-800 z-50 ${position === 'top' ? 'border-b' : 'border-t'}`}>
      <Marquee
        speed={50}
        gradient={false}
        className="py-2"
      >
        <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent mx-4">
          FREEDOM
        </span>
        <Image src="/arg.png" alt="Argentina" width={40} height={40} className="object-contain mx-4" />
        <Image src="/usa.png" alt="USA" width={40} height={40} className="object-contain mx-4" />
        <Image src="/dont.png" alt="Don't Tread On Me" width={40} height={40} className="object-contain mx-4" />
        <Image src="/israel.png" alt="Israel" width={40} height={40} className="object-contain mx-4" />
        <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent mx-4">
          FREEDOM
        </span>
        <Image src="/arg.png" alt="Argentina" width={40} height={40} className="object-contain mx-4" />
        <Image src="/usa.png" alt="USA" width={40} height={40} className="object-contain mx-4" />
        <Image src="/dont.png" alt="Don't Tread On Me" width={40} height={40} className="object-contain mx-4" />
        <Image src="/israel.png" alt="Israel" width={40} height={40} className="object-contain mx-4" />
        <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent mx-4">
          FREEDOM
        </span>
        <Image src="/arg.png" alt="Argentina" width={40} height={40} className="object-contain mx-4" />
        <Image src="/usa.png" alt="USA" width={40} height={40} className="object-contain mx-4" />
        <Image src="/dont.png" alt="Don't Tread On Me" width={40} height={40} className="object-contain mx-4" />
        <Image src="/israel.png" alt="Israel" width={40} height={40} className="object-contain mx-4" />
      </Marquee>
    </div>
  )
}

export default function WorkingPage() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect && typeof window !== 'undefined') {
      setVantaEffect(
        // @ts-ignore
        window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x8b5cf6, // Primary violet color
          backgroundColor: 0x000000,
          points: 10.00,
          maxDistance: 20.00,
          spacing: 20.00,
          showDots: false
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Vanta.js background */}
      <div ref={vantaRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      <FlagBanner position="top" />

      <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-3xl text-center space-y-12">
          <div className="space-y-6">
            <Image 
              src="/logo.png" 
              alt="Milei" 
              width={300} 
              height={300}
              className="mx-auto rounded-2xl shadow-2xl shadow-violet-500/20"
            />
            
            <h2 className="text-6xl font-extrabold">
              <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
                Making Investments
              </span>
            </h2>
            <h2 className="text-7xl font-black">
              <span className="bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
                GREAT AGAIN
              </span>
            </h2>
          </div>

          <p className="text-2xl text-gray-400 font-medium">
            Our development team is working hard to bring you the future of based investments
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button 
              className="bg-gradient-to-r from-blue-500 to-violet-400 hover:from-blue-600 hover:to-violet-500 text-white px-12 py-8 text-xl font-bold rounded-xl transform hover:scale-105 transition-all w-full md:w-auto"
              onClick={() => window.location.href = '/'}
            >
              Back to Home
            </Button>
            <Button 
              className="bg-zinc-800 hover:bg-zinc-700 text-violet-300 border border-violet-300/20 px-12 py-8 text-xl font-bold rounded-xl transform hover:scale-105 transition-all w-full md:w-auto"
              onClick={() => window.open('https://t.me/vcmilei', '_blank')}
            >
              <Send className="mr-2 h-6 w-6" />
              Join Telegram
            </Button>
            <Button 
              className="bg-black hover:bg-zinc-900 text-white border border-zinc-800 px-12 py-8 text-xl font-bold rounded-xl transform hover:scale-105 transition-all w-full md:w-auto"
              onClick={() => window.open('https://twitter.com/vcmilei', '_blank')}
            >
              <Zap className="mr-2 h-6 w-6" />
              Follow Progress
            </Button>
          </div>

          <div className="mt-20">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <Image src="/arg.png" alt="Argentina" width={80} height={80} className="object-contain opacity-80" />
              <Image src="/usa.png" alt="USA" width={100} height={100} className="object-contain opacity-80" />
              <Image src="/dont.png" alt="Don't Tread On Me" width={80} height={80} className="object-contain opacity-80" />
              <Image src="/israel.png" alt="Israel" width={80} height={80} className="object-contain opacity-80" />
            </div>
          </div>
        </div>
      </main>

      <FlagBanner position="bottom" />
    </div>
  )
} 