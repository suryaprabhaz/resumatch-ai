import React from 'react';
import ScoreGauge from './ScoreGauge';

const ResultsDashboard = ({ data, preview }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
      {/* Score Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center col-span-1 border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Match Score</h3>
        <ScoreGauge score={data.score} />
      </div>

      {/* Analysis Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg col-span-1 md:col-span-2 border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">AI Insights</h3>
        <ul className="space-y-2 mb-6">
            {data.feedback.map((item, idx) => (
                <li key={idx} className="flex items-start">
                    <span className="mr-2 mt-1 text-primary">💡</span>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
            ))}
        </ul>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h4 className="font-medium text-green-600 mb-2">Matched Skills</h4>
                <div className="flex flex-wrap gap-2">
                    {data.matching_skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-medium text-red-500 mb-2">Missing Skills</h4>
                <div className="flex flex-wrap gap-2">
                    {data.missing_skills.length > 0 ? (
                        data.missing_skills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">None!</span>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;