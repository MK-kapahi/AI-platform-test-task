"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModelSelector, type Model } from "@/components/ui/model-selector"
import { ParametersPanel } from "@/components/ui/parameters-panel"
import { Menu, X } from "lucide-react"

interface MobileNavProps {
  selectedModel: string
  selectedModelData: Model | null
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
  onModelChange: (model: string) => void
  onTemperatureChange: (value: number) => void
  onMaxTokensChange: (value: number) => void
  onTopPChange: (value: number) => void
  onFrequencyPenaltyChange: (value: number) => void
  onPresencePenaltyChange: (value: number) => void
}

export function MobileNav({
  selectedModel,
  selectedModelData,
  temperature,
  maxTokens,
  topP,
  frequencyPenalty,
  presencePenalty,
  onModelChange,
  onTemperatureChange,
  onMaxTokensChange,
  onTopPChange,
  onFrequencyPenaltyChange,
  onPresencePenaltyChange,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          aria-label="Open settings menu"
          aria-describedby="mobile-nav-description"
          aria-expanded={isOpen}
          aria-controls="mobile-settings-sheet"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[300px] sm:w-[400px] overflow-y-auto"
        id="mobile-settings-sheet"
        aria-label="Settings panel"
        aria-describedby="settings-description"
      >
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Model Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelChange={onModelChange}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Parameters</CardTitle>
                {selectedModelData && (
                  <p className="text-sm text-muted-foreground">
                    Max tokens: {selectedModelData.maxTokens.toLocaleString()}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <ParametersPanel
                  temperature={temperature}
                  onTemperatureChange={onTemperatureChange}
                  maxTokens={Math.min(maxTokens, selectedModelData?.maxTokens || 4000)}
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
        </div>
        <div id="mobile-nav-description" className="sr-only">
          Mobile navigation menu button. Opens settings panel with model selection and parameters.
        </div>
        <div id="settings-description" className="sr-only">
          Settings panel containing model selection and parameter controls for the AI interface.
        </div>
      </SheetContent>
    </Sheet>
  )
}
