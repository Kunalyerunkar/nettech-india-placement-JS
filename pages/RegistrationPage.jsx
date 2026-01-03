
import React, { useState, useEffect, useMemo } from 'react';
import { User, Phone, Mail, MapPin, GraduationCap, Calendar, Building2, CheckCircle, Send, AlertCircle, Briefcase, Code2, RefreshCcw, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { JOB_DOMAINS } from '../constants';
import CustomDropdown from '../components/CustomDropdown';

const RegistrationPage = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const prefillData = location.state || {};

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
        interestedDomain: prefillData.domain || '',
        skills: prefillData.skills ? prefillData.skills.join(', ') : ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const suggestedSkills = useMemo(() => {
        const currentSkillsArray = formData.skills
            .split(',')
            .map(s => s.trim().toLowerCase())
            .filter(s => s !== "");

        let suggestions = new Set();

        if (formData.interestedDomain) {
            const domain = JOB_DOMAINS.find(d => d.title === formData.interestedDomain);
            if (domain) {
                domain.skills.forEach(s => suggestions.add(s));
            }
        }

        if (currentSkillsArray.length > 0) {
            JOB_DOMAINS.forEach(domain => {
                const hasDomainOverlap = domain.skills.some(ds => currentSkillsArray.includes(ds.toLowerCase()));
                if (hasDomainOverlap) domain.skills.forEach(s => suggestions.add(s));

                domain.roles.forEach(role => {
                    const hasRoleOverlap = role.skills.some(rs => currentSkillsArray.includes(rs.toLowerCase())) ||
                        currentSkillsArray.some(cs => role.title.toLowerCase().includes(cs));
                    if (hasRoleOverlap) {
                        role.skills.forEach(s => suggestions.add(s));
                        domain.skills.slice(0, 3).forEach(s => suggestions.add(s));
                    }
                });
            });
        }

        return Array.from(suggestions)
            .filter(s => !currentSkillsArray.includes(s.toLowerCase()))
            .slice(0, 15);
    }, [formData.interestedDomain, formData.skills]);

    const handleAddSkill = (skill) => {
        const trimmedSkills = formData.skills.trim();
        let updatedSkills = trimmedSkills === "" ? skill :
            trimmedSkills.endsWith(',') ? `${trimmedSkills} ${skill}` : `${trimmedSkills}, ${skill}`;
        setFormData(prev => ({ ...prev, skills: updatedSkills }));
    };

    const qualifications = [
        "B.E / B.Tech", "BCA", "B.Sc IT/CS", "Diploma", "B.Com", "BBA", "BAF", "B.Sc Finance",
        "BEng Electrical Engineering", "BEng Electronics Engineering", "BEng Mechatronics Engineering",
        "MCA", "M.Sc IT/CS", "Other"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 15 }, (_, i) => (currentYear + 2 - i).toString());

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
    };

    const handleDropdownChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.phone || formData.phone.length !== 10) newErrors.phone = "Valid 10-digit Phone Number is required";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid Email is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.highestQualification) newErrors.highestQualification = "Qualification is required";
        if (formData.highestQualification === 'Other' && !formData.otherQualification.trim()) newErrors.otherQualification = "Specify qualification";
        if (!formData.passingYear) newErrors.passingYear = "Passing Year is required";
        if (!formData.collegeName.trim()) newErrors.collegeName = "College Name is required";
        if (!formData.interestedDomain) newErrors.interestedDomain = "Interested Domain is required";
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
                setSubmitError(error.message || "Registration failed.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-20 relative overflow-hidden">
                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-10 text-center border border-gray-100 dark:border-gray-800 relative z-10">
                    <div className="relative mb-8 flex justify-center">
                        <CheckCircle className="w-20 h-20 text-green-500" />
                        <div className="absolute inset-0 bg-green-500/10 blur-2xl rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Success!</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">Our HR team will review your profile and contact you soon.</p>
                    <a href="/" className="inline-flex w-full justify-center bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all">Go Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 transition-colors duration-300">
            <section className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Registration for Free Placement</h1>
                    <p className="text-xl text-blue-200 font-medium">Start your career journey with NetTech India.</p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 md:p-14 border border-gray-100 dark:border-gray-800">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {submitError && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-5 rounded-2xl flex items-center border border-red-100 dark:border-red-900/50">
                                <AlertCircle className="w-5 h-5 mr-3" /> <span className="font-bold">{submitError}</span>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                            {/* Row 1: Full Name */}
                            <div className="md:col-span-2 relative z-[60]">
                                <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-[0.25em] ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full pl-14 pr-6 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-[1.5rem] bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 outline-none font-bold shadow-sm transition-all" placeholder="Full Name" />
                                </div>
                            </div>

                            {/* Row 2: Email and Phone */}
                            <div className="relative z-[55]">
                                <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-[0.25em] ml-1">Email ID</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-14 pr-6 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-[1.5rem] bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 outline-none font-bold shadow-sm transition-all" placeholder="Email Address" />
                                </div>
                            </div>

                            <div className="relative z-[55]">
                                <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-[0.25em] ml-1">Phone</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center">
                                        <span className="text-gray-500 dark:text-gray-400 font-black text-xs">+91</span>
                                        <span className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-3"></span>
                                    </div>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-20 pr-6 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-[1.5rem] bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 outline-none font-bold shadow-sm transition-all" placeholder="9876543210" />
                                </div>
                            </div>

                            {/* Row 3: Qualification and Year */}
                            <div className="relative z-[50]">
                                <CustomDropdown
                                    label="Highest Qualification"
                                    icon={GraduationCap}
                                    options={qualifications}
                                    value={formData.highestQualification}
                                    onChange={(val) => handleDropdownChange('highestQualification', val)}
                                    error={errors.highestQualification}
                                />
                                {formData.highestQualification === 'Other' && (
                                    <input type="text" name="otherQualification" value={formData.otherQualification} onChange={handleChange} className="w-full mt-4 px-6 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50 dark:text-white outline-none font-bold animate-in slide-in-from-top-2 duration-300" placeholder="Specify Qualification" />
                                )}
                            </div>

                            <div className="relative z-[50]">
                                <CustomDropdown
                                    label="Passing Year"
                                    icon={Calendar}
                                    options={years}
                                    value={formData.passingYear}
                                    onChange={(val) => handleDropdownChange('passingYear', val)}
                                    error={errors.passingYear}
                                />
                            </div>

                            {/* Row 4: College Name */}
                            <div className="md:col-span-2 relative z-[45]">
                                <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-[0.25em] ml-1">College Name</label>
                                <div className="relative group">
                                    <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors" />
                                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} className="w-full pl-14 pr-6 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-[1.5rem] bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:border-blue-500 outline-none font-bold shadow-sm transition-all" placeholder="University/College Name" />
                                </div>
                            </div>

                            {/* Row 5: Domain */}
                            <div className="md:col-span-2 relative z-[40]">
                                <CustomDropdown
                                    label="Interested Domain"
                                    icon={Briefcase}
                                    options={JOB_DOMAINS.map(d => d.title)}
                                    value={formData.interestedDomain}
                                    onChange={(val) => handleDropdownChange('interestedDomain', val)}
                                    searchable={true}
                                    error={errors.interestedDomain}
                                />
                            </div>

                            {/* Row 6: Skills */}
                            <div className="md:col-span-2 relative z-[30]">
                                <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-[0.25em] ml-1">Professional Skills</label>
                                {suggestedSkills.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400">
                                            <Sparkles className="w-4 h-4 fill-current" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Recommended Skills</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2.5">
                                            {suggestedSkills.map((skill, idx) => (
                                                <button key={idx} type="button" onClick={() => handleAddSkill(skill)} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-[10px] font-black rounded-xl border border-blue-100 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm">+ {skill}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="relative group">
                                    <Code2 className="absolute left-5 top-5 h-5 w-5 text-gray-400" />
                                    <textarea name="skills" value={formData.skills} onChange={handleChange} rows={4} className="w-full pl-14 pr-6 py-5 border-2 border-gray-100 dark:border-gray-800 rounded-[1.5rem] bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:border-blue-500 outline-none font-bold shadow-sm transition-all" placeholder="E.g. Java, Python, SQL..." />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 text-white font-black py-6 rounded-[2rem] hover:bg-blue-800 shadow-2xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-lg">
                                {isSubmitting ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <>COMPLETE REGISTRATION <Send className="w-6 h-6" /></>}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default RegistrationPage;
