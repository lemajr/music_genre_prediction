'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { predictGenre } from '@/lib/actions/predictGenre';

export default function Home() {
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!age || age <= 0 || !gender) {
      setError('Please provide a valid age and select your gender.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const genre = await predictGenre(age as number, gender);
      // console.log(genre);
      router.push(`/player?genre=${genre}`);
    } catch (err) {
      console.error(err);
      setError('Failed to predict genre. Try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Music Recommender</h1>
      <form onSubmit={onSubmit} className="bg-white p-6 shadow-md rounded-lg w-80">
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : '')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
