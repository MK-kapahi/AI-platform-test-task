import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export interface Template {
  id: string
  name: string
  description: string
  content: string
  category: string
  createdAt: string
}

const templates: Template[] = [
  {
    id: "1",
    name: "Code Review",
    description: "Review and improve code quality",
    content: "Please review the following code and provide feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance optimizations\n4. Security concerns\n\nCode:\n```\n// Your code here\n```",
    category: "Development",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Creative Story",
    description: "Generate creative stories and content",
    content: "Write a creative story about [topic] with the following elements:\n- Genre: [specify genre]\n- Main character: [describe character]\n- Setting: [describe setting]\n- Conflict: [describe conflict]\n\nMake it engaging and original.",
    category: "Creative",
    createdAt: "2024-01-02T00:00:00Z"
  },
  {
    id: "3",
    name: "Data Analysis",
    description: "Analyze and interpret data",
    content: "Please analyze the following data and provide insights:\n\nData:\n[Paste your data here]\n\nQuestions to address:\n1. What are the key trends?\n2. Are there any anomalies?\n3. What recommendations can you make?\n4. What additional analysis would be helpful?",
    category: "Analytics",
    createdAt: "2024-01-03T00:00:00Z"
  },
  {
    id: "4",
    name: "Email Draft",
    description: "Help draft professional emails",
    content: "Please help me draft a professional email with the following details:\n\n- Recipient: [name/role]\n- Purpose: [reason for email]\n- Tone: [formal/casual/friendly]\n- Key points to include:\n  - [point 1]\n  - [point 2]\n  - [point 3]\n\nMake it clear, concise, and professional.",
    category: "Communication",
    createdAt: "2024-01-04T00:00:00Z"
  },
  {
    id: "5",
    name: "Learning Guide",
    description: "Help explain complex topics",
    content: "Please explain [topic] in a way that's easy to understand:\n\n- Target audience: [beginner/intermediate/advanced]\n- Focus areas: [specific aspects to cover]\n- Include examples: [yes/no]\n- Provide practical applications\n\nMake it engaging and educational.",
    category: "Education",
    createdAt: "2024-01-05T00:00:00Z"
  },
  {
    id: "6",
    name: "Problem Solver",
    description: "Help solve complex problems step by step",
    content: "I'm facing this problem: [describe your problem]\n\nPlease help me solve it by:\n1. Breaking it down into smaller parts\n2. Analyzing each part systematically\n3. Providing step-by-step solutions\n4. Suggesting alternative approaches\n5. Explaining the reasoning behind each step",
    category: "Problem Solving",
    createdAt: "2024-01-06T00:00:00Z"
  },
  {
    id: "7",
    name: "Content Writer",
    description: "Help write various types of content",
    content: "Please help me write [type of content] about [topic]:\n\nRequirements:\n- Tone: [formal/casual/technical/friendly]\n- Length: [short/medium/long]\n- Target audience: [describe audience]\n- Key points to cover:\n  - [point 1]\n  - [point 2]\n  - [point 3]\n\nMake it engaging, informative, and well-structured.",
    category: "Writing",
    createdAt: "2024-01-07T00:00:00Z"
  },
  {
    id: "8",
    name: "Research Assistant",
    description: "Help with research and information gathering",
    content: "I need to research [topic] for [purpose]. Please help me by:\n\n1. Identifying key areas to explore\n2. Suggesting research questions\n3. Recommending reliable sources\n4. Providing an outline for research\n5. Highlighting potential challenges\n\nFocus on: [specific aspects if any]",
    category: "Research",
    createdAt: "2024-01-08T00:00:00Z"
  }
]

export async function GET() {
  return NextResponse.json(templates)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, content, category } = body

    if (!name || !content) {
      return NextResponse.json(
        { error: 'Name and content are required' },
        { status: 400 }
      )
    }

    const newTemplate: Template = {
      id: Date.now().toString(),
      name,
      description: description || '',
      content,
      category: category || 'Custom',
      createdAt: new Date().toISOString()
    }

    // In a real app, you'd save to a database
    // For now, we'll just return the new template
    templates.push(newTemplate)

    return NextResponse.json(newTemplate, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    )
  }
}
