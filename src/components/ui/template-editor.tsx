"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, FolderOpen, Plus, X } from "lucide-react"

export interface Template {
  id: string
  name: string
  description: string
  content: string
  category: string
  createdAt: string
}

interface TemplateEditorProps {
  promptValue: string
  onPromptChange: (value: string) => void
  templates: Template[]
  onTemplatesChange: (templates: Template[]) => void
}

export function TemplateEditor({ 
  promptValue, 
  onPromptChange, 
  templates, 
  onTemplatesChange 
}: TemplateEditorProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [templateCategory, setTemplateCategory] = useState("Custom")

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
          category: templateCategory,
        }),
      })

      if (response.ok) {
        const newTemplate = await response.json()
        onTemplatesChange([...templates, newTemplate])
        setTemplateName("")
        setTemplateDescription("")
        setTemplateCategory("Custom")
        setSaveDialogOpen(false)
      }
    } catch (err) {
      console.error('Failed to save template:', err)
    }
  }

  const handleLoadTemplate = (template: Template) => {
    onPromptChange(template.content)
  }

  const handleDeleteTemplate = (templateId: string) => {
    onTemplatesChange(templates.filter(t => t.id !== templateId))
  }

  return (
    <div className="space-y-4">
      {/* Template Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!promptValue.trim()}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
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
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={templateCategory} onValueChange={setTemplateCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Custom">Custom</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Problem Solving">Problem Solving</SelectItem>
                    <SelectItem value="Writing">Writing</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
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

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPromptChange("Hello! I'd like to test the AI interface. Can you help me with a simple task?")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Sample
        </Button>
      </div>

      {/* Template Library */}
      {templates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Template Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 max-h-48 overflow-y-auto">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{template.name}</h4>
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                        {template.category}
                      </span>
                    </div>
                    {template.description && (
                      <p className="text-xs text-muted-foreground truncate">
                        {template.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLoadTemplate(template)}
                      className="h-7 w-7 p-0"
                      title="Load template"
                    >
                      <FolderOpen className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                      title="Delete template"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
