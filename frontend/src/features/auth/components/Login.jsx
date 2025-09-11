import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLoginSuccess }) => { 
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include', // sends cookies back and forth
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful! Redirecting...");
        onLoginSuccess(); // Call the prop passed from App.jsx to update the auth state
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 1500);
      } else {
        setMessage(data.message || 'Login Failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="text-right text-sm">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm font-medium ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        <div className="flex justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
          Don't have an account?
          <button onClick={() => navigate('/register')} className="ml-1 text-blue-600 hover:underline">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login
