import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => { 
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:3000/api/user/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsError(false);
      } else {
        setMessage(data.message || 'An error occurred.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Forgot Password</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Enter your email to receive a password reset link.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm font-medium ${isError ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        <div className="flex justify-center space-x-4 text-sm font-medium text-gray-600 dark:text-gray-400">
          <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">
            Back to Login
          </button>
          <button onClick={() => navigate('/register')} className="text-blue-600 hover:underline">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword
