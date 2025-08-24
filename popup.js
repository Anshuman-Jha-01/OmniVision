document.getElementById("analyzeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    // Inject overlay
    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const overlay = document.createElement('div');
        overlay.id = 'copilot-extension-overlay';
        Object.assign(overlay.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: '9999',
          pointerEvents: 'none',
        });
        document.body.appendChild(overlay);
      },
    });

    // Extract page text
    chrome.scripting.executeScript(
      {
        target: { tabId },
        func: () => document.body.innerText,
      },
      (results) => {
        const container = document.getElementById("reportContainer");
        const recommendation = document.getElementById("recommendationBox");
        container.innerText = "";
        recommendation.style.textAlign = "center";
        recommendation.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>`;

        const text = results[0].result;

        fetch("http://localhost:3000/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        })
          .then((res) => res.json())
          .then((data) => {
            recommendation.innerHTML = "";
            recommendation.style.textAlign = "";

            const text = data.textResult;
            const match = text.match(/```json\s*([\s\S]*?)\s*```/);
            if (match) {
              const jsonContent = match[1];
              data = JSON.parse(jsonContent);
            }

            Object.entries(data).forEach(([key, value]) => {
              if (key === "recommendations") return;

              const card = document.createElement("div");
              card.className = "card";

              const title = document.createElement("h2");
              title.textContent = key.replace(/_/g, " ").toUpperCase();
              card.appendChild(title);

              const status = document.createElement("p");
              status.className = "status";
              status.textContent = value.present
                ? "⚠️ Issue Detected"
                : "✅ No Issue";
              card.appendChild(status);

              const desc = document.createElement("p");
              desc.textContent = value.description;
              card.appendChild(desc);

              const severity = document.createElement("p");
              severity.className = "severity";
              severity.textContent = `Severity Level: ${value.severity}`;
              card.appendChild(severity);

              container.appendChild(card);
            });

            recommendation.textContent = `💡 Recommendation: ${data.recommendations}`;

            // Remove overlay
            chrome.scripting.executeScript({
              target: { tabId },
              func: () => {
                const overlay = document.getElementById('copilot-extension-overlay');
                if (overlay) overlay.remove();
              },
            });
          });
      }
    );
  });
});