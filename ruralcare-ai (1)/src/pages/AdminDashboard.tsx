import { useState, useEffect } from 'react';
import { Activity, Bed, Users, AlertTriangle, ArrowRight, Clock, Building2 } from 'lucide-react';

export default function AdminDashboard() {
  const [hospitalName, setHospitalName] = useState<string>('Loading...');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('/api/hospitals');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setHospitalName(data[0].name);
        } else {
          setHospitalName('City General Hospital');
        }
      } catch (error) {
        console.error('Failed to fetch hospitals', error);
        setHospitalName('City General Hospital');
      }
    };
    fetchHospitals();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{hospitalName}</h1>
        </div>
        <p className="text-slate-600 mt-2">Admin Dashboard • Real-time resource management and workflow automation.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Beds Occupied</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">85%</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg"><Bed className="w-5 h-5 text-blue-600" /></div>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">ICU Capacity</p>
              <h3 className="text-3xl font-black text-red-600 mt-1">92%</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg"><Activity className="w-5 h-5 text-red-600" /></div>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-red-600 h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Doctors on Duty</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">24</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg"><Users className="w-5 h-5 text-emerald-600" /></div>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-4">+3 from last shift</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">ER Wait Time</p>
              <h3 className="text-3xl font-black text-orange-600 mt-1">45m</h3>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg"><Clock className="w-5 h-5 text-orange-600" /></div>
          </div>
          <p className="text-xs text-orange-600 font-medium mt-4">Above average</p>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold">AI Workflow Optimization</h2>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <p className="text-lg font-medium text-white mb-2">Bed occupancy predicted to reach 95% in 4 hours.</p>
            <p className="text-slate-300 mb-6">Based on current admission rates and predictive models, the ICU and General wards will be at critical capacity soon.</p>
            
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">Recommended Actions</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">1</div>
                  Transfer 5 non-critical patients to Apollo Medical Center (4.1 km away).
                  <button className="ml-auto text-emerald-400 hover:text-emerald-300 font-medium">Execute</button>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">2</div>
                  Call in 2 standby nurses for the ER triage desk.
                  <button className="ml-auto text-emerald-400 hover:text-emerald-300 font-medium">Execute</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
