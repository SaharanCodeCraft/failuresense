import React, { useState } from 'react';
import './App.css';

function App() {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    airTemp: '',
    processTemp: '',
    rotSpeed: '',
    torque: '',
    toolWear: '',
    machineType: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // Stores backend response

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null); // Clear previous results

    // Prepare data for backend
    // Keys match 'PredictRequest' class in Python
    const payload = {
      air_temp: parseFloat(formData.airTemp),
      process_temp: parseFloat(formData.processTemp),
      rotational_speed: parseInt(formData.rotSpeed),
      torque: parseFloat(formData.torque),
      tool_wear: parseInt(formData.toolWear),
      machine_type: formData.machineType
    };

    try {
      const API_URL = 'http://127.0.0.1:8000/predict';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Map backend response to our state
      setResult(data);

    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to connect to the maintenance server. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine CSS class for Risk Level color
  const getRiskClass = (level) => {
    if (!level) return 'LOW';
    const upperLevel = level.toString().toUpperCase();
    if (upperLevel.includes('HIGH')) return 'HIGH';
    if (upperLevel.includes('MEDIUM') || upperLevel.includes('MODERATE')) return 'MEDIUM';
    return 'LOW';
  };

  return (
    <div className="container">
      {/* --- HEADER --- */}
      <header>
        <div className="brand-wrapper">
          <div className="logo-container">
            {/* SVG Logo */}
            <svg className="logo-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 2L58 17V47L32 62L6 47V17L32 2Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M32 10L50 20V44L32 54L14 44V20L32 10Z" stroke="url(#paint0_linear)" strokeOpacity="0.3" strokeWidth="1"/>
              <polyline points="14 32 22 32 26 24 30 40 34 28 38 32 50 32" stroke="url(#paint1_linear)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="32" r="4" fill="#38bdf8" className="logo-sensor-node">
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <defs>
                <linearGradient id="paint0_linear" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8"/>
                  <stop offset="1" stopColor="#818cf8"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="14" y1="32" x2="50" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8"/>
                  <stop offset="1" stopColor="#fff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1>FailureSense</h1>
          <span className="subtitle">Industrial risk-aware maintenance intelligence system</span>
        </div>
      </header>

      <main>
        {/* --- INPUT SECTION --- */}
        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Machine Parameters</h2>
            <div className="status-indicator" style={{fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px'}}>
              <span style={{width: '6px', height: '6px', background: 'var(--risk-low)', borderRadius: '50%', display: 'inline-block'}}></span>
              System Ready
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-grid">
              <div className="form-group">
                <label>Air Temperature</label>
                <div className="input-wrapper">
                  <input 
                    type="number" 
                    name="airTemp" 
                    value={formData.airTemp} 
                    onChange={handleChange} 
                    placeholder="298.0" 
                    step="0.1" 
                    required 
                  />
                  <span className="unit">K</span>
                </div>
              </div>

              <div className="form-group">
                <label>Process Temperature</label>
                <div className="input-wrapper">
                  <input 
                    type="number" 
                    name="processTemp" 
                    value={formData.processTemp} 
                    onChange={handleChange} 
                    placeholder="308.0" 
                    step="0.1" 
                    required 
                  />
                  <span className="unit">K</span>
                </div>
              </div>

              <div className="form-group">
                <label>Rotational Speed</label>
                <div className="input-wrapper">
                  <input 
                    type="number" 
                    name="rotSpeed" 
                    value={formData.rotSpeed} 
                    onChange={handleChange} 
                    placeholder="1500" 
                    step="1" 
                    required 
                  />
                  <span className="unit">rpm</span>
                </div>
              </div>

              <div className="form-group">
                <label>Torque</label>
                <div className="input-wrapper">
                  <input 
                    type="number" 
                    name="torque" 
                    value={formData.torque} 
                    onChange={handleChange} 
                    placeholder="40.0" 
                    step="0.1" 
                    required 
                  />
                  <span className="unit">Nm</span>
                </div>
              </div>

              <div className="form-group">
                <label>Tool Wear</label>
                <div className="input-wrapper">
                  <input 
                    type="number" 
                    name="toolWear" 
                    value={formData.toolWear} 
                    onChange={handleChange} 
                    placeholder="0" 
                    step="1" 
                    required 
                  />
                  <span className="unit">min</span>
                </div>
              </div>

              <div className="form-group">
                <label>Machine Type</label>
                <div className="input-wrapper">
                  <select 
                    name="machineType" 
                    value={formData.machineType} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="" disabled>Select type</option>
                    <option value="L">L (Low Variance)</option>
                    <option value="M">M (Medium Variance)</option>
                    <option value="H">H (High Variance)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="action-area">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? <span>Analyzing Telemetry...</span> : <span>Analyze Machine</span>}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && <div style={{color: 'var(--risk-high)', marginTop: '1rem', textAlign: 'center'}}>{error}</div>}
        </section>

        {/* --- RESULT DASHBOARD (4 Metrics) --- */}
        {result && (
          <section className="card result-dashboard" style={{animation: 'fadeInDown 0.5s ease-out'}}>
            <div className="card-header">
              <h2 className="card-title">Analysis Result</h2>
            </div>
            
            {/* Top Row: Risk Level & Risk Score */}
            <div className="metric-row">
              {/* 1. Risk Level */}
              <div className="metric-card">
                <div className="metric-label">Risk Level</div>
                <div className={`risk-badge ${getRiskClass(result.risk_level)}`}>
                  {result.risk_level ? result.risk_level.toUpperCase() : 'UNKNOWN'}
                </div>
              </div>

              {/* 2. Risk Score (Normalized to Percentage) */}
              <div className="metric-card">
                <div className="metric-label">Failure Probability</div>
                <div className="metric-value-score">
                  {result.risk_score 
                    ? (parseFloat(result.risk_score) * 100).toFixed(2) + '%' 
                    : 'N/A'}
                </div>
              </div>
            </div>

            {/* Bottom Row: Explanation & Recommendation */}
            <div className="info-row">
              {/* 3. Explanation */}
              <div className="info-panel">
                <h3 className="info-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Explanation
                </h3>
                <div className="info-text">
                  {result.explanation}
                </div>
              </div>

              {/* 4. Recommendation */}
              <div className="info-panel">
                <h3 className="info-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                  Recommendation
                </h3>
                <div className="info-text">
                  {result.recommendation}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        &copy; 2023 FailureSense Industrial Systems. Version 2.0
      </footer>
    </div>
  );
}

export default App;