interface FooterProps {
  authorName: string;
}

export function Footer({ authorName }: FooterProps) {
  return (
    <div className="flex items-center justify-center pt-6 pb-2">
      <p className="text-sm text-gray-600">
        Books by{" "}
        <a
          href="https://stevenpressfield.com"
          target="_blank"
          rel="noopener"
          className="text-transparent bg-gradient-to-tr bg-clip-text from-teal-500 to-teal-400 focus:outline-none focus:text-shadow-teal"
        >
          {authorName}
        </a>{" "}
        &middot; Site by{" "}
        <a
          href="https://authorizewebsites.com"
          target="_blank"
          rel="noopener"
          className="text-transparent bg-gradient-to-tr bg-clip-text from-teal-500 to-teal-400 focus:outline-none focus:text-shadow-teal"
        >
          Authorize
        </a>
      </p>
    </div>
  );
}
