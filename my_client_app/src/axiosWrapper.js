import axios from 'axios';

 const baseURL = 'http://djangoservermani.pythonanywhere.com'; // Replace with your API base URL
// const baseURL = 'http://127.0.0.1:8000'; // Replace with your API base URL
// 
const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Timeout in milliseconds
});

// Wrapper function for GET request
async function get(endpoint) {
  try {
    const response = await axiosInstance.get(endpoint);
    return response;
  } catch (error) {
    console.log(error.data);
    throw new Error(`Error fetching data from ${endpoint}: ${error.data}`);
  }
}

// Wrapper function for POST request
async function post(endpoint, data) {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error posting data to ${endpoint}: ${error.message}`);
  }
}

// Wrapper function for PUT request
async function put(endpoint, data) {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error updating data at ${endpoint}: ${error.message}`);
  }
}

// Wrapper function for DELETE request
async function remove(endpoint) {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error deleting data at ${endpoint}: ${error.message}`);
  }
}

export { get, post, put, remove };
