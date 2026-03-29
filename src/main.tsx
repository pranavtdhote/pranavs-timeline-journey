import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global keyboard shortcuts: R = download resume, T = scroll to top
window.addEventListener("keydown", (e) => {
  const activeTag = (document.activeElement?.tagName || "").toLowerCase();
  if (activeTag === "input" || activeTag === "textarea") return;
  if (e.key.toLowerCase() === "r") {
    e.preventDefault();
    window.open("/Pranav_Dhote_Resume.pdf", "_blank");
  }
  if (e.key.toLowerCase() === "t") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

createRoot(document.getElementById("root")!).render(<App />);
