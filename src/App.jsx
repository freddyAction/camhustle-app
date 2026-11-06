import React, { useState } from 'react';
import { 
  Search, Briefcase, UserCheck, Users, MessageSquare, 
  MapPin, Star, Award, ShieldCheck, X, Send, Sparkles, PlusCircle 
} from 'lucide-react';

// --- DATA MOCKS ---
const REGIONS_OF_CAMEROON = [
  'Adamawa', 'Center', 'East', 'Far North', 
  'Littoral', 'North', 'Northwest', 'South', 'Southwest', 'West'
];

const INITIAL_JOBS = [
  { id: 1, title: 'Solar Panel Technician', category: 'Energy', region: 'Littoral', city: 'Douala', budget: '150,000 FCFA', type: 'Contract', posted: '2 days ago' },
  { id: 2, title: 'CCTV & Security Installer', category: 'Tech/Security', region: 'Center', city: 'Yaoundé', budget: '80,000 FCFA', type: 'One-time', posted: '1 day ago' },
  { id: 3, title: 'Commercial AC Repairer', category: 'HVAC', region: 'Southwest', city: 'Buea', budget: '45,000 FCFA', type: 'One-time', posted: '3 hours ago' },
  { id: 4, title: 'Automobile Electrician', category: 'Automotive', region: 'West', city: 'Bafoussam', budget: '60,000 FCFA', type: 'Per Project', posted: 'Just now' }
];

