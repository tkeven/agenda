"use client"
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../../context/authcontext";
import Style from "/styles/Home.module.scss";
import { getDatabase, ref, push, onValue, remove, update, child } from "firebase/database";

type Contato = {
  chave: string;
  nome: string;
  email: string;
  Telefone: string;
  obs: string;
};

const Inicio = () => {
  const { userAuth, logout } = useAuthContext();
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [obs, setObs] = useState('');
  const [contatos, setContatos] = useState<Contato[]>();
  const [busca, setBusca] = useState<string>('');
  const [buscando, setBuscando] = useState(false);
  const [nomeAntigo, setNomeAntigo] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const [contatosFiltrados, setContatosFiltrados] = useState<Contato[] | undefined>();

  useEffect(() => {
    const db = getDatabase();
    const contatosRef = ref(db, "contatos");

    onValue(contatosRef, (snapshot) => {
      const resultadoCont = Object.entries<Contato>(
        snapshot.val() ?? {}
      ).map(([chave, valor]) => {
        return {
          chave: chave,
          nome: valor.nome,
          email: valor.email,
          Telefone: valor.Telefone,
          obs: valor.obs,
        };
      });

      setContatos(resultadoCont);
    });
  }, []);

  function deletar(chave: string) {
    const db = getDatabase();
    const contatosRef = ref(db, `contatos/${chave}`);
    remove(contatosRef);
  }

  function mandar(event: FormEvent) {
    event.preventDefault();

    const db = getDatabase();
    const contatosRef = ref(db, "contatos");
    const dados = {
      nome,
      email,
      Telefone: telefone,
      obs,
    };

    if (atualizando) {
      atualizarContato(nomeAntigo, dados);
    } else {
      criarContato(dados);
    }

    // Limpar os campos após enviar
    setNome("");
    setEmail("");
    setTelefone("");
    setObs("");
    setAtualizando(false);
    setNomeAntigo('');
  }

  function handleBusca(event: FormEvent) {
    setBusca(event.currentTarget.value);
    setBuscando(true);
  }

  function editarDados(contato: Contato) {
    setAtualizando(true);
    setNomeAntigo(contato.chave);
    setNome(contato.nome);
    setEmail(contato.email);
    setTelefone(contato.Telefone);
    setObs(contato.obs);
  }

  function atualizarContato(chave: string, dados: any) {
    const db = getDatabase();
    const contatosRef = ref(db, `contatos/${chave}`); // Use o caminho diretamente
  
    update(contatosRef, dados);
  }

  function criarContato(dados: any) {
    const db = getDatabase();
    const contatosRef = ref(db, "contatos");

    push(contatosRef, dados);
  }

  useEffect(() => {
    if (busca.length > 0) {
      const dadosFiltrados = contatos?.filter((contato) =>
        contato.nome.toLowerCase().includes(busca.toLowerCase())
      );
      setContatosFiltrados(dadosFiltrados);
    } else {
      setBuscando(false);
      setContatosFiltrados(undefined);
    }
  }, [busca, contatos]);

  if (userAuth == null) {
    router.push("/Login");
    return null; 
  }

  return (
    <main className={Style.container}>
      
      <form onSubmit={mandar}>
        <input type="text" placeholder="Nome" value={nome} onChange={(event) => setNome(event.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type="tel" placeholder="Telefone" value={telefone} onChange={(event) => setTelefone(event.target.value)}/>
        <textarea placeholder="Observações" value={obs} onChange={(event) => setObs(event.target.value)}></textarea>
        <button   type="submit">{atualizando ? 'Atualizar' : 'Salvar'}</button>
        <button  onClick={() => logout()}>
        Sair
      </button>
      </form>

      {/* Lista de contatos */}
      <div className={Style.caixacontatos}>
        <input
          type="text"
          placeholder="Buscar"
          value={busca}
          onChange={handleBusca}
        />
        {buscando ? (
          contatosFiltrados?.map((contato) => (
            <div className={Style.caixaindividual} key={contato.chave}>
              <div className={Style.boxtitulo}>
                <p className={Style.nometitulo}>{contato.nome}</p>
                <div>
                  <a onClick={() => editarDados(contato)}>Editar</a>
                  <a onClick={() => deletar(contato.chave)}>Excluir</a>
                </div>
              </div>
              <div className={Style.dados}>
                <p>{contato.email}</p>
                <p>{contato.Telefone}</p>
                <p>{contato.obs}</p>
              </div>
            </div>
          ))
        ) : (
          contatos?.map((contato) => (
            <div className={Style.caixaindividual} key={contato.chave}>
              <div className={Style.boxtitulo}>
                <p className={Style.nometitulo}>{contato.nome}</p>
                <div>
                  <a onClick={() => editarDados(contato)}>Editar</a>
                  <a onClick={() => deletar(contato.chave)}>Excluir</a>
                </div>
              </div>
              <div className={Style.dados}>
                <p>{contato.email}</p>
                <p>{contato.Telefone}</p>
                <p>{contato.obs}</p>
              </div>
            </div>
          ))
        )}
      </div>

     
    </main>
  );
};

export default Inicio;
