export function Footer({ siteConfiguration }: { siteConfiguration: any }) {
  return (
    <div className="flex items-center justify-center pt-6 pb-2">
      <p className="text-sm text-gray-600">
        Books by{" "}
        <a
          href="https://stevenpressfield.com"
          target="_blank"
          rel="noopener"
          className="text-transparent bg-gradient-to-tr bg-clip-text from-teal-500 to-teal-400"
        >
          {siteConfiguration.authorName}
        </a>{" "}
        &middot; Site by{" "}
        <a
          href="https://authorizewebsites.com"
          target="_blank"
          rel="noopener"
          className="text-transparent bg-gradient-to-tr bg-clip-text from-teal-500 to-teal-400"
        >
          Authorize
        </a>
      </p>
    </div>
  );
}
