export function BuyLinksBar({ buyLinks }: { buyLinks: any[] }) {
  return (
    <div className="p-8 space-y-4 bg-gray-900 rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold leading-none tracking-wider text-center text-white uppercase sm:text-4xl sm:text-left">
        Available Here
      </h1>
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap">
        {buyLinks?.map((buyLink, index) => (
          <div
            key={buyLink.link + "::" + buyLink.name + "::" + index}
            className=""
          >
            <a
              href={buyLink.link}
              target="_blank"
              rel="noopener"
              className="block px-4 py-2 text-2xl font-bold leading-tight tracking-widest text-center text-white uppercase bg-orange-500 rounded-md shadow-xl hover:bg-orange-400"
            >
              {buyLink.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
