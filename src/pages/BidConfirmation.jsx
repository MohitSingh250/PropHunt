import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function BidConfirmation() {
  const { state } = useLocation();
  const { bidAmount, property, auction } = state || {};

  if (!state) {
    return <div>Invalid confirmation</div>;
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      <h2 className="mt-3 text-lg font-medium text-gray-900">
        Bid Successfully Placed!
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Your bid of ${bidAmount.toLocaleString()} has been submitted for {property.title}.
      </p>
      <div className="mt-6">
        <a
          href={`/properties/${property.id}`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Property
        </a>
      </div>
    </div>
  );
}