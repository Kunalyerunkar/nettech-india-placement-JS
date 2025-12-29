import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, GraduationCap, Calendar, Building2, CheckCircle, Send, AlertCircle, Briefcase, Code2, RefreshCcw } from 'lucide-react';
import { api } from '../services/api';
import { JOB_DOMAINS } from '../constants';

const RegistrationPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        highestQualification: '',
        otherQualification: '',
        passingYear: '',
        collegeName: '',
        interestedDomain: '',
        skills: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const qualifications = [
        "B.E / B.Tech",
        "BCA",
        "B.Sc IT/CS",
        "Diploma",
        "B.Com",
        "BBA",
        "BAF",
        "B.Sc Finance",
        "BEng Electrical Engineering",
        "BEng Electronics Engineering",
        "BEng Mechatronics Engineering",
        "MCA",
        "M.Sc IT/CS",
        "Other"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 15 }, (_, i) => currentYear + 2 - i);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 0) {
                const firstDigit = value.charAt(0);
                if (!['6', '7', '8', '9'].includes(firstDigit)) return;
            }
            if (value.length > 10) return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        setSubmitError('');
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.phone) {
            newErrors.phone = "Phone Number is required";
        } else if (formData.phone.length !== 10) {
            newErrors.phone = "Phone Number must be exactly 10 digits";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email ID is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.highestQualification) {
            newErrors.highestQualification = "Highest Qualification is required";
        } else if (formData.highestQualification === 'Other' && !formData.otherQualification.trim()) {
            newErrors.otherQualification = "Please specify your qualification";
        }
        if (!formData.passingYear) newErrors.passingYear = "Passing Year is required";
        if (!formData.collegeName.trim()) newErrors.collegeName = "College Name is required";
        if (!formData.interestedDomain) newErrors.interestedDomain = "Please select an Interested Domain";
        if (!formData.skills.trim()) newErrors.skills = "Skills are required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            setSubmitError('');
            try {
                const payload = {
                    ...formData,
                    highestQualification: formData.highestQualification === 'Other' ? formData.otherQualification : formData.highestQualification
                };
                await api.registerStudent(payload);
                setIsSubmitted(true);
                window.scrollTo(0, 0);
            } catch (error) {
                setSubmitError(error.message || "Failed to register. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-20 transition-colors duration-300 relative overflow-hidden">
                <style>{`
                    @keyframes popIn {
                        0% { opacity: 0; transform: scale(0.8) translateY(20px); }
                        70% { transform: scale(1.05); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                    .animate-pop-in {
                        animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    }

                    .checkmark-circle {
                        stroke-dasharray: 166;
                        stroke-dashoffset: 166;
                        stroke-miterlimit: 10;
                        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
                    }

                    .checkmark-check {
                        transform-origin: 50% 50%;
                        stroke-dasharray: 48;
                        stroke-dashoffset: 48;
                        animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
                    }

                    @keyframes stroke {
                        100% { stroke-dashoffset: 0; }
                    }

                    .confetti-container { perspective: 1000px; }
                    .confetti-piece {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        top: 50%;
                        left: 50%;
                        opacity: 0;
                    }

                    ${[...Array(15)].map((_, i) => `
                        .confetti-${i} {
                            background: ${['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5]};
                            transform: rotate(${i * 24}deg);
                            animation: confetti-burst-${i} 1.5s ease-out 0.8s forwards;
                        }
                        @keyframes confetti-burst-${i} {
                            0% { transform: rotate(${i * 24}deg) translate(0, 0); opacity: 1; }
                            100% { transform: rotate(${i * 24 + (Math.random() * 180)}deg) translate(${(Math.random() - 0.5) * 400}px, -${Math.random() * 300}px); opacity: 0; }
                        }
                    `).join('\n')}
                `}</style>

                {/* Celebration Particles */}
                <div className="confetti-container absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className={`confetti-piece confetti-${i}`}></div>
                    ))}
                </div>

                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-10 text-center border border-gray-100 dark:border-gray-800 animate-pop-in relative z-10">
                    <div className="relative mb-8 flex justify-center">
                        <svg className="w-24 h-24 text-green-500" viewBox="0 0 52 52">
                            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path className="checkmark-check" fill="none" stroke="currentColor" strokeWidth="4" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                        <div className="absolute inset-0 bg-green-500/10 blur-2xl rounded-full animate-pulse"></div>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Registration Successful!</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                        Excellent choice! You've taken the first step towards a better future. Our HR team will review your profile and reach out shortly.
                    </p>

                    <a
                        href="/"
                        className="group relative inline-flex items-center justify-center w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-95 transition-all overflow-hidden"
                    >
                        <span className="relative z-10">Go Back Home</span>
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
            <section className="bg-blue-900 text-white py-16 text-center reveal active relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Registration for Free Job Placement</h1>
                    <p className="text-xl text-blue-200">
                        Take the first step towards your dream career. Fill in your details below.
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 reveal active transition-colors duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {submitError && (
                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-4 rounded-xl flex items-center border border-red-100 dark:border-red-900/50">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                {submitError}
                            </div>
                        )}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 dark:text-white ${errors.fullName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.fullName && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.fullName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email ID</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 dark:text-white ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 font-bold text-xs">+91</span>
                                        <span className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-2"></span>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`block w-full pl-16 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 dark:text-white ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                        placeholder="9876543210"
                                    />
                                </div>
                                {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.phone}</p>}
                            </div>
                            {/* ... Rest of fields styled similarly with rounded-xl and group effects ... */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 dark:text-white ${errors.city ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                        placeholder="e.g. Thane"
                                    />
                                </div>
                                {errors.city && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.city}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">State</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 dark:text-white ${errors.state ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                        placeholder="e.g. Maharashtra"
                                    />
                                </div>
                                {errors.state && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.state}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Highest Qualification</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <GraduationCap className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <select
                                        name="highestQualification"
                                        value={formData.highestQualification}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all appearance-none bg-white dark:bg-gray-700 dark:text-white ${errors.highestQualification ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                    >
                                        <option value="">Select Qualification</option>
                                        {qualifications.map((q, idx) => <option key={idx} value={q}>{q}</option>)}
                                    </select>
                                </div>
                                {errors.highestQualification && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.highestQualification}</p>}
                                {formData.highestQualification === 'Other' && (
                                    <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <input
                                            type="text"
                                            name="otherQualification"
                                            value={formData.otherQualification}
                                            onChange={handleChange}
                                            className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 dark:text-white ${errors.otherQualification ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                            placeholder="Please specify your qualification"
                                        />
                                        {errors.otherQualification && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.otherQualification}</p>}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Passing Year</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <select
                                        name="passingYear"
                                        value={formData.passingYear}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all appearance-none bg-white dark:bg-gray-700 dark:text-white ${errors.passingYear ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                    >
                                        <option value="">Select Year</option>
                                        {years.map((year) => <option key={year} value={year}>{year}</option>)}
                                    </select>
                                </div>
                                {errors.passingYear && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.passingYear}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">College Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building2 className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="collegeName"
                                        value={formData.collegeName}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 dark:text-white ${errors.collegeName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                        placeholder="Enter your college/university name"
                                    />
                                </div>
                                {errors.collegeName && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.collegeName}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Interested Domain</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <select
                                        name="interestedDomain"
                                        value={formData.interestedDomain}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all appearance-none bg-white dark:bg-gray-700 dark:text-white ${errors.interestedDomain ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                    >
                                        <option value="">Select Domain</option>
                                        {JOB_DOMAINS.map((domain) => <option key={domain.id} value={domain.title}>{domain.title}</option>)}
                                    </select>
                                </div>
                                {errors.interestedDomain && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.interestedDomain}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Skills</label>
                                <div className="relative group">
                                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                        <Code2 className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <textarea
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        rows={3}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 dark:text-white ${errors.skills ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400'}`}
                                        placeholder="E.g. Java, Python, SQL, Communication, Excel..."
                                    />
                                </div>
                                {errors.skills && <p className="mt-1 text-xs text-red-500 flex items-center ml-1"><AlertCircle className="w-3 h-3 mr-1" />{errors.skills}</p>}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`group relative w-full flex items-center justify-center bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 overflow-hidden ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                            >
                                <span className="relative z-10 flex items-center">
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <RefreshCcw className="w-5 h-5 animate-spin mr-3" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            Complete Registration
                                            <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-[-2px] transition-transform" />
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 italic">
                                Your data is secured. By registering, you agree to be contacted by NetTech India.
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default RegistrationPage;