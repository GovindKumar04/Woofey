import { useEffect } from "react";

// Reusable centered modal with a blurred backdrop.
// Closes on backdrop click or Escape key.
function Modal({ onClose, children }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // prevent background scroll while open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl animate-modalIn">
        {children}
      </div>
    </div>
  );
}

export default Modal;
