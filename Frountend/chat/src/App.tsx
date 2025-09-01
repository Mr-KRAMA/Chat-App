 
import { useEffect, useRef, useState } from 'react'

interface Message {
  text: string
  sender: 'me' | 'other'
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi there!', sender: 'other', timestamp: new Date() }
  ])
  const [inputValue, setInputValue] = useState('')
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    ws.onmessage = (event) => {
      const newMessage: Message = {
        text: event.data,
        sender: 'other',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newMessage])
    }
    wsRef.current = ws
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'join',
        payload: {
          roomId: 'red'
        }
      }))
    }
    return () => ws.close()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!inputValue.trim() || !wsRef.current) return

    const newMessage: Message = {
      text: inputValue,
      sender: 'me',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])

    wsRef.current.send(JSON.stringify({
      type: 'chat',
      payload: {
        message: inputValue
      }
    }))

    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className='h-screen bg-gray-100 flex flex-col'>
      {/* Header */}
      <div className='bg-white shadow-sm p-4 flex items-center'>
        <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3'>
          <span className='text-gray-600 font-semibold'>R</span>
        </div>
        <div>
          <h1 className='font-semibold text-gray-800'>Chat Room</h1>
          <p className='text-sm text-gray-500'>Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'other' && (
              <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2 flex-shrink-0'>
                <span className='text-xs text-gray-600'>O</span>
              </div>
            )}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-green-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.sender === 'me' && (
              <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ml-2 flex-shrink-0'>
                <span className='text-xs text-white'>M</span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className='bg-white border-t p-4 flex items-center'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Type a message...'
          className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
        />
        <button
          onClick={sendMessage}
          aria-label='Send message'
          className='ml-2 bg-green-500 text-white rounded-full p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
