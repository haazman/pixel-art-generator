"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LucideLoader2, LucideSend, LucideX, LucideArrowRight, LucideArrowLeft } from "lucide-react"

interface FeedbackSurveyProps {
  isSending: boolean
  onSubmit: (feedback: FeedbackData) => void
  onClose: () => void
}

export interface FeedbackData {
  colorRating: number
  similarityRating: number
  comments?: string
  headGearCorrect?: boolean
  hairColorCorrect?: boolean
  clothTypeCorrect?: boolean
  weaponCorrect?: boolean
  facingCorrect?: boolean
}

export function FeedbackSurvey({ isSending = false, onSubmit, onClose }: FeedbackSurveyProps) {
  const [step, setStep] = useState(1)
  const [colorRating, setColorRating] = useState<number>(0)
  const [similarityRating, setSimilarityRating] = useState<number>(0)
  const [comments, setComments] = useState<string>("")
  const [headGearCorrect, setHeadGearCorrect] = useState<boolean | undefined>(undefined)
  const [hairColorCorrect, setHairColorCorrect] = useState<boolean | undefined>(undefined)
  const [clothTypeCorrect, setClothTypeCorrect] = useState<boolean | undefined>(undefined)
  const [weaponCorrect, setWeaponCorrect] = useState<boolean | undefined>(undefined)
  const [facingCorrect, setFacingCorrect] = useState<boolean | undefined>(undefined)

  const handleSubmit = () => {
    onSubmit({
      colorRating,
      similarityRating,
      comments,
      headGearCorrect,
      hairColorCorrect,
      clothTypeCorrect,
      weaponCorrect,
      facingCorrect,
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
          {step === 1 && (
            <>
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
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-white">Was the head gear correct?</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={headGearCorrect === true ? "default" : "outline"}
                    className={headGearCorrect === true ? "bg-pixel-green text-black" : ""}
                    onClick={() => setHeadGearCorrect(true)}
                  >Yes</Button>
                  <Button
                    variant={headGearCorrect === false ? "default" : "outline"}
                    className={headGearCorrect === false ? "bg-red-500 text-white" : ""}
                    onClick={() => setHeadGearCorrect(false)}
                  >No</Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-white">Was the hair color correct?</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={hairColorCorrect === true ? "default" : "outline"}
                    className={hairColorCorrect === true ? "bg-pixel-green text-black" : ""}
                    onClick={() => setHairColorCorrect(true)}
                  >Yes</Button>
                  <Button
                    variant={hairColorCorrect === false ? "default" : "outline"}
                    className={hairColorCorrect === false ? "bg-red-500 text-white" : ""}
                    onClick={() => setHairColorCorrect(false)}
                  >No</Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-white">Was the cloth type correct?</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={clothTypeCorrect === true ? "default" : "outline"}
                    className={clothTypeCorrect === true ? "bg-pixel-green text-black" : ""}
                    onClick={() => setClothTypeCorrect(true)}
                  >Yes</Button>
                  <Button
                    variant={clothTypeCorrect === false ? "default" : "outline"}
                    className={clothTypeCorrect === false ? "bg-red-500 text-white" : ""}
                    onClick={() => setClothTypeCorrect(false)}
                  >No</Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-white">Was the weapon correct?</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={weaponCorrect === true ? "default" : "outline"}
                    className={weaponCorrect === true ? "bg-pixel-green text-black" : ""}
                    onClick={() => setWeaponCorrect(true)}
                  >Yes</Button>
                  <Button
                    variant={weaponCorrect === false ? "default" : "outline"}
                    className={weaponCorrect === false ? "bg-red-500 text-white" : ""}
                    onClick={() => setWeaponCorrect(false)}
                  >No</Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-white">Was the facing correct?</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={facingCorrect === true ? "default" : "outline"}
                    className={facingCorrect === true ? "bg-pixel-green text-black" : ""}
                    onClick={() => setFacingCorrect(true)}
                  >Yes</Button>
                  <Button
                    variant={facingCorrect === false ? "default" : "outline"}
                    className={facingCorrect === false ? "bg-red-500 text-white" : ""}
                    onClick={() => setFacingCorrect(false)}
                  >No</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          {step === 2 && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
              disabled={isSending}
            >
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step === 1 && (
            <Button
              className="flex-1 bg-pixel-blue hover:bg-pixel-darkGreen text-white font-bold"
              onClick={() => setStep(2)}
              disabled={colorRating === 0 || similarityRating === 0}
            >
              Next
              <LucideArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {step === 2 && (
            <Button
              onClick={handleSubmit}
              disabled={
                isSending ||
                headGearCorrect === null ||
                hairColorCorrect === null ||
                clothTypeCorrect === null ||
                weaponCorrect === null ||
                facingCorrect === null
              }
              className="flex-1 bg-pixel-green hover:bg-pixel-darkGreen text-black font-bold"
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
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
