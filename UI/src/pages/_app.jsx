import "../../styles/globals.css";
import Head from "next/head";

import Script from "next/script";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  // get the domain name
  const router = useRouter();
  

  return (
    <div className="bg-white">
      <Head>
        <title>AIRLINE PROJECT</title>
        <link rel="icon" href="/logo.svg" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="pantofit" />
      </Head>
      
        
          

          <Component {...pageProps} />
       
    </div>
  );
}

export default MyApp;
