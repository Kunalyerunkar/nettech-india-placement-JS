
import React, { useEffect, useState } from 'react';
import { PARTNER_BENEFITS } from '../constants';
import { CheckCircle2, TrendingUp, Users, Building, DollarSign, Award, FileText, Handshake, Settings, ArrowRight, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import partnerslogo from '../images/partnerlogo.js';

const PartnersPage = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [visibleLogosCount, setVisibleLogosCount] = useState(12);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleResize = () => {
            const desktop = window.innerWidth >= 768;
            setIsDesktop(desktop);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        requirements: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const icons = [TrendingUp, Users, Building, DollarSign, Award, FileText, Handshake, Settings];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 0) {
                const firstDigit = value.charAt(0);
                if (!['6', '7', '8', '9'].includes(firstDigit)) {
                    return;
                }
            }
            if (value.length > 10) return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            setSubmitMessage({ type: 'error', text: 'Please enter a valid 10-digit Indian mobile number.' });
            return;
        }
        setIsSubmitting(true);
        setSubmitMessage({ type: '', text: '' });

        try {
            await api.registerPartner(formData);
            setIsSubmitted(true);
            setFormData({ companyName: '', contactPerson: '', email: '', phone: '', requirements: '' });
        } catch (error) {
            setSubmitMessage({ type: 'error', text: error.message || 'Submission failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const partners = partnerslogo;
    const displayedPartners = isDesktop ? partners : partners.slice(0, visibleLogosCount);

    const getSafeUrl = (path) => {
        if (!path) return '';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return '/' + cleanPath.split('/').map(part => encodeURIComponent(part)).join('/');
    };

    const handleLoadMore = () => {
        setVisibleLogosCount(prev => Math.min(prev + 12, partners.length));
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Hero Header */}
            <section className="bg-slate-900 text-white py-24 text-center reveal active">
                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Hire Top Talent</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto px-4 font-medium">
                    Partner with NetTech India to access a pool of pre-screened, skilled, and job-ready candidates at zero cost.
                </p>
            </section>

            {/* Benefits Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16 reveal active">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Why Partner With Us?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">Join 4,500+ companies who trust us for their hiring needs and business growth.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PARTNER_BENEFITS.map((benefit, idx) => {
                        const Icon = icons[idx % icons.length];
                        return (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg hover:-translate-y-1 transition-all duration-300 reveal active">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-black text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest">{benefit}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    Access specialized talent trained in the latest industry standards and modern frameworks.
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Industries Section - Refined for better alignment and height match */}
            <section className="bg-gray-50 dark:bg-gray-800/50 py-24 overflow-hidden border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Centered Title Area */}
                    <div className="reveal active mb-16 text-center">
                        <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                            Global Industry Reach
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">Industries We <span className="text-blue-600">Serve</span></h2>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row items-stretch gap-12 lg:gap-20">
                        {/* Text and List Area - Description lengthened to match image height */}
                        <div className="md:w-1/2 flex flex-col justify-center reveal active">
                            <div className="space-y-6 mb-12">
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium text-justify">
                                    At NetTech India, we recognize that every industry has unique technical requirements and operational challenges. Our comprehensive training programs are meticulously designed to produce versatile candidates who excel across diverse domains. From high-growth tech startups seeking agile developers to established Fortune 500 MNCs looking for robust system administrators, we bridge the skill gap effectively.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium text-justify">
                                    By maintaining a constant pulse on the global market, we ensure our talent pool is equipped with the latest framework knowledge and soft skills necessary for immediate workplace integration. Our graduates don't just fill positions; they drive innovation and stability in the departments they join, whether it's through data-driven financial analysis or cutting-edge telecommunications engineering.
                                </p>
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: 'Information Technology', sub: 'Software & Infra' },
                                    { name: 'Banking & Finance', sub: 'FinTech & ERP' },
                                    { name: 'Digital Agencies', sub: 'Marketing & UI/UX' },
                                    { name: 'Manufacturing (CAD)', sub: 'Industrial Design' },
                                    { name: 'E-Commerce', sub: 'Retail & Logistics' },
                                    { name: 'Telecommunications', sub: 'Networks & 5G' }
                                ].map((ind, i) => (
                                    <li key={i} className="flex items-center text-gray-800 dark:text-gray-200 font-bold bg-white dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-blue-500 hover:shadow-md transition-all duration-300">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                        <div className="flex flex-col">
                                            <span className="text-[11px] uppercase tracking-tighter text-blue-600 dark:text-blue-400 font-black mb-0.5">{ind.sub}</span>
                                            <span className="text-sm uppercase tracking-tight">{ind.name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image Section */}
                        <div className="md:w-1/2 flex items-center reveal active w-full">
                            <div className="relative group w-full h-full">
                                <div className="absolute -inset-4 bg-blue-600/5 rounded-[2.5rem] blur-3xl group-hover:bg-blue-600/10 transition-all duration-700"></div>
                                <img
                                    src="/images/web img/Industries We Serve.jpg"
                                    alt="Professional Industries Illustration"
                                    className="relative rounded-[2.5rem] shadow-2xl border-[10px] border-white dark:border-gray-800 w-full h-full object-cover object-center max-h-[650px] transition-transform duration-700 group-hover:scale-[1.01]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Top Companies Section */}
            <section className="bg-white dark:bg-gray-900 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal active">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Trusted By Industry Leaders</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium">We are proud to be associated with {partners.length} top-tier organizations.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {displayedPartners.map((partner, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-200 h-28 relative overflow-hidden">
                                <img
                                    src={getSafeUrl(partner.logo)}
                                    alt={partner.name}
                                    className="max-h-14 w-auto transition-all duration-300 transform group-hover:scale-110 filter grayscale-0 opacity-100 md:grayscale md:opacity-50 md:group-hover:grayscale-0 md:group-hover:opacity-100"
                                    title={partner.name}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const fallback = e.currentTarget.parentElement.querySelector('.name-fallback');
                                        if (fallback) fallback.classList.remove('hidden');
                                    }}
                                />
                                <div className="name-fallback hidden text-[10px] font-black text-gray-900 uppercase tracking-tighter text-center px-2">
                                    {partner.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleLogosCount < partners.length && (
                        <div className="mt-16 text-center flex md:hidden justify-center items-center">
                            <button
                                onClick={handleLoadMore}
                                className="group inline-flex items-center gap-2 px-10 py-5 bg-blue-700 text-white font-black rounded-full hover:bg-blue-800 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] active:scale-95 uppercase tracking-widest text-[10px] border-2 border-white/20"
                            >
                                SHOW MORE PARTNERS ({partners.length - visibleLogosCount} LEFT)
                                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Partner Registration Form */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 reveal" id="partner-form">
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="bg-blue-700 p-10 text-center">
                        <h2 className="text-3xl font-black text-white tracking-tight uppercase">Become a Hiring Partner</h2>
                        <p className="text-blue-100 mt-2 font-medium opacity-80">Join our network and find the right talent for your team.</p>
                    </div>
                    <div className="p-8 md:p-14">
                        {isSubmitted ? (
                            <div className="text-center py-10">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Submission Received!</h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">Your partnership request is in our system. Our alliances team will contact you shortly.</p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs hover:underline">Submit another response</button>
                            </div>
                        ) : (
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                {submitMessage.type === 'error' && (
                                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-5 rounded-2xl flex items-center border border-red-100">
                                        <AlertCircle className="w-5 h-5 mr-3" />
                                        <span className="font-bold text-sm">{submitMessage.text}</span>
                                    </div>
                                )}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Company Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                                            placeholder="Company Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Contact Person</label>
                                        <input
                                            type="text"
                                            name="contactPerson"
                                            value={formData.contactPerson}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                                            placeholder="HR / Hiring Manager"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Official Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                                            placeholder="hr@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Phone Number</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-gray-400 font-bold text-xs">+91</span>
                                                <span className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-3"></span>
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-16 pr-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                                                placeholder="9876543210"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Hiring Requirements</label>
                                    <textarea
                                        name="requirements"
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                                        rows={4}
                                        placeholder="Tell us about the roles you are looking to fill (e.g. 5 Java Developers, 2 Network Engineers)..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full group relative bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 overflow-hidden flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800 hover:-translate-y-1 active:scale-95'}`}
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        {isSubmitting ? 'Processing Request...' : (
                                            <>
                                                Submit Partnership Request
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnersPage;
