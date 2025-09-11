import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //Get the email from navigation state, or set to null if it doesn't exist
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  //Redirect if the user lands here without an email (e.g., direct URL access)
  useEffect(() => {
    if (!email) {

      navigate('/register');
    }
  }, [email, navigate]);


  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/user/otp-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, otp: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Verification successful! Redirecting to login...");
        //Navigate to login on after register
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Wait for 2 seconds for sucess
      } else {
        setMessage(data.message || 'Verification failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return null; 
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Verify Your Account</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          An OTP has been sent to: <span className="font-bold text-blue-600 dark:text-blue-400">{email}</span>.
        </p>
        <form className="space-y-4" onSubmit={handleVerify}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm font-medium ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default VerifyOTP
