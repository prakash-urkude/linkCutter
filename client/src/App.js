import Animation from './Animation';
import './App.css';
import React,{ useState, useEffect } from 'react';
import { BiCut } from 'react-icons/bi';
import { AiOutlineCheck } from 'react-icons/ai';
import axios from "axios";

function App() {

  const [input , setInput] = useState({link:""})
  const [shortUrl , setShortUrl] = useState("")

  const handleChange = (e) =>{
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = async(e) =>{
    console.log(input)
    e.preventDefault();
    try{
      const {data} = await axios.post("http://localhost:3001/url",{
        longUrl:input.link
      })
      console.log(data)
      setShortUrl(data.data.shortUrl)
      console.log(data.data.shortUrl)
      if(data.status){
        window.alert("short successfully")
      }
    }
    catch(error){
      window.alert(error.response.data.message)
    }
  }
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(shortUrl);
    window.alert("copied to clipboard");
  };
  
  
  return (
    <>
    <Animation/>
    
    <form className='grid grid-cols place-items-center '  onSubmit={handleSubmit} >
    <div className="App max-w-400 p-10 border-double border-black border-8 top-40 " >
      <div className='h1 bg-gray-400 text-blue-600 flex justify-center font-bold  text-8xl p-5'>
        Link  <span className="bicut-icon" > < BiCut /> </span> <span>  Cutter </span>
      </div>
      <div className='flex justify-center py-5 gap-5'>
        <input className='border-black border-2 text-2xl px-5 w-full' name="link" onChange={handleChange}  placeholder='longlink'/>
        <button  className='button font-bold border-2 bg-blue-600 p-2 rounded-md'  > <AiOutlineCheck /> </button>
      </div>
      
      <div className ="flex justify-center py-5 gap-5">
      <input className='pholder border-black border-2 text-2xl px-5 w-full' placeholder='shortlink' value={shortUrl} onChange={setShortUrl} />
      <button className='button font-bold border-2  font-size: 10px; bg-blue-600 p-2 rounded-md' onClick={handleCopy}>copy</button>
      </div>
    </div>
    </form>
    </>
  );
}

export default App;
