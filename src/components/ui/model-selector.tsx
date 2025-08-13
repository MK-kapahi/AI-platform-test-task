"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface Model {
  id: string
  name: string
  description: string
  maxTokens: number
  isCustom?: boolean
}

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

// Static model data
const staticModels: Model[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Most capable model for complex reasoning",
    maxTokens: 8192,
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "Faster and more efficient than GPT-4",
    maxTokens: 128000,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient for most tasks",
    maxTokens: 4096,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    description: "Most powerful Claude model",
    maxTokens: 200000,
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    description: "Balanced performance and speed",
    maxTokens: 200000,
  },
]

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [models, setModels] = useState<Model[]>(staticModels)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use static models instead of API call
  useEffect(() => {
    setModels(staticModels)
    setLoading(false)
  }, [])

  const selectedModelData = models.find(model => model.id === selectedModel)

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="model-select" className="text-sm font-medium">
            Model
          </Label>
          <div className="h-10 rounded-md bg-muted animate-pulse" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="model-select" className="text-sm font-medium">
            Model
          </Label>
          <div className="text-sm text-destructive">
            Error: {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="model-select" className="text-sm font-medium">
          Model
        </Label>
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger 
            id="model-select"
            aria-label="Select AI model"
            aria-describedby="model-description"
          >
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem 
                key={model.id} 
                value={model.id}
                aria-label={`${model.name} - ${model.description}`}
              >
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{model.name}</span>
                    {model.isCustom && (
                      <Badge variant="secondary" className="text-xs">
                        Custom
                      </Badge>
                    )}
                  </div>
                  {/* <span className="text-xs text-muted-foreground">{model.description}</span> */}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div id="model-description" className="text-xs text-muted-foreground">
          Choose the AI model that best fits your needs
        </div>
      </div>

      {selectedModelData && (
        <div>
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Selected Model</span>
                  <Badge variant="outline">{selectedModelData.name}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedModelData.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Max Tokens:</span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedModelData.maxTokens.toLocaleString()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
