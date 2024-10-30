import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTitle } from "../hooks/useTitle";
import { login } from "../services";

export const Login = () => {
  useTitle("Login");
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  async function handleLogin(event){
    event.preventDefault();
    try{
      const authDetail = {
        email: email.current.value,
        password: password.current.value
      }
      const data = await login(authDetail);
      data.accessToken ? navigate("/products") : toast.error(data);
    } catch(error){
      toast.error(error.message, {closeButton: true, position: "bottom-center"});
    }
  }
  async function handleLoginGuest(){
    email.current.value = process.env.REACT_APP_GUEST_LOGIN;
    password.current.value = process.env.REACT_APP_GUEST_PASSWORD;
    try{
      const authDetail = {
        email: email.current.value,
        password: password.current.value
      }
      const data = await login(authDetail);
      data.accessToken ? navigate("/products") : toast.error(data);
    } catch(error){
      toast.error(error.message, {closeButton: true, position: "bottom-center"});
    }
  }

  return (
          <main className="flex items-center justify-center p-5">
          <section className="bg-slate-100 dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
            <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Your email</label>
                <input
                  ref={email}
                  type="email"
                  id="email"
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3"
                  placeholder="vishal@example.com"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Your password</label>
                <input
                  ref={password}
                  type="password"
                  id="password"
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Log In
              </button>
            </form>
            {/* Optional Guest Login Button */}
            <button  onClick={()=>handleLoginGuest} className="mt-4 w-full py-3 text-white bg-indigo-500 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Login As Guest
            </button>
          </section>
        </main>
      );
    }
    
