import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { execQuery, groq } from "../queries";

export default function ContactPage({
  siteConfiguration,
}: {
  siteConfiguration: any;
}) {
  return (
    <Layout
      header={<Header siteConfiguration={siteConfiguration} />}
      content={
        <div className="px-4">
          <div className="flex flex-col max-w-2xl p-4 mx-auto my-4 space-y-4 bg-gray-800 rounded-md shadow-xl sm:16 md:my-32">
            <h1 className="text-4xl font-semibold leading-tight tracking-wider text-white">
              Contact Me
            </h1>
            <input
              className="form-input"
              type="email"
              placeholder="Your email"
            />
            <textarea
              className="form-textarea h-80"
              placeholder="Your message"
            />
            <button className="px-4 py-2 text-2xl font-semibold text-white transition-all duration-150 ease-in-out rounded-md focus:outline-none bg-gradient-to-tr from-teal-500 to-teal-400 hover:shadow-lg focus:from-teal-600 focus:to-teal-500 hover:from-teal-600 hover:to-teal-500">
              Send
            </button>
          </div>
        </div>
      }
      footer={<Footer siteConfiguration={siteConfiguration} />}
    />
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      siteConfiguration: (
        await execQuery(groq`
          * | [
            _id == "siteConfiguration"
          ] | [
            0
          ]
        `)
      ).result,
    },
    revalidate: 1,
  };
};
