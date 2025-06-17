// React ke built-in hooks import kar rahe hain
import { useState, useRef, useEffect } from 'react'
// CSS file import ho rahi hai
import './App.css'
// Backend API call karne wali function import ho rahi hai
import { uploadFile } from './service/api'

function App() {
  // input file element ko control karne ke liye reference banaya
  const fileInputRef = useRef(null)

  // file ko store karne ke liye state
  const [file, setFile] = useState(null)

  const [result, setResult] = useState(null)

  // jab user button dabata hai, to chhupa hua input[type="file"] open karwa dete hain
  const handleFileSelect = () => {
    fileInputRef.current.click() 
  }

  // jab file choose hoti hai, to usse state mein set kar dete hain
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0] // sirf ek file pick kar rahe hain
    if (selectedFile) {
      setFile(selectedFile) // file ko yaad rakh le rahe
      console.log("File selected:", selectedFile.name) // file ka naam console mein print
    }
  }

  // jab bhi 'file' change hoti hai, useEffect trigger hota hai
  useEffect(() => {
    const getFile = async () => {
      if(file){ // agar file exist karti hai
        const formData = new FormData() // ek naya formData bag banaya
        formData.append("filename", file.name) // file ka naam usme daala
        formData.append("file", file) // actual file usme daal di

        // backend API ko call kiya (POST request)
        const response = await uploadFile(formData)
        console.log(response.path) // backend se jo reply aaya, woh console mein print
        setResult(response.path)
      }
    };
    getFile(); // useEffect ke andar function call
  }, [file] ) // dependency mein 'file', matlab file change hone par ye chalega

  // UI return kar rahe hain
  return (
    <>
      <div className='main-wrapper'>
        <div className="Centre-wrapper">
          <div className="main-container">
            <h1>File Upload</h1>
            <p>Upload your file here</p>

            {/* Button dabane par file input open hota hai */}
            <button onClick={handleFileSelect}>
              Upload File
            </button>
            
            {/* Agar koi file select ki gayi hai to uska naam dikhao */}
            
            {/* Chhupa hua input field jo file accept karta hai */}
            <input 
              type="file" 
              ref={fileInputRef} // isse reference se control karte hain
              onChange={handleFileChange} // file select hone par handleFileChange chalega
              id="file-input" 
              style={{display: 'none'}} // is input ko screen pe show nahi karna
            />
            <a href={result}>{result}</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
