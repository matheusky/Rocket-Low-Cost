import Head from "next/head";
import Link from "next/link";
import style from "../styles/cadastro.module.css";

export default function Cadastro() {
  return (
    <>
      <Head>
        <title>Cadastro</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={style.container}>
        <div className={style.cadBox}>
          <form onSubmit={createUser}>
            <input
              id="userName"
              className={style.inputs}
              type="text"
              placeholder="Seu Nome"
            />
            <input
              id="userIdade"
              className={style.inputs}
              type="text"
              placeholder="Sua Idade"
            />
            <button type="submit" className={style.btnconf}>
              CADASTRAR
            </button>
          </form>
        </div>
        <br/>
        <Link href="/">Voltar</Link>
      </div>
    </>
  );
}

export async function createUser(event) {
  event.preventDefault();
  const userName = document.getElementById("userName").value;
  const userIdade = document.getElementById("userIdade").value;

  const data = await fetch("http://localhost:3000/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName,
      idade: userIdade,
    }),
  });
  switch (data.status) {
    case 200:
      alert("Cadastro realizado com sucesso!");
      window.location.href = "/";
      break;
    case 409:
      console.log("Usuário já cadastrado");
      alert("Usuário já cadastrado");
      break;
    default:
      console.log("Erro ao cadastrar usuário");
      alert("Erro ao cadastrar usuário");
      break;
  }
}
