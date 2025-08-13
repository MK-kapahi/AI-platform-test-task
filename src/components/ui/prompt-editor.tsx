"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Save, FolderOpen, Plus, X } from "lucide-react"
import { motion } from "framer-motion"

export interface Template {
  id: string
  name: string
  description: string
  content: string
  category: string
  createdAt: string
}

interface PromptEditorProps {
  value: string
  onChange: (value: string) => void
  onSend: (content: string) => void
  disabled?: boolean
}

export function PromptEditor({ value, onChange, onSend, disabled }: PromptEditorProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLoadDialog, setShowLoadDialog] = useState(false)
  const [saveForm, setSaveForm] = useState({
    name: "",
    description: "",
    category: "Custom"
  })

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (!response.ok) {
        throw new Error('Failed to fetch templates')
      }
      const data = await response.json()
      setTemplates(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTemplate = async () => {
    if (!saveForm.name.trim() || !value.trim()) {
      return
    }

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: saveForm.name,
          description: saveForm.description,
          content: value,
          category: saveForm.category
        })
      })

      if (response.ok) {
        const newTemplate = await response.json()
        setTemplates(prev => [...prev, newTemplate])
        setShowSaveDialog(false)
        setSaveForm({ name: "", description: "", category: "Custom" })
      } else {
        throw new Error('Failed to save template')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save template')
    }
  }

  const handleLoadTemplate = (template: Template) => {
    onChange(template.content)
    setShowLoadDialog(false)
  }

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSend()
    }
  }

  const categories = Array.from(new Set(templates.map(t => t.category)))

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-lg">Prompt Editor</CardTitle>
          <div className="flex items-center gap-2">
            <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  aria-label="Load prompt template"
                  aria-describedby="load-template-description"
                >
                  <FolderOpen className="h-3 w-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Load Template</span>
                  <span className="sm:hidden">Load</span>
                </Button>
              </DialogTrigger>
              <DialogContent 
                className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
                aria-label="Load template dialog"
                aria-describedby="template-list-description"
              >
                <DialogHeader>
                  <DialogTitle>Load Template</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-8" role="status" aria-live="polite">
                        Loading templates...
                      </div>
                    ) : error ? (
                      <div className="text-destructive" role="alert" aria-live="assertive">
                        {error}
                      </div>
                    ) : (
                      <div className="grid gap-3" role="listbox" aria-label="Available templates">
                        {templates.map((template) => (
                          <motion.div
                            key={template.id}
                            className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => handleLoadTemplate(template)}
                            role="option"
                            aria-label={`Load template: ${template.name}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-sm">{template.name}</h4>
                                  <Badge variant="secondary" className="text-xs">
                                    {template.category}
                                  </Badge>
                                </div>
                                {template.description && (
                                  <p className="text-xs text-muted-foreground mb-2">
                                    {template.description}
                                  </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                  {new Date(template.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div id="template-list-description" className="sr-only">
                  List of available prompt templates. Click on a template to load it into the editor.
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  aria-label="Save current prompt as template"
                  aria-describedby="save-template-description"
                >
                  <Save className="h-3 w-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Save Template</span>
                  <span className="sm:hidden">Save</span>
                </Button>
              </DialogTrigger>
              <DialogContent aria-label="Save template dialog">
                <DialogHeader>
                  <DialogTitle>Save Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Name *</Label>
                    <Input
                      id="template-name"
                      value={saveForm.name}
                      onChange={(e) => setSaveForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter template name"
                      aria-label="Template name"
                      aria-required={true}
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-description">Description</Label>
                    <Input
                      id="template-description"
                      value={saveForm.description}
                      onChange={(e) => setSaveForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter template description"
                      aria-label="Template description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-category">Category</Label>
                    <Select
                      value={saveForm.category}
                      onValueChange={(value) => setSaveForm(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger aria-label="Select template category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowSaveDialog(false)}
                      aria-label="Cancel saving template"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveTemplate}
                      disabled={!saveForm.name.trim() || !value.trim()}
                      aria-label="Save template"
                      aria-describedby={!saveForm.name.trim() || !value.trim() ? "save-template-error" : undefined}
                    >
                      Save Template
                    </Button>
                  </div>
                  {(!saveForm.name.trim() || !value.trim()) && (
                    <div id="save-template-error" className="text-sm text-destructive">
                      Name and content are required to save a template.
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div id="load-template-description" className="sr-only">
          Open dialog to load a saved prompt template
        </div>
        <div id="save-template-description" className="sr-only">
          Open dialog to save current prompt as a reusable template
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt-textarea">Prompt</Label>
          <Textarea
            id="prompt-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here... Use Ctrl+Enter (or Cmd+Enter) to send."
            className="min-h-[120px] sm:min-h-[200px] resize-none"
            disabled={disabled}
            aria-label="Prompt input"
            aria-describedby="prompt-instructions"
          />
          <div id="prompt-instructions" className="text-xs text-muted-foreground">
            Use Ctrl+Enter (or Cmd+Enter) to send your prompt
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-xs sm:text-sm text-muted-foreground">
            {value.length} characters
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange("")}
              disabled={!value.trim()}
              className="text-xs"
              aria-label="Clear prompt"
              aria-describedby={!value.trim() ? "clear-button-disabled" : undefined}
            >
              <X className="h-3 w-3 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Clear</span>
              <span className="sm:hidden">Clear</span>
            </Button>
            <Button
              onClick={handleSend}
              disabled={!value.trim() || disabled}
              size="sm"
              className="text-xs"
              aria-label="Send prompt"
              aria-describedby={!value.trim() || disabled ? "send-button-disabled" : undefined}
            >
              Send
            </Button>
          </div>
        </div>
        {!value.trim() && (
          <div id="clear-button-disabled" className="sr-only">
            Clear button is disabled because there is no text to clear
          </div>
        )}
        {(!value.trim() || disabled) && (
          <div id="send-button-disabled" className="sr-only">
            Send button is disabled because there is no text to send or the system is busy
          </div>
        )}
      </CardContent>
    </Card>
  )
}
