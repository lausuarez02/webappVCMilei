'use client'

import { Button } from "@/components/ui/button"
import { Zap } from 'lucide-react'
import Image from 'next/image'

export default function WorkingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* <header className="w-full p-4 bg-black border-b border-zinc-800">
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">VCMilei</h1>
          </div>
        </div>
      </header> */}

      <main className="flex-grow flex flex-col items-center justify-center p-6">
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
    </div>
  )
} 