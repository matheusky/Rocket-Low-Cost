import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import style from "../../styles/rocket.module.css";
import { parseCookies } from "nookies";

export async function getStaticProps(context) {
  const data = await fetch(
    `https://api.spacexdata.com/v3/rockets/${context.params.rocket}`
  );
  const rocket = await data.json();
  return {
    props: {
      rocket,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch("https://api.spacexdata.com/v3/rockets?id=true");
  const data = await response.json();

  const paths = data.map((todo) => {
    return {
      params: {
        rocket: `${todo.rocket_id}`,
      },
    };
  });

  return { paths, fallback: false };
}

export default function Rocket(rocket) {
  return (
    <>
      <Head>
        <title>Rocket</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={style.container}>
        <h1>{parseCookies().User}, Selecione Lucro e Data de Lançamento</h1>
        <div className={style.containerBox}>

          {/* Rocket */}
          <div className={style.box}>
            <p>Foguete selecionado</p>
            <div className={style.rocket}>
              <Image
                src={
                  "https://res.cloudinary.com/demo/image/fetch/" +
                  rocket.rocket.flickr_images[0]
                }
                width={300}
                height={200}
              />
              <p>Nome do Foguete: {rocket.rocket.rocket_name}</p>
              <p>Tipo do Motor: {rocket.rocket.engines.type}</p>
              <p>
                Custo do Lançamento:
                {rocket.rocket.cost_per_launch.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p>Ativo: {rocket.rocket.active ? "Sim" : "Não"}</p>
            </div>
          </div>


          {/* lucro/data */}
          <div className={style.box}>
            <p>Data e Lucro</p>
            <div className={style.dataLogin}>
              <input
              className={style.inputLucro}
                id="profit"
                type="number"
                onChange={(event) => {
                  if (event.target.value > 100) {
                    alert("Lucro não pode ser maior que 100%");
                    event.target.value = "";
                  }
                }}
                placeholder="Informe o % de Lucro desejado"
              />
              <br/>
              <input className={style.imputData} id="date" type="date" />
              <br/>
              <button
              className={style.btnConfirm}
                onClick={() => {
                  const profit = document.getElementById("profit").value;
                  const date = document.getElementById("date").value;

                  if (profit == 0 || profit == "") {
                    alert("Lucro não pode ser 0%");
                    return;
                  }

                  const data = {
                    userID: parseCookies(null).id,
                    fogueteID: rocket.rocket.rocket_id,
                    profit: profit,
                    date: date,
                    ativo: rocket.rocket.active,
                    rocketName: rocket.rocket.rocket_name,
                    motorType: rocket.rocket.engines.type,
                    custo: rocket.rocket.cost_per_launch,
                    image: rocket.rocket.flickr_images[0],
                  };

                  // send data to api
                  fetch("http://localhost:3000/api/rockets", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }).then((res) => {
                    if (res.status === 200) {
                      alert("Foguete adicionado a lista de lançamentos");
                      window.location.href = `/rocket/lancamentos/${
                        parseCookies(null).id
                      }`;
                    }
                  });
                }}
              >
                REALIZAR LANÇAMENTO
              </button>
            </div>
          </div>
        </div>
        <Link href="/rocket">VOLTAR</Link>
      </div>
    </>
  );
}