const INITIAL_TALENTS = [
  { id: 1, name: 'Jean-Pierre Nguemo', skill: 'Electrical Engineer & AC Repair', region: 'Littoral', level: 'Specialist', exp: '8 yrs', rate: '25,000 FCFA/day', rating: 4.9, certified: true },
  { id: 2, name: 'Amina Bello', skill: 'Mobile Phone & Laptop Repair', region: 'Northwest', level: 'Intermediate', exp: '4 yrs', rate: '15,000 FCFA/day', rating: 4.7, certified: true },
  { id: 3, name: 'Emmanuel Talla', skill: 'Plumber & Pipe Fitter', region: 'Center', level: 'Specialist', exp: '10 yrs', rate: '30,000 FCFA/day', rating: 5.0, certified: false }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Bonjour! I am your CamHustle AI Assistant. Looking for career advice or tips on setting your tech rates in Cameroon?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Form State for Technician Registration
  const [formData, setFormData] = useState({
    name: '', skill: '', region: 'Center', level: 'Beginner', 
    experience: '', education: '', certification: '', bio: '', price: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted successfully! Your profile will be reviewed.');
    setFormData({ name: '', skill: '', region: 'Center', level: 'Beginner', experience: '', education: '', certification: '', bio: '', price: '' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user', text: inputMessage }];
    setChatMessages(newMessages);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      setChatMessages([
        ...newMessages,
        { 
          sender: 'ai', 
          text: `Great question! To boost your hustle in the ${formData.region || 'local'} market, ensure your certifications are highlighted and start with competitive pricing to build your initial rating.` 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-9 h-9 rounded-lg bg-[#007a3d] flex items-center justify-center font-bold text-yellow-400 text-xl shadow">
                C<span className="text-[#ce1126]">H</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Cam<span className="text-[#007a3d]">Hustle</span>
              </span>
            </div>

            <nav className="hidden md:flex space-x-1">
              {[
                { id: 'home', label: 'Home', icon: Search },
                { id: 'hustles', label: 'Hustle Board', icon: Briefcase },
                { id: 'talents', label: 'Find Talent', icon: Users },
                { id: 'register', label: 'Become a Tech', icon: UserCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      isActive 
                        ? 'bg-[#007a3d]/10 text-[#007a3d]' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <button 
              onClick={() => setActiveTab('register')}
              className="bg-[#007a3d] hover:bg-[#006030] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition"
            >
              Post a Hustle
            </button>
          </div>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <main className="flex-grow">
        {/* HERO / HOME TAB */}
        {activeTab === 'home' && (
          <div>
            <section className="bg-gradient-to-br from-slate-900 via-[#007a3d]/90 to-slate-900 text-white py-20 px-4 text-center relative overflow-hidden">
              <div className="max-w-4xl mx-auto relative z-10">
                <span className="bg-[#fcd116] text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  Cameroon's #1 Skilled Trades Marketplace
                </span>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  Find Verified Technicians & Local Hustles Fast.
                </h1>
                <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto">
                  Connecting skilled artisans, mechanics, electricians, and technicians across all 10 regions of Cameroon with top local gigs.
                </p>

                {/* SEARCH BAR */}
                <div className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto text-slate-800">
                  <div className="flex-1 flex items-center px-3 border-b md:border-b-0 md:border-r border-slate-200 py-2">
                    <Search className="w-5 h-5 text-slate-400 mr-2" />
                    <input 
                      type="text" 
                      placeholder="e.g., Solar installer, Plumber..." 
                      className="w-full outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
                    <MapPin className="w-5 h-5 text-[#ce1126] mr-2" />
                    <select className="bg-transparent outline-none text-sm w-full">
                      <option value="">All 10 Regions</option>
                      {REGIONS_OF_CAMEROON.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <button 
                    onClick={() => setActiveTab('hustles')}
                    className="bg-[#ce1126] hover:bg-[#a50d1e] text-white px-8 py-3 rounded-lg font-bold transition flex items-center justify-center"
                  >
                    Search Gigs
                  </button>
                </div>
              </div>
            </section>

            {/* QUICK STATS */}
            <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: 'Active Technicians', value: '2,500+' },
                { label: 'Completed Hustles', value: '10,000+' },
                { label: 'Regions Covered', value: '10 / 10' },
                { label: 'Average Satisfaction', value: '4.8 ★' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-3xl font-black text-[#007a3d]">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* HUSTLE BOARD */}
        {activeTab === 'hustles' && (
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Latest Open Hustles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {INITIAL_JOBS.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-bold text-[#007a3d] bg-emerald-50 px-2.5 py-1 rounded-md uppercase">
                        {job.category}
                      </span>
                      <h3 className="text-xl font-bold mt-2">{job.title}</h3>
                    </div>
                    <span className="text-lg font-black text-[#ce1126]">{job.budget}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 space-x-4 mb-4">
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400" />{job.city}, {job.region}</span>
                    <span>•</span>
                    <span>{job.posted}</span>
                  </div>
                  <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg transition text-sm">
                    Apply for Hustle
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FIND TALENT DIRECTORY */}
        {activeTab === 'talents' && (
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Verified Local Technicians</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {INITIAL_TALENTS.map((talent) => (
                <div key={talent.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#007a3d]/20 text-[#007a3d] flex items-center justify-center font-bold text-lg">
                        {talent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <h3 className="font-bold text-slate-900">{talent.name}</h3>
                          {talent.certified && <ShieldCheck className="w-4 h-4 text-[#007a3d]" />}
                        </div>
                        <span className="text-xs text-slate-500">{talent.region} Region</span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 mb-2">{talent.skill}</div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mb-4">
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">{talent.level}</span>
                      <span>•</span>
                      <span>{talent.exp} experience</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Starting from</div>
                      <div className="font-bold text-[#007a3d] text-sm">{talent.rate}</div>
                    </div>
                    <button className="bg-[#007a3d] hover:bg-[#006030] text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                      Hire Tech
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TECHNICIAN REGISTRATION FORM */}
        {activeTab === 'register' && (
          <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-2 text-slate-900">Technician Registration</h2>
              <p className="text-slate-500 text-sm mb-6">Create your profile to start receiving work requests across Cameroon.</p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
                    <input 
                      required type="text" 
                      placeholder="e.g. Samuel Eto'o"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Primary Skill / Trade</label>
                    <input 
                      required type="text" 
                      placeholder="e.g. Solar Installer, Auto Mechanic"
                      value={formData.skill}
                      onChange={(e) => setFormData({...formData, skill: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Region</label>
                    <select 
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm bg-white"
                    >
                      {REGIONS_OF_CAMEROON.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Level</label>
                    <select 
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Specialist">Specialist</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Years of Experience</label>
                    <input 
                      required type="text" 
                      placeholder="e.g. 5 Years"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Education</label>
                    <input 
                      type="text" 
                      placeholder="e.g. CAP / BT / HND / Self-Taught"
                      value={formData.education}
                      onChange={(e) => setFormData({...formData, education: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Certification (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Certified Fiber Optic Tech"
                      value={formData.certification}
                      onChange={(e) => setFormData({...formData, certification: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Estimated Starting Price (FCFA)</label>
                  <input 
                    required type="number" 
                    placeholder="e.g. 15000"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Short Bio</label>
                  <textarea 
                    rows={3} 
                    placeholder="Briefly describe your expertise and services..."
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#007a3d] text-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#007a3d] hover:bg-[#006030] text-white font-bold py-3 rounded-xl transition shadow-md"
                >
                  Register Profile
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* --- FLOATING AI CHATBOT BUTTON & WINDOW --- */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-[#ce1126] hover:bg-[#a50d1e] text-white p-4 rounded-full shadow-2xl flex items-center space-x-2 transition transform hover:scale-105"
          >
            <Sparkles className="w-6 h-6 text-[#fcd116]" />
            <span className="font-bold text-sm hidden md:inline">Career Advisor</span>
          </button>
        ) : (
          <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px]">
            {/* Chat Header */}
            <div className="bg-[#007a3d] text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#fcd116]" />
                <span className="font-bold text-sm">CamHustle Career AI</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:opacity-75">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-xl px-3.5 py-2 text-xs font-medium ${
                      msg.sender === 'user' 
                        ? 'bg-[#007a3d] text-white' 
                        : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex space-x-2">
              <input 
                type="text" 
                placeholder="Ask career advice..." 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#007a3d]"
              />
              <button type="submit" className="bg-[#007a3d] text-white p-2 rounded-lg hover:bg-[#006030]">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs border-t border-slate-800">
        <p>© 2026 CamHustle. Empowering skilled talent across Cameroon.</p>
      </footer>
    </div>
  );
}
