import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Hash, Settings } from "lucide-react"
import { motion } from "framer-motion"

interface ParametersPanelProps {
  temperature: number
  maxTokens: number
  onTemperatureChange: (value: number) => void
  onMaxTokensChange: (value: number) => void
}

export function ParametersPanel({
  temperature,
  maxTokens,
  onTemperatureChange,
  onMaxTokensChange,
}: ParametersPanelProps) {
  const [localTemperature, setLocalTemperature] = useState(temperature)
  const [localMaxTokens, setLocalMaxTokens] = useState(maxTokens)

  useEffect(() => {
    setLocalTemperature(temperature)
  }, [temperature])

  useEffect(() => {
    setLocalMaxTokens(maxTokens)
  }, [maxTokens])

  const handleTemperatureChange = (value: number[]) => {
    const newTemperature = value[0]
    setLocalTemperature(newTemperature)
    onTemperatureChange(newTemperature)
  }

  const handleMaxTokensChange = (value: string) => {
    const numValue = parseInt(value) || 0
    setLocalMaxTokens(numValue)
    onMaxTokensChange(numValue)
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Temperature Parameter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            <CardTitle className="text-base">Temperature</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <div id="temperature-description" className="text-xs text-muted-foreground">
              Controls randomness: Lower values are more focused, higher values are more creative
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={localTemperature}
              onChange={(e) => handleTemperatureChange([parseFloat(e.target.value) || 0])}
              min={0}
              max={1}
              step={0.1}
              className="w-20"
              aria-label="Temperature value"
              aria-describedby="temperature-description"
            />
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
            <Input
              id="max-tokens-input"
              type="number"
              value={localMaxTokens}
              onChange={(e) => handleMaxTokensChange(e.target.value)}
              min={100}
              max={4000}
              step={100}
              className="w-full"
              aria-label="Maximum tokens for response"
              aria-describedby="max-tokens-description"
              aria-valuetext={`Maximum tokens: ${localMaxTokens}, ${getMaxTokensLabel(localMaxTokens)} response`}
            />
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
