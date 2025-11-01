const btn = document.getElementById("downloadBtn")
const input = document.getElementById("link")
const result = document.getElementById("result")

btn.addEventListener("click", async () => {
  const url = input.value.trim()
  if (!url) {
    alert("Please paste a TikTok link")
    return
  }

  result.textContent = "Fetching..."
  try {
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })
    const data = await res.json()

    if (data?.data?.play) {
      const videoUrl = data.data.no_watermark || data.data.play
      result.innerHTML = `
        <video controls src="${videoUrl}"></video>
        <a href="${videoUrl}" download>Download video</a>
      `
    } else {
      result.textContent = "Error fetching video."
    }
  } catch (err) {
    console.error(err)
    result.textContent = "Something went wrong."
  }
})
