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
            const triggerPoint = windowHeight * 0.6;
            const relativeScroll = scrollY + triggerPoint - containerTop;
            const newHeight = Math.max(0, Math.min(relativeScroll, containerHeight));
            setLineHeight(newHeight);

            PROCESS_STEPS.forEach((step, index) => {
                const el = stepRefs.current[index];
                if (el && relativeScroll > el.offsetTop) {
                    setVisibleStepIds(prev => prev.includes(step.id) ? prev : [...prev, step.id]);
                }
            });
            if (newHeight >= containerHeight - 150) {
                setShowJobButton(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20 transition-colors duration-300">
            {/* Header */}
            <section className="bg-blue-900 text-white py-20 text-center reveal active">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your Pathway to Employment</h1>
                <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                    Follow our simple 4-step process to secure your dream job.
                </p>
            </section>

            {/* Timeline Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative" ref={containerRef}>
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform md:-translate-x-1/2 ml-0"></div>
                <div
                    className="absolute left-6 md:left-1/2 top-0 w-0.5 bg-blue-600 shadow-[0_0_15px_#2563eb] transform md:-translate-x-1/2 ml-0 transition-all duration-100 ease-out"
                    style={{ height: `${lineHeight}px` }}
                ></div>

                <div className="space-y-24 relative pb-24">
                    {PROCESS_STEPS.map((step, index) => {
                        const Icon = icons[index % icons.length];
                        const isVisible = visibleStepIds.includes(step.id);
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={step.id}
                                className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                                ref={(el) => { if (el) stepRefs.current[index] = el; }}
                            >
                                <div className="md:hidden w-16 flex-shrink-0"></div>
                                <div
                                    className={`w-full md:w-[45%] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                >
                                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-2">Step {step.id}: {step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                                    {step.id === 1 && (
                                        <div className="flex justify-center mt-4">
                                            {/* Changed bg-white dark:bg-gray-700 to bg-white dark:bg-white to keep QR scanable */}
                                            <div className="p-2 bg-white dark:bg-white rounded-lg shadow-sm border border-gray-100 dark:border-gray-300">
                                                <img src="/images/qr code/home qr.png" alt="Registration QR" className="w-32 h-32 object-contain" />
                                            </div>
                                        </div>
                                    )}
                                    {step.id === 3 && (
                                        <div className="mt-4 flex justify-center overflow-hidden group cursor-pointer" onClick={() => setIsCertificateOpen(true)}>
                                            <img
                                                src="/images/Certificate/Certificate-Firstname-Lastname.jpg"
                                                alt="Certificate Preview"
                                                className="w-full h-auto object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    {step.details && (
                                        <ul className="space-y-1 mt-4">
                                            {step.details.map((detail, i) => (
                                                <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center">
                                    <div
                                        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 z-10 ${isVisible ? 'bg-blue-600 border-blue-200 dark:border-blue-900 scale-110 shadow-[0_0_15px_#2563eb]' : 'bg-gray-200 dark:bg-gray-700 border-white dark:border-gray-800 scale-100'}`}
                                    >
                                        <Icon className={`w-6 h-6 ${isVisible ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                                    </div>
                                </div>
                                <div className="hidden md:block w-[45%]"></div>
                            </div>
                        );
                    })}
                </div>

                <div className="absolute bottom-0 left-6 md:left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
                    <div className={`transition-all duration-700 transform ${showJobButton ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-8 py-4 border-4 border-white dark:border-gray-900 text-lg font-bold rounded-full text-white bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-[0_0_20px_rgba(22,163,74,0.5)] hover:shadow-[0_0_30px_rgba(22,163,74,0.7)] hover:-translate-y-1 whitespace-nowrap"
                        >
                            Job Opportunity
                            <Briefcase className="ml-2 w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 py-8 mt-20">
                <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-400 mb-10 flex items-center justify-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                        <HelpCircle className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                    </div>
                    Frequently Asked Questions
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors group duration-300">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{faq.question}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certificate Modal */}
            {isCertificateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsCertificateOpen(false)}>
                    <div className="relative max-w-4xl w-full bg-white rounded-lg p-2 shadow-2xl transform transition-all scale-100" onClick={e => e.stopPropagation()}>
                        <button className="absolute -top-10 right-0 text-white hover:text-gray-200 transition-colors" onClick={() => setIsCertificateOpen(false)}><X className="w-8 h-8" /></button>
                        <img src="/images/Certificate/Certificate-Firstname-Lastname.jpg" alt="Certificate Full View" className="w-full h-auto rounded" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProcessPage;