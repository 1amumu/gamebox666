(() => {
  function updateCurrentTime() {
    const el = document.querySelector("[data-current-time]");
    if (!el) return;
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    el.textContent = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
})();
