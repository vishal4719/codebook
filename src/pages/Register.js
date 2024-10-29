import { useNavigate } from 'react-router-dom';
import { useTitle } from "../hooks/useTitle";
import { toast } from 'react-toastify';
import { register } from '../services';

export const Register = () => {
  useTitle("Register");
  const navigate = useNavigate();

  async function handleRegister(event){
    event.preventDefault();
    try{
      const authDetail = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
      }
      const data = await register(authDetail);
      data.accessToken ? navigate("/products") : toast.error(data);
    } catch(error){
      toast.error(error.message, {closeButton: true, position: "bottom-center"});
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen  ">
    <div className="w-full max-w-md p-8 bg-slate-200 rounded-lg shadow-lg dark:bg-gray-900">
      <section>
        <p className="text-3xl text-center font-bold text-gray-700 dark:text-slate-100 mb-8">Register</p>
      </section>
      <form onSubmit={handleRegister}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Vishal Gupta" 
            required 
            autoComplete="off" 
            className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="vishal@example.com" 
            required 
            autoComplete="off" 
            className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Password</label>
          <input 
            type="password" 
            id="password" 
            required 
            minLength="7" 
            className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-white"
          />
        </div>
        <button 
          type="submit" 
          className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  </main>
  )}  