import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Download, Check } from "lucide-react"

interface ChatMessageProps {
  message: {
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
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  // Format time consistently for both server and client
  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    const displayMinutes = minutes.toString().padStart(2, '0')
    return `${displayHours}:${displayMinutes} ${ampm}`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleDownloadJSON = () => {
    const messageData = {
      id: message.id,
      role: message.role,
      content: message.content,
      timestamp: message.timestamp.toISOString(),
      model: message.model,
      usage: message.usage
    }

    const blob = new Blob([JSON.stringify(messageData, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-message-${message.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={cn(
        "flex w-full gap-2 sm:gap-4 p-2 sm:p-4",
        isUser ? "justify-end" : "justify-start"
      )}
      role="article"
      aria-label={`${isUser ? 'User' : 'Assistant'} message`}
    >
      <div
        className={cn(
          "flex max-w-[85%] sm:max-w-[80%] flex-col gap-2",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-lg px-3 sm:px-4 py-2 text-sm relative group",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          <div 
            className="whitespace-pre-wrap text-xs sm:text-sm"
            aria-label={`Message content: ${message.content.substring(0, 100)}${message.content.length > 100 ? '...' : ''}`}
          >
            {message.content}
          </div>
          
          {/* Action buttons for assistant messages */}
          {!isUser && (
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-5 w-5 sm:h-6 sm:w-6 p-0 bg-background/80 hover:bg-background"
                aria-label={copied ? "Message copied" : "Copy message"}
                aria-describedby={copied ? "copy-success" : undefined}
              >
                {copied ? (
                  <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
                ) : (
                  <Copy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownloadJSON}
                className="h-5 w-5 sm:h-6 sm:w-6 p-0 bg-background/80 hover:bg-background"
                aria-label="Download message as JSON"
              >
                <Download className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </Button>
            </div>
          )}
          {copied && (
            <div id="copy-success" className="sr-only" aria-live="polite">
              Message copied to clipboard
            </div>
          )}
        </div>
        
        <div className={cn(
          "flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground",
          isUser ? "justify-end" : "justify-start"
        )}>
          <time 
            dateTime={message.timestamp.toISOString()}
            className="text-xs"
            aria-label={`Message sent at ${formatTime(message.timestamp)}`}
          >
            {formatTime(message.timestamp)}
          </time>
          {!isUser && message.model && (
            <Badge 
              variant="outline" 
              className="text-xs px-1 py-0"
              aria-label={`Using model: ${message.model}`}
            >
              {message.model}
            </Badge>
          )}
          {!isUser && message.usage && (
            <Badge 
              variant="secondary" 
              className="text-xs px-1 py-0"
              aria-label={`Token usage: ${message.usage.totalTokens} tokens`}
            >
              {message.usage.totalTokens} tokens
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
