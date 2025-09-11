import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({ onLoginClick }) => { 
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    verificationMethod: 'email',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // pass email in the navigation state so the next page can use it.
        navigate('/verify-otp', { state: { email: form.email } });
      } else {
        setMessage(data.message || 'Registration Failed. Please try again later.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred. Please check the console and try again.');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Register</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Verification Method</label>
            <select
              name="verificationMethod"
              value={form.verificationMethod}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm font-medium text-red-500 dark:text-red-400">{message}</p>}
        <div className="flex justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
          Already have an account?
          <button onClick={() => navigate('/login')} className="ml-1 text-blue-600 hover:underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register

