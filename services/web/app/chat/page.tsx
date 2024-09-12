'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChat } from 'ai/react'
import { Bot, Send, Upload, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Component() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'http://localhost:8787/stream',
  })
  const [isTyping, setIsTyping] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setIsTyping(false)
    }
  }, [messages])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() || file) {
      setIsTyping(true)
      const formData = new FormData()
      if (file) {
        formData.append('file', file)
      }
      formData.append('message', input)
      // Here you would typically send the formData to your backend
      // For this example, we'll just simulate the process
      await new Promise((resolve) => setTimeout(resolve, 1000))
      handleSubmit(e)
      setFile(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto h-[600px] flex flex-col'>
      <CardContent className='flex flex-col h-full p-4'>
        <ScrollArea className='flex-grow pr-4'>
          <div className='space-y-4'>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <div className='flex items-center space-x-2 mb-1'>
                    {m.role === 'user' ? <User className='h-4 w-4' /> : <Bot className='h-4 w-4' />}
                    <span className='text-xs font-semibold'>
                      {m.role === 'user' ? 'You' : 'AI'}
                    </span>
                  </div>
                  <p className='text-sm whitespace-pre-wrap break-words'>{m.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className='flex justify-start'>
                <div className='bg-secondary text-secondary-foreground p-3 rounded-lg'>
                  <div className='flex items-center space-x-2'>
                    <Bot className='h-4 w-4' />
                    <span className='text-xs font-semibold'>AI</span>
                  </div>
                  <p className='text-sm animate-pulse'>Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <form onSubmit={handleFormSubmit} className='mt-4 space-y-2'>
          {file && (
            <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
              <Upload className='h-4 w-4' />
              <span>{file.name}</span>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-4 w-4 p-0'
                onClick={removeFile}
              >
                <X className='h-3 w-3' />
              </Button>
            </div>
          )}
          <div className='flex space-x-2'>
            <Input
              className='flex-1'
              value={input}
              placeholder='Type your message...'
              onChange={handleInputChange}
            />
            <Input
              type='file'
              className='hidden'
              ref={fileInputRef}
              onChange={handleFileChange}
              accept='.pdf,.doc,.docx,.txt'
            />
            <Button
              type='button'
              variant='outline'
              size='icon'
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className='h-4 w-4' />
            </Button>
            <Button type='submit'>
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
