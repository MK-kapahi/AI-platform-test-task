import { NextResponse } from 'next/server'

export interface ChatRequest {
  prompt: string
  model: string
  temperature: number
  maxTokens: number
}

export interface ChatResponse {
  id: string
  prompt: string
  response: string
  model: string
  temperature: number
  maxTokens: number
  timestamp: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json()
    const { prompt, model, temperature, maxTokens } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Generate mock response based on parameters
    const mockResponse = generateMockResponse(prompt, model, temperature, maxTokens)
    
    // Calculate mock token usage
    const promptTokens = Math.ceil(prompt.length / 4)
    const completionTokens = Math.ceil(mockResponse.length / 4)
    const totalTokens = promptTokens + completionTokens

    const response: ChatResponse = {
      id: Date.now().toString(),
      prompt,
      response: mockResponse,
      model,
      temperature,
      maxTokens,
      timestamp: new Date().toISOString(),
      usage: {
        promptTokens,
        completionTokens,
        totalTokens
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}

function generateMockResponse(prompt: string, model: string, temperature: number, maxTokens: number): string {
  const responses = [
    `Thank you for your prompt: "${prompt}". I understand you're using the ${model} model with temperature ${temperature} and max tokens ${maxTokens}. Here's my response based on your request...`,
    
    `Based on your input "${prompt}", I can provide the following analysis using ${model}. With a temperature setting of ${temperature}, I'll balance creativity and precision. Here's what I found...`,
    
    `I've processed your request: "${prompt}" using the ${model} model. The temperature of ${temperature} allows for ${temperature > 0.7 ? 'creative' : temperature > 0.4 ? 'balanced' : 'precise'} responses. Here's my detailed answer...`,
    
    `Your prompt "${prompt}" has been analyzed with the ${model} model. The current settings (temperature: ${temperature}, max tokens: ${maxTokens}) will produce ${temperature > 0.6 ? 'more varied' : 'more consistent'} outputs. Here's my response...`,
    
    `Processing "${prompt}" with ${model} at temperature ${temperature}. This configuration will result in ${temperature > 0.8 ? 'highly creative' : temperature > 0.5 ? 'moderately creative' : 'factual'} responses. Here's what I can tell you...`
  ]

  // Select response based on temperature
  let baseResponse = responses[Math.floor(Math.random() * responses.length)]
  
  // Add more creative elements for higher temperature
  if (temperature > 0.7) {
    baseResponse += `\n\n💡 Creative insight: This is an interesting perspective that opens up new possibilities. The ${model} model excels at creative tasks like this.`
  }
  
  // Add technical details for lower temperature
  if (temperature < 0.4) {
    baseResponse += `\n\n📊 Technical analysis: Based on the parameters provided, this response is optimized for accuracy and consistency.`
  }

  // Add model-specific information
  if (model.includes('gpt-4')) {
    baseResponse += `\n\n🚀 GPT-4 capabilities: This model provides advanced reasoning and detailed analysis.`
  } else if (model.includes('claude')) {
    baseResponse += `\n\n🧠 Claude strengths: This model excels at nuanced understanding and helpful responses.`
  } else if (model.includes('gpt-3.5')) {
    baseResponse += `\n\n⚡ GPT-3.5 Turbo: Fast and efficient responses with good quality.`
  }

  // Truncate if exceeding max tokens (rough approximation)
  const maxLength = Math.floor(maxTokens * 3) // Rough character to token ratio
  if (baseResponse.length > maxLength) {
    baseResponse = baseResponse.substring(0, maxLength) + '...'
  }

  return baseResponse
}
