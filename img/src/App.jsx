import { useState, createRef } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  function imgchange(e){
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = async () => {
        const base64Image = reader.result;
        try {
            const response = await fetch("http://localhost:9000/api/v1/image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ image: base64Image })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    }
  }

  return (
    <div className='app'>
      <h1 className='imgprocess'>Image processing</h1>
      <input onChange={imgchange}  className='ip' type='file' />
      <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", marginTop: "10px", borderRadius: "10px" }}
          />
    </div>
  )
}

export default App
