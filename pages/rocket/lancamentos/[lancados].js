import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";
import style from "../../../styles/lancados.module.css";

export async function getStaticProps(context) {
  const data = await fetch(
    `http://localhost:3000/api/rockets?id=${context.params.lancados}`
  );
  const rocket = await data.json();

  return {
    props: {
      rocket,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/api/rockets");
  const data = await response.json();

  const paths = data.map((todo) => {
    return {
      params: {
        lancados: `${todo.userID}`,
      },
    };
  });

  return { paths, fallback: false };
}

export default function Lancados(rocket) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = new Date(`${year}-${month}-${day}`);

  return (
    <>
      <Head>
        <title>Lançados</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={style.container}>
        <p>{parseCookies().User}, Veja seus Lançamentos</p>
        <br />
        <div className={style.listBox}>
          {rocket.rocket.map((launches) => (
            <div className={style.foguete} key={launches._id}>
              <Image
                src={
                  "https://res.cloudinary.com/demo/image/fetch/" +
                  launches.image
                }
                width={350}
                height={250}
              />
              <p>Nome do Foguete: {launches.rocketName}</p>
              <p>Tipo do Motor: {launches.motorType}</p>
                <p>Data de lançamento: {launches.date}</p>
              <p>
                {launches.ativo === true
                  ? "Faturamento Previsto: "+(launches.custo * (launches.profit / 100)).toLocaleString(
                      "pt-br",
                      { style: "currency", currency: "BRL" }
                    )
                  : " Não Lançado"}
              </p>
              <p>Ativo: {launches.ativo ? "Sim" : "Não"}</p>
              <p>
                {launches.ativo ? (
                  // check if the date is equal to today or less
                  new Date(`${year}-${month}-${day}`) <=
                  new Date(launches.date) ? (
                    <button className={style.btnWait} disabled>
                      Lançamento em andamento
                    </button>
                  ) : (
                    <button className={style.btnSuccess} disabled>
                      Lançamento realizado
                    </button>
                  )
                ) : (
                  <button className={style.btnFail} disabled>
                    Lançamento cancelado
                  </button>
                )}
              </p>
              <button onClick={async () =>{
              const id = launches._id;
              console.log(id);
                await fetch(`http://localhost:3000/api/rockets?id=${id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then(() => {
                  window.location.reload();
                });
              }}>Excluir</button>
              
            </div>
          ))}
        </div>
        <br />
        <Link href="/rocket">Voltar</Link>
      </div>
    </>
  );
}
