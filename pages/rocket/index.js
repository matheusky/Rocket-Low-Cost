import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import style from "../../styles/rocketIndex.module.css";
import { parseCookies, destroyCookie } from "nookies";

export default function index({ dataRockets }) {
  const Username = parseCookies(null).User;
  return (
    <>
      <Head>
        <title>Rocket</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={style.container}>
        <p>Olá {parseCookies().User}, Selecione o foguete</p>
        <br />
        <div className={style.foguetesList}>
          {dataRockets.map((launches) => (
            <div className={style.foguete} key={launches._id}>
              <Image
                src={
                  "https://res.cloudinary.com/demo/image/fetch/" +
                  launches.flickr_images[0]
                }
                width={350}
                height={250}
              />
              <p>Nome do Foguete: {launches.rocket_name}</p>
              <p>Tipo do Motor: {launches.engines.type}</p>
              <p>
                Custo do Lançamento:{" "}
                {launches.cost_per_launch.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p>Ativo: {launches.active ? "Sim" : "Não"}</p>
              <Link href={`./rocket/${launches.rocket_id}`}>
                <button className={style.btnLancar}>LANÇAR FOGUETE</button>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            destroyCookie(null, "id");
            destroyCookie(null, "User");
            destroyCookie(null, "idade");
            window.location.href = "/";
          }}
        >
          SAIR
        </button>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const rawDataRockets = await fetch(
    "https://api.spacexdata.com/v3/rockets?id=true"
  );
  const dataRockets = await rawDataRockets.json();

  return {
    props: {
      dataRockets,
    },
  };
}
