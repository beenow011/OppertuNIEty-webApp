import { Clock } from "lucide-react";

function Waiting() {
  return (
    <div className="flex items-center justify-center min-h-96 bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <Clock className="w-12 h-12 mx-auto text-blue-400 animate-spin" />
        <h2 className="mt-4 text-2xl font-semibold">Awaiting Approval</h2>
        <p className="mt-2 text-gray-400">
          Your coordinator status is currently pending. Please check back later.
        </p>
      </div>
    </div>
  );
}

export default Waiting;
