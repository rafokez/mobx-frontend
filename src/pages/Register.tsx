import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate("/dashboard");
    } catch (error: any) {
      setErro("Erro ao criar conta. " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setErro("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error: any) {
      setErro("Erro no login com Google. " + error.message);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta - MOBX</h1>

        {erro && <p className="text-red-600 mb-4 text-center">{erro}</p>}

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 font-medium">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 border rounded mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-3"
        >
          Criar Conta
        </button>

        <div className="text-center text-sm text-gray-600 mb-3">ou</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Entrar com Google
        </button>
      </form>
    </div>
  );
}

export default Register;
