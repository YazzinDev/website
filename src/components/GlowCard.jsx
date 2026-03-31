import React from 'react';

const GlowCard = ({ title, description, icon, glowColor, accentColor = "primary", className = "" }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const accentClasses = {
    primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
    secondary: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-on-secondary",
    tertiary: "bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary"
  };

  return (
    <div
      className={`glow-card bg-surface-container-low p-10 flex flex-col items-center text-center group gradient-border rounded-2xl transition-colors duration-300 hover:bg-surface-container-highest ${className}`}
      style={{ '--glow-color': glowColor }}
      onMouseMove={handleMouseMove}
    >
      <div className="shine-sweep"></div>

      {icon && (
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${accentClasses[accentColor]}`}>
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
      )}

      <h4 className="font-headline text-2xl font-bold mb-4 text-on-surface">{title}</h4>

      <div className="font-body text-base text-on-surface/70 leading-relaxed">
        {description}
      </div>
    </div>
  );
};

export default GlowCard;
