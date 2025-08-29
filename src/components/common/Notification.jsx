import React, { useEffect } from 'react';

export const Notification = ({ message, type, onDismiss }) => {
  if (!message) return null;

  const base = "fixed top-20 right-5 p-4 rounded-lg shadow-lg text-white z-50 transition-opacity duration-300";
  const tone = { success: "bg-green-500", error: "bg-red-500", info: "bg-blue-500" };

  useEffect(() => {
    const t = setTimeout(() => onDismiss(), 3000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  return (
    <div className={`${base} ${tone[type] || tone.info}`}>
      {message}
      <button onClick={onDismiss} className="ml-4 font-bold">X</button>
    </div>
  );
};
