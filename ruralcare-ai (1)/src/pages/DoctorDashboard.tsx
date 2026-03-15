import { useState } from 'react';
import { Users, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockPatients = [
  { id: 'P-1029', name: 'Sarah Jenkins', age: 45, triage: 'Emergency', riskScore: 92, condition: 'Suspected Myocardial Infarction', waitTime: '2 mins' },
  { id: 'P-1030', name: 'Michael Chen', age: 28, triage: 'Urgent', riskScore: 75, condition: 'Severe Asthma Exacerbation', waitTime: '15 mins' },
  { id: 'P-1031', name: 'Emma Watson', age: 62, triage: 'Routine', riskScore: 34, condition: 'Mild Hypertension', waitTime: '45 mins' },
];

const riskData = [
  { time: '08:00', avgRisk: 45 },
  { time: '10:00', avgRisk: 52 },
  { time: '12:00', avgRisk: 68 },
  { time: '14:00', avgRisk: 61 },
  { time: '16:00', avgRisk: 75 },
  { time: '18:00', avgRisk: 58 },
];

export default function DoctorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Doctor Dashboard</h1>
        <p className="text-slate-600 mt-2">Real-time patient queue and predictive risk analytics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-500" /> Active Patient Queue
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">Live</span>
            </div>
            <div className="divide-y divide-slate-100">
              {mockPatients.map((patient) => (
                <div key={patient.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-bold text-slate-900">{patient.name}</h3>
                      <span className="text-sm text-slate-500">{patient.id} • {patient.age} yrs</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium">{patient.condition}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                        patient.triage === 'Emergency' ? 'bg-red-100 text-red-800' :
                        patient.triage === 'Urgent' ? 'bg-orange-100 text-orange-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {patient.triage}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                        <Clock className="w-3 h-3" /> Wait: {patient.waitTime}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-3xl font-black text-slate-900">{patient.riskScore}</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Score</div>
                    <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">Review Case &rarr;</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Predictive Risk Trend</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgRisk" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">Average patient risk score over the last 12 hours.</p>
          </div>

          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-orange-900">AI Alert</h3>
                <p className="text-sm text-orange-800 mt-1">High influx of respiratory cases predicted in the next 4 hours based on local weather and historical data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
