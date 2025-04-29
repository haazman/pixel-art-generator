import { PixelArtGenerator } from "@/components/pixel-art-generator"
import { PixelHeader } from "@/components/pixel-header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <PixelHeader />
      <main className="container mx-auto px-4 py-8">
        <PixelArtGenerator />
      </main>
      <footer className="container mx-auto px-4 py-6 text-center text-gray-400 border-t border-gray-800">
        <p>Powered by LoRA fine-tuned Stable Diffusion | © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
