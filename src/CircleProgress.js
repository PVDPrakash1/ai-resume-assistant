import { useEffect, useRef } from "react";
import "./CircleProgress.css";

const CircleProgress = ({ percent = 0, size = 120, stroke = 10 }) => {
  const circleRef = useRef(null);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const offset = circumference - (percent / 100) * circumference;
    circleRef.current.style.strokeDashoffset = offset;
  }, [percent, circumference]);

  return (
    <div className="progress-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="progress-bg"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          ref={circleRef}
          className="progress-ring"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
          }}
        />
      </svg>

      <div className="progress-text">{percent}%</div>
    </div>
  );
};

export default CircleProgress;