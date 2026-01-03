
import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Send, AlertCircle, CheckCircle, RefreshCcw, Tag } from 'lucide-react';
import { api } from '../services/api';
import CustomDropdown from '../components/CustomDropdown';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const subjectOptions = [
        'General Inquiry',
        'Student Registration',
        'Hiring Partner Inquiry',
        'Feedback'
    ];

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
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownChange = (val) => {
        setFormData({ ...formData, subject: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            setSubmitStatus({ type: 'error', message: 'Valid 10-digit mobile number required.' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            await api.submitInquiry(formData);
            setSubmitStatus({ type: 'success', message: 'Message sent! We will respond within 24 hours.' });
            setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            setSubmitStatus({ type: 'error', message: error.message || 'Submission failed.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <section className="bg-gray-900 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Connect with us</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">Have questions? Our team is ready to support your career journey.</p>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Contact Information</h2>
                        <div className="space-y-6">
                            {[
                                { icon: MapPin, title: 'Visit Us', text: '102, Ratnamani Building, Dada Patil Wadi, Thane West, Mumbai - 400602' },
                                { icon: Phone, title: 'Call Us', text: '+91 816 938 4252 / +91 75067 43540' },
                                { icon: Mail, title: 'Email Us', text: 'alliances@nettechindia.com' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                                    <item.icon className="w-6 h-6 text-blue-600 mt-1 mr-5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white uppercase text-[10px] tracking-widest mb-1">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-80 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                            <iframe src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=NetTech%20India%2C%20102%2C%20Ratnamani%20Building%2C%20Dada%20Patil%20Wadi%2C%20Opp%20ICICI%20ATM%2C%20Near%20Platform%20No.1%2C%20Thane%20West+(NetTech%20India)&t=&z=16&ie=UTF8&iwloc=B&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"></iframe>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 transition-colors">
                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Send a Message</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">We'll get back to you within 24 hours.</p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {submitStatus.message && (
                                <div className={`p-5 rounded-2xl flex items-center border ${submitStatus.type === 'success' ? 'bg-green-50 border-green-100 text-green-700 dark:bg-green-900/20' : 'bg-red-50 border-red-100 text-red-700 dark:bg-red-900/20'}`}>
                                    {submitStatus.type === 'success' ? <CheckCircle className="w-6 h-6 mr-3" /> : <AlertCircle className="w-6 h-6 mr-3" />}
                                    <span className="font-bold text-sm">{submitStatus.message}</span>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:border-blue-500 outline-none font-bold" placeholder="Full Name" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Phone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:border-blue-500 outline-none font-bold" placeholder="9876543210" required />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <CustomDropdown
                                    label="Select Subject"
                                    icon={Tag}
                                    options={subjectOptions}
                                    value={formData.subject}
                                    onChange={handleDropdownChange}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white focus:border-blue-500 outline-none font-bold" rows={4} placeholder="Your message here..." required></textarea>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl hover:bg-blue-800 active:scale-95 flex items-center justify-center gap-3">
                                {isSubmitting ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <>SEND MESSAGE <Send className="w-5 h-5" /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
