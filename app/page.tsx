'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, Rocket, Lock, Send } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement waitlist signup logic
    console.log('Signup:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="w-full p-4 bg-black">
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start p-6">
        <div className="max-w-3xl text-center space-y-12">
          <div className="space-y-4">
            <Image 
              src="/logo.png" 
              alt="VCMilei" 
              width={200} 
              height={200}
              className="mx-auto"
            />
            <h2 className="text-6xl font-bold bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
              VCMilei
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button 
              className="bg-gradient-to-r from-blue-500 to-violet-400 hover:from-blue-600 hover:to-violet-500 text-white px-12 py-8 text-xl font-bold rounded-xl transform hover:scale-105 transition-all w-full md:w-auto"
              // onClick={() => window.location.href = '/dashboard'}
              onClick={() => window.location.href = '/working'}
              >
              Go to Dashboard
            </Button>
            <Button 
              className="bg-zinc-800 hover:bg-zinc-700 text-violet-300 border border-violet-300/20 px-12 py-8 text-xl font-bold rounded-xl transform hover:scale-105 transition-all w-full md:w-auto"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSd5oW17JZ0JD65PbwRRtQrQ7OVG4qr1O1qvqWfIoawum-zJsg/viewform?usp=dialog', '_blank')}
            >
              Pitch Me, Leftie
            </Button>
            <Button 
              className="bg-zinc-800 hover:bg-zinc-700 text-violet-300 border border-violet-300/20 px-12 py-8 text-xl font-bold rounded-xl transform hover:scale-105 transition-all w-full md:w-auto"
              onClick={() => window.open('https://t.me/+lCP-uigWv_piNWVk', '_blank')}
            >
              <Send className="mr-2 h-6 w-6" />
              Join Telegram
            </Button>
            <Button 
              className="bg-black hover:bg-zinc-900 text-white border border-zinc-800 px-12 py-8 text-xl font-bold rounded-xl transform hover:scale-105 transition-all w-full md:w-auto"
              onClick={() => window.open('https://twitter.com/vcmilei', '_blank')}
            >
              <Zap className="mr-2 h-6 w-6" />
              Follow Updates
            </Button>
          </div>

          <div className="mt-20">
            <h3 className="text-4xl font-extrabold mb-8">
              MAGA
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <Image src="/arg.png" alt="Argentina" width={100} height={100} className="object-contain" />
              <Image src="/usa.png" alt="USA" width={120} height={120} className="object-contain" />
              <Image src="/dont.png" alt="Don't Tread On Me" width={100} height={100} className="object-contain" />
              <Image src="/israel.png" alt="Israel" width={100} height={100} className="object-contain" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

