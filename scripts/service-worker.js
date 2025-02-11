chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEND_TEXT_TO_BACKEND") {
    const {text} = message.payload;

    fetch("http://localhost:3000/api/user/resumes/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Response from backend:", data);
        sendResponse({ status: "success", data });
      })
      .catch((error) => {
        console.error("Error communicating with backend:", error);
        sendResponse({ status: "error", error: error.message });
      });

    // 비동기 응답을 위해 true 반환
    return true;
  }

  if (message.type === "SEND_RESUME_TO_BACKEND") {
    const jsonData = message.payload;

    fetch("http://localhost:3000/api/user/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Data from backend:", data);
        sendResponse({ status: "success", data });
      })
      .catch((error) => {
        console.error("Error communicating with backend:", error);
        sendResponse({ status: "error", error: error.message });
      });

    return true;
  }
})