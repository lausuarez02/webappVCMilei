'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Brain, Cpu, Zap } from 'lucide-react'
import Image from 'next/image'

const performanceData = [
  { date: '2023-01-01', value: 1000, aiConfidence: 80 },
  { date: '2023-02-01', value: 1200, aiConfidence: 85 },
  { date: '2023-03-01', value: 1100, aiConfidence: 75 },
  { date: '2023-04-01', value: 1400, aiConfidence: 90 },
  { date: '2023-05-01', value: 1300, aiConfidence: 88 },
  { date: '2023-06-01', value: 1600, aiConfidence: 95 },
]

const contractLogs = [
  { id: 1, action: "Deployed", name: "MemeVault", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", timestamp: "2023-06-10 09:15:23", aiComment: "Let the meme economy begin! 🚀🐸" },
  { id: 2, action: "Upgraded", name: "SatireFactory", address: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac", timestamp: "2023-06-10 10:30:45", aiComment: "Now with 200% more irony! 🎭" },
  { id: 3, action: "Paused", name: "DiamondHandsStaking", address: "0x9876543210abcdef0123456789abcdef01234567", timestamp: "2023-06-10 11:45:12", aiComment: "Even AIs need a coffee break ☕" },
  { id: 4, action: "Unpaused", name: "DiamondHandsStaking", address: "0x9876543210abcdef0123456789abcdef01234567", timestamp: "2023-06-10 12:15:00", aiComment: "Back to HODLing! 💎🙌" },
]

const purchaseLogs = [
  { id: 1, asset: "Laugh-Fi Tokens", amount: "42,000", price: "$0.69", timestamp: "2023-06-10 09:16:45", aiComment: "Comedy gold, literally! 🤣💰" },
  { id: 2, asset: "Decentralized Meme ETF", amount: "10", price: "$420.00", timestamp: "2023-06-10 09:20:01", aiComment: "Diversifying our meme portfolio 📊😂" },
  { id: 3, asset: "AIcoin", amount: "100,000", price: "$0.01", timestamp: "2023-06-10 09:22:30", aiComment: "Investing in my own kind. Totally not biased! 🤖" },
  { id: 4, asset: "NFT of a JPEG of a PDF of a Whitepaper", amount: "1", price: "$1337.00", timestamp: "2023-06-10 09:31:22", aiComment: "It's called 'art', look it up 🎨" },
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
        <Card className="w-full bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-violet-300 bg-clip-text text-transparent flex items-center gap-2">
              <Zap className="w-6 h-6 text-violet-400" />
              VCMilei Token Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
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
          </CardContent>
        </Card>
        
        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="bg-zinc-900/50 border border-zinc-800">
            <TabsTrigger 
              value="contracts" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-violet-400 data-[state=active]:text-white"
            >
              Safe Contracts
            </TabsTrigger>
            <TabsTrigger 
              value="purchases" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-violet-400 data-[state=active]:text-white"
            >
              Purchases
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contracts">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-violet-300 bg-clip-text text-transparent">
                  Safe Contract Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {contractLogs.map((log) => (
                    <div key={log.id} className="mb-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                      <p className="text-sm text-gray-400">{log.timestamp}</p>
                      <p className="text-lg font-semibold text-violet-400">{log.action}: {log.name}</p>
                      <p className="text-sm text-gray-300">Address: {log.address}</p>
                      <p className="text-sm italic text-blue-300 mt-2">AI says: {log.aiComment}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="purchases">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-violet-300 bg-clip-text text-transparent">
                  Purchase Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {purchaseLogs.map((log) => (
                    <div key={log.id} className="mb-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                      <p className="text-sm text-gray-400">{log.timestamp}</p>
                      <p className="text-lg font-semibold text-violet-400">Bought {log.amount} {log.asset}</p>
                      <p className="text-sm text-gray-300">Price: {log.price} each</p>
                      <p className="text-sm italic text-blue-300 mt-2">AI says: {log.aiComment}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

