import useLocation from 'wouter/use-location';

export default function LandingPage({loggedin}: {loggedin: boolean | undefined}) {
  const [_location, setLocation] = useLocation()

  function handleJoinClick() {
    loggedin ? setLocation('/home') : setLocation('/auth')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 via-teal-600 to-green-600 text-white">
      <h1 className="text-4xl font-bold m-6" style={{textShadow: 'rgba(10, 10, 10, 1) 1px 1px 3px'}}>Welcome to the <span className='text-emerald-100'>Clean Room Club</span>!</h1>      

      {/* <section className="mb-0 p-6 max-w-prose text-center">
        <p className="text-md text-white text-xl font-bold">
          Enhance mental wellness through cleanliness, achieving mental clarity, stress reduction, and a sense of accomplishment.
        </p>
      </section> */}

      <div className="flex items-center justify-center mb-24 max-w-prose flex-col">
          <section className="mb-0 p-6 max-w-lg text-center"><p className="text-2xl font-bold text-white">Enhance mental wellness through cleanliness, achieving mental clarity, stress reduction, and a sense of accomplishment.</p></section>
          <button className="rounded-full border-2 border-emerald-300 bg-gradient-to-r from-emerald-700 to-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:border-emerald-400 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600 focus:ring-opacity-50">Join the Club</button>
      </div>


      {/* <button onClick={handleJoinClick} className="hover:scale-110 bg-gradient-to-r from-emerald-700 to-emerald-500 text-white py-3 px-8 rounded-full mb-24 hover:bg-emerald-600 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-600 focus:ring-opacity-50 shadow-lg text-lg font-semibold border-2 border-emerald-300 hover:border-emerald-400">
        Join the Club
      </button> */}


      {/* <section className="mb-8 p-4 max-w-prose rounded-lg">
        <h2 className="text-xl text-emerald-50 font-bold mb-4">How It Works?</h2>
        <p className="text-lg text-emerald-50">
          The Clean Room Club champions the link between cleanliness and mental wellness. Here’s how you can engage:
        </p>
        <ul className="list-none pl-5 mt-2 text-2xl text-emerald-50">
          <li className='pb-4'><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)', display: 'inline'}}><path d="M12 9c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3z"></path><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5z"></path></svg>
            <strong> Share Photos: </strong> Inspire by uploading images of your organized space.
          </li>
          <li className='pb-4'>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)', display: 'inline'}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M14.829 14.828a4.055 4.055 0 0 1-1.272.858 4.002 4.002 0 0 1-4.875-1.45l-1.658 1.119a6.063 6.063 0 0 0 1.621 1.62 5.963 5.963 0 0 0 2.148.903 6.042 6.042 0 0 0 2.415 0 5.972 5.972 0 0 0 2.148-.903c.313-.212.612-.458.886-.731.272-.271.52-.571.734-.889l-1.658-1.119a4.017 4.017 0 0 1-.489.592z"></path><circle cx="8.5" cy="10.5" r="1.5"></circle><circle cx="15.493" cy="10.493" r="1.493"></circle></svg>
            <strong> Find Inspiration:</strong> Browse clean rooms globally for motivation.
          </li>
          <li className='pb-4'>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)', display: 'inline'}}><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
            <strong> Cultivate Habit:</strong> Foster mindfulness and self-care through regular participation.
          </li>
        </ul>
      </section> */}

      <section className="mx-4 shadow-lg rounded-lg p-4 mb-12" style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
        <h2 className="text-lg text-emerald-50 font-bold mb-4">How It Works?</h2>
        <p className="text-md text-emerald-50">
          The Clean Room Club champions the link between cleanliness and mental wellness. Here’s how you can engage:
        </p>
        <br/>
        <div className="flex items-center mb-12">
          <div className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style={{fill: 'rgba(255, 255, 255, 1)'}}><path d="M12 9c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3z"></path><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5z"></path></svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Share Photos</h2>
            <p className='text-lg'>Start your day by capturing the beauty of your clean living space.</p>
          </div>
        </div>
        <div className="flex items-center mb-12">
          <div className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style={{fill: 'rgba(255, 255, 255, 1)'}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M14.829 14.828a4.055 4.055 0 0 1-1.272.858 4.002 4.002 0 0 1-4.875-1.45l-1.658 1.119a6.063 6.063 0 0 0 1.621 1.62 5.963 5.963 0 0 0 2.148.903 6.042 6.042 0 0 0 2.415 0 5.972 5.972 0 0 0 2.148-.903c.313-.212.612-.458.886-.731.272-.271.52-.571.734-.889l-1.658-1.119a4.017 4.017 0 0 1-.489.592z"></path><circle cx="8.5" cy="10.5" r="1.5"></circle><circle cx="15.493" cy="10.493" r="1.493"></circle></svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Find Inspiration</h2>
            <p className='text-lg'>Browse clean rooms globally for motivation.</p>
          </div>
        </div>
        <div className="flex items-center mb-12">
          <div className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style={{fill: 'rgba(255, 255, 255, 1)'}}><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Cultivate Habit</h2>
            <p className='text-lg'>Build streaks and foster mindfulness and self-care through regular participation.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
