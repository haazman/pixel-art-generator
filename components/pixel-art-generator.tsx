"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type CharacterOptions, generatePixelArt } from "@/app/actions/generate-image"
import { PixelArtDisplay } from "@/components/pixel-art-display"
import { CharacterCustomizer } from "@/components/character-customizer"
import { FeedbackSurvey, type FeedbackData } from "@/components/feedback-survey"
import { PlainTextPrompt } from "@/components/plain-text-prompt"
import { LucideImage, LucideLoader2, LucideTrash2, LucideDownload } from "lucide-react"
import { SendFeedbackToSheet } from "@/app/actions/send-feedback-to-sheet"
import FeedbackDoneModal from "./feedback-done"

export type GeneratedImage = {
  imageUrl: string
  params: any
  timestamp: number
  feedback?: FeedbackData
}

export function PixelArtGenerator() {
  const [characterOptions, setCharacterOptions] = useState<CharacterOptions>({
    hairColor: "brown",
    clothType: "armor",
    clothColor: "blue",
    weapon: "sword",
    facing: "forward",
    additionalDetails: "",
  })

  const [plainTextPrompt, setPlainTextPrompt] = useState("")
  const [promptMode, setPromptMode] = useState<"modular" | "plainText">("modular")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [showFeedbackDone, setShowFeedbackDone] = useState(false)

  const handleGenerate = async () => {
    if (promptMode === "modular") {

    } else if (promptMode === "plainText" && !plainTextPrompt.trim()) {

    }

    setIsGenerating(true)
    setError(null)

    try {
      const result = await generatePixelArt({
        characterOptions: promptMode === "modular" ? characterOptions : undefined,
        plainTextPrompt: promptMode === "plainText" ? plainTextPrompt : undefined,
        seed: Math.floor(Math.random() * 1000000),
      })

      if (result.success && result.imageUrl) {
        const newImage: GeneratedImage = {
          imageUrl: result.imageUrl,
          params: result.params!,
          timestamp: Date.now(),
        }

        setIsGenerating(false)
        setCurrentImage(newImage)
      } else {
        setError(result.error || "Failed to generate image")
      }
    } catch (error) {
      console.error("Error generating image:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFeedbackSubmit = async (feedback: FeedbackData) => {
    if (currentImage) {
      const updatedImage = { ...currentImage, feedback }
      setIsSendingFeedback(true);
      const response = await SendFeedbackToSheet({
        color: feedback.colorRating.toString(),
        similarity: feedback.similarityRating.toString(),
        optional: feedback.comments,
      })
      setIsSendingFeedback(false);
      setShowFeedback(false)
      setShowFeedbackDone(true)
    }
  }

  const handleFeedbackClose = () => {
    setShowFeedback(false)
  }

  const handleFeedbackDoneClose = () => {
    setShowFeedbackDone(false)
  }

  const handleClearCurrent = () => {
    setCurrentImage(null)
  }

  const handleDownload = () => {
    if (!currentImage?.imageUrl) return

    // Create a temporary link element
    const link = document.createElement("a")
    link.href = currentImage.imageUrl
    link.download = `pixel-art-${new Date().getTime()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 bg-gray-800 border-2 border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Create Character</h2>

          <Tabs value={promptMode} onValueChange={(value) => setPromptMode(value as "modular" | "plainText")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="modular"
                className="data-[state=active]:bg-pixel-green data-[state=active]:text-black"
              >
                Modular
              </TabsTrigger>
              <TabsTrigger
                value="plainText"
                className="data-[state=active]:bg-pixel-yellow data-[state=active]:text-black"
              >
                Plain Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modular" className="space-y-4">
              <CharacterCustomizer options={characterOptions} onChange={setCharacterOptions} />
            </TabsContent>

            <TabsContent value="plainText" className="space-y-4">
              <PlainTextPrompt value={plainTextPrompt} onChange={setPlainTextPrompt} />
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || (promptMode === "plainText" && !plainTextPrompt.trim())}
            className="w-full bg-pixel-green hover:bg-pixel-darkGreen text-black font-bold mt-6"
          >
            {isGenerating ? (
              <>
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <LucideImage className="mr-2 h-4 w-4" />
                Generate Character
              </>
            )}
          </Button>

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200 text-sm">
              <p className="font-medium mb-1">Error:</p>
              <p>{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-gray-800 border-2 border-gray-700 min-h-[500px]">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Preview</h2>
            {currentImage && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="border-pixel-blue text-pixel-blue hover:text-pixel-darkBlue hover:border-pixel-darkBlue"
                >
                  <LucideDownload className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCurrent}
                  className="border-pixel-red text-pixel-red hover:text-pixel-darkRed hover:border-pixel-darkRed"
                >
                  <LucideTrash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            )}
          </div>

          <PixelArtDisplay image={currentImage} isLoading={isGenerating} />
          <div className="pt-6 flex justify-end mx-20">
            {!isGenerating && currentImage && (
              <>
                <Button onClick={() => { setShowFeedback(true) }}>Review</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {showFeedback && <FeedbackSurvey isSending={isSendingFeedback} onSubmit={handleFeedbackSubmit} onClose={handleFeedbackClose} />}
      <FeedbackDoneModal isOpen={showFeedbackDone} onClose={handleFeedbackDoneClose} />
    </div>
  )
}
