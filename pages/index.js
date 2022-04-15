import Head from "next/head";
import Link from "next/link";
import { setCookie } from "nookies";

import style from "../styles/login.module.css";

export default function Home({ users }) {
  const logincheck = async (event) => {
    event.preventDefault();

    let usuario;

    users.forEach((users) => {
      if (users.name === event.target.username.value) {
        usuario = users.name;
        setCookie(null, "id", users._id, {
          maxAge: 86400,
          path: "/",
        });
        setCookie(null, "User", users.name, {
          maxAge: 86400,
          path: "/",
        });
        setCookie(null, "idade", users.idade, {
          maxAge: 86400,
          path: "/",
        });
      }
    });

    if (usuario === undefined) {
      alert("Usuário não encontrado");
      //console.log("Usuário não encontrado");
    } else {
      window.location.href = "./checkup";
    }
  };

  return (
    <>
      <Head>
        <title>Reckets Low Costs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={style.container}>
        <div className={style.loginBox}>
          <form onSubmit={logincheck}>
            <input
              id="username"
              className={style.inputName}
              type="text"
              placeholder="Seu Nome"
            />
            <br/>
            <br/>
            <button type="submit" className={style.btnLogin}>
              ENTRAR
            </button>
          </form>
          <br />
          <Link href="/cadastro">Cadastre-se Aqui.</Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const data = fetch("http://localhost:3000/api/users");
  const users = await data.then((res) => res.json());
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
