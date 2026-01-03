
import React, { useState, useEffect, useRef } from 'react';
import {
    Search, ChevronDown, Check, X, MapPin,
    Briefcase, DollarSign, Filter, Sparkles,
    Cpu, Zap, Globe, Layers, Command,
    MoreHorizontal, ArrowRight, Shield, Rocket,
    Target, Layout, Play, Clock
} from 'lucide-react';
import { JOB_DOMAINS } from '../constants';

// --- 1. THE BENTO-GRID MULTI-SELECT ---
const BentoMultiSelect = ({ label, options, selected, onToggle, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className="relative w-full" ref={containerRef}>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-3 tracking-[0.2em]">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`min-h-[64px] p-3 rounded-3xl border-2 transition-all cursor-pointer flex flex-wrap gap-2 items-center
                    ${isOpen ? 'bg-white dark:bg-gray-800 border-indigo-500 shadow-xl' : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800'}`}
            >
                {selected.length === 0 ? (
                    <span className="text-gray-400 text-sm font-bold ml-2">Fuse your skills...</span>
                ) : (
                    selected.map(item => (
                        <span key={item} className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 animate-in zoom-in duration-300">
                            {item}
                            <X className="w-3 h-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); onToggle(item); }} />
                        </span>
                    ))
                )}
                <div className="ml-auto pr-2">
                    <ChevronDown className={`w-5 h-5 text-indigo-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-4 w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 p-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                        {options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => onToggle(opt)}
                                className={`p-4 rounded-2xl text-left text-xs font-black transition-all border-2
                                    ${selected.includes(opt)
                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-600'
                                        : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-500 hover:border-gray-200'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 2. THE CYBER-NEON DROPDOWN ---
const CyberNeonDropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-widest">{label}</label>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-16 bg-black border-b-2 border-blue-500/30 hover:border-blue-500 flex items-center justify-between px-6 transition-all group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
                    <span className="text-white font-black text-sm uppercase tracking-tighter">{value || "Initialize Module"}</span>
                </div>
                <Zap className={`w-4 h-4 text-blue-500 transition-all ${isOpen ? 'scale-125 opacity-100' : 'opacity-40'}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 w-full bg-black border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.1)] py-2 animate-in fade-in slide-in-from-top-1">
                    {options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            className="w-full text-left px-8 py-4 text-[10px] font-black text-gray-400 hover:text-white hover:bg-blue-500/10 transition-all flex items-center justify-between group"
                        >
                            <span className="tracking-[0.2em]">{opt}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- 3. THE VISUAL CARD DROPDOWN ---
const VisualCardDropdown = ({ label, options, value, onChange, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">{label}</label>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">{value || "Select Tier"}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">Dynamic Ranking Active</p>
                    </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-300" />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-4 w-[120%] -left-[10%] bg-white dark:bg-gray-900 rounded-[3rem] shadow-[0_32px_80px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-gray-800 p-4 grid grid-cols-1 gap-2 animate-in zoom-in-95 duration-300">
                    {options.map((opt, i) => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            className={`p-6 rounded-[1.8rem] text-left transition-all flex items-center justify-between group
                                ${value === opt ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'}`}
                        >
                            <div>
                                <h4 className={`text-sm font-black uppercase tracking-tighter ${value === opt ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{opt}</h4>
                                <p className={`text-[9px] font-bold uppercase mt-1 ${value === opt ? 'text-emerald-100' : 'text-gray-400'}`}>High Market Probability</p>
                            </div>
                            <div className={`p-2 rounded-xl transition-colors ${value === opt ? 'bg-white/20' : 'bg-white dark:bg-gray-700 shadow-sm'}`}>
                                <Check className={`w-4 h-4 ${value === opt ? 'text-white' : 'text-emerald-500 opacity-0 group-hover:opacity-100'}`} />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const TestInteractive = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedTier, setSelectedTier] = useState('');
    const [activeTheme, setActiveTheme] = useState('modern');

    const toggleSkill = (skill) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    return (
        <div className={`min-h-screen pt-40 pb-20 transition-all duration-700 overflow-x-hidden
            ${activeTheme === 'cyber' ? 'bg-black text-white' : 'bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white'}`}>

            <div className="max-w-6xl mx-auto px-4">

                {/* --- LAB HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="reveal active">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-blue-500 font-black uppercase text-[9px] tracking-widest mb-4">
                            <Layers className="w-3 h-3" /> UI Engineering Lab
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase">The <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Select</span> Lab</h1>
                    </div>

                    {/* Theme Toggler */}
                    <div className="flex bg-white dark:bg-gray-900 p-2 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 reveal active">
                        {['modern', 'cyber'].map(t => (
                            <button
                                key={t}
                                onClick={() => setActiveTheme(t)}
                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                                    ${activeTheme === t ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                                {t} Engine
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- DROPDOWN GRID --- */}
                <div className="grid lg:grid-cols-12 gap-8 mb-20">

                    {/* Left Column: Input Lab */}
                    <div className="lg:col-span-7 space-y-12 bg-white dark:bg-gray-900/50 p-10 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 reveal active shadow-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Placement Configurator</h2>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State-driven UI Showcase</p>
                            </div>
                        </div>

                        <BentoMultiSelect
                            label="Neural Skill Integration"
                            options={['React Native', 'AWS Cloud', 'Kubernetes', 'Python ML', 'TypeScript', 'Docker', 'PostgreSQL', 'Figma UI']}
                            selected={selectedSkills}
                            onToggle={toggleSkill}
                        />

                        <div className="grid md:grid-cols-2 gap-8">
                            <CyberNeonDropdown
                                label="HQ Geolocation"
                                options={['Mumbai North', 'Bangalore Tech Park', 'Hyderabad Corridor', 'Remote Global']}
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                            />

                            <VisualCardDropdown
                                label="Economic Tiering"
                                icon={DollarSign}
                                options={['Entry (3-6L)', 'Growth (7-15L)', 'Elite (16L+)', 'MNC Prodigy']}
                                value={selectedTier}
                                onChange={setSelectedTier}
                            />
                        </div>

                        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-emerald-500" />
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">All inputs synchronized with live API engine</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visualization */}
                    <div className="lg:col-span-5 bg-gray-950 rounded-[3.5rem] p-12 text-white relative overflow-hidden flex flex-col justify-between reveal active shadow-2xl shadow-blue-900/20">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Command className="w-64 h-64 text-blue-500 rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Live Result</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                </div>
                            </div>

                            <h3 className="text-4xl font-black uppercase tracking-tighter mb-10 leading-none">Strategy <br />Manifest</h3>

                            <div className="space-y-6">
                                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Cpu className="w-3 h-3" /> Fused Core
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSkills.length > 0 ? selectedSkills.map(s => (
                                            <span key={s} className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg">{s}</span>
                                        )) : <span className="text-xs italic text-gray-600 font-bold uppercase">Awaiting neural link...</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                                        <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-2">Location</p>
                                        <p className="text-sm font-bold truncate">{selectedLocation || "---"}</p>
                                    </div>
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                                        <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest mb-2">Tier</p>
                                        <p className="text-sm font-bold truncate">{selectedTier || "---"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            {selectedSkills.length > 0 && selectedLocation && selectedTier ? (
                                <button className="w-full py-6 bg-blue-600 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] animate-in slide-in-from-bottom-4">
                                    Execute Career Strategy
                                </button>
                            ) : (
                                <div className="w-full py-6 border-2 border-dashed border-white/10 rounded-[2rem] flex items-center justify-center gap-3 opacity-40">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Parameters</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- FOOTER CTA --- */}
                <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[4rem] p-16 text-center text-white reveal active">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">Ready for <span className="text-blue-400">Launch?</span></h2>
                    <p className="text-indigo-100 max-w-xl mx-auto mb-10 text-lg font-medium">Join 4,500+ partners who are looking for profiles configured exactly like yours.</p>
                    <a href="/register" className="inline-flex items-center gap-3 px-12 py-5 bg-white text-gray-900 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
                        Begin Real Registration <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
            `}</style>
        </div>
    );
};

export default TestInteractive;
