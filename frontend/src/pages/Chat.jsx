import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Paperclip, Mic, Send, X } from "lucide-react"; // icons
import { motion } from "framer-motion";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfFile, setPdfFile] = useState(null); // store uploaded PDF

 const sendMessage = async () => {
  if (!question.trim()) return;

  // Show user message immediately
  const newMessages = [
    ...messages,
    { role: "user", content: question },
  ];
  setMessages(newMessages);

  setLoading(true);
  setError("");
  setQuestion(""); // clear input

  try {
    const res = await axios.post("http://localhost:4000/api/chat", {
      question,
      pdf: pdfFile?.name || null,
    });

    // Add assistant reply
    setMessages([
      ...newMessages,
      { role: "assistant", content: res.data.answer },
    ]);
  } catch (err) {
    console.error("Chat API Error:", err);
    setError("Failed to send message. Check console for details.");
  } finally {
    setLoading(false);
  }
};


  const uploadPDF = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
      // ✅ Check if file is a PDF
  if (file.type !== "application/pdf") {
    alert("Please upload a valid PDF file.");
    e.target.value = ""; // reset file input
    return;
  }
    setPdfFile(file);
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4000/api/pdf/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("PDF Upload Response:", res.data);
    } catch (err) {
      console.error("PDF Upload Error:", err);
      setError("PDF upload failed. Check console for details.");
      setPdfFile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br bg-[#212121] p-4 items-center justify-center">
      {/* Chat Box */}
      <div className="flex-1 bg-[#212121] rounded-lg p-4 w-[80%]  overflow-y-auto mb-4 mt-6 scrollbar-hide  ">
        {messages.length === 0 && !loading && (
            <p className="text-gray-400 text-5xl text-center mt-50">
              What can I help with?
            </p>
        )}
       

{messages.map((msg, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className={`mb-3 mt-5 ${msg.role === "user" ? "text-right" : "text-left"}`}
  >
    <div
      className={`inline-block px-4 py-3 text-lg rounded-3xl max-w-[70%] break-words
      ${msg.role === "user" ? "bg-[#303030] text-white" : "bg-[#212121] text-gray-200"}`}
    >
      <ReactMarkdown>{msg.content}</ReactMarkdown>
    </div>
  </motion.div>
))}
{loading && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="mb-3 mt-5 text-left"
  >
    <div className="inline-block px-4 py-3 text-lg rounded-3xl bg-[#212121] text-gray-200">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  </motion.div>
)}


      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-2">
          {error}
        </div>
      )}

      {/* Input Area */}
      <div className="bg-[#303030] rounded-full w-[80%] px-4 py-3 flex items-center gap-2 shadow-lg mb-5">
        {/* PDF Upload */}
        <label className="cursor-pointer">
          <Paperclip className="text-gray-400 hover:text-white" />
          <input type="file" className="hidden" onChange={uploadPDF} />
        </label>

        {/* Uploaded PDF preview */}
        {pdfFile && (
          <div className="flex items-center bg-gray-700 px-3 py-1 rounded-lg text-sm text-white">
            <span className="truncate max-w-[150px]">{pdfFile.name}</span>
            <button
              onClick={() => setPdfFile(null)}
              className="ml-2 text-gray-300 hover:text-red-400"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
          className="flex-1 bg-transparent text-white focus:outline-none px-2"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <Mic className="text-gray-400 hover:text-white cursor-pointer" />
        <button
          onClick={sendMessage}
          className=" hover:bg-white rounded-full p-2 transition"
          disabled={loading}
        >
          {loading ? (
            <span className="text-white text-sm px-2">...</span>
          ) : (
            <Send className="text-white hover:text-black" size={18} />
          )}
        </button>
      </div>
    </div>
  );
}
