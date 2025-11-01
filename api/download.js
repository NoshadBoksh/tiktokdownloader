export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" })
  }

  try {
    const { url } = req.body
    if (!url) return res.status(400).json({ error: "Missing TikTok URL" })

    const response = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })

    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video", detail: String(err) })
  }
}

