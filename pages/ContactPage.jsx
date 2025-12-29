import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Specific validation for Phone
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
            setSubmitStatus({ type: 'error', message: 'Please enter a valid 10-digit Indian mobile number.' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            await api.submitInquiry(formData);
            setSubmitStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
            setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            setSubmitStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Hero Header */}
            <section className="bg-gray-900 text-white py-16 text-center reveal active">
                <h1 className="text-4xl font-extrabold mb-4">Get in Touch</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Have questions about our placement process or training programs? We're here to help.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Contact Info & Map */}
                    <div className="space-y-10 reveal">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Visit Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            201, Ratnamani Building, Dada Patil Wadi,<br />
                                            Opp ICICI ATM, Near Platform No.1,<br />
                                            Thane West, Maharashtra 400602
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Call Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400">+91 816 938 4252 / +91 75067 43540</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Mon - Sat, 9am - 7pm</p>
                                    </div>
                                </div>
                                <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Email Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400">alliances@nettechindia.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-300 relative z-0">
                            <iframe
                                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=NetTech%20India%2C%20102%2C%20Ratnamani%20Building%2C%20Dada%20Patil%20Wadi%2C%20Opp%20ICICI%20ATM%2C%20Near%20Platform%20No.1%2C%20Thane%20West+(NetTech%20India)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="NetTech India Location"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-10 reveal">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {submitStatus.message && (
                                <div className={`p-4 rounded-lg flex items-center ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                                    {submitStatus.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                                    {submitStatus.message}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
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
                                            className="w-full pl-16 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="9876543210"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option>General Inquiry</option>
                                    <option>Student Registration</option>
                                    <option>Hiring Partner Inquiry</option>
                                    <option>Feedback</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    rows={5}
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                            >
                                {isSubmitting ? 'Sending...' : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;