"use server";

export type SendFeedbackToSheetParams = {
  email?: string; // Add email parameter
  color?: string;
  similarity?: string;
  optional?: string;
  headGearCorrect?: boolean;
  hairColorCorrect?: boolean;
  clothTypeCorrect?: boolean;
  weaponCorrect?: boolean;
  facingCorrect?: boolean;
};

export async function SendFeedbackToSheet({
  email, // Include email in the function parameters
  color,
  similarity,
  optional,
  headGearCorrect,
  hairColorCorrect,
  clothTypeCorrect,
  weaponCorrect,
  facingCorrect,
}: SendFeedbackToSheetParams) {
  try {
    // Call the custom API endpoint
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyY3Jg_KxKU0eeFScFUbcQVQ3jGMoA-p_7e0HYOjO_o7ZHo84eqEd3-B2F-9VYuaIDFkA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: color || "",
          similarity: similarity || "",
          optional: optional || "",
          headGearCorrect: headGearCorrect ?? null,
          hairColorCorrect: hairColorCorrect ?? null,
          clothTypeCorrect: clothTypeCorrect ?? null,
          weaponCorrect: weaponCorrect ?? null,
          facingCorrect: facingCorrect ?? null,
          gmail: email || "",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      params: {
        success: true,
      },
    };
  } catch (error) {
    console.error("Error sending feedback:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
