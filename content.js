chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyBearer") {
    let bearer =
      sessionStorage.getItem("bearer") || localStorage.getItem("bearer");
    if (bearer) {
      navigator.clipboard
        .writeText(bearer)
        .then(() => {
          displayMessage("Bearer copied!", "success");
        })
        .catch((err) => {
          console.error("Failed to copy bearer token: ", err);
          displayMessage("Failed to copy bearer token.", "error");
        });
    } else {
      displayMessage("Bearer token not found.", "warning");
    }
  }
});

function displayMessage(message, type) {
  const div = document.createElement("div");
  div.textContent = message;

  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.left = "50%";
  div.style.transform = "translate(-50%, -50%)";
  div.style.padding = "15px 30px";
  div.style.color = "white";
  div.style.borderRadius = "8px";
  div.style.zIndex = "9999";
  div.style.fontFamily = "Arial, sans-serif";
  div.style.fontSize = "16px";
  div.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  div.style.textAlign = "center";

  switch (type) {
    case "success":
      div.style.backgroundColor = "#4CAF50";
      break;
    case "error":
      div.style.backgroundColor = "#f44336";
      break;
    case "warning":
      div.style.backgroundColor = "#ff9800";
      break;
    default:
      div.style.backgroundColor = "#333";
  }

  document.body.appendChild(div);
  setTimeout(() => {
    document.body.removeChild(div);
  }, 3000);
}
