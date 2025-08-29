import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { messages } from '../config/defaultMessages';

export const LoginPage = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  useEffect(() => { if (isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || messages.auth_loginError.defaultMessage);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{messages.auth_loginTitle.defaultMessage}</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">{messages.auth_emailLabel.defaultMessage}</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">{messages.auth_passwordLabel.defaultMessage}</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
            {loading ? messages.auth_loginButtonLoading.defaultMessage : messages.auth_loginButton.defaultMessage}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          {messages.auth_noAccountPrompt.defaultMessage}{' '}
          <a onClick={() => navigate('/register')} className="text-indigo-600 hover:underline cursor-pointer">
            {messages.auth_registerLink.defaultMessage}
          </a>
        </p>
      </div>
    </div>
  );
};
