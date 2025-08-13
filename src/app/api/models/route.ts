import { NextResponse } from 'next/server'

export interface Model {
  id: string
  name: string
  description: string
  maxTokens: number
  isCustom?: boolean
}

const models: Model[] = [
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient for most tasks",
    maxTokens: 4096
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Most capable model for complex reasoning",
    maxTokens: 8192
  },
  {
    id: "claude-3",
    name: "Claude 3",
    description: "Anthropic's latest model with strong reasoning",
    maxTokens: 200000
  },
  {
    id: "custom",
    name: "Custom",
    description: "Use your own model configuration",
    maxTokens: 4096,
    isCustom: true
  }
]

export async function GET() {
  return NextResponse.json(models)
}
