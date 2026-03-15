import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, Users, Bed, ArrowRight, Car } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function HospitalRecommendation() {
  const location = useLocation();
  const triageLevel = location.state?.triage || 'Routine';
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [navigatingTo, setNavigatingTo] = useState<any | null>(null);
  const [directions, setDirections] = useState<string[]>([]);

  const generateRandomDirections = () => {
    const streets = ['Main St', 'Oak Ave', 'Pine Ln', 'Maple Dr', 'Cedar Blvd', 'Elm St', 'Washington Rd'];
    const actions = ['Turn left onto', 'Turn right onto', 'Continue straight on', 'Merge onto'];
    const steps = [];
    const numSteps = Math.floor(Math.random() * 4) + 3; // 3 to 6 steps
    
    for (let i = 0; i < numSteps; i++) {
      const action = actions[Math.floor(Math.random() * actions.length)];
      const street = streets[Math.floor(Math.random() * streets.length)];
      const distance = (Math.random() * 2 + 0.1).toFixed(1);
      steps.push(`${action} ${street} and continue for ${distance} miles.`);
    }
    steps.push('You will arrive at your destination.');
    return steps;
  };

  const handleNavigate = (hospital: any) => {
    setNavigatingTo(hospital);
    setDirections(generateRandomDirections());
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('/api/hospitals');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort by distance or beds (mocking logic here)
        setHospitals(data);
      } catch (error) {
        console.error('Failed to fetch hospitals', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hospital Recommendations</h1>
          <p className="text-slate-600 mt-2">Based on your location and condition severity.</p>
        </div>
        {triageLevel && (
          <div className="text-right">
            <span className="text-sm font-medium text-slate-500 block mb-1">Current Triage Level</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
              triageLevel.toLowerCase() === 'emergency' ? 'bg-red-100 text-red-800 border-red-200' :
              triageLevel.toLowerCase() === 'urgent' ? 'bg-orange-100 text-orange-800 border-orange-200' :
              'bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}>
              {triageLevel}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hospital List */}
        <div className="lg:col-span-1 space-y-4">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
          ) : (
            hospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-5 rounded-2xl border ${index === 0 ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-slate-200 bg-white shadow-sm'}`}
              >
                {index === 0 && (
                  <span className="inline-block px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                    Best Match
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{hospital.name}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {hospital.location} • {hospital.distance ? hospital.distance.toFixed(1) : (Math.random() * 5 + 1).toFixed(1)} km away
                </p>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Bed className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{hospital.availableBeds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium">{hospital.doctorsAvailable} Doctors</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <button 
                    onClick={() => handleNavigate(hospital)}
                    className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" /> Navigate
                  </button>
                  <button className="p-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Map View (Mock) */}
        <div className="lg:col-span-2 bg-slate-200 rounded-3xl border border-slate-300 overflow-hidden relative min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'url("https://picsum.photos/seed/map/1200/800?blur=2")', backgroundSize: 'cover' }}></div>
          
          <AnimatePresence mode="wait">
            {!navigatingTo ? (
              <motion.div 
                key="default-map"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center max-w-sm"
              >
                <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Live Map View</h3>
                <p className="text-slate-600 text-sm">Select a hospital and click Navigate to see routing information.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="navigation-map"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative z-10 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md m-4 flex flex-col max-h-[90%]"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Routing to</h3>
                    <p className="text-emerald-600 font-semibold">{navigatingTo.name}</p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                    <Car className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-sm">
                  <div className="text-center">
                    <span className="block text-slate-500 font-medium mb-1">Est. Time</span>
                    <span className="text-lg font-bold text-slate-900">{Math.floor(Math.random() * 15) + 5} mins</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-slate-500 font-medium mb-1">Distance</span>
                    <span className="text-lg font-bold text-slate-900">{(Math.random() * 5 + 1).toFixed(1)} mi</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-slate-500 font-medium mb-1">Traffic</span>
                    <span className="text-lg font-bold text-orange-500">Moderate</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">Turn-by-turn Directions</h4>
                  {directions.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-sm text-slate-700">
                      <div className="mt-0.5">
                        {idx === directions.length - 1 ? (
                          <MapPin className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <ArrowRight className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setNavigatingTo(null)}
                  className="mt-6 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                >
                  Cancel Navigation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
