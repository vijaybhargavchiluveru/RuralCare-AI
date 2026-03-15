import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Thermometer, Heart, Droplets, AlertTriangle, ArrowRight, CheckCircle2, Stethoscope, ListChecks } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function PatientPortal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [vitals, setVitals] = useState({
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    oxygenLevel: ''
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const prompt = `
        Act as an expert AI medical diagnostic system.
        Analyze the following patient data:
        Symptoms: ${symptoms}
        Vitals: ${JSON.stringify(vitals)}
        
        Provide a diagnosis, triage level, risk score, and explanation.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              possibleCondition: { type: Type.STRING, description: "The most likely medical condition" },
              confidence: { type: Type.NUMBER, description: "Confidence percentage (0-100)" },
              keySymptomsTriggered: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key symptoms that led to this diagnosis" },
              triageLevel: { type: Type.STRING, description: "One of: Emergency, Urgent, Routine" },
              riskScore: { type: Type.NUMBER, description: "Health risk score (0-100)" },
              healthRiskCategory: { type: Type.STRING, description: "One of: Low, Medium, High, Critical" },
              explanation: { type: Type.STRING, description: "Brief explanation of the reasoning (Explainable AI)" },
              recommendedSpecialist: { type: Type.STRING, description: "The recommended medical specialist (e.g., Cardiologist, General Physician)" },
              nextSteps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3 actionable next steps for the patient" }
            },
            required: ["possibleCondition", "confidence", "keySymptomsTriggered", "triageLevel", "riskScore", "healthRiskCategory", "explanation", "recommendedSpecialist", "nextSteps"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      setResult(data);
    } catch (error: any) {
      console.error('Failed to get diagnosis', error);
      setError(error.message || 'Failed to generate diagnosis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTriageColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Patient Portal</h1>
        <p className="text-slate-600 mt-2">Enter your symptoms and vitals for an AI-powered preliminary diagnosis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Describe your symptoms</label>
              <textarea
                required
                rows={4}
                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border"
                placeholder="E.g., I have had a high fever and chest pain for 2 days..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-500" /> Temp (°F)
                </label>
                <input
                  type="number"
                  className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border"
                  placeholder="98.6"
                  value={vitals.temperature}
                  onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" /> Heart Rate
                </label>
                <input
                  type="number"
                  className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border"
                  placeholder="72"
                  value={vitals.heartRate}
                  onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" /> BP
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border"
                  placeholder="120/80"
                  value={vitals.bloodPressure}
                  onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-500" /> SpO2 (%)
                </label>
                <input
                  type="number"
                  className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border"
                  placeholder="98"
                  value={vitals.oxygenLevel}
                  onChange={(e) => setVitals({...vitals, oxygenLevel: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !symptoms}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col">
          {!result && !loading && !error && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <Activity className="w-16 h-16 mb-4 opacity-20" />
              <p>Submit your symptoms to see the AI analysis</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-red-500">
              <AlertTriangle className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-medium text-center">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-emerald-600">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
              <p className="animate-pulse font-medium">AI is analyzing your health data...</p>
            </div>
          )}

          {result && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">AI Diagnosis Report</h3>
                  <p className="text-sm text-slate-500">Generated instantly</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getTriageColor(result.triageLevel)}`}>
                  {result.triageLevel}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-500">Possible Condition</span>
                  <span className="text-sm font-bold text-emerald-600">{result.confidence}% Match</span>
                </div>
                <p className="text-xl font-bold text-slate-900">{result.possibleCondition}</p>
                
                {result.keySymptomsTriggered && result.keySymptomsTriggered.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.keySymptomsTriggered.map((sym: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium border border-slate-200">
                        {sym}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <span className="block text-xs font-medium text-slate-500 mb-1">Risk Score</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900">{result.riskScore}</span>
                    <span className="text-sm font-medium text-slate-500 mb-1">/100</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <span className="block text-xs font-medium text-slate-500 mb-1">Risk Category</span>
                  <span className="text-lg font-bold text-slate-900">{result.healthRiskCategory}</span>
                </div>
              </div>

              {result.recommendedSpecialist && (
                <div 
                  onClick={() => navigate('/physicians')}
                  className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-indigo-100 transition-colors"
                >
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Stethoscope className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-indigo-600 mb-0.5">Recommended Specialist</span>
                    <span className="text-sm font-bold text-slate-900">{result.recommendedSpecialist}</span>
                  </div>
                </div>
              )}

              {result.nextSteps && result.nextSteps.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-slate-400" /> Recommended Next Steps
                  </h4>
                  <ul className="space-y-2">
                    {result.nextSteps.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-slate-400" /> Explainable AI Reasoning
                </h4>
                <p className="text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-100 leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              {(result.triageLevel?.toLowerCase() === 'emergency' || result.triageLevel?.toLowerCase() === 'urgent') && (
                <button
                  onClick={() => navigate('/hospitals', { state: { triage: result.triageLevel } })}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Find Nearest Hospital Now <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
