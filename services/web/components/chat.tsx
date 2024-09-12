'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { type FormEvent, useEffect, useState } from 'react'

export function Chat() {
  const [messages, setMessages] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    const eventSource = new EventSource('/api/chat') // SSE endpoint

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data)
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    // Send message to API
    await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputMessage }),
    })

    setInputMessage('')
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Chat App</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[400px] w-full pr-4'>
          {messages.map((msg) => (
            <div key={msg} className='mb-2 p-2 bg-muted rounded-lg'>
              {msg}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className='flex w-full gap-2'>
          <Input
            type='text'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder='Type a message...'
            className='flex-grow'
          />
          <Button type='submit'>Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
