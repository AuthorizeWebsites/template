import Link from "next/link";
import { Book, Genre, Series, Universe } from "../@types/sanity";
import { ImageV2 } from "./ImageV2";

// todo : this is a mess

export function RecommendationsBar({
  recommendations,
}: {
  recommendations: (Book | Series | Universe | Genre)[];
}) {
  return (
    <div className="p-4 space-y-4 overflow-hidden bg-gray-900 rounded-md shadow-lg sm:p-8">
      <h1 className="text-2xl font-semibold leading-none tracking-wider text-center text-white uppercase sm:text-4xl sm:text-left">
        Recommendations
      </h1>
      <div className="max-w-full overflow-x-auto rounded-md overscroll-x-contain">
        <div className="flex space-x-4">
          {recommendations?.map((recommendation) => {
            switch (recommendation._type) {
              case "book":
                return (
                  <Link
                    key={recommendation._id}
                    href="/book/[id]"
                    as={`/book/${recommendation._id}`}
                  >
                    <a className="relative flex-shrink-0 overflow-hidden transition-transform duration-300 ease-in-out transform rounded-md shadow-lg hover:scale-95">
                      {!!recommendation.cover?.asset ? (
                        <div className="h-72">
                          <ImageV2
                            metadata={recommendation.cover.asset.metadata}
                            url={recommendation.cover.asset.url}
                            independentDimension="height"
                          />
                        </div>
                      ) : (
                        recommendation.title
                      )}
                    </a>
                  </Link>
                );
              case "series":
                return (
                  <Link
                    key={recommendation._id}
                    href="/series/[id]"
                    as={`/series/${recommendation._id}`}
                  >
                    <a>
                      <div className="relative flex items-center justify-center flex-shrink-0 p-4 transition-transform duration-300 ease-in-out transform bg-white rounded-md shadow-lg w-52 h-72 hover:scale-95">
                        <h1 className="text-3xl font-semibold tracking-wider text-center text-gray-800">
                          {recommendation.name}
                        </h1>
                        <span className="absolute px-2 py-1 tracking-widest text-white uppercase bg-gray-800 rounded-md bottom-2 right-2">
                          Series
                        </span>
                      </div>
                    </a>
                  </Link>
                );
              case "universe":
                return (
                  <Link
                    key={recommendation._id}
                    href="/universe/[id]"
                    as={`/universe/${recommendation._id}`}
                  >
                    <a>
                      <div className="relative flex items-center justify-center flex-shrink-0 p-4 transition-transform duration-300 ease-in-out transform bg-white rounded-md shadow-lg w-52 h-72 hover:scale-95">
                        <h1 className="text-3xl font-semibold tracking-wider text-center text-gray-800">
                          {recommendation.name}
                        </h1>
                        <span className="absolute px-2 py-1 tracking-widest text-white uppercase bg-gray-800 rounded-md bottom-2 right-2">
                          Universe
                        </span>
                      </div>
                    </a>
                  </Link>
                );
              case "genre":
                return (
                  <Link
                    key={recommendation._id}
                    href="/genre/[id]"
                    as={`/genre/${recommendation._id}`}
                  >
                    <a>
                      <div className="relative flex items-center justify-center flex-shrink-0 p-4 transition-transform duration-300 ease-in-out transform bg-white rounded-md shadow-lg w-52 h-72 hover:scale-95">
                        <h1 className="text-3xl font-semibold tracking-wider text-center text-gray-800">
                          {recommendation.name}
                        </h1>
                        <span className="absolute px-2 py-1 tracking-widest text-white uppercase bg-gray-800 rounded-md bottom-2 right-2">
                          Genre
                        </span>
                      </div>
                    </a>
                  </Link>
                );
            }
          })}
          <div style={{ width: 1, minWidth: 1 }} />
        </div>
      </div>
    </div>
  );
}
