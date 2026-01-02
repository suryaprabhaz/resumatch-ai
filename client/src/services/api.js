import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const analyzeResume = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};