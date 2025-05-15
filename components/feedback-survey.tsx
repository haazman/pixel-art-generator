"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LucideLoader2, LucideSend, LucideX } from "lucide-react"

interface FeedbackSurveyProps {
  isSending: boolean
  onSubmit: (feedback: FeedbackData) => void
  onClose: () => void
}

export interface FeedbackData {
  colorRating: number
  similarityRating: number
  comments?: string
}

export function FeedbackSurvey({ isSending = false, onSubmit, onClose }: FeedbackSurveyProps) {
  const [colorRating, setColorRating] = useState<number>(0)
  const [similarityRating, setSimilarityRating] = useState<number>(0)
  const [comments, setComments] = useState<string>("")

  const handleSubmit = () => {
    onSubmit({
      colorRating,
      similarityRating,
      comments,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-2 border-pixel-blue">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-white">Rate Your Generated Character</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <LucideX className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">

          <div className="space-y-3">
            <Label className="text-sm font-medium text-white">How would you rate the colors?</Label>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="outline"
                  className={`w-12 h-12 ${colorRating === rating
                    ? "bg-pixel-green border-pixel-green text-black"
                    : "bg-gray-700 border-gray-600"
                    }`}
                  onClick={() => setColorRating(rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 px-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-white">How similar is the result to your selections?</Label>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="outline"
                  className={`w-12 h-12 ${similarityRating === rating
                    ? "bg-pixel-blue border-pixel-blue text-white"
                    : "bg-gray-700 border-gray-600"
                    }`}
                  onClick={() => setSimilarityRating(rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 px-1">
              <span>Not similar</span>
              <span>Very similar</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-sm font-medium text-white">
              Additional Comments (Optional)
            </Label>
            <textarea
              id="comments"
              className="w-full h-20 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white text-sm"
              placeholder="Share any additional feedback..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={colorRating === 0 || similarityRating === 0}
            className="w-full bg-pixel-green hover:bg-pixel-darkGreen text-black font-bold"
          >
            {isSending ? (
              <div className="flex items-center justify-center">
                <LucideLoader2 className="h-6 w-6 animate-spin text-pixel-blue" />
              </div>
            ) : (
              <>
                <LucideSend className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
