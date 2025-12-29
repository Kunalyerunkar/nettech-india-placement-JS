import React, { useState, useEffect } from 'react';
import {
    CheckCircle, CheckCircle2, RefreshCcw, Send,
    Building2, Trophy, GraduationCap, TrendingUp as GraphIcon,
    FileText, ClipboardCheck, Briefcase, Code2, Users,
    Play, Heart, MessageCircle, Share2, ArrowRight,
    Download, Sparkles, Zap, ShieldCheck
} from 'lucide-react';
import { JOB_DOMAINS } from '../constants';

const TestInteractive = () => {
    const [counts, setCounts] = useState({ students: 0, partners: 0, rate: 0, domains: 0 });
    const [regState, setRegState] = useState('idle');

    // --- NATIVE VIDEO ASSETS ---
    const VIDEO_GALLERY = [
        {
            id: 'v1',
            videoUrl: "images/video/0_Presentation_Meeting_1080x1920.mp4",
            title: "Tech Innovation Lab",
            tag: "Skill Development",
            metrics: "500+ Hours Training"
        },
        {
            id: 'v2',
            videoUrl: "images/video/1097610_Electronics_Circuit_1080x1920.mp4",
            title: "Candidate Success",
            tag: "Career Coaching",
            metrics: "98% Success Rate"
        },
        {
            id: 'v3',
            videoUrl: "images/video/6918191_Motion_Graphics_Motion_Graphic_1080x1920.mp4",
            title: "Placement Drives",
            tag: "Industry Connect",
            metrics: "4500+ Partners"
        },
        {
            id: 'v4',
            videoUrl: "images/video/7048907_Animation_Motion_Graphic_1080x1920.mp4",
            title: "Corporate Ready",
            tag: "Soft Skills",
            metrics: "MNC Standard"
        }
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
        if (video) {
            video.play().catch(err => console.log("Autoplay blocked or failed", err));
        }
    };

    const handleVideoLeave = (e) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0; // Optional: Reset to start
        }
    };

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen pt-20 pb-20 transition-colors duration-500 overflow-x-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                                src="images\video\1116117_Group_Man_3840x2160.mp4"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Candidate" />
                                    ))}
                                    <div className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 bg-blue-600 flex items-center justify-center text-xs font-black text-white">+5k</div>
                                </div>
                                <div className="text-white text-right">
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Hiring Partners</p>
                                    <p className="text-2xl font-black">4,500+</p>
                                </div>
                            </div>
                        </div>
                        {/* Floating Badge */}
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
                            <div className="relative z-10">
                                <div className={`p-4 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 inline-block mb-6`}>
                                    <stat.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-1">
                                    <Counter target={stat.count} suffix={stat.suffix} />
                                </h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{stat.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 font-medium leading-tight">{stat.desc}</p>
                            </div>
                            <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform`}></div>
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
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">Explore student stories and training sessions. Hover over any card to start the video.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VIDEO_GALLERY.map((item) => (
                            <div
                                key={item.id}
                                onMouseEnter={handleVideoHover}
                                onMouseLeave={handleVideoLeave}
                                className="group relative aspect-[9/16] bg-gray-100 dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                            >
                                {/* Video Element - PLAYS ON HOVER */}
                                <video
                                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                    loop
                                    muted
                                    playsInline
                                    src={item.videoUrl}
                                />

                                {/* Play Button Overlay - Visible when NOT playing */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-all duration-500">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:opacity-0 group-hover:scale-150 transition-all duration-500">
                                        <Play className="w-8 h-8 fill-current ml-1" />
                                    </div>
                                </div>

                                {/* Dynamic Content Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:bg-red-500 group-hover:animate-pulse transition-colors"></div>
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">{item.tag}</span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                                    <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">{item.metrics}</div>
                                    <h4 className="text-2xl font-black text-white leading-none mb-1">{item.title}</h4>
                                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em]">Institutional Footage</p>
                                </div>

                                {/* Floating Interaction Icons */}
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white border border-white/20 hover:text-red-500 transition-colors">
                                            <Heart className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white border border-white/20 hover:text-blue-400 transition-colors">
                                            <MessageCircle className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white border border-white/20 hover:text-green-400 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- DOCUMENT & PROCESS TILES --- */}
                <div className="grid lg:grid-cols-3 gap-8 mb-32 reveal active">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Professional Verification</h2>
                            <div className="text-xs font-black text-blue-600 uppercase tracking-widest">Live Updates</div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: 'Resume Audit', date: 'Oct 24, 2024', status: 'Verified', desc: 'Approved by technical panel.', icon: FileText, color: 'blue' },
                                { title: 'HR Connect', date: 'Oct 28, 2024', status: 'Completed', desc: 'Soft skills assessment cleared.', icon: Users, color: 'indigo' },
                                { title: 'Technical Gate', date: 'Oct 30, 2024', status: 'Success', desc: 'Domain expertise validated.', icon: Code2, color: 'emerald' },
                                { title: 'Asset Check', date: 'Nov 02, 2024', status: 'Cleared', desc: 'Background & KYC processed.', icon: ShieldCheck, color: 'purple' }
                            ].map((tile, i) => (
                                <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-all group flex flex-col shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-4 bg-${tile.color}-50 dark:bg-${tile.color}-900/30 rounded-2xl text-${tile.color}-600`}>
                                            <tile.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-900/50">
                                            <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest">{tile.status}</span>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{tile.title}</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">{tile.desc}</p>

                                    <div className="mt-auto pt-6 border-t border-dashed border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Official Log</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-300">{tile.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-600 dark:bg-blue-900 rounded-[3.5rem] p-12 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid.png')]"></div>
                        <div className="relative z-10">
                            <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-6 py-2 rounded-full mb-8 inline-block uppercase tracking-widest border border-white/20">Candidate Portal</div>
                            <h3 className="text-4xl font-black text-white mb-4 leading-none tracking-tight">DIGITIZE <br /> YOUR FUTURE</h3>
                            <p className="text-blue-100 text-sm mb-12 leading-relaxed font-medium">Streamlined placement workflow. Real-time interview scheduling and offer tracking.</p>
                        </div>

                        <div className="relative w-full p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border-2 border-dashed border-white/30">
                            <div className="flex items-center justify-center mb-10">
                                <Sparkles className="w-16 h-16 text-white animate-pulse" />
                            </div>
                            <div className="relative border-t border-white/20 pt-6 flex justify-between items-center px-2">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">SECURE ACCESS</span>
                                <ShieldCheck className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <div className="mt-8 relative z-10">
                            <div className="text-[10px] font-black uppercase text-white/60 tracking-widest mb-1">Career Cell Excellence</div>
                            <div className="text-[8px] font-bold text-white/30 uppercase">NT-IP DIGITAL BROCHURE © 2024</div>
                        </div>
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
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                        <Users className="w-6 h-6" />
                                        Personalized Career Mentorship
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                        <ShieldCheck className="w-6 h-6" />
                                        Guaranteed Industry Interview
                                    </div>
                                </div>
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
                                        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confidential Information System</p>
                                    </form>
                                ) : (
                                    <div className="flex flex-col items-center justify-center min-h-[400px] animate-pop-in">
                                        {regState === 'submitting' ? (
                                            <div className="flex flex-col items-center gap-8">
                                                <div className="relative">
                                                    <RefreshCcw className="w-24 h-24 text-blue-600 animate-spin" />
                                                    <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500" />
                                                </div>
                                                <span className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] animate-pulse">Syncing Cloud Database...</span>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-28 h-28 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                                                    <CheckCircle className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">ACCESS GRANTED</h3>
                                                <p className="text-gray-500 mt-4 font-medium">Candidate NTR-2024 has been successfully authorized for MNC Placement Drives.</p>
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