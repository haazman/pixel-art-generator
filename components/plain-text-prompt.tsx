"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PlainTextPromptProps {
  value: string
  onChange: (value: string) => void
}

export function PlainTextPrompt({ value, onChange }: PlainTextPromptProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="plainTextPrompt" className="text-sm font-medium text-white">
          Describe Your Character
        </Label>
        <Textarea
          id="plainTextPrompt"
          placeholder="Describe your pixel art character in detail (e.g., a warrior with blue hair, golden armor, and a large sword)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-64 bg-gray-900 border-gray-700"
        />
      </div>

      <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
        <h4 className="text-sm font-medium text-pixel-yellow mb-2">Prompt Tips:</h4>
        <ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
          <li>Be specific about character features (hair, clothing, weapons)</li>
          <li>Mention colors for better results</li>
          <li>Specify the character's pose or direction</li>
        </ul>
      </div>
    </div>
  )
}
