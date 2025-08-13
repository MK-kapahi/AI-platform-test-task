"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/Sidebar"
import { ChatArea } from "@/components/ChatArea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import type { Model } from "@/components/ui/model-selector"
import type { Template } from "@/components/ui/template-editor"

interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  model?: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

interface Chat {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export default function Home() {
  // Model and parameters state
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [selectedModelData, setSelectedModelData] = useState<Model | null>(null)
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [topP, setTopP] = useState(1.0)
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.0)
  const [presencePenalty, setPresencePenalty] = useState(0.0)

  // Chat state
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [promptValue, setPromptValue] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get current chat messages
  const currentChat = chats.find(chat => chat.id === currentChatId)
  const messages = currentChat?.messages || []

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load model and parameters
      const savedModel = localStorage.getItem('selectedModel')
      const savedTemperature = localStorage.getItem('temperature')
      const savedMaxTokens = localStorage.getItem('maxTokens')
      const savedTopP = localStorage.getItem('topP')
      const savedFrequencyPenalty = localStorage.getItem('frequencyPenalty')
      const savedPresencePenalty = localStorage.getItem('presencePenalty')

      if (savedModel) setSelectedModel(savedModel)
      if (savedTemperature) setTemperature(parseFloat(savedTemperature))
      if (savedMaxTokens) setMaxTokens(parseInt(savedMaxTokens))
      if (savedTopP) setTopP(parseFloat(savedTopP))
      if (savedFrequencyPenalty) setFrequencyPenalty(parseFloat(savedFrequencyPenalty))
      if (savedPresencePenalty) setPresencePenalty(parseFloat(savedPresencePenalty))

      // Load chat history
      const savedChats = localStorage.getItem('chatHistory')
      if (savedChats) {
        try {
          const parsedChats = JSON.parse(savedChats)
          const chatsWithDates = parsedChats.map((chat: any) => ({
            ...chat,
            createdAt: new Date(chat.createdAt),
            updatedAt: new Date(chat.updatedAt),
            messages: chat.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          }))
          setChats(chatsWithDates)
          if (chatsWithDates.length > 0) {
            setCurrentChatId(chatsWithDates[0].id)
          }
        } catch (err) {
          console.error('Failed to parse saved chats:', err)
        }
      }

      // Load templates
      const savedTemplates = localStorage.getItem('templates')
      if (savedTemplates) {
        try {
          const parsedTemplates = JSON.parse(savedTemplates)
          setTemplates(parsedTemplates)
        } catch (err) {
          console.error('Failed to parse saved templates:', err)
        }
      }

      setIsHydrated(true)
    }
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('selectedModel', selectedModel)
      localStorage.setItem('temperature', temperature.toString())
      localStorage.setItem('maxTokens', maxTokens.toString())
      localStorage.setItem('topP', topP.toString())
      localStorage.setItem('frequencyPenalty', frequencyPenalty.toString())
      localStorage.setItem('presencePenalty', presencePenalty.toString())
    }
  }, [selectedModel, temperature, maxTokens, topP, frequencyPenalty, presencePenalty, isHydrated])

  // Save chat history to localStorage when it changes
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('chatHistory', JSON.stringify(chats))
    }
  }, [chats, isHydrated])

  // Save templates to localStorage when they change
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('templates', JSON.stringify(templates))
    }
  }, [templates, isHydrated])

  // Initialize first chat if none exists
  useEffect(() => {
    if (isHydrated && chats.length === 0) {
      const initialChat: Chat = {
        id: "1",
        title: "New Chat",
        messages: [
          {
            id: "1",
            content: "Hello! I'm your AI assistant. How can I help you today?",
            role: "assistant",
            timestamp: new Date(),
            model: "gpt-4o",
            usage: {
              promptTokens: 10,
              completionTokens: 15,
              totalTokens: 25,
            },
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setChats([initialChat])
      setCurrentChatId("1")
    }
  }, [isHydrated, chats.length])

  // Load models and templates on mount
  useEffect(() => {
    if (isHydrated) {
      loadModels()
      loadTemplates()
    }
  }, [isHydrated])

  const loadModels = async () => {
    try {
      const response = await fetch('/api/models')
      if (response.ok) {
        const models = await response.json()
        const currentModel = models.find((m: Model) => m.id === selectedModel)
        setSelectedModelData(currentModel || models[0])
      }
    } catch (err) {
      console.error('Failed to load models:', err)
    }
  }

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const templates = await response.json()
        setTemplates(templates)
      }
    } catch (err) {
      console.error('Failed to load templates:', err)
    }
  }

  const handleSendMessage = async () => {
    if (!promptValue.trim() || isThinking) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: promptValue.trim(),
      role: "user",
      timestamp: new Date(),
      model: selectedModel,
    }

    // Add user message to chat
    const updatedChats = chats.map(chat => 
      chat.id === currentChatId 
        ? {
            ...chat,
            messages: [...chat.messages, userMessage],
            updatedAt: new Date()
          }
        : chat
    )
    setChats(updatedChats)
    setPromptValue("")
    setIsThinking(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage.content,
          model: selectedModel,
          temperature,
          maxTokens,
          topP,
          frequencyPenalty,
          presencePenalty,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          role: "assistant",
          timestamp: new Date(),
          model: selectedModel,
          usage: data.usage,
        }

        // Add assistant message to chat
        const finalChats = updatedChats.map(chat => 
          chat.id === currentChatId 
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
                updatedAt: new Date()
              }
            : chat
        )
        setChats(finalChats)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to get response')
      }
    } catch (err) {
      console.error('Failed to send message:', err)
      setError('Network error occurred')
    } finally {
      setIsThinking(false)
    }
  }

  // Don't render until hydrated to avoid SSR mismatch
  if (!isHydrated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-20">
        <Sidebar
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          temperature={temperature}
          onTemperatureChange={setTemperature}
          maxTokens={maxTokens}
          onMaxTokensChange={setMaxTokens}
          topP={topP}
          onTopPChange={setTopP}
          frequencyPenalty={frequencyPenalty}
          onFrequencyPenaltyChange={setFrequencyPenalty}
          presencePenalty={presencePenalty}
          onPresencePenaltyChange={setPresencePenalty}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-80 p-0 z-50">
          <Sidebar
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            temperature={temperature}
            onTemperatureChange={setTemperature}
            maxTokens={maxTokens}
            onMaxTokensChange={setMaxTokens}
            topP={topP}
            onTopPChange={setTopP}
            frequencyPenalty={frequencyPenalty}
            onFrequencyPenaltyChange={setFrequencyPenalty}
            presencePenalty={presencePenalty}
            onPresencePenaltyChange={setPresencePenalty}
          />
        </SheetContent>
      </Sheet>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <ChatArea
          messages={messages}
          promptValue={promptValue}
          onPromptChange={setPromptValue}
          onSendMessage={handleSendMessage}
          isThinking={isThinking}
          templates={templates}
          onTemplatesChange={setTemplates}
        />
      </div>
    </div>
  )
}
