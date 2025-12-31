import React, { useEffect, useState, useRef } from 'react';
import { PROCESS_STEPS, FAQS } from '../constants';
import { QrCode, UserCheck, MonitorPlay, Briefcase, X, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProcessPage = () => {
    const [lineHeight, setLineHeight] = useState(0);
    const [visibleStepIds, setVisibleStepIds] = useState([]);
    const [showJobButton, setShowJobButton] = useState(false);
    const [isCertificateOpen, setIsCertificateOpen] = useState(false);

    const containerRef = useRef(null);
    const stepRefs = useRef([]);
    const icons = [QrCode, UserCheck, MonitorPlay, Briefcase];

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleScroll = () => {
            if (!containerRef.current) return;
            const containerTop = containerRef.current.offsetTop;
            const containerHeight = containerRef.current.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.7;
            const relativeScroll = scrollY + triggerPoint - containerTop;
            const newHeight = Math.max(0, Math.min(relativeScroll, containerHeight));
            setLineHeight(newHeight);

            PROCESS_STEPS.forEach((step, index) => {
                const el = stepRefs.current[index];
                if (el && relativeScroll > el.offsetTop) {
                    setVisibleStepIds(prev => prev.includes(step.id) ? prev : [...prev, step.id]);
                }
            });
            if (newHeight >= containerHeight - 100) {
                setShowJobButton(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-32 transition-colors duration-300">
            {/* Header */}
            <section className="bg-blue-900 text-white py-20 text-center reveal active relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Your Pathway to Employment</h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto font-medium">
                        Follow our simple 4-step process to secure your dream job.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="max-w-5xl mx-auto px-4 py-20 relative" ref={containerRef}>
                {/* Vertical Line - Centered */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800 transform -translate-x-1/2"></div>

                {/* Animated Glowing Progress Line */}
                <div
                    className="absolute left-1/2 top-0 w-[2px] bg-blue-600 shadow-[0_0_20px_#2563eb] transform -translate-x-1/2 transition-all duration-150 ease-out"
                    style={{ height: `${lineHeight}px` }}
                ></div>

                <div className="space-y-24 md:space-y-40 relative pb-24">
                    {PROCESS_STEPS.map((step, index) => {
                        const Icon = icons[index % icons.length];
                        const isVisible = visibleStepIds.includes(step.id);
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={step.id}
                                className={`relative flex flex-col items-center md:flex-row md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                ref={(el) => { if (el) stepRefs.current[index] = el; }}
                            >
                                {/* Timeline Node (Circle with Icon) - Centered and sitting on top of the card on mobile */}
                                <div className="absolute -top-12 md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
                                    <div
                                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-[4px] flex items-center justify-center transition-all duration-700 ${isVisible ? 'bg-blue-600 border-white dark:border-gray-900 shadow-[0_0_20px_#2563eb] scale-110' : 'bg-gray-200 dark:bg-gray-800 border-white dark:border-gray-900 scale-100'}`}
                                    >
                                        <Icon className={`w-7 h-7 md:w-8 md:h-8 ${isVisible ? 'text-white' : 'text-gray-400 dark:text-gray-600'}`} />
                                    </div>
                                </div>

                                {/* Step Content Card - Centered on mobile with margin-top for icon */}
                                <div
                                    className={`w-full md:w-[42%] bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-1000 transform mt-6 md:mt-0 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
                                >
                                    <h3 className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-500 mb-3 tracking-tight text-center md:text-left">
                                        Step {step.id}: {step.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-4 text-center md:text-left text-sm md:text-base">
                                        {step.description}
                                    </p>

                                    {step.id === 1 && (
                                        <div className="flex justify-center mt-6">
                                            <div className="p-2 bg-white rounded-2xl shadow-inner border border-gray-100 group cursor-pointer transition-transform hover:scale-105">
                                                <img src="/images/qr code/home qr.png" alt="Registration QR" className="w-28 h-28 md:w-36 md:h-36 object-contain" />
                                            </div>
                                        </div>
                                    )}

                                    {step.id === 3 && (
                                        <div className="mt-6 flex justify-center overflow-hidden rounded-2xl group cursor-pointer border border-gray-100 dark:border-gray-800 shadow-lg" onClick={() => setIsCertificateOpen(true)}>
                                            <img
                                                src="/images/Certificate/Certificate-Firstname-Lastname.jpg"
                                                alt="Certificate Preview"
                                                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    )}

                                    {step.details && (
                                        <div className="flex justify-center md:justify-start">
                                            <ul className="space-y-3 mt-4 text-left max-w-fit">
                                                {step.details.map((detail, i) => (
                                                    <li key={i} className="flex items-center text-sm md:text-base font-bold text-gray-600 dark:text-gray-400 group/item">
                                                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-4 shadow-[0_0_10px_#2563eb] flex-shrink-0 transition-transform group-hover/item:scale-125"></div>
                                                        <span className="leading-tight">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Desktop Ghost Spacer */}
                                <div className="hidden md:block w-[42%]"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Final CTA Button - Centered and Styled like the reference image */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-30 w-full flex justify-center">
                    <div className={`transition-all duration-1000 transform ${showJobButton ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'}`}>
                        <Link
                            to="/register"
                            className="group relative inline-flex items-center justify-center px-12 py-4 border-4 border-white dark:border-gray-900 text-lg md:text-xl font-black rounded-full text-white bg-green-600 hover:bg-green-500 transition-all duration-300 shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] hover:-translate-y-1 uppercase tracking-[0.15em] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center">
                                Opportunity
                                <Briefcase className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                            </span>
                            {/* Inner Glow Shine Effect - Restricted by overflow-hidden on Link */}
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 py-20 mt-40 reveal">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                        <HelpCircle className="w-4 h-4" /> Got Questions?
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">Frequently Asked <span className="text-blue-600">Questions</span></h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all group duration-300">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{faq.question}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certificate Modal */}
            {isCertificateOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsCertificateOpen(false)}>
                    <div className="relative max-w-5xl w-full bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-2xl overflow-hidden scale-100" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-colors z-10" onClick={() => setIsCertificateOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                        <img src="/images/Certificate/Certificate-Firstname-Lastname.jpg" alt="Certificate Full View" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProcessPage;