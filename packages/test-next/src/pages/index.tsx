import Form from '@/components/form';

export default function Home() {
  return (
    <main className="bg-slate-900 p-4 text-white flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl lg:text-5xl mb-2 max-w-5xl font-bold text-center text-blue-500">
        Soit le premier à t'inscrire aux tournois de{' '}
        <span className="text-yellow-300">Nantes</span>
      </h1>
      <p className="text-slate-500 text-center mb-7 lg:text-base text-sm">
        Nous t'enverrons un mail quand un tournoi sera disponible dans la région
        Nantaise
      </p>
      <Form />
    </main>
  );
}
