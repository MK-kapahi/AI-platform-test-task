import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Hash, Settings, Minus, Plus } from "lucide-react"

interface ParametersPanelProps {
  temperature: number
  onTemperatureChange: (value: number) => void
  maxTokens: number
  onMaxTokensChange: (value: number) => void
  topP: number
  onTopPChange: (value: number) => void
  frequencyPenalty: number
  onFrequencyPenaltyChange: (value: number) => void
  presencePenalty: number
  onPresencePenaltyChange: (value: number) => void
}

export function ParametersPanel({
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
}: ParametersPanelProps) {
  const [localTemperature, setLocalTemperature] = useState(temperature)
  const [localMaxTokens, setLocalMaxTokens] = useState(maxTokens)
  const [localTopP, setLocalTopP] = useState(topP)
  const [localFrequencyPenalty, setLocalFrequencyPenalty] = useState(frequencyPenalty)
  const [localPresencePenalty, setLocalPresencePenalty] = useState(presencePenalty)

  useEffect(() => {
    setLocalTemperature(temperature)
  }, [temperature])

  useEffect(() => {
    setLocalMaxTokens(maxTokens)
  }, [maxTokens])

  useEffect(() => {
    setLocalTopP(topP)
  }, [topP])

  useEffect(() => {
    setLocalFrequencyPenalty(frequencyPenalty)
  }, [frequencyPenalty])

  useEffect(() => {
    setLocalPresencePenalty(presencePenalty)
  }, [presencePenalty])

  const handleTemperatureChange = (value: number[]) => {
    const newTemperature = Math.max(0, Math.min(1, value[0]))
    setLocalTemperature(newTemperature)
    onTemperatureChange(newTemperature)
  }

  const handleTemperatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    const newTemperature = Math.max(0, Math.min(1, value))
    setLocalTemperature(newTemperature)
    onTemperatureChange(newTemperature)
  }

  const adjustTemperature = (increment: number) => {
    const newTemperature = Math.max(0, Math.min(1, localTemperature + increment))
    setLocalTemperature(newTemperature)
    onTemperatureChange(newTemperature)
  }

  const handleMaxTokensChange = (value: string) => {
    const numValue = Math.max(100, Math.min(4000, parseInt(value) || 100))
    setLocalMaxTokens(numValue)
    onMaxTokensChange(numValue)
  }

  const adjustMaxTokens = (increment: number) => {
    const newValue = Math.max(100, Math.min(4000, localMaxTokens + increment))
    setLocalMaxTokens(newValue)
    onMaxTokensChange(newValue)
  }

  const handleTopPChange = (value: number[]) => {
    const newTopP = Math.max(0, Math.min(1, value[0]))
    setLocalTopP(newTopP)
    onTopPChange(newTopP)
  }

  const handleTopPInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    const newTopP = Math.max(0, Math.min(1, value))
    setLocalTopP(newTopP)
    onTopPChange(newTopP)
  }

  const adjustTopP = (increment: number) => {
    const newTopP = Math.max(0, Math.min(1, localTopP + increment))
    setLocalTopP(newTopP)
    onTopPChange(newTopP)
  }

  const handleFrequencyPenaltyChange = (value: number[]) => {
    const newPenalty = Math.max(-2, Math.min(2, value[0]))
    setLocalFrequencyPenalty(newPenalty)
    onFrequencyPenaltyChange(newPenalty)
  }

  const handleFrequencyPenaltyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    const newPenalty = Math.max(-2, Math.min(2, value))
    setLocalFrequencyPenalty(newPenalty)
    onFrequencyPenaltyChange(newPenalty)
  }

  const adjustFrequencyPenalty = (increment: number) => {
    const newPenalty = Math.max(-2, Math.min(2, localFrequencyPenalty + increment))
    setLocalFrequencyPenalty(newPenalty)
    onFrequencyPenaltyChange(newPenalty)
  }

  const handlePresencePenaltyChange = (value: number[]) => {
    const newPenalty = Math.max(-2, Math.min(2, value[0]))
    setLocalPresencePenalty(newPenalty)
    onPresencePenaltyChange(newPenalty)
  }

  const handlePresencePenaltyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    const newPenalty = Math.max(-2, Math.min(2, value))
    setLocalPresencePenalty(newPenalty)
    onPresencePenaltyChange(newPenalty)
  }

  const adjustPresencePenalty = (increment: number) => {
    const newPenalty = Math.max(-2, Math.min(2, localPresencePenalty + increment))
    setLocalPresencePenalty(newPenalty)
    onPresencePenaltyChange(newPenalty)
  }

  const getTemperatureLabel = (temp: number) => {
    if (temp <= 0.3) return "Very Precise"
    if (temp <= 0.5) return "Precise"
    if (temp <= 0.7) return "Balanced"
    if (temp <= 0.9) return "Creative"
    return "Very Creative"
  }

  const getMaxTokensLabel = (tokens: number) => {
    if (tokens <= 500) return "Short"
    if (tokens <= 1000) return "Medium"
    if (tokens <= 2000) return "Long"
    return "Very Long"
  }

  const getTopPLabel = (topP: number) => {
    if (topP <= 0.3) return "Very Focused"
    if (topP <= 0.5) return "Focused"
    if (topP <= 0.7) return "Balanced"
    if (topP <= 0.9) return "Diverse"
    return "Very Diverse"
  }

  const getPenaltyLabel = (penalty: number) => {
    if (penalty <= -1) return "Encourage"
    if (penalty <= 0) return "Neutral"
    if (penalty <= 1) return "Discourage"
    return "Strongly Discourage"
  }

  return (
    <div className="space-y-6 pb-4">
      {/* Temperature Parameter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            <CardTitle className="text-base">Temperature</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature-slider" className="text-sm">
                Creativity Level
              </Label>
              <Badge variant="secondary" className="text-xs">
                {getTemperatureLabel(localTemperature)}
              </Badge>
            </div>
            <Slider
              id="temperature-slider"
              value={[localTemperature]}
              onValueChange={handleTemperatureChange}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
              aria-label="Temperature control"
              aria-describedby="temperature-description"
              aria-valuetext={`Temperature: ${localTemperature}, ${getTemperatureLabel(localTemperature)}`}
            />
            <div id="temperature-description" className="text-xs text-muted-foreground pb-1">
              Controls randomness: Lower values are more focused, higher values are more creative
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTemperature(-0.1)}
              disabled={localTemperature <= 0}
              className="h-8 w-8 p-0"
              aria-label="Decrease temperature"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={localTemperature}
              onChange={handleTemperatureInputChange}
              min={0}
              max={1}
              step={0.1}
              className="w-20 text-center"
              aria-label="Temperature value"
              aria-describedby="temperature-description"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTemperature(0.1)}
              disabled={localTemperature >= 1}
              className="h-8 w-8 p-0"
              aria-label="Increase temperature"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <span className="text-sm text-muted-foreground">/ 1.0</span>
          </div>
        </CardContent>
      </Card>

      {/* Max Tokens Parameter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <CardTitle className="text-base">Max Tokens</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="max-tokens-input" className="text-sm">
                Response Length
              </Label>
              <Badge variant="secondary" className="text-xs">
                {getMaxTokensLabel(localMaxTokens)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustMaxTokens(-100)}
                disabled={localMaxTokens <= 100}
                className="h-8 w-8 p-0"
                aria-label="Decrease max tokens"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                id="max-tokens-input"
                type="number"
                value={localMaxTokens}
                onChange={(e) => handleMaxTokensChange(e.target.value)}
                min={100}
                max={4000}
                step={100}
                className="flex-1 text-center"
                aria-label="Maximum tokens for response"
                aria-describedby="max-tokens-description"
                aria-valuetext={`Maximum tokens: ${localMaxTokens}, ${getMaxTokensLabel(localMaxTokens)} response`}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustMaxTokens(100)}
                disabled={localMaxTokens >= 4000}
                className="h-8 w-8 p-0"
                aria-label="Increase max tokens"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div id="max-tokens-description" className="text-xs text-muted-foreground">
              Maximum number of tokens in the AI response (100-4000)
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Range:</span>
            <Badge variant="outline" className="text-xs">100</Badge>
            <span>to</span>
            <Badge variant="outline" className="text-xs">4,000</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Top P Parameter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <CardTitle className="text-base">Top P</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="top-p-slider" className="text-sm">
                Nucleus Sampling
              </Label>
              <Badge variant="secondary" className="text-xs">
                {getTopPLabel(localTopP)}
              </Badge>
            </div>
            <Slider
              id="top-p-slider"
              value={[localTopP]}
              onValueChange={handleTopPChange}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
              aria-label="Top P control"
              aria-describedby="top-p-description"
              aria-valuetext={`Top P: ${localTopP}, ${getTopPLabel(localTopP)}`}
            />
            <div id="top-p-description" className="text-xs text-muted-foreground">
              Controls diversity via nucleus sampling: Lower values are more focused, higher values are more diverse
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTopP(-0.1)}
              disabled={localTopP <= 0}
              className="h-8 w-8 p-0"
              aria-label="Decrease top P"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={localTopP}
              onChange={handleTopPInputChange}
              min={0}
              max={1}
              step={0.1}
              className="w-20 text-center"
              aria-label="Top P value"
              aria-describedby="top-p-description"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTopP(0.1)}
              disabled={localTopP >= 1}
              className="h-8 w-8 p-0"
              aria-label="Increase top P"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <span className="text-sm text-muted-foreground">/ 1.0</span>
          </div>
        </CardContent>
      </Card>

      {/* Frequency Penalty Parameter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <CardTitle className="text-base">Frequency Penalty</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="frequency-penalty-slider" className="text-sm">
                Repetition Control
              </Label>
              <Badge variant="secondary" className="text-xs">
                {getPenaltyLabel(localFrequencyPenalty)}
              </Badge>
            </div>
            <Slider
              id="frequency-penalty-slider"
              value={[localFrequencyPenalty]}
              onValueChange={handleFrequencyPenaltyChange}
              max={2}
              min={-2}
              step={0.1}
              className="w-full"
              aria-label="Frequency penalty control"
              aria-describedby="frequency-penalty-description"
              aria-valuetext={`Frequency penalty: ${localFrequencyPenalty}, ${getPenaltyLabel(localFrequencyPenalty)}`}
            />
            <div id="frequency-penalty-description" className="text-xs text-muted-foreground">
              Controls repetition: Negative values encourage repetition, positive values discourage it
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustFrequencyPenalty(-0.1)}
              disabled={localFrequencyPenalty <= -2}
              className="h-8 w-8 p-0"
              aria-label="Decrease frequency penalty"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={localFrequencyPenalty}
              onChange={handleFrequencyPenaltyInputChange}
              min={-2}
              max={2}
              step={0.1}
              className="w-20 text-center"
              aria-label="Frequency penalty value"
              aria-describedby="frequency-penalty-description"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustFrequencyPenalty(0.1)}
              disabled={localFrequencyPenalty >= 2}
              className="h-8 w-8 p-0"
              aria-label="Increase frequency penalty"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <span className="text-sm text-muted-foreground">Range: -2 to 2</span>
          </div>
        </CardContent>
      </Card>

      {/* Presence Penalty Parameter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <CardTitle className="text-base">Presence Penalty</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="presence-penalty-slider" className="text-sm">
                Topic Diversity
              </Label>
              <Badge variant="secondary" className="text-xs">
                {getPenaltyLabel(localPresencePenalty)}
              </Badge>
            </div>
            <Slider
              id="presence-penalty-slider"
              value={[localPresencePenalty]}
              onValueChange={handlePresencePenaltyChange}
              max={2}
              min={-2}
              step={0.1}
              className="w-full"
              aria-label="Presence penalty control"
              aria-describedby="presence-penalty-description"
              aria-valuetext={`Presence penalty: ${localPresencePenalty}, ${getPenaltyLabel(localPresencePenalty)}`}
            />
            <div id="presence-penalty-description" className="text-xs text-muted-foreground">
              Controls topic diversity: Negative values encourage staying on topic, positive values encourage new topics
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustPresencePenalty(-0.1)}
              disabled={localPresencePenalty <= -2}
              className="h-8 w-8 p-0"
              aria-label="Decrease presence penalty"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={localPresencePenalty}
              onChange={handlePresencePenaltyInputChange}
              min={-2}
              max={2}
              step={0.1}
              className="w-20 text-center"
              aria-label="Presence penalty value"
              aria-describedby="presence-penalty-description"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustPresencePenalty(0.1)}
              disabled={localPresencePenalty >= 2}
              className="h-8 w-8 p-0"
              aria-label="Increase presence penalty"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <span className="text-sm text-muted-foreground">Range: -2 to 2</span>
          </div>
        </CardContent>
      </Card>

      {/* Current Settings Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <CardTitle className="text-base">Current Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Temperature:</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {localTemperature}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({getTemperatureLabel(localTemperature)})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Max Tokens:</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {localMaxTokens.toLocaleString()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({getMaxTokensLabel(localMaxTokens)})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Top P:</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {localTopP}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({getTopPLabel(localTopP)})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Frequency Penalty:</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {localFrequencyPenalty}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({getPenaltyLabel(localFrequencyPenalty)})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Presence Penalty:</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {localPresencePenalty}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({getPenaltyLabel(localPresencePenalty)})
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
