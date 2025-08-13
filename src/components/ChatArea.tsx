"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/ui/chat-message"
import { TemplateEditor, type Template } from "@/components/ui/template-editor"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Send, Copy, Download, FolderOpen } from "lucide-react"

interface ChatMessageType {
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

interface ChatAreaProps {
  messages: ChatMessageType[]
  promptValue: string
  onPromptChange: (value: string) => void
  onSendMessage: () => void
  isThinking: boolean
  templates: Template[]
  onTemplatesChange: (templates: Template[]) => void
}

export function ChatArea({
  messages,
  promptValue,
  onPromptChange,
  onSendMessage,
  isThinking,
  templates,
  onTemplatesChange,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Handle keydown for Enter (send) and Shift+Enter (newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (promptValue.trim() && !isThinking) {
        onSendMessage()
      }
    }
  }

  // Copy message content
  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
    } catch (err) {
      console.error('Failed to copy message:', err)
    }
  }

  // Download chat as JSON
  const handleDownloadChat = () => {
    const chatData = {
      messages: messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      })),
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle template selection
  const handleTemplateSelect = (content: string) => {
    onPromptChange(content)
    setTemplatesDialogOpen(false)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <h2 className="text-base sm:text-lg font-semibold">Chat</h2>
        <div className="flex items-center gap-2">
          {/* Templates Button */}
          <Dialog open={templatesDialogOpen} onOpenChange={setTemplatesDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <FolderOpen className="h-4 w-4" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Load Template</DialogTitle>
                <DialogDescription>
                  Select a template to load into the prompt editor. You can choose from predefined templates or your saved ones.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Predefined Templates */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Predefined Templates</h3>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateSelect("Hello! I'd like to test the AI interface. Can you help me with a simple task?")}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div>
                        <div className="font-medium">Sample Prompt</div>
                        <div className="text-xs text-muted-foreground">A simple test prompt to get started</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateSelect("Please help me write a professional email to [recipient] about [topic]. The tone should be [formal/casual/friendly] and I need to include [key points].")}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div>
                        <div className="font-medium">Email Writer</div>
                        <div className="text-xs text-muted-foreground">Help draft professional emails with proper structure</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateSelect("I need help with [topic]. Please explain it in simple terms and provide practical examples that I can apply in real life.")}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div>
                        <div className="font-medium">Learning Assistant</div>
                        <div className="text-xs text-muted-foreground">Get explanations and practical examples for any topic</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateSelect("Please review this code and provide feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance optimizations\n4. Security concerns\n\nCode:\n```\n// Your code here\n```")}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div>
                        <div className="font-medium">Code Reviewer</div>
                        <div className="text-xs text-muted-foreground">Get comprehensive code review and improvement suggestions</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateSelect("I'm facing this problem: [describe your problem]. Please help me solve it by:\n1. Breaking it down into smaller parts\n2. Analyzing each part systematically\n3. Providing step-by-step solutions\n4. Suggesting alternative approaches")}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div>
                        <div className="font-medium">Problem Solver</div>
                        <div className="text-xs text-muted-foreground">Systematic approach to solving complex problems</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateSelect("Please help me analyze this data:\n\n[Paste your data here]\n\nI need insights on:\n1. Key trends and patterns\n2. Anomalies or outliers\n3. Recommendations for action\n4. Potential areas for further investigation")}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div>
                        <div className="font-medium">Data Analyst</div>
                        <div className="text-xs text-muted-foreground">Get insights and analysis from your data</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateSelect("I need to create content about [topic] for [purpose]. Please help me with:\n1. Key points to cover\n2. Target audience considerations\n3. Tone and style recommendations\n4. Structure and format suggestions")}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div>
                        <div className="font-medium">Content Creator</div>
                        <div className="text-xs text-muted-foreground">Plan and structure your content creation</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Saved Templates */}
                {templates.length > 0 && (
                  <>
                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Saved Templates</h3>
                      <div className="grid gap-2">
                        {templates.map((template) => (
                          <Button
                            key={template.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleTemplateSelect(template.content)}
                            className="justify-start text-left h-auto p-3"
                          >
                            <div className="flex-1">
                              <div className="font-medium">{template.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {template.description || 'No description'}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Category: {template.category}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* No Saved Templates Message */}
                {templates.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <p className="text-sm">No saved templates yet.</p>
                    <p className="text-xs">Use the template editor below to save your first template.</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadChat}
            disabled={messages.length === 0}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 sm:px-6 py-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onCopy={() => handleCopyMessage(message.content)}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Prompt Editor */}
      <div className="border-t bg-background p-3 sm:p-4">
        <div className="max-w-4xl mx-auto">
          {/* Template Quick Load */}
          {templates.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 justify-center">
              {templates.slice(0, 5).map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onPromptChange(template.content)}
                  className="text-xs h-7 px-2"
                  title={template.description}
                >
                  {template.name}
                </Button>
              ))}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onPromptChange("Hello! I'd like to test the AI interface. Can you help me with a simple task?")}
                className="text-xs h-7 px-2"
                title="Load sample prompt"
              >
                Sample
              </Button>
            </div>
          )}
          
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={promptValue}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything... (Use templates above for quick start)"
              className="min-h-[60px] max-h-[200px] resize-none pr-12"
              disabled={isThinking}
            />
            <div className="absolute right-3 bottom-3">
              <Button
                onClick={onSendMessage}
                disabled={!promptValue.trim() || isThinking}
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Template Editor */}
          <div className="mt-4">
            <TemplateEditor
              promptValue={promptValue}
              onPromptChange={onPromptChange}
              templates={templates}
              onTemplatesChange={onTemplatesChange}
            />
          </div>
          
          <div className="text-xs text-muted-foreground mt-2 text-center">
            {promptValue.length} characters • Use Ctrl+Enter to send • Click templates above to load
          </div>
        </div>
      </div>
    </div>
  )
}
