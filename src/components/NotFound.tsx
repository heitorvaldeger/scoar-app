import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mt-4 mb-8">Desculpe, página não encontrada</p>
          <button className="px-8 py-3 font-semibold rounded dark:bg-green-600 dark:text-white" onClick={() => {
            navigate('/login');
          }}>Voltar para página inicial</button>
        </div>
      </div>
    </section>
  );
}
