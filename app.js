document.addEventListener("DOMContentLoaded", () => {
  const iconsContainer = document.getElementById("icons");
  const startMenu = document.getElementById("start-menu");
  const clock = document.getElementById("clock");

  // Zegar na pasku zadań
  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }, 1000);

  // Przełączanie widoczności menu start
  window.toggleStartMenu = () => {
    startMenu.classList.toggle("hidden");
  };

  // Otwieranie aplikacji
  window.openApp = (appId) => {
    const appWindow = document.getElementById(appId);
    if (appWindow) {
      appWindow.classList.remove("hidden");
    }
  };

  // Zamknięcie aplikacji
  window.closeApp = (appId) => {
    const appWindow = document.getElementById(appId);
    if (appWindow) {
      appWindow.classList.add("hidden");
    }
  };

  // Instalacja aplikacji z pliku HTML
  window.installAppFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const appName = file.name.replace(".html", "");
        createAppIcon(appName, reader.result, true);
      };
      reader.readAsText(file);
    }
  };

  // Instalacja aplikacji z URL
  window.installAppFromUrl = () => {
    const appUrl = document.getElementById("app-url").value.trim();
    if (appUrl) {
      const appName = appUrl.split("/").pop().split(".")[0] || "Aplikacja";
      createAppIcon(appName, appUrl, false);
    }
  };

  // Tworzenie ikony aplikacji na pulpicie
  function createAppIcon(appName, appContent, isLocal) {
    const icon = document.createElement("div");
    icon.classList.add("icon");
    icon.innerHTML = `
      <img src="icons/default-icon.png" alt="${appName}">
      <p>${appName}</p>
    `;
    iconsContainer.appendChild(icon);

    const iframe = document.createElement("iframe");
    iframe.src = isLocal ? "data:text/html;charset=utf-8," + encodeURIComponent(appContent) : appContent;
    iframe.classList.add("window");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
