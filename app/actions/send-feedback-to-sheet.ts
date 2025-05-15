"use server";

export type SendFeedbackToSheetParams = {
  color?: string;
  similarity?: string;
  optional?: string;
};

export async function SendFeedbackToSheet({
  color,
  similarity,
  optional,
}: SendFeedbackToSheetParams) {
  try {
    // Call the custom API endpoint
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyCgM5oc2CLhw23TaIp_lhCufT6gYdka03hwn9YcTAEhRhEu69hFpXAgutxW0OdJ89BVw/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: color || "",
          similarity: similarity || "",
          optional: optional || "",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.image) {
      throw new Error("No image data received from API");
    }

    return {
      success: true,
      params: {
        success: true,
      },
    };
  } catch (error) {
    console.error("Error generating image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
