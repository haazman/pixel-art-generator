import { LucideGamepad2 } from "lucide-react"

export function PixelHeader() {
  return (
    <header className="bg-gray-800 border-b-4 border-pixel-green py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LucideGamepad2 className="h-8 w-8 text-pixel-green" />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            <span className="text-pixel-green">Pix</span>
            <span className="text-pixel-blue">Char</span>
            <span className="text-white">Generator</span>
          </h1>
        </div>
      </div>
    </header>
  )
}
