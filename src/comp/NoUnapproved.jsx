import { CheckCircle } from "lucide-react";

function NoUnapproved() {
  return (
    <div className="flex items-center justify-center min-h-96 bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <CheckCircle className="w-12 h-12 mx-auto text-green-400" />
        <h2 className="mt-4 text-2xl font-semibold">
          All Coordinators Approved!
        </h2>
        <p className="mt-2 text-gray-400">
          There are currently no coordinators pending approval.
        </p>
      </div>
    </div>
  );
}

export default NoUnapproved;
