import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const firebaseAuthUrl = `https://pixchar-db409.firebaseapp.com/__/auth/`; // Replace with your Firebase project URL

  const { method, body, query } = req;

  const targetUrl = `${firebaseAuthUrl}${query.path || ""}`; // Append the path from the query

  try {
    const response = await fetch(targetUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(
          Object.entries(req.headers).filter(
            ([key, value]) => typeof value === "string"
          )
        ),
      },
      body: method === "POST" ? JSON.stringify(body) : undefined, // Forward body for POST requests
    });

    const data = await response.json();
    res.status(response.status).json(data); // Forward the response back to the client
  } catch (error) {
    console.error("Error in proxy:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}