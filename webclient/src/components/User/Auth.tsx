import { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleLogin = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(`Error: ${error.name} Msg: ${error.message}`);
    } else {
      alert('Check your email for the login link!');
    }
    setLoading(false);
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-emerald-400 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Clean Room Club</h1>
        <p className="text-gray-600 mb-6">Sign in via magic link with your email below</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              className={`w-full bg-emerald-500 text-white p-2 rounded-md ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'
              }`}
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
