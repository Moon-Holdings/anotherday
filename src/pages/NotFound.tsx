
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-anotherday-dark bg-opacity-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oops! This page does not exist.</p>
        <Link to="/dashboard">
          <Button className="bg-anotherday-mint hover:bg-anotherday-mint/90 text-anotherday-dark">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
