import { useState, useEffect } from 'react';

export default function DashboardHeader() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser?.username || 'User');
      }
    } catch {
      setUsername(localStorage.user?.username || 'User');
    }
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username || 'User'
  )}&rounded=true&background=0D8ABC&color=fff&size=128`;

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-bg-dark border-b border-gray-800">
      <h2 className="m-0 text-xl font-bold">Dashboard</h2>

      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-300">{username}</span>
        <img
          src={avatarUrl}
          alt={`${username}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </header>
  );
}