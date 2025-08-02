// kapow-fillout-only.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Kapow Fillout Script Loaded");

  const buttonSelector = ".lesson-footer__complete-button";
  const filloutSelector = 'iframe[src*="fillout"]';

  function hideButton() {
    const button = document.querySelector(buttonSelector);
    if (button) {
      button.style.display = "none";
      console.log("🔒 Button hidden");
    }
  }

  function showButton() {
    const button = document.querySelector(buttonSelector);
    if (button) {
      button.style.display = "block";
      console.log("🔓 Button shown");
    }
  }

  // Hide button on load
  hideButton();
  const interval = setInterval(hideButton, 500);

  // Detect Fillout iframe
  const observer = new MutationObserver(() => {
    const filloutIframe = document.querySelector(filloutSelector);

    if (filloutIframe) {
      console.log("🖼️ Fillout iframe detected");
      clearInterval(interval);

      // Listen for message from Fillout form
      window.addEventListener("message", (event) => {
        console.log("📩 Message received:", event.data);

        if (event.data?.type === "form_submit") {
          console.log("✅ Fillout form submitted → showing button");
          showButton();
        }
      });

      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
