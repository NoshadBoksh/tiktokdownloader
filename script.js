document.getElementById("downloadBtn").addEventListener("click", async () => {
  const linkInput = document.getElementById("link");
  const resultDiv = document.getElementById("result");
  const url = linkInput.value.trim();

  if (!url) {
    resultDiv.innerHTML = "<p>Please enter a TikTok link.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Fetching download link...</p>";

  try {
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (!data.data || !data.data.play) {
      resultDiv.innerHTML = "<p>Could not fetch video. Try again.</p>";
      return;
    }

    const videoLink = data.data.play;
    resultDiv.innerHTML = `
      <p>Download Ready:</p>
      <a href="${videoLink}" target="_blank" rel="noopener noreferrer">
        <button>Download Video</button>
      </a>
    `;
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
});
