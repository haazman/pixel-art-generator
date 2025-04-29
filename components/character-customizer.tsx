"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CharacterOptions } from "@/app/actions/generate-image"
import { useState } from "react"

interface CharacterCustomizerProps {
  options: CharacterOptions
  onChange: (options: CharacterOptions) => void
}

export function CharacterCustomizer({ options, onChange }: CharacterCustomizerProps) {
  const handleChange = (field: keyof CharacterOptions, value: string) => {
    onChange({ ...options, [field]: value })
  }

  const hairColors = ["blue", "red", "blond", "brown", "pink", "gray", "white", "purple", "orange", "green"]
  const clothTypes = ["armor", "hoodie", "dress", "cape", "vest"]

  const clothColorsByType: Record<string, string[]> = {
    "armor": ["gray", "black", "blue", "gold"],
    "hoodie": ["purple"],
    "dress": ["purple", "gray"],
    "cape": ["purple", "blue", "red", "pink"],
    "vest": ["yellow", "blue", "purple", "gray"],
  }
  const weapons = ["sword", "spear", "bow", "no weapon"]
  const facingDirections = ["forward", "left", "right",]

  const [selectedClothColor, setSelectedClothColor] = useState<string[]>([])

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium text-white">Hair Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {hairColors.map((color) => (
            <div
              key={color}
              onClick={() => handleChange("hairColor", color)}
              className={`px-3 py-2 rounded-md text-center text-sm cursor-pointer transition-colors ${options.hairColor === color ? "bg-pixel-green text-black font-medium" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-white">Clothing Type</Label>
        <div className="grid grid-cols-4 gap-2">
          {clothTypes.map((type) => (
            <div
              key={type}
              onClick={() => {
                handleChange("clothType", type)
                setSelectedClothColor(clothColorsByType[type] || [])
              }}
              className={`px-3 py-2 rounded-md text-center text-sm cursor-pointer transition-colors ${options.clothType === type ? "bg-pixel-blue text-white font-medium" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-white">Clothing Color</Label>
        {selectedClothColor.length > 0 ? (
          <div className="grid grid-cols-4 gap-2">
            {selectedClothColor.map((color) => (
              <div
          key={color}
          onClick={() => handleChange("clothColor", color)}
          className={`px-3 py-2 rounded-md text-center text-sm cursor-pointer transition-colors ${options.clothColor === color
            ? "bg-pixel-purple text-white font-medium"
            : "bg-gray-700 hover:bg-gray-600"
            }`}
              >
          {color.charAt(0).toUpperCase() + color.slice(1)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400">Select cloth type to see available colors</div>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-white">Weapon</Label>
        <div className="grid grid-cols-3 gap-2">
          {weapons.map((weapon) => (
            <div
              key={weapon}
              onClick={() => handleChange("weapon", weapon)}
              className={`px-3 py-2 rounded-md text-center text-sm cursor-pointer transition-colors ${options.weapon === weapon ? "bg-pixel-red text-white font-medium" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {weapon.charAt(0).toUpperCase() + weapon.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-white">Facing Direction</Label>
        <div className="grid grid-cols-4 gap-2">
          {facingDirections.map((direction) => (
            <div
              key={direction}
              onClick={() => handleChange("facing", direction)}
              className={`px-3 py-2 rounded-md text-center text-sm cursor-pointer transition-colors ${options.facing === direction
                ? "bg-pixel-yellow text-black font-medium"
                : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {direction.charAt(0).toUpperCase() + direction.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalDetails" className="text-sm font-medium text-white">
          Additional Details (Optional)
        </Label>
        <Textarea
          id="additionalDetails"
          placeholder="Add any additional character details here..."
          value={options.additionalDetails || ""}
          onChange={(e) => handleChange("additionalDetails", e.target.value)}
          className="h-16 bg-gray-900 border-gray-700"
        />
      </div>
    </div>
  )
}
