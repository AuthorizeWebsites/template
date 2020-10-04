import { InferGetStaticPropsType } from "next";
import { useContext, useState } from "react";
import {
  withDefaultLayout,
  withDefaultLayoutStaticProps,
} from "../components/Layout";
import { ModalContext } from "../contexts/modal";
import { withDefaultRevalidate } from "../lib/utils";

export default withDefaultLayout(
  function ContactPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { updateModal } = useContext(ModalContext);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(false);

    return (
      <div className="px-4">
        <div className="flex flex-col max-w-2xl p-4 mx-auto my-4 space-y-4 bg-gray-800 rounded-md shadow-xl sm:16 md:my-32">
          <h1 className="text-4xl font-semibold leading-tight tracking-wider text-white">
            Contact Me
          </h1>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
          <textarea
            className="form-textarea h-80"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
          />
          <button
            disabled={disabled}
            onClick={() => {
              if (!email.includes("@")) {
                updateModal(
                  <SubmissionErrorModal content="A valid email is required." />
                );
              } else if (message === "") {
                updateModal(
                  <SubmissionErrorModal content="A message is required." />
                );
              } else {
                setDisabled(true);
                fetch("/api/send-email", {
                  method: "POST",
                  headers: {
                    ["Content-Type"]: "application/json",
                  },
                  body: JSON.stringify({
                    formName: "contact",
                    email,
                    message,
                  }),
                }).then(async (r) => {
                  if (r.status !== 200) {
                    updateModal(
                      <SubmissionErrorModal
                        onExit={() => setDisabled(false)}
                        content="Something went wrong. Please try again in a moment."
                      />
                    );
                  } else
                    updateModal(
                      <SuccessModal onExit={() => setDisabled(false)} />
                    );
                });
              }
            }}
            className="px-4 py-2 text-2xl font-semibold text-white transition-all duration-150 ease-in-out rounded-md focus:outline-none bg-gradient-to-tr from-teal-500 to-teal-400 hover:shadow-lg focus:from-teal-600 focus:to-teal-500 hover:from-teal-600 hover:to-teal-500"
          >
            Send
          </button>
        </div>
      </div>
    );
  }
);

function SuccessModal({ onExit }: { onExit?: () => void }) {
  const { updateModal } = useContext(ModalContext);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-2">
      <div className="relative z-50 flex flex-col w-full max-w-md overflow-hidden bg-green-200 border border-green-500 divide-y divide-green-500 rounded-md shadow-2xl">
        <div className="flex justify-end p-4">
          <button
            onClick={() => {
              onExit?.();
              updateModal(null);
            }}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-green-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="p-4 text-2xl font-semibold tracking-wider text-center text-green-900">
          Your message was sent. Talk to you soon!
        </h1>
      </div>
    </div>
  );
}

function SubmissionErrorModal({
  content,
  onExit,
}: {
  content: string;
  onExit?: () => void;
}) {
  const { updateModal } = useContext(ModalContext);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-2">
      <div className="relative z-50 flex flex-col w-full max-w-md overflow-hidden bg-red-200 border border-red-500 divide-y divide-red-500 rounded-md shadow-2xl">
        <div className="flex justify-end p-4">
          <button
            onClick={() => {
              onExit?.();
              updateModal(null);
            }}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-red-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="p-4 text-lg font-semibold tracking-wider text-center text-red-900">
          {content}
        </h1>
      </div>
    </div>
  );
}

export const getStaticProps = withDefaultLayoutStaticProps(
  withDefaultRevalidate(async () => ({
    props: {},
  }))
);
