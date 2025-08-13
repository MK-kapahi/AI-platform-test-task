"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ModelSelector, type Model } from "@/components/ui/model-selector"
import { ParametersPanel } from "@/components/ui/parameters-panel"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Bot, Palette } from "lucide-react"

interface SidebarProps {
  selectedModel: string
  onModelChange: (model: string) => void
  temperature: number
  onTemperatureChange: (temp: number) => void
  maxTokens: number
  onMaxTokensChange: (tokens: number) => void
  topP: number
  onTopPChange: (topP: number) => void
  frequencyPenalty: number
  onFrequencyPenaltyChange: (penalty: number) => void
  presencePenalty: number
  onPresencePenaltyChange: (penalty: number) => void
}

export function Sidebar({
  selectedModel,
  onModelChange,
  temperature,
  onTemperatureChange,
  maxTokens,
  onMaxTokensChange,
  topP,
  onTopPChange,
  frequencyPenalty,
  onFrequencyPenaltyChange,
  presencePenalty,
  onPresencePenaltyChange,
}: SidebarProps) {
  return (
    <div className="flex h-full w-full lg:w-80 flex-col border-r bg-sidebar-background relative z-20 sidebar-container">
      <div className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-sidebar-primary" />
          <h1 className="text-base sm:text-lg font-semibold text-sidebar-foreground">AI Interface</h1>
        </div>
        <ThemeToggle />
      </div>
      
      <ScrollArea className="flex-1 px-0 sm:pe-0 py-4 overflow-y-auto">
        <div className="space-y-4 sm:space-y-6 pb-6">
          {/* Model Selection */}
          <Card className="border-sidebar-border bg-sidebar-accent">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
                <Bot className="h-4 w-4" />
                Model Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={onModelChange}
              />
            </CardContent>
          </Card>

          <Separator className="bg-sidebar-border" />

          {/* Parameters Panel */}
          <Card className="border-sidebar-border bg-sidebar-accent">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
                <Settings className="h-4 w-4" />
                Parameters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ParametersPanel
                temperature={temperature}
                onTemperatureChange={onTemperatureChange}
                maxTokens={maxTokens}
                onMaxTokensChange={onMaxTokensChange}
                topP={topP}
                onTopPChange={onTopPChange}
                frequencyPenalty={frequencyPenalty}
                onFrequencyPenaltyChange={onFrequencyPenaltyChange}
                presencePenalty={presencePenalty}
                onPresencePenaltyChange={onPresencePenaltyChange}
              />
            </CardContent>
          </Card>


        </div>
      </ScrollArea>
    </div>
  )
}
