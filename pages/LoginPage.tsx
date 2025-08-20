
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

type ActiveTab = 'signin' | 'register';

const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-3" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.45,44,30.08,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);


const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('signin');
  const { login, register, googleLogin } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (activeTab === 'signin') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      // Redirection is handled by AuthContext
    } catch (err: any) {
      setError(err.message || `Failed to ${activeTab}. Please try again.`);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
        await googleLogin();
    } catch (err: any) {
        setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const TabButton: React.FC<{tab: ActiveTab, text: string}> = ({ tab, text }) => (
    <button
        type="button"
        onClick={() => {
            setActiveTab(tab);
            setError('');
            setUsername('');
            setPassword('');
        }}
        className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg
            focus:outline-none focus:ring-2 ring-offset-2 ring-offset-brand-light ring-white ring-opacity-60
            ${activeTab === tab ? 'bg-white shadow text-brand-primary' : 'text-gray-600 hover:bg-white/[0.5]'}
        `}
    >
        {text}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-brand-light">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to="/" className="text-3xl font-serif font-medium text-slate-900 tracking-tight">
               6 Yards by Katyayini
            </Link>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                {activeTab === 'signin' ? 'Sign in to your account' : 'Create a new account'}
            </h2>
          </div>

          <div className="mt-8">
            <div className="p-1.5 w-full bg-red-100 rounded-lg flex space-x-1">
                <TabButton tab="signin" text="Sign In" />
                <TabButton tab="register" text="Create Account" />
            </div>
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                  <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                {activeTab === 'signin' && (
                    <p className="text-sm text-gray-500">
                        (Demo: Use <strong>admin/admin</strong> for admin access.)
                    </p>
                )}
                <div>
                  <Button type="submit" className="flex w-full justify-center" isLoading={isLoading}>
                    {activeTab === 'signin' ? 'Sign in' : 'Create Account'}
                  </Button>
                </div>
              </form>
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-brand-light px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                    <GoogleIcon />
                    Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1587569700591-0354bff490e1?q=80&w=1887&auto=format&fit=crop" alt="Woman in a beautiful saree"/>
      </div>
    </div>
  );
};

export default LoginPage;