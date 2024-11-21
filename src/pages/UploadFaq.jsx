import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Plus, Send } from "lucide-react";
import { useWeb3Context } from "../context/useWeb3Context";
import toast from "react-hot-toast";

function UploadFaq() {
  const { id } = useParams();
  const { Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/mock-interview/get-interview-questions/${id}?address=${selectedAccount}`
        );
        console.log(res.data);
        setQuestions(res.data.data);
        if (res.data.data.length > 0) {
          const updatedRounds = res.data.data.map((question) => {
            return {
              round: question.round,
              questions: question.questions,
              loading: false,
              upload: true,
            };
          });
          setRounds(updatedRounds);
        }
      } catch (e) {
        toast.error("Error fetching questions");
        console.log(e);
      }
    };
    if (selectedAccount) getQuestions();
  }, [selectedAccount]);

  console.log(questions);

  const [rounds, setRounds] = useState([
    { round: "", questions: "", loading: false, upload: false },
  ]);

  const handleRoundChange = (index, field, value) => {
    const updatedRounds = [...rounds];
    updatedRounds[index][field] = value;
    setRounds(updatedRounds);
  };

  const addRound = () => {
    setRounds([...rounds, { round: "", questions: "", loading: false }]);
  };

  const uploadRoundSpecific = async (index) => {
    // Create a copy of rounds and update loading for specific round
    const updatedRounds = [...rounds];
    updatedRounds[index].loading = true;
    setRounds(updatedRounds);

    try {
      const url = `http://localhost:3000/api/mock-interview/upload-interview-questions/${id}?address=${selectedAccount}`;
      const response = await axios.post(url, {
        round: rounds[index].round,
        questions: rounds[index].questions,
      });
      const finalRounds = [...rounds];
      finalRounds[index].upload = true;
      setRounds(finalRounds);
      toast.success(`${rounds[index].round} Round uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${rounds[index].round} round:`, error);
      toast.error(`Error uploading ${rounds[index].round} round`);
    } finally {
      // Reset loading for the specific round
      const finalRounds = [...rounds];
      finalRounds[index].loading = false;
      setRounds(finalRounds);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-md shadow-lg max-w-7xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Upload FAQ</h1>
      <div className="space-y-6">
        {rounds.map((round, index) => (
          <div
            key={index}
            className={`space-y-4 border-b border-gray-600 pb-4 ${
              round.upload ? "bg-gray-900" : "bg-gray-800"
            } p-4 rounded-md`}
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Round Type:
              </label>
              <select
                value={round.round}
                onChange={(e) =>
                  handleRoundChange(index, "round", e.target.value)
                }
                disabled={round.upload} // Disable select if round is already uploaded
                className={`w-full p-2 rounded-md ${
                  round.upload
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gray-800"
                } border border-gray-600 text-white`}
              >
                <option value="" disabled>
                  Select a round type
                </option>
                <option value="Technical">Technical</option>
                <option value="Managerial">Managerial</option>
                <option value="HR">HR</option>
                <option value="Group Discussion">Group Discussion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Questions:
              </label>
              <textarea
                value={round.questions}
                onChange={(e) =>
                  handleRoundChange(index, "questions", e.target.value)
                }
                placeholder="Enter questions for this round (one per line)"
                disabled={round.upload} // Disable textarea if round is already uploaded
                className={`w-full p-2 rounded-md ${
                  round.upload
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gray-800"
                } border border-gray-600 text-white h-96`}
              />
            </div>
            {!round.upload && (
              <button
                onClick={() => uploadRoundSpecific(index)}
                disabled={round.loading || !round.round}
                className={`flex items-center gap-2 ${
                  round.loading || !round.round
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white px-4 py-2 rounded-md`}
              >
                <Send size={16} />
                {round.loading
                  ? "Uploading..."
                  : `Upload ${round.round || "Round"}`}
              </button>
            )}
            {round.upload && (
              <div className="text-green-400 text-sm mt-2">
                ✅ {round.round} Round uploaded successfully
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addRound}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus size={16} />
          Add Round
        </button>
      </div>
    </div>
  );
}

export default UploadFaq;
