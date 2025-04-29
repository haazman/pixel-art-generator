"use server"

export type CharacterOptions = {
  hairColor: string
  clothType: string
  clothColor: string
  weapon: string
  facing: string
  additionalDetails?: string
}

export type GenerationParams = {
  characterOptions?: CharacterOptions
  plainTextPrompt?: string
  seed?: number
}

export async function generatePixelArt({
  characterOptions,
  plainTextPrompt,
  seed = Math.floor(Math.random() * 1000000),
}: GenerationParams) {
  try {
    let prompt = ""

    // Determine if we're using modular options or plain text prompt
    if (plainTextPrompt && plainTextPrompt.trim()) {
      prompt = plainTextPrompt.trim()
    } else if (characterOptions) {
      const { hairColor, clothType, clothColor, weapon, facing, additionalDetails } = characterOptions
      // Construct prompt from character options
      prompt = `pixel art character with ${hairColor} hair, wearing ${clothColor} ${clothType}, holding a ${weapon}, facing ${facing}`

      // Add additional details if provided
      if (additionalDetails && additionalDetails.trim()) {
        prompt += `, ${additionalDetails}`
      }
    } else {
      throw new Error("Either characterOptions or plainTextPrompt must be provided")
    }

    // Add pixel art specific terms
    const enhancedPrompt = `${prompt}, 8-bit style, pixelated, game sprite, high quality pixel art`

    // Call the custom API endpoint
    const response = await fetch("https://88b7-34-145-111-243.ngrok-free.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: enhancedPrompt }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (!data.image) {
      throw new Error("No image data received from API")
    }

    // Create a data URL from the base64 image
    const imageUrl = `data:image/png;base64,${data.image}`

    return {
      success: true,
      imageUrl,
      params: {
        characterOptions,
        plainTextPrompt,
        prompt: enhancedPrompt,
        seed,
      },
    }
  } catch (error) {
    console.error("Error generating image:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
