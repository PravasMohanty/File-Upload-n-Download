// axios ek library hai jo API (HTTP request) bhejne mein help karti hai
import axios from "axios"

// Ye backend server ka address hai — jahan hum file bhej rahe hain
const API_URL = "http://localhost:5000"

// Ye function file ko backend pe upload karne ka kaam karta hai
export const uploadFile = async (data) => {
  try {
    // POST request bhej rahe hain: form data ko /upload route pe bhej rahe hain
    const response = await axios.post(`${API_URL}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // Agar backend ne successfully kuch response bheja to uska data return kar rahe hain
    return response.data
  } catch (error) {
    // Agar beech mein koi error aayi (jaise server down ho ya koi galti), to console mein dikhate hain
    console.error("Error while calling the api:", error)
    throw error.response?.data || error
  }
}