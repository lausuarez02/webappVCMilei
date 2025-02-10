'use client'

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Zap } from 'lucide-react'
import Image from 'next/image'

const performanceData = [
  { date: '2024-01-01', value: 1000, aiConfidence: 80 },
  { date: '2024-02-01', value: 1200, aiConfidence: 85 },
  { date: '2024-03-01', value: 1100, aiConfidence: 75 },
  { date: '2024-03-15', value: 1400, aiConfidence: 90 },
  { date: '2024-03-20', value: 1300, aiConfidence: 88 },
  { date: '2024-03-25', value: 1600, aiConfidence: 95 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="w-full p-4 bg-black border-b border-zinc-800">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">VCMilei Dashboard</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow p-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {/* Bluefin Investment Card */}
        <Card className="w-full bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-violet-300 bg-clip-text text-transparent flex items-center gap-2">
              <Zap className="w-6 h-6 text-violet-400" />
              First Investment: Bluefin Protocol
            </CardTitle>
          </CardHeader>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <Image 
                src="/bluefin.svg" 
                alt="Bluefin" 
                width={200} 
                height={200}
                className="rounded-xl shadow-lg shadow-violet-500/20"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-violet-400">Why VCMilei Chose Bluefin</h3>
                <p className="text-gray-300">
                  VIVA LA LIBERTAD CARAJO! A decentralized spot and derivatives platform with $37B in traded volume, 
                  backed by serious capitalists like Polychain and Brevan Howard. This isn't just another protocol—it's 
                  a free market revolution in finance! Built to destroy the financial intermediaries that live off parasitism.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Initial Investment</p>
                    <p className="text-lg font-bold text-violet-300">$200</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Current Token Price</p>
                    <p className="text-lg font-bold text-violet-300">$0.1225</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Tokens Held</p>
                    <p className="text-lg font-bold text-violet-300">1,632</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-semibold text-gray-400">Based Market Features:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Free market competition crushing it on Sui Network</li>
                    <li>Derivatives + pre-launch markets (no state intervention!)</li>
                    <li>Spot AMM for retail adoption (real free market liquidity)</li>
                    <li>Antifragile design against regulatory parasites</li>
                  </ul>
                  <a 
                    href="https://bluefin.io" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 text-violet-400 hover:text-violet-300 flex items-center gap-2 w-fit"
                  >
                    Visit Bluefin <Zap className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Chart */}
        {/* <Card className="w-full bg-zinc-900/50 border-zinc-800">
          {<CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-violet-300 bg-clip-text text-transparent flex items-center gap-2">
              <Zap className="w-6 h-6 text-violet-400" />
              Investment Performance
            </CardTitle>
          </CardHeader> 
          <div className="h-[400px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis yAxisId="left" stroke="#888" />
                <YAxis yAxisId="right" orientation="right" stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }} />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  dot={{ fill: '#8b5cf6', strokeWidth: 2 }} 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="aiConfidence" 
                  stroke="#60a5fa" 
                  strokeWidth={2} 
                  dot={{ fill: '#60a5fa', strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card> */}
      </main>
    </div>
  )
}

