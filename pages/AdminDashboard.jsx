import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building, MessageSquare, LogOut, LayoutDashboard,
  Search, RefreshCw, Mail, Phone, MapPin, GraduationCap, Calendar,
  Download, FileArchive
} from 'lucide-react';
import { api } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Data State
  const [students, setStudents] = useState([]);
  const [partners, setPartners] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Auth Check
  useEffect(() => {
    // We check for accessToken, but the API calls will also redirect if 401/Refresh fails
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/admin');
    } else {
      fetchData(activeTab);
    }
  }, [navigate, activeTab]);

  const fetchData = async (tab) => {
    setIsLoading(true);
    try {
      if (tab === 'students') {
        const data = await api.getStudents();
        if (data) setStudents(data);
      } else if (tab === 'partners') {
        const data = await api.getPartners();
        if (data) setPartners(data);
      } else if (tab === 'inquiries') {
        const data = await api.getInquiries();
        if (data) setInquiries(data);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
      // The interceptor handles redirection on auth failure
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/admin');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  // Filter Logic
  const filterData = (data) => {
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // --- STATUS UPDATE LOGIC ---
  const handleStatusChange = async (type, id, newStatus) => {
    try {
      if (type === 'student') {
        await api.updateStudentStatus(id, newStatus);
        setStudents(prev => prev.map(s => s._id === id ? { ...s, status: newStatus } : s));
      } else if (type === 'partner') {
        await api.updatePartnerStatus(id, newStatus);
        setPartners(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
      } else if (type === 'inquiry') {
        await api.updateInquiryStatus(id, newStatus);
        setInquiries(prev => prev.map(i => i._id === id ? { ...i, status: newStatus } : i));
      }
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    const lowerStatus = status ? status.toLowerCase() : '';
    switch (lowerStatus) {
      case 'placed':
      case 'active':
      case 'resolved':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'rejected':
      case 'inactive':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'shortlisted':
      case 'contacted':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'pending':
      case 'new':
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
  };


  // --- DOWNLOAD LOGIC ---

  const convertToCSV = (objArray) => {
    if (!objArray || objArray.length === 0) return '';

    // Get headers
    const header = Object.keys(objArray[0]).join(',');

    // Get values
    const rows = objArray.map(obj => {
      return Object.values(obj).map(value => {
        // Handle strings with commas by wrapping in quotes
        const stringValue = String(value);
        return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
      }).join(',');
    });

    return [header, ...rows].join('\n');
  };

  const downloadFile = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadCurrent = () => {
    let data = [];
    let filename = '';

    if (activeTab === 'students') {
      data = students;
      filename = `students_data_${new Date().toISOString().slice(0, 10)}.csv`;
    } else if (activeTab === 'partners') {
      data = partners;
      filename = `partners_data_${new Date().toISOString().slice(0, 10)}.csv`;
    } else if (activeTab === 'inquiries') {
      data = inquiries;
      filename = `inquiries_data_${new Date().toISOString().slice(0, 10)}.csv`;
    }

    if (data.length === 0) {
      alert("No data available to download.");
      return;
    }

    const csvData = convertToCSV(data);
    downloadFile(csvData, filename, 'text/csv');
  };

  const handleDownloadAllZip = async () => {
    setIsDownloading(true);

    try {
      // Dynamically import JSZip from CDN to avoid build errors if package is missing
      const { default: JSZip } = await import('https://esm.sh/jszip@3.10.1');

      // 1. Fetch all data fresh
      const [studentsData, partnersData, inquiriesData] = await Promise.all([
        api.getStudents(),
        api.getPartners(),
        api.getInquiries()
      ]);

      const zip = new JSZip();

      // 2. Add files to zip
      if (studentsData && studentsData.length > 0) {
        zip.file("students.csv", convertToCSV(studentsData));
      }
      if (partnersData && partnersData.length > 0) {
        zip.file("partners.csv", convertToCSV(partnersData));
      }
      if (inquiriesData && inquiriesData.length > 0) {
        zip.file("inquiries.csv", convertToCSV(inquiriesData));
      }

      // 3. Generate Zip
      const content = await zip.generateAsync({ type: "blob" });

      // 4. Download
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NetTech_Admin_Data_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error creating zip:", error);
      alert("Failed to download all data. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-blue-900 text-white flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5 rounded-lg">
              {/* Small Logo Placeholder */}
              <LayoutDashboard className="w-6 h-6 text-blue-900" />
            </div>
            <span className="text-lg font-bold">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'students' ? 'bg-blue-700 text-white shadow-md' : 'text-blue-200 hover:bg-blue-800'}`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Students</span>
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'partners' ? 'bg-blue-700 text-white shadow-md' : 'text-blue-200 hover:bg-blue-800'}`}
          >
            <Building className="w-5 h-5" />
            <span>Partners</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'inquiries' ? 'bg-blue-700 text-white shadow-md' : 'text-blue-200 hover:bg-blue-800'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Inquiries</span>
          </button>
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab === 'students' ? 'Student Registrations' : activeTab === 'partners' ? 'Hiring Partners' : 'Inquiries'}
          </h2>

          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <button
                onClick={handleDownloadCurrent}
                className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm whitespace-nowrap"
                title="Download current tab as CSV"
              >
                <Download className="w-4 h-4" />
                <span>CSV</span>
              </button>

              <button
                onClick={handleDownloadAllZip}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm whitespace-nowrap"
                title="Download ALL data as ZIP"
                disabled={isDownloading}
              >
                {isDownloading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileArchive className="w-4 h-4" />}
                <span>{isDownloading ? 'Zipping...' : 'All (Zip)'}</span>
              </button>

              <button
                onClick={() => fetchData(activeTab)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Cards (Simplified) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 mr-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">{students.length || '-'}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-green-100 rounded-full text-green-600 mr-4">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Partners</p>
                <h3 className="text-2xl font-bold">{partners.length || '-'}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-orange-100 rounded-full text-orange-600 mr-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Inquiries</p>
                <h3 className="text-2xl font-bold">{inquiries.length || '-'}</h3>
              </div>
            </div>
          </div>

          {/* Data Tables */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              {activeTab === 'students' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                      <th className="p-4 font-semibold">Name & Contact</th>
                      <th className="p-4 font-semibold">Education</th>
                      <th className="p-4 font-semibold">Domain & Skills</th>
                      <th className="p-4 font-semibold">Location</th>
                      <th className="p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filterData(students).length > 0 ? filterData(students).map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{student.fullName}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Mail className="w-3 h-3 mr-1" /> {student.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-0.5">
                            <Phone className="w-3 h-3 mr-1" /> {student.phone}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-gray-900">{student.highestQualification}</div>
                          <div className="text-xs text-gray-500">{student.collegeName}</div>
                          <div className="text-xs text-gray-400">Batch: {student.passingYear}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-blue-700">{student.interestedDomain}</div>
                          <div className="text-xs text-gray-500 mt-1 max-w-[150px] truncate" title={student.skills}>
                            {student.skills}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                            {student.city}, {student.state}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{formatDate(student.createdAt)}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={student.status}
                            onChange={(e) => handleStatusChange('student', student._id, e.target.value)}
                            className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer outline-none focus:ring-2 focus:ring-opacity-50 transition-colors ${getStatusColor(student.status)}`}
                          >
                            <option value="New">New</option>
                            <option value="Pending">Pending</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Placed">Placed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">
                          {isLoading ? 'Loading data...' : 'No students found.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === 'partners' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                      <th className="p-4 font-semibold">Company</th>
                      <th className="p-4 font-semibold">Contact Person</th>
                      <th className="p-4 font-semibold">Requirements</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filterData(partners).length > 0 ? filterData(partners).map((partner) => (
                      <tr key={partner._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{partner.companyName}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Mail className="w-3 h-3 mr-1" /> {partner.email}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-900">{partner.contactPerson}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Phone className="w-3 h-3 mr-1" /> {partner.phone}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate" title={partner.requirements}>
                            {partner.requirements || 'N/A'}
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={partner.status}
                            onChange={(e) => handleStatusChange('partner', partner._id, e.target.value)}
                            className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer outline-none focus:ring-2 focus:ring-opacity-50 transition-colors ${getStatusColor(partner.status)}`}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {formatDate(partner.createdAt)}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">
                          {isLoading ? 'Loading data...' : 'No partners found.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === 'inquiries' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">Subject</th>
                      <th className="p-4 font-semibold">Message</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filterData(inquiries).length > 0 ? filterData(inquiries).map((inquiry) => (
                      <tr key={inquiry._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{inquiry.name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Mail className="w-3 h-3 mr-1" /> {inquiry.email}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Phone className="w-3 h-3 mr-1" /> {inquiry.phone}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {inquiry.subject}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-600 max-w-sm whitespace-pre-wrap">{inquiry.message}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={inquiry.status || 'New'}
                            onChange={(e) => handleStatusChange('inquiry', inquiry._id, e.target.value)}
                            className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer outline-none focus:ring-2 focus:ring-opacity-50 transition-colors ${getStatusColor(inquiry.status || 'New')}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {formatDate(inquiry.createdAt)}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">
                          {isLoading ? 'Loading data...' : 'No inquiries found.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;