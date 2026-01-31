if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("SW error", err));
  });
}
let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.createElement("button");
  btn.innerText = "📲 Install CivicFix App";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.padding = "12px 16px";
  btn.style.background = "#138808";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.zIndex = "9999";

  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    btn.remove();
    deferredPrompt.prompt();
  });
});
