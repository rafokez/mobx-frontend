import { useState } from "react";
import { auth } from "../firebase/config";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigate("/dashboard");
        } catch (error: any) {
            setErro("Usuário ou senha inválidos.");
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        setErro("");
        try {
            await signInWithPopup(auth, provider);
            navigate("/dashboard");
        } catch (error: any) {
            setErro("Erro ao entrar com Google.");
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Login - MOBX</h1>

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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-3"
                >
                    Entrar
                </button>

                <div className="text-center text-sm text-gray-600 mb-3">ou</div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                >
                    Entrar com Google
                </button>

                <p className="text-sm mt-4 text-center">
                    Não tem uma conta?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Criar agora
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Login;
