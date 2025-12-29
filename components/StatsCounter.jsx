import React, { useState, useEffect } from 'react';
import { Building2, Trophy, GraduationCap, TrendingUp as GraphIcon } from 'lucide-react';
import { JOB_DOMAINS } from '../constants';

const StatsCounter = () => {
    const [counts, setCounts] = useState({ students: 0, partners: 0, rate: 0, domains: 0 });

    useEffect(() => {
        // Small delay to ensure the component is visible before starting count
        const timer = setTimeout(() => {
            setCounts({
                students: 1250,
                partners: 4500,
                rate: 98,
                domains: JOB_DOMAINS.length
            });
        }, 500);
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

    const stats = [
        { label: 'Hiring Partners', count: counts.partners, suffix: '+', icon: Building2, color: 'blue', desc: 'MNCs & Global Tech Firms' },
        { label: 'Placed Students', count: counts.students, suffix: '+', icon: Trophy, color: 'indigo', desc: 'Successful Career Starts' },
        { label: 'Success Rate', count: counts.rate, suffix: '%', icon: GraphIcon, color: 'emerald', desc: 'Industry Best Placement %' },
        { label: 'Career Domains', count: counts.domains, suffix: '+', icon: GraduationCap, color: 'orange', desc: 'Specialized Tech Tracks' }
    ];

    return (
        <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="group relative bg-gray-50 dark:bg-gray-800/50 p-8 rounded-[2.5rem] border border-transparent hover:border-blue-500/30 dark:hover:border-blue-400/30 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`p-4 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400 mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-1">
                                    <Counter target={stat.count} suffix={stat.suffix} />
                                </h3>
                                <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">{stat.label}</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{stat.desc}</p>
                            </div>

                            {/* Subtle background glow */}
                            <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;