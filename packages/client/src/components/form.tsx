import { useCallback, useState } from 'react';

export default function Form() {
  const [email, setEmail] = useState('');
  const onSubmit = (email: string) => {
    console.log('couocu');
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email }),
    });
  };

  return (
    <>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        placeholder="Email"
        className="bg-slate-800 mb-4 text-sm w-72 rounded-lg px-6 py-3 text-slate-300 border transition-all border-transparent outline-none focus:border focus:border-yellow-200 outline-8"
      />
      <button
        onClick={() => onSubmit(email)}
        type="submit"
        id="signupButton"
        className="w-44 py-3 cursor-pointer font-semibold rounded-lg bg-yellow-300 text-slate-900"
      >
        Inscription
      </button>
    </>
  );
}
