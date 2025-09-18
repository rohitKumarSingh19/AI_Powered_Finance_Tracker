// import { useState } from "react";
// import API from "../services/api";

// export default function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await API.post("/transactions/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("File uploaded & parsed successfully!");
//       window.location.reload(); // reload to fetch new transactions
//     } catch (error) {
//       console.error(error);
//       alert("Failed to upload file");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center gap-2 mb-4">
//       <input
//         type="file"
//         accept=".pdf,.csv,.txt"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="border p-2"
//       />
//       <button
//         onClick={handleUpload}
//         disabled={loading}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Processing..." : "Upload"}
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import API from "../services/api";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/transactions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ File uploaded & parsed successfully!");
      window.location.reload(); // reload transactions
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to upload file");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* File input */}
      <input
        type="file"
        accept=".pdf,.csv,.txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-600 
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-600
                   hover:file:bg-blue-100"
      />

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm 
                   hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Upload"}
      </button>

      {/* Status message */}
      {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
    </div>
  );
}
