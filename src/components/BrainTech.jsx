// BrainTechMap.jsx
import React from "react";

const BrainTechMap = () => {
  const skills = [
    { label: "JavaScript", cx: 100, cy: 80 },
    { label: "React", cx: 200, cy: 60 },
    { label: "Node.js", cx: 80, cy: 150 },
    { label: "MongoDB", cx: 220, cy: 140 },
    { label: "Python", cx: 100, cy: 220 },
    { label: "AI/ML", cx: 200, cy: 220 },
    { label: "Docker", cx: 150, cy: 280 },
    { label: "Git", cx: 150, cy: 330 },
  ];

  return (
    <div className="w-full max-w-[420px] mx-auto px-4">
      <svg
        viewBox="0 0 320 380"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Brain outline path (simplified shape) */}
        <path
          d="M160,20 
             C80,20 40,100 80,180 
             C40,250 80,330 160,340 
             C240,330 280,250 240,180 
             C280,100 240,20 160,20 Z"
          fill="none"
          stroke="#999"
          strokeWidth="2"
        />

        {/* Skill bubbles */}
        {skills.map((skill, i) => (
          <g key={i}>
            <circle
              cx={skill.cx}
              cy={skill.cy}
              r="28"
              fill="#1e1e1e"
              stroke="#6c63ff"
              strokeWidth="2"
            />
            <text
              x={skill.cx}
              y={skill.cy + 4}
              textAnchor="middle"
              fontSize="10"
              fill="#ffffff"
              fontFamily="Arial, sans-serif"
            >
              {skill.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default BrainTechMap;
