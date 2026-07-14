'use client'

import { useState, useEffect } from 'react'
import { useOrderStream } from '@/components/realtime/useOrderStream'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle2, Flame, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function KitchenOrders() {
  const [orders, setOrders] = useState<any[]>([])
  
  // Audio for notifications
  const playChime = () => {
    const audio = new Audio('/chime.mp3')
    audio.play().catch(() => {})
  }

  useOrderStream((event) => {
    if (event.channel === 'orders:new') {
        const payload = typeof event.payload === 'string' ? JSON.parse(event.payload) : event.payload
        // Deduplicate: ignore if we already have this order in state
        setOrders(prev => {
            if (prev.some(o => o.id === payload.id)) return prev
            toast.info(`New Order: #${payload.orderNumber}`)
            playChime()
            return [payload, ...prev]
        })
    } else if (event.channel === 'orders:updated') {
        const payload = typeof event.payload === 'string' ? JSON.parse(event.payload) : event.payload
        setOrders(prev => prev.some(o => o.id === payload.id)
            ? prev.map(o => o.id === payload.id ? { ...o, ...payload } : o)
            : [payload, ...prev]
        )
    }
  })

  useEffect(() => {
    // Initial fetch of pending/preparing orders
    fetch('/api/kitchen/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
  }, [])

  const updateStatus = async (orderId: string, status: string) => {
    toast.dismiss(`kitchen-delay-${orderId}`)
    // Optimistic: remove immediately if marking ready, else update status
    if (status === 'ready') {
      setOrders(prev => prev.filter(o => o.id !== orderId))
    } else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    }
    await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    })
  }

  // Timing Logic: Check for delays every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
        orders.forEach(order => {
            if (order.status === 'preparing') {
                const diff = (Date.now() - new Date(order.updatedAt).getTime()) / (1000 * 60)
                if (diff > 15) {
                    toast.error(`TIME EXCEEDED: Order #${order.orderNumber} is over 15m!`, {
                        description: 'Please finish and mark as ready.',
                        duration: 5000,
                        id: `kitchen-delay-${order.id}`
                    })
                }
            }
        })
    }, 30000)

    return () => clearInterval(interval)
  }, [orders])

  return (
    <div className="min-h-screen bg-[#1A0A00] text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold font-playfair text-primary-light flex items-center gap-2">
                <Flame className="w-8 h-8" />
                Kitchen Display System
            </h1>
            <p className="text-gray-400 text-sm">Active Orders Queue</p>
        </div>
        <div className="text-right">
            <p className="text-2xl font-bold">{orders.length}</p>
            <p className="text-xs text-gray-400 uppercase">Pending</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
            {orders.map((order) => (
                <motion.div 
                    key={order.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col"
                >
                    <div className={cn(
                        "p-4 flex justify-between items-center bg-white/10",
                        order.status === 'preparing' ? 'bg-orange-500/20' : ''
                    )}>
                        <div>
                            <p className="text-xs text-gray-400">#{order.orderNumber}</p>
                            <h3 className="font-bold">{order.deliveryType === 'dine-in' ? `Table ${order.tableNumber}` : 'Outdoor'}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-orange-400 font-bold">
                            <Clock className="w-3 h-3" />
                            {/* Simple timer component could go here */}
                            5m
                        </div>
                    </div>

                    <div className="flex-1 p-6 space-y-4">
                        <ul className="space-y-3">
                            {order.items?.map((item: any, idx: number) => (
                                <li key={idx} className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold">{item.quantity}x {item.dishName}</p>
                                        <p className="text-[10px] text-gray-400 uppercase">{item.sizeLabel}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {/* Indicators for special notes */}
                                        {item.specialInstructions && <AlertCircle className="w-3 h-3 text-red-500" />}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 grid grid-cols-1 gap-2">
                        {order.status === 'pending' ? (
                            <button 
                                onClick={() => updateStatus(order.id, 'preparing')}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all"
                            >
                                Start Preparing
                            </button>
                        ) : (
                            <button 
                                onClick={() => updateStatus(order.id, 'ready')}
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                Mark Ready
                            </button>
                        )}
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>

        {orders.length === 0 && (
            <div className="col-span-full h-96 flex flex-col items-center justify-center opacity-20">
                <Flame className="w-20 h-20 mb-4" />
                <p className="text-2xl font-bold">No active orders</p>
            </div>
        )}
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
