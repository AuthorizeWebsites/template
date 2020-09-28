import { AppProps } from "next/app";
import "../styles/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ModalProvider } from "../contexts/modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
      <script> </script>
    </>
  );
}

export default MyApp;
