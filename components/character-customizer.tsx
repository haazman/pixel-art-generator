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

  const hairColors = [
    "blue",
    "red",
    "blond",
    "brown",
    "pink",
    "gray",
    "white",
    "purple",
    "orange",
    "green",
    "bald"
  ]
  const clothTypes = [
    "blue shirt",
    "chainmail armor",
    "gold armor",
    "leather tunic",
    "gray armor",
    "red shirt",
    "blue tunic",
    "brown robe",
    "white shirt",
    "green dress",
    "white tunic",
    "brown shirt",

  ]
  const headGear = [
    "brown hat",
    "gray helmet",
    "gold helmet",
    "brown round hat",
    "no head gear",
  ]
  const weapons = ["arrow sack", "spear", "no weapon"]
  const facingDirections = ["forward", "left", "right",]

  const [selectedClothColor, setSelectedClothColor] = useState<string[]>([])

  return (
    <div className="space-y-6">

      <div className="space-y-3">
        <Label className="text-sm font-medium text-white">Head Gear</Label>
        <div className="grid grid-cols-4 gap-2">
          {headGear.map((headGear) => (
            <div
              key={headGear}
              onClick={() => handleChange("headGear", headGear)}
              className={`px-3 py-2 rounded-md text-center text-sm cursor-pointer transition-colors ${options.headGear === headGear ? "bg-pixel-green text-black font-medium" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {headGear.charAt(0).toUpperCase() + headGear.slice(1)}
            </div>
          ))}
        </div>
      </div>

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
