import axios from 'axios';

// Configuration
const API_BASE_URL = (import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:5000/api';

// Create Axios Instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
// Inject Access Token into every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
// Handle 401 Unauthorized and Refresh Token Flow
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call the refresh endpoint
        const response = await axios.post(`${API_BASE_URL}/admin/refresh-token`, {
          refreshToken: refreshToken,
        });

        const { accessToken } = response.data;

        // Save new token
        localStorage.setItem('accessToken', accessToken);

        // Update authorization header for the original request
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails (expired or invalid), log out user
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('adminToken'); // Cleanup legacy key if exists

        // Redirect to login
        window.location.href = '/admin';
        return Promise.reject(refreshError);
      }
    }

    // Return the error content directly if available, or the axios error
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(errorMessage));
  }
);

// --- API Methods ---

export const api = {
  // Student Registration
  registerStudent: async (data) => {
    const response = await apiClient.post('/students/register', data);
    return response.data;
  },

  // Partner Registration
  registerPartner: async (data) => {
    const response = await apiClient.post('/partners/register', data);
    return response.data;
  },

  // General Contact/Inquiry
  submitInquiry: async (data) => {
    const response = await apiClient.post('/inquiries/submit', data);
    return response.data;
  },

  // --- Admin Endpoints ---

  // Admin Login
  adminLogin: async (credentials) => {
    const response = await apiClient.post('/admin/login', credentials);
    return response.data;
  },

  // Fetch Students (Protected - Interceptor handles token)
  getStudents: async () => {
    const response = await apiClient.get('/admin/students');
    return response.data;
  },

  // Fetch Partners (Protected - Interceptor handles token)
  getPartners: async () => {
    const response = await apiClient.get('/admin/partners');
    return response.data;
  },

  // Fetch Inquiries (Protected - Interceptor handles token)
  getInquiries: async () => {
    const response = await apiClient.get('/admin/inquiries');
    return response.data;
  },

  // Update Student Status
  updateStudentStatus: async (id, status) => {
    const response = await apiClient.post('/admin/students/status', { id, status });
    return response.data;
  },

  // Update Partner Status
  updatePartnerStatus: async (id, status) => {
    const response = await apiClient.post('/admin/partners/status', { id, status });
    return response.data;
  },

  // Update Inquiry Status
  updateInquiryStatus: async (id, status) => {
    const response = await apiClient.post('/admin/inquiries/status', { id, status });
    return response.data;
  },
};