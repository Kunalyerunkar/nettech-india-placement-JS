
import React, { useState, useEffect } from 'react';
import {
    CheckCircle, RefreshCcw, Send,
    Building2, Trophy, GraduationCap, TrendingUp as GraphIcon,
    Play, Download, Zap, Layout, ArrowRight
} from 'lucide-react';
import { JOB_DOMAINS } from '../constants';
import { Link } from 'react-router-dom';

const TestInteractive = () => {
    const [counts, setCounts] = useState({ students: 0, partners: 0, rate: 0, domains: 0 });
    const [regState, setRegState] = useState('idle');

    // --- NATIVE VIDEO ASSETS ---
    const VIDEO_GALLERY = [
        { id: 'v1', videoUrl: "/images/video/0_Presentation_Meeting_1080x1920.mp4", title: "Tech Innovation Lab", tag: "Skill Development", metrics: "500+ Hours Training" },
        { id: 'v2', videoUrl: "/images/video/1097610_Electronics_Circuit_1080x1920.mp4", title: "Candidate Success", tag: "Career Coaching", metrics: "98% Success Rate" },
        { id: 'v3', videoUrl: "/images/video/6918191_Motion_Graphics_Motion_Graphic_1080x1920.mp4", title: "Placement Drives", tag: "Industry Connect", metrics: "4500+ Partners" },
        { id: 'v4', videoUrl: "/images/video/7048907_Animation_Motion_Graphic_1080x1920.mp4", title: "Corporate Ready", tag: "Soft Skills", metrics: "MNC Standard" }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setCounts({
                students: 1250,
                partners: 4500,
                rate: 98,
                domains: JOB_DOMAINS.length
            });
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const Counter = ({ target, duration = 2000, suffix = "" }) => {
        const [count, setCount] = useState(0);
        useEffect(() => {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }, [target]);
        return <span>{count.toLocaleString()}{suffix}</span>;
    };

    const simulateSubmit = (e) => {
        e.preventDefault();
        setRegState('submitting');
        setTimeout(() => setRegState('success'), 2000);
    };

    const handleVideoHover = (e) => {
        const video = e.currentTarget.querySelector('video');
        if (video) video.play().catch(() => { });
    };

    const handleVideoLeave = (e) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen pt-40 pb-20 transition-colors duration-500 overflow-x-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- LAB STATUS BANNER --- */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] p-6 mb-24 border border-blue-100 dark:border-blue-800 text-center reveal active">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">
                        <Layout className="w-4 h-4" /> Component Testing Environment
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">The site-wide Navbar is active. Mobile users will see the sticky "Get Hired" bar at the bottom.</p>
                </div>

                {/* --- DYNAMIC HERO HEADER --- */}
                <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-12 reveal active">
                    <div className="lg:w-1/2 text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-400 font-black uppercase tracking-widest text-xs mb-6 border border-blue-100 dark:border-blue-800">
                            <Zap className="w-4 h-4" /> Professional Placement Brochure
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-[0.9] tracking-tighter">
                            BRIDGE TO <br /><span className="text-blue-600">SUCCESS</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-lg mb-8 font-medium">
                            Transforming education into career excellence. Explore our digital interactive brochure and witness our impact.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-blue-700 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-800 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3">
                                Download Full PDF <Download className="w-5 h-5" />
                            </button>
                            <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-black px-10 py-5 rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-3">
                                Our Process <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border-[12px] border-gray-100 dark:border-gray-900 shadow-2xl relative bg-gray-100">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay loop muted playsInline
                                src="https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-modern-office-42473-large.mp4"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                        </div>
                        <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 animate-bounce">
                            <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                            <p className="text-[10px] font-black uppercase text-gray-400">Award Winning</p>
                            <p className="text-sm font-black text-gray-900 dark:text-white">Placement Cell</p>
                        </div>
                    </div>
                </div>

                {/* --- STATS DASHBOARD --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 reveal active">
                    {[
                        { label: 'Hiring Partners', count: counts.partners, suffix: '+', icon: Building2, color: 'blue', desc: 'MNCs & Global Tech' },
                        { label: 'Placed Students', count: counts.students, suffix: '+', icon: Trophy, color: 'indigo', desc: 'Verified Placements' },
                        { label: 'Success Rate', count: counts.rate, suffix: '%', icon: GraphIcon, color: 'emerald', desc: 'Industry Best Placement %' },
                        { label: 'Career Domains', count: counts.domains, suffix: '+', icon: GraduationCap, color: 'orange', desc: 'Specialized Tech' }
                    ].map((stat, i) => (
                        <div key={i} className="group relative bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                            <div className="relative z-10 text-center flex flex-col items-center">
                                <div className={`p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 inline-block mb-6 transition-transform group-hover:scale-110`}>
                                    <stat.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-1">
                                    <Counter target={stat.count} suffix={stat.suffix} />
                                </h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{stat.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 font-medium leading-tight">{stat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- HOVER-PLAY VIDEO SHOWCASE --- */}
                <div className="mb-32 reveal active">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                            <Play className="w-4 h-4 fill-current" /> Interactive Experience
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">Life at <span className="text-blue-600">NetTech</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VIDEO_GALLERY.map((item) => (
                            <div
                                key={item.id}
                                onMouseEnter={handleVideoHover}
                                onMouseLeave={handleVideoLeave}
                                className="group relative aspect-[9/16] bg-gray-100 dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                            >
                                <video
                                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                    loop muted playsInline src={item.videoUrl}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-all duration-500">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:opacity-0 group-hover:scale-150 transition-all duration-500">
                                        <Play className="w-8 h-8 fill-current ml-1" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">{item.metrics}</div>
                                    <h4 className="text-2xl font-black text-white leading-none mb-1">{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* REGISTRATION SIMULATOR */}
                <div className="mb-20 reveal active">
                    <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="grid lg:grid-cols-2">
                            <div className="p-12 lg:p-20 flex flex-col justify-center bg-gray-50 dark:bg-gray-800/50">
                                <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">START THE JOURNEY</h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed text-lg font-medium">
                                    Enter your professional credentials to access exclusive candidate opportunities within our network of 4,500+ global hiring partners.
                                </p>
                            </div>

                            <div className="p-12 lg:p-20 flex flex-col justify-center">
                                {regState === 'idle' ? (
                                    <form onSubmit={simulateSubmit} className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Candidate Reference ID</label>
                                            <input
                                                className="w-full px-10 py-6 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-blue-500 focus:bg-white focus:shadow-2xl outline-none transition-all text-gray-900 dark:text-white font-black uppercase tracking-widest"
                                                placeholder="e.g. NT-CANDIDATE-ID"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="group relative w-full bg-blue-700 text-white font-black py-7 rounded-[2.5rem] shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-4 text-xl uppercase tracking-widest">
                                                Verify & Register <Send className="w-6 h-6" />
                                            </span>
                                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                                        </button>
                                    </form>
                                ) : (
                                    <div className="flex flex-col items-center justify-center min-h-[400px] animate-pop-in">
                                        {regState === 'submitting' ? (
                                            <div className="flex flex-col items-center gap-8">
                                                <RefreshCcw className="w-24 h-24 text-blue-600 animate-spin" />
                                                <span className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] animate-pulse">Syncing Cloud Database...</span>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-28 h-28 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                                                    <CheckCircle className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">ACCESS GRANTED</h3>
                                                <button onClick={() => setRegState('idle')} className="mt-12 bg-blue-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-800 shadow-xl transition-all hover:scale-105 active:scale-95">Reset Session</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes popIn {
                    0% { opacity: 0; transform: scale(0.8) translateY(20px); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-pop-in { animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            `}</style>
        </div>
    );
};

export default TestInteractive;
