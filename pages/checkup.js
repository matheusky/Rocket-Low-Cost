import Head from "next/head";
import Link from "next/link";
import { parseCookies } from "nookies";
import style from "../styles/checkup.module.css";

export default function Checkup() {
  return (
    <>
      <Head>
        <title>Checkup</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={style.container}>
        <div className={style.confirmBox}>
        <p>Sua idade é:</p>
        <h1>{parseCookies(null).idade}</h1>
        <button
          className={style.btnConfirm}
          onClick={() => {
            window.location.href = "/rocket";
          }}
        >
          COMFIRMAR
        </button>
        <br />
        <Link href="/">Cancelar</Link>
        </div>
      </div>
    </>
  );
}