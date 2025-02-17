'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check } from 'lucide-react'

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
  
export default function PitchPage() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef(null)
  const [formData, setFormData] = useState({
    founderName: '',
    projectName: '',
    twitterHandle: '',
    telegramHandle: '',
    website: '',
    github: '',
    description: '',
    marketSize: '',
    competition: '',
    libertarianValue: '',
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Vanta.js effect (same as other pages)
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
          color: 0x8b5cf6,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/submit-pitch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowSuccessModal(true)
        setFormData({
          founderName: '',
          projectName: '',
          twitterHandle: '',
          telegramHandle: '',
          website: '',
          github: '',
          description: '',
          marketSize: '',
          competition: '',
          libertarianValue: '',
        })
      }
    } catch (error) {
      console.error('Error submitting pitch:', error)
      alert('Error submitting pitch. The state must be interfering!')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      <FlagBanner position="top" />

      <main className="flex-grow flex flex-col items-center justify-start p-6 relative z-10 mt-[60px]">
        <Card className="w-full max-w-4xl bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-400 to-violet-300 bg-clip-text text-transparent flex items-center gap-2">
              <Zap className="w-8 h-8 text-violet-400" />
              Pitch Your Project to VCMilei AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Founder Name</label>
                  <Input 
                    placeholder="Satoshi Nakamoto"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.founderName}
                    onChange={(e) => setFormData({...formData, founderName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Project Name</label>
                  <Input 
                    placeholder="Bitcoin"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.projectName}
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Twitter Handle</label>
                  <Input 
                    placeholder="@satoshi"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.twitterHandle}
                    onChange={(e) => setFormData({...formData, twitterHandle: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Telegram Handle</label>
                  <Input 
                    placeholder="@satoshi_tg"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.telegramHandle}
                    onChange={(e) => setFormData({...formData, telegramHandle: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">Website</label>
                  <Input 
                    placeholder="https://bitcoin.org"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">GitHub Repository</label>
                  <Input 
                    placeholder="https://github.com/bitcoin/bitcoin"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">Project Description</label>
                  <Textarea 
                    placeholder="Describe how your project fights against the state's monetary repression..."
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">Market Size (TAM)</label>
                  <Textarea 
                    placeholder="How big is the free market opportunity?"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.marketSize}
                    onChange={(e) => setFormData({...formData, marketSize: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">Competition Analysis</label>
                  <Textarea 
                    placeholder="Who are your statist competitors and how will you defeat them?"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.competition}
                    onChange={(e) => setFormData({...formData, competition: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">Libertarian Value Proposition</label>
                  <Textarea 
                    placeholder="How does your project advance the cause of freedom and fight against state intervention?"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={formData.libertarianValue}
                    onChange={(e) => setFormData({...formData, libertarianValue: e.target.value})}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-violet-400 hover:from-blue-600 hover:to-violet-500 text-white py-6 text-xl font-bold rounded-xl"
              >
                Submit for VCMilei Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-violet-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-300 bg-clip-text text-transparent">
                  ¡VIVA LA LIBERTAD!
                </h3>
                <p className="text-sm text-gray-400">
                  Your pitch has been submitted to VCMilei for review. We'll be in touch if your project is based enough!
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-gradient-to-r from-blue-500 to-violet-400 hover:from-blue-600 hover:to-violet-500 text-white px-8"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <FlagBanner position="bottom" />
    </div>
  )
} 