'use client'
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Style from "/styles/Home.module.scss";
import { funcaocadastrar } from "../../services/auth";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Chame a função para cadastrar o usuário
      await funcaocadastrar(email, senha);
      // Redirecione ou faça outras ações de acordo com o sucesso do cadastro
      router.push('/Login');
    } catch (error) {
      // Lide com o erro e atualize o estado de erro
      setErro(error .message);
    }
  };

  const goToLogin = () => {
    router.push('/Login');
  };

  return (
    <main className={Style.container}>
      <form onSubmit={handleSubmit}>
        <h1 className={Style.title}>CADASTRO</h1>
        <input
          className={Style.formButton}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className={Style.formButton}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        <button type="submit">Cadastre-se</button>
        <button type="button" onClick={goToLogin}>
          Faça LOGIN
        </button>
      </form>
      {erro && <p>{erro}</p>}
    </main>
  );
}
