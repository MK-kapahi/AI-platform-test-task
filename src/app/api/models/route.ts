import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export interface Model {
  id: string
  name: string
  description: string
  maxTokens: number
  isCustom?: boolean
}

const models: Model[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Latest GPT-4 model with improved reasoning and speed",
    maxTokens: 128000
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "Fast and efficient GPT-4 variant",
    maxTokens: 128000
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Most capable model for complex reasoning",
    maxTokens: 8192
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient for most tasks",
    maxTokens: 4096
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    description: "Anthropic's most powerful model",
    maxTokens: 200000
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    description: "Balanced performance and speed",
    maxTokens: 200000
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    description: "Fast and efficient Claude model",
    maxTokens: 200000
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    description: "Google's advanced reasoning model",
    maxTokens: 32768
  },
  {
    id: "custom",
    name: "Custom Model",
    description: "Use your own model configuration",
    maxTokens: 4096,
    isCustom: true
  }
]

export async function GET() {
  return NextResponse.json(models)
}
