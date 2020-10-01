import { AppProps } from "next/app";
import "../styles/index.css";
import { ModalProvider } from "../contexts/modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
      {/* fixes chrom bug : https://bugs.chromium.org/p/chromium/issues/detail?id=332189 */}
      <script> </script>
    </>
  );
}

export default MyApp;
