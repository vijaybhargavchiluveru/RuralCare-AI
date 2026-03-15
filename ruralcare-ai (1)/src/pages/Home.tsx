import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Stethoscope, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl"
            >
              Smart Remote Healthcare for <span className="text-emerald-600">Everyone</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-xl text-slate-600 leading-relaxed"
            >
              Bringing advanced AI diagnostics, predictive health monitoring, and intelligent hospital recommendations to rural and underserved communities.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/patient"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:shadow-md"
              >
                Emergency Health Check
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
              <Link
                to="/hospitals"
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all hover:shadow-md"
              >
                Find Nearest Hospital
              </Link>
              <Link
                to="/physicians"
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 text-base font-medium rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 shadow-sm transition-all hover:shadow-md"
              >
                Recommended Physicians
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Diagnostics</h3>
              <p className="text-slate-600">Enter your symptoms and vitals to receive an instant, AI-powered preliminary diagnosis and triage level.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Routing</h3>
              <p className="text-slate-600">Automatically find the best hospital based on your condition, bed availability, and distance.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Records</h3>
              <p className="text-slate-600">Your health data is encrypted and securely shared only with authorized healthcare professionals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
