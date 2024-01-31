import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHeart, faUsers } from '@fortawesome/free-solid-svg-icons';
import useLocation from 'wouter/use-location';

export default function LandingPage({loggedin}: {loggedin: boolean | undefined}) {
  const [location, setLocation] = useLocation()

  function handleJoinClick() {
    loggedin ? setLocation('/home') : setLocation('/auth')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Clean Room Club!</h1>
      <p className="text-lg mb-8">Step into a world of cleanliness and accountability.</p>
      
      <button onClick={handleJoinClick} className="bg-emerald-700 text-white py-3 px-8 rounded-full mb-8 hover:bg-emerald-500 transition duration-300 focus:outline-none focus:ring focus:border-emerald-600 border-emerald-300 border">
        Join the Club
      </button>


      <div>
        <div className="flex items-center mb-12">
          <div className="mr-4">
            <FontAwesomeIcon icon={faCamera} className="text-4xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Upload Photos</h2>
            <p>Start your day by capturing the beauty of your clean living space.</p>
          </div>
        </div>
{/* 
        <div className="flex items-center mb-12">
          <div className="mr-4">
            <FontAwesomeIcon icon={faHeart} className="text-4xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Earn Streaks</h2>
            <p>Build streaks as you consistently keep your room clean and organized.</p>
          </div>
        </div> */}

        <div className="flex items-center mb-12">
          <div className="mr-4">
            <FontAwesomeIcon icon={faUsers} className="text-4xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Community Motivation</h2>
            <p>Connect with others, share your achievements, and get inspired by their progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
