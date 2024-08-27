import Head from "next/head";
import LandingPage from "../components/LandingPage/LandingPage";

export default function Home( { windowSize }: { windowSize: { width: number | undefined, height: number | undefined }}) {

  return (
    <>
      <Head>
        <title>First Pick Fit</title>
      </Head>
      <LandingPage />
    </>
  )
}