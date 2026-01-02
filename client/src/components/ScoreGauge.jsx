import React from 'react';

const ScoreGauge = ({ score }) => {
  // Color logic based on score
  const getColor = () => {
    if (score >= 80) return 'text-green-500 stroke-green-500';
    if (score >= 50) return 'text-yellow-500 stroke-yellow-500';
    return 'text-red-500 stroke-red-500';
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-1000 ease-out ${getColor()}`}
        />
      </svg>
      <span className={`absolute text-3xl font-bold ${getColor().split(' ')[0]}`}>
        {score}%
      </span>
    </div>
  );
};

export default ScoreGauge;