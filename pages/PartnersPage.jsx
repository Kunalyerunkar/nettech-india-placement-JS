import React, { useEffect, useState } from 'react';
import { PARTNER_BENEFITS } from '../constants';
import { CheckCircle2, TrendingUp, Users, Building, DollarSign, Award, FileText, Handshake, Settings, ArrowRight, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import partnerslogo from '../images/partnerlogo.js';

const PartnersPage = () => {
    // We still use a small bit of JS to determine the initial slice, 
    // but we'll make the button visibility handled more robustly by Tailwind.
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
    // We show all on desktop, but only the count on mobile.
    // This uses the isDesktop state to drive the data slice.
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
            <section className="bg-slate-900 text-white py-20 text-center reveal active">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hire Top Talent</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto px-4">
                    Partner with NetTech India to access a pool of pre-screened, skilled, and job-ready candidates at zero cost.
                </p>
            </section>

            {/* Benefits Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Partner With Us?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-4">Join 4,500+ companies who trust us for their hiring needs.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PARTNER_BENEFITS.map((benefit, idx) => {
                        const Icon = icons[idx % icons.length];
                        return (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg hover:-translate-y-1 transition-transform reveal">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 uppercase text-sm tracking-tight">{benefit}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Access specialized talent trained in the latest industry standards and frameworks.
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Industries Section */}
            <section className="bg-gray-50 dark:bg-gray-800/50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 reveal">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Industries We Serve</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Our candidates are trained in diverse domains, making them suitable for a wide range of industries. Whether you are a startup or an MNC, we have the right talent for you.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Information Technology', 'Banking & Finance', 'Digital Marketing agencies', 'Manufacturing (CAD/CAM)', 'E-Commerce', 'Telecommunications'].map((ind, i) => (
                                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                        {ind}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 reveal">
                            <img src="images/web img/Industries We Serve.jpg" alt="Business Meeting" className="rounded-2xl shadow-xl dark:border-4 dark:border-gray-700 w-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Top Companies Section */}
            <section className="bg-white dark:bg-gray-900 py-20 border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trusted By Top Companies</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-4">We are proud to be associated with {partners.length} industry leaders.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {displayedPartners.map((partner, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-gray-200 h-24 relative overflow-hidden">
                                <img
                                    src={getSafeUrl(partner.logo)}
                                    alt={partner.name}
                                    className="max-h-12 w-auto transition-all duration-300 transform group-hover:scale-110 filter grayscale-0 opacity-100 md:grayscale md:opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100"
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

                    {/* See More Button - Robust Rendering Logic */}
                    {/* We use md:hidden to hide it on PC always, and JS to only show it if there are more partners */}
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
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="bg-blue-600 p-8 text-center">
                        <h2 className="text-2xl font-bold text-white">Become a Hiring Partner</h2>
                        <p className="text-blue-100 mt-2">Join our network and find the right talent for your team.</p>
                    </div>
                    <div className="p-8 md:p-12">
                        {isSubmitted ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                                <p className="text-gray-600 dark:text-gray-400">Your partnership request has been received. Our team will contact you shortly.</p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-6 text-blue-600 dark:text-blue-400 hover:underline">Submit another response</button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {submitMessage.type === 'error' && (
                                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-4 rounded-lg flex items-center">
                                        <AlertCircle className="w-5 h-5 mr-2" />
                                        {submitMessage.text}
                                    </div>
                                )}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                                            placeholder="Company Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person</label>
                                        <input
                                            type="text"
                                            name="contactPerson"
                                            value={formData.contactPerson}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                                            placeholder="HR Name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Official Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                                            placeholder="hr@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 font-medium text-sm">+91</span>
                                                <span className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-2"></span>
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-16 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                                                placeholder="9876543210"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hiring Requirements (Optional)</label>
                                    <textarea
                                        name="requirements"
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                                        rows={4}
                                        placeholder="E.g., Java Developers, Network Engineers..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                                >
                                    {isSubmitting ? 'Submitting...' : (
                                        <>
                                            Submit Partnership Request
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </>
                                    )}
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
