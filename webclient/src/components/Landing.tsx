import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUsers } from '@fortawesome/free-solid-svg-icons';
import useLocation from 'wouter/use-location';

export default function LandingPage({loggedin}: {loggedin: boolean | undefined}) {
  const [_location, setLocation] = useLocation()

  function handleJoinClick() {
    loggedin ? setLocation('/home') : setLocation('/auth')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
      <h1 className="text-4xl font-bold my-6" style={{textShadow: 'black 1px 1px 3px'}}>Welcome to the Clean Room Club!</h1>
      <p className="text-lg mb-8" style={{textShadow: 'black 2px 2px 2px'}}>Step into a world of <strong>cleanliness</strong> and <strong>accountability</strong>.</p>
      
      <button onClick={handleJoinClick} className="bg-emerald-700 text-white py-3 px-8 rounded-full mb-8 hover:bg-emerald-500 transition duration-300 focus:outline-none focus:ring focus:border-emerald-600 border-emerald-300 border">
        Join the Club
      </button>

      <section className="mb-8 p-4 max-w-prose bg-white shadow-md rounded-lg">
        <h2 className="text-lg text-emerald-800 font-bold mb-4">How It Works</h2>
        <p className="text-sm text-gray-600">
          At Clean Room Club, we understand that a clean environment is not just about aesthetics; it’s about fostering a sense of peace, accomplishment, and mental well-being.
        </p>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>
            <strong>Upload Your Clean Room Photos:</strong> After organizing your space, capture the calm and order you've created. This simple act can inspire others to find their own peace through cleanliness, reinforcing the connection between a clutter-free space and a serene mind.
          </li>
          <li className="mt-2">
            <strong>Explore for Inspiration:</strong> Delve into a collection of clean rooms from around the world. Let these images ignite your creativity and motivate you to cultivate a haven of your own, knowing that each clean space contributes to a clearer, more peaceful mind.
          </li>
          <li className="mt-2">
            <strong>Build a Habit:</strong> Regular engagement with this positive cycle promotes a habit of mindfulness and self-care, reinforcing the link between physical space and mental health.
          </li>
        </ul>
      </section>
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
