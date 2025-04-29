"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { LucideLoader2 } from "lucide-react"
import type { GeneratedImage } from "./pixel-art-generator"

interface PixelArtDisplayProps {
  image: GeneratedImage | null
  isLoading: boolean
}

export function PixelArtDisplay({ image, isLoading }: PixelArtDisplayProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(Boolean)

  useEffect(() => {
    setIsImageLoaded(true)
  }, [image])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[512px] bg-gray-900 rounded-lg border-2 border-dashed border-gray-700">
        <LucideLoader2 className="h-12 w-12 text-pixel-blue animate-spin mb-4" />
        <p className="text-gray-400">Generating your pixel art character...</p>
        <div className="mt-4 w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-pixel-blue"
            style={{
              width: "100%",
              animation: "indeterminate 1.5s infinite linear",
            }}
          ></div>
        </div>
        <style jsx>{`
          @keyframes indeterminate {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    )
  }

  if (!image) {
    return (
      <div className="flex flex-col items-center justify-center h-[512px] bg-gray-900 rounded-lg border-2 border-dashed border-gray-700">
        <div className="w-16 h-16 mb-4 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M20.4 14.5L16 10 4 20" />
          </svg>
        </div>
        <p className="text-gray-400">Customize your character and generate your first pixel art</p>
      </div>
    )
  }

  const characterOptions = image.params.characterOptions
  const plainTextPrompt = image.params.plainTextPrompt

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full max-w-[512px] aspect-square mx-auto bg-gray-900 rounded-lg overflow-hidden">
        {/* For base64 images, we need to use a different approach since Next.js Image component has limitations with data URLs */}
        {image.imageUrl.startsWith("data:") ? (
          <div className="relative w-full h-full">
            <img
              src={image.imageUrl || "/placeholder.svg"}
              alt="Generated pixel art character"
              className={`w-full h-full object-contain ${isImageLoaded ? "animate-pixelate" : "opacity-0"}`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        ) : (
          <Image
            src={image.imageUrl || "/placeholder.svg"}
            alt="Generated pixel art character"
            fill
            className={`object-contain ${isImageLoaded ? "animate-pixelate" : "opacity-0"}`}
            onLoad={() => setIsImageLoaded(true)}
            priority
          />
        )}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LucideLoader2 className="h-8 w-8 text-pixel-blue animate-spin" />
          </div>
        )}
      </div>

      <div className="mt-4 w-full max-w-[512px] bg-gray-900 p-3 rounded-md text-sm">
        {plainTextPrompt ? (
          <div>
            <div className="text-pixel-green font-medium mb-1">Prompt:</div>
            <div className="text-white mb-3">{plainTextPrompt}</div>
          </div>
        ) : characterOptions ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="text-pixel-green">Hair:</div>
            <div className="text-white">{characterOptions.hairColor}</div>

            <div className="text-pixel-blue">Clothing:</div>
            <div className="text-white">
              {characterOptions.clothColor} {characterOptions.clothType}
            </div>

            <div className="text-pixel-red">Weapon:</div>
            <div className="text-white">{characterOptions.weapon}</div>

            <div className="text-pixel-yellow">Facing:</div>
            <div className="text-white">{characterOptions.facing}</div>

            {characterOptions.additionalDetails && (
              <>
                <div className="text-pixel-purple">Details:</div>
                <div className="text-white">{characterOptions.additionalDetails}</div>
              </>
            )}
          </div>
        ) : null}

        {image.feedback && (
          <div className="mt-3 pt-3 border-t border-gray-700 grid grid-cols-2 gap-2">
            <div className="text-gray-400">Color Rating:</div>
            <div className="text-white">{image.feedback.colorRating}/5</div>
            <div className="text-gray-400">Similarity:</div>
            <div className="text-white">{image.feedback.similarityRating}/5</div>
          </div>
        )}
      </div>
    </div>
  )
}
