import React from 'react'
import { FaMicrophone,FaImage, FaFileAlt, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
         <div className="text-center flex-1 w-full h-screen  text-white">
        <div className="max-w-6xl mx-auto p-8 pt-60">
          <h1 className="text-4xl font-bold font-boldonse leading-relaxed">
            Intellix,Your Complete AI Toolkit in One Platform
          </h1>
          <p className="mt-4 text-2xl">
            Analyze conversations, mark deadlines, and summarize documents
            effortlessly.
          </p>
          <p className="mt-1 text-2xl">
           AIMind is your all-in-one multi-modal AI playground.
          </p>
          <Link to='/chat'><button className="text-1xl px-6 py-3 mt-6 rounded-full bg-gradient-to-tr from-[#232424] to-black/90 hover:scale-105 transition-all duration-200 shadow-md">
            Get Started
          </button></Link>
          
        </div>
        <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-5 mt-8">
<Link to='/task'><div className="flex-1 bg-black/60 rounded-2xl p-7 transform transition duration-300 hover:scale-105 hover:bg-black/80">
            <div className="flex justify-center items-center gap-2"><FaBell className='text-2xl text-yellow-400'/>
            <h2 className="text-lg font-bold">Task Reminder</h2></div>
            <p className="text-left mt-1">
Mark your deadlines and get timely reminders to keep you on track effortlessly.            </p>
          </div></Link>
          
<Link to='chat'><div className="flex-1 bg-black/60 rounded-2xl p-7 transform transition duration-300 hover:scale-105 hover:bg-black/80">
            <div className="flex justify-center items-center gap-2" ><FaFileAlt className="text-2xl text-blue-400" />
              <h2 className="text-lg font-bold">
            Document Summarization
            </h2></div>
            
            <p className="text-left mt-1">
              Upload your PDFs and ask questions—get clear, concise answers and summaries from your documents instantly.
            </p>
          </div></Link>
          
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home