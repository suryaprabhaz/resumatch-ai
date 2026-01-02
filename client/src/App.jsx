import React, { useState } from 'react';
import { analyzeResume } from './services/api';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a resume");
    
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDesc);

    try {
      const data = await analyzeResume(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className="p-4 bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          ResuMatch AI
        </h1>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </nav>

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-gray-500 dark:text-gray-300">
                {file ? (
                  <p className="font-semibold text-primary">{file.name}</p>
                ) : (
                  <>
                    <p className="text-xl mb-2">Drop your Resume (PDF) here</p>
                    <p className="text-sm">or click to browse</p>
                  </>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paste Job Description
              </label>
              <textarea
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all h-32"
                placeholder="Paste the job description here for AI comparison..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform transform active:scale-95 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary to-purple-600 hover:shadow-xl'
              }`}
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && result.success && (
          <ResultsDashboard data={result.data} preview={result.resume_preview} />
        )}
      </main>
      <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} ResuMatch AI. Developed by <span className="font-semibold text-primary">Penumarthi Phanindra Surya Prabhas</span>.
        </p>
      </footer>
    </div>
  );
}

export default App;