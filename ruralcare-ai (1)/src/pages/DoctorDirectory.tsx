import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, MapPin, Calendar, Phone, Mail, Award, X, CheckCircle2, Clock } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    designation: "Chief of Cardiology",
    specialization: "Cardiology",
    experience: "15+ years",
    rating: 4.9,
    reviews: 124,
    location: "City Care Hospital",
    image: "https://picsum.photos/seed/doctor1/200/200",
    availability: "Mon, Wed, Fri"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    designation: "Senior Consultant",
    specialization: "Neurology",
    experience: "12+ years",
    rating: 4.8,
    reviews: 98,
    location: "Apollo Medical Center",
    image: "https://picsum.photos/seed/doctor2/200/200",
    availability: "Tue, Thu, Sat"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    designation: "Attending Physician",
    specialization: "General Practice",
    experience: "8+ years",
    rating: 4.7,
    reviews: 156,
    location: "Government Hospital",
    image: "https://picsum.photos/seed/doctor3/200/200",
    availability: "Mon - Fri"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    designation: "Head of Orthopedics",
    specialization: "Orthopedics",
    experience: "20+ years",
    rating: 4.9,
    reviews: 210,
    location: "Apollo Medical Center",
    image: "https://picsum.photos/seed/doctor4/200/200",
    availability: "Mon, Tue, Thu"
  },
  {
    id: 5,
    name: "Dr. Aisha Patel",
    designation: "Pediatric Specialist",
    specialization: "Pediatrics",
    experience: "10+ years",
    rating: 4.8,
    reviews: 142,
    location: "City Care Hospital",
    image: "https://picsum.photos/seed/doctor5/200/200",
    availability: "Wed, Fri, Sat"
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    designation: "Trauma Surgeon",
    specialization: "Trauma & Emergency",
    experience: "18+ years",
    rating: 4.9,
    reviews: 87,
    location: "Government Hospital",
    image: "https://picsum.photos/seed/doctor6/200/200",
    availability: "On Call 24/7"
  }
];

export default function DoctorDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [bookingDoctor, setBookingDoctor] = useState<typeof doctors[0] | null>(null);
  const [bookingStep, setBookingStep] = useState<'details' | 'success'>('details');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const specializations = ['All', ...Array.from(new Set(doctors.map(d => d.specialization)))];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || doc.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  const handleBookVisit = (doctor: typeof doctors[0]) => {
    setBookingDoctor(doctor);
    setBookingStep('details');
    setBookingDate('');
    setBookingTime('');
  };

  const confirmBooking = (e: FormEvent) => {
    e.preventDefault();
    setBookingStep('success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Recommended Physicians</h1>
        <p className="text-lg text-slate-600">
          Find and book appointments with top-rated specialists and healthcare professionals in your area.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {specializations.map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedSpec === spec 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                  <p className="text-emerald-600 font-medium text-sm mb-1">{doctor.specialization}</p>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{doctor.designation}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium text-slate-900">{doctor.rating}</span>
                  <span className="text-xs">({doctor.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{doctor.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{doctor.availability}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleBookVisit(doctor)}
                  className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                >
                  Book Visit
                </button>
                <button className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {bookingStep === 'details' ? (
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Book Appointment</h2>
                      <p className="text-slate-500">With {bookingDoctor.name}</p>
                    </div>
                    <button 
                      onClick={() => setBookingDoctor(null)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-slate-400" />
                    </button>
                  </div>

                  <form onSubmit={confirmBooking} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        Select Date
                      </label>
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        Select Time
                      </label>
                      <select 
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      >
                        <option value="">Choose a slot</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="03:30 PM">03:30 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                      </select>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">{bookingDoctor.location}</span>
                      </div>
                      <p className="text-xs text-slate-500">Please arrive 15 minutes before your scheduled appointment time.</p>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-slate-600 mb-8">
                    Your appointment with <span className="font-bold text-slate-900">{bookingDoctor.name}</span> has been scheduled for <span className="font-bold text-slate-900">{bookingDate}</span> at <span className="font-bold text-slate-900">{bookingTime}</span>.
                  </p>
                  <button 
                    onClick={() => setBookingDoctor(null)}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No physicians found matching your criteria.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedSpec('All'); }}
            className="mt-4 text-emerald-600 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
