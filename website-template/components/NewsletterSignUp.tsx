import Link from "next/link";
import { useContext, useState } from "react";
import { ModalContext } from "../contexts/modal";

export interface NewsletterSignUpProps {
  primaryText?: string;
  secondaryText?: string;
}

export function NewsletterSignUp({
  primaryText,
  secondaryText,
}: NewsletterSignUpProps) {
  const { updateModal } = useContext(ModalContext);
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 bg-gray-900 rounded-md shadow-lg lg:flex-row sm:p-16">
      <div className="flex flex-col flex-1 gap-2">
        <h1 className="text-4xl font-bold leading-tight tracking-wider text-center text-transparent lg:text-left bg-clip-text bg-gradient-to-tr from-teal-400 to-teal-500">
          {primaryText}
        </h1>
        <h3 className="text-xl font-light leading-tight tracking-wider text-center text-white lg:text-left">
          {secondaryText}
        </h3>
      </div>
      <div className="flex flex-col w-full max-w-md gap-2">
        <div className="flex gap-4">
          <input
            id="email"
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 shadow-lg form-input focus:shadow-lg focus:border-gray-300 focus:bg-gray-100"
          />
          <button
            disabled={disabled}
            onClick={() => {
              if (!email.includes("@"))
                updateModal(
                  <SignUpErrorModal content="You must give a valid email address." />
                );
              else {
                setDisabled(true);
                fetch("/api/newsletter-sign-up", {
                  method: "POST",
                  headers: {
                    ["Content-Type"]: "application/json",
                  },
                  body: JSON.stringify({
                    email,
                  }),
                }).then(async (r) => {
                  if (r.status !== 200) {
                    const err = await r.json();
                    switch (err.title) {
                      case "Member Exists":
                        updateModal(
                          <SignUpErrorModal
                            onExit={() => setDisabled(false)}
                            content="Someone has already signed up with that email address. Please try another."
                          />
                        );
                        break;
                      default:
                        updateModal(
                          <SignUpErrorModal
                            onExit={() => setDisabled(false)}
                            content="Something went wrong. Try again in a moment, and if the problem persists, please contact website support at support@authorizewebsites.com"
                          />
                        );
                    }
                  } else
                    updateModal(
                      <SignUpCompleteModal onExit={() => setDisabled(false)} />
                    );
                });
              }
            }}
            className="px-3 py-2 font-semibold leading-none tracking-wider text-white transform rounded-md shadow-lg focus:from-teal-600 focus:to-teal-700 focus:outline-none bg-gradient-to-tr from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
          >
            Submit
          </button>
        </div>
        <p className="text-xs leading-tight tracking-wider text-gray-400">
          We care about the protection of your data. Read our{" "}
          <Link href="/privacy-policy">
            <a className="underline focus:outline-none focus:text-shadow-teal">
              Privacy Policy
            </a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function SignUpCompleteModal({ onExit }: { onExit?: () => void }) {
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
          You're all signed up. Talk to you soon!
        </h1>
      </div>
    </div>
  );
}

function SignUpErrorModal({
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
