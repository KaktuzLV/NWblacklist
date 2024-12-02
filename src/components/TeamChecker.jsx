import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EditedText from './EditTeam';

function TeamChecker() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleCheckTeam = async () => {
    setLoading(true);
    try {
      const result = await window.electronAPI.captureMainDisplay();
      console.log(result);
      setResult(result);
      toast.info("Team check complete!", {
        position: "bottom-right",
        theme: "dark",
      });
    } catch (error) {
      toast.error("Error capturing display", {
        position: "bottom-right",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={handleCheckTeam}
        disabled={loading}
      >
        {loading ? "Processing..." : "Check Team"}
      </button>
      <EditedText result={result} />
    </div>
  );
}

export default TeamChecker;
