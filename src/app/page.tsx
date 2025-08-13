"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, FolderOpen, Save, Plus, Search, Library, Grid, FileText, Menu, X } from "lucide-react"
import { ChatMessage } from "@/components/ui/chat-message"
import { ModelSelector, type Model } from "@/components/ui/model-selector"
import { ParametersPanel } from "@/components/ui/parameters-panel"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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

interface Template {
  id: string
  name: string
  description: string
  content: string
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [selectedModelData, setSelectedModelData] = useState<Model | null>(null)
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [promptValue, setPromptValue] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [isHydrated, setIsHydrated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Ref for scrolling to bottom
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get current chat messages
  const currentChat = chats.find(chat => chat.id === currentChatId)
  const messages = currentChat?.messages || []

  // Initialize first chat after hydration to avoid SSR mismatch
  useEffect(() => {
    if (!isHydrated) {
      const initialChat: Chat = {
        id: "1",
        title: "New Chat",
        messages: [
          {
            id: "1",
            content: "Hello! I'm your AI assistant. How can I help you today?",
            role: "assistant",
            timestamp: new Date(),
            model: "gpt-4",
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
      setIsHydrated(true)
    }
  }, [isHydrated])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Auto-scroll when thinking state changes
  useEffect(() => {
    if (isThinking && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isThinking])

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await fetch('/api/models')
        if (!response.ok) {
          throw new Error('Failed to fetch models')
        }
        const models = await response.json()
        const currentModel = models.find((model: Model) => model.id === selectedModel)
        setSelectedModelData(currentModel || null)
      } catch (err) {
        console.error('Failed to fetch model data:', err)
      }
    }

    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates')
        if (response.ok) {
          const data = await response.json()
          setTemplates(data)
        }
      } catch (err) {
        console.error('Failed to fetch templates:', err)
      }
    }

    fetchModelData()
    fetchTemplates()
  }, [selectedModel])

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [
        {
          id: "1",
          content: "Hello! I'm your AI assistant. How can I help you today?",
          role: "assistant",
          timestamp: new Date(),
          model: "gpt-4",
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
    setChats(prev => [newChat, ...prev])
    setCurrentChatId(newChat.id)
    setPromptValue("")
    setSidebarOpen(false) // Close sidebar on mobile
  }

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId)
    setPromptValue("")
    setSidebarOpen(false) // Close sidebar on mobile
  }

  const updateChatTitle = (chatId: string, title: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, title, updatedAt: new Date() }
        : chat
    ))
  }

  const handleSendMessage = async () => {
    if (!promptValue.trim() || isThinking || !currentChatId) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: promptValue.trim(),
      role: "user",
      timestamp: new Date(),
    }

    // Update chat with new message
    setChats(prev => prev.map(chat => {
      if (chat.id === currentChatId) {
        const newMessages = [...chat.messages, userMessage]
        const newTitle = chat.title === "New Chat" ? promptValue.trim().substring(0, 30) + "..." : chat.title
        return {
          ...chat,
          messages: newMessages,
          title: newTitle,
          updatedAt: new Date()
        }
      }
      return chat
    }))

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
          parameters: {
            temperature,
            maxTokens,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
        model: selectedModel,
        usage: data.usage,
      }

      // Update chat with assistant response
      setChats(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, assistantMessage],
            updatedAt: new Date()
          }
        }
        return chat
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setIsThinking(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleLoadTemplate = async (templateId: string) => {
    try {
      const response = await fetch(`/api/templates/${templateId}`)
      if (response.ok) {
        const template = await response.json()
        setPromptValue(template.content)
      }
    } catch (err) {
      console.error('Failed to load template:', err)
    }
  }

  const handleSaveTemplate = async () => {
    if (!templateName.trim() || !promptValue.trim()) return

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: templateName.trim(),
          description: templateDescription.trim(),
          content: promptValue.trim(),
        }),
      })

      if (response.ok) {
        const newTemplate = await response.json()
        setTemplates(prev => [...prev, newTemplate])
        setTemplateName("")
        setTemplateDescription("")
        setSaveDialogOpen(false)
      }
    } catch (err) {
      console.error('Failed to save template:', err)
    }
  }

  // Don't render until hydrated to avoid SSR mismatch
  if (!isHydrated) {
  return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Sidebar content component
  const SidebarContent = () => (
    <>
      {/* Top Navigation */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AI</span>
          </div>
          <h1 className="text-lg font-semibold">AI Interface</h1>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          size="sm"
          onClick={createNewChat}
        >
          <Plus className="h-4 w-4 mr-2" />
          New chat
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 p-4 max-h-80 overflow-y-auto">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Chats</h3>
        <ScrollArea className="h-full">
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentChatId === chat.id 
                    ? 'bg-muted text-foreground' 
                    : 'hover:bg-muted/50 text-muted-foreground'
                }`}
                onClick={() => selectChat(chat.id)}
              >
                <div className="text-sm font-medium truncate">{chat.title}</div>
                <div className="text-xs text-muted-foreground">
                  {chat.updatedAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Settings */}
      <div className="p-4 pe-0 border-t">
        <ScrollArea className="max-h-96 overflow-y-auto">
          <div className="space-y-4 pr-4">
            {/* Model Settings */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Model Settings</h3>
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
              {selectedModelData && (
                <div className="text-xs text-muted-foreground">
                  Max tokens: {selectedModelData.maxTokens.toLocaleString()}
                </div>
              )}
            </div>

            {/* Parameters */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Parameters</h3>
              <ParametersPanel
                temperature={temperature}
                maxTokens={Math.min(maxTokens, selectedModelData?.maxTokens || 4000)}
                onTemperatureChange={setTemperature}
                onMaxTokensChange={setMaxTokens}
              />
            </div>

            {/* Templates */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Templates</h3>
              <div className="space-y-2">
                <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full" disabled={!promptValue.trim()}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Save Template</DialogTitle>
                      <DialogDescription>
                        Save your current prompt as a reusable template.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Template Name</Label>
                        <Input
                          id="name"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          placeholder="Enter template name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={templateDescription}
                          onChange={(e) => setTemplateDescription(e.target.value)}
                          placeholder="Enter template description"
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveTemplate} disabled={!templateName.trim()}>
                        Save Template
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Load Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Load Template</DialogTitle>
                      <DialogDescription>
                        Select a saved template to load into the prompt editor.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {templates.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No templates available. Save a template first.
                        </p>
                      ) : (
                        templates.map((template) => (
                          <div
                            key={template.id}
                            className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
                            onClick={() => handleLoadTemplate(template.id)}
                          >
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            {template.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {template.description}
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:flex w-80 bg-muted/30 border-r flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar - Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>AI Interface</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Chat Area - Full Height */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
            
            <h2 className="text-lg font-semibold">ChatGPT</h2>
            <Badge variant="outline" className="text-xs">
              {selectedModelData?.name || selectedModel}
            </Badge>
          </div>
          <ThemeToggle />
        </div>

        {/* Chat Messages Area - Full Height with Scroll */}
        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="px-4 lg:px-6 py-4 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isThinking && (
                <div className="flex justify-center py-4">
                  <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2 text-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">
                      {selectedModelData?.name || selectedModel} is thinking...
                    </span>
                    <span className="sm:hidden">Thinking...</span>
                  </div>
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {/* Invisible div for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Fixed Prompt Editor at Bottom */}
        <div className="border-t bg-background p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Textarea
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="min-h-[60px] max-h-[200px] resize-none pr-12"
                disabled={isThinking}
              />
              <div className="absolute right-3 bottom-3">
                <Button
                  onClick={handleSendMessage}
                  disabled={!promptValue.trim() || isThinking}
                  size="sm"
                  className="h-8 w-8 p-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              {promptValue.length} characters • Use Ctrl+Enter to send
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
