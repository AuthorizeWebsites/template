import { Color, Image, Override } from "../@types/sanity";

export type ImageV2Props = {
  independentDimension?: "height" | "width" | "cover";
  metadata: {
    dimensions: {
      aspectRatio: number;
      height: number;
      width: number;
    };
    lqip: string;
    palette: {
      muted: Color;
    };
  };
  url: string;
};

const supportedIntrinsicWidths = [
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1_000,
  1_100,
  1_200,
  1_300,
  1_400,
  1_500,
  1_600,
  1_700,
  1_800,
  1_900,
  2_000,
];

export function ImageV2({
  metadata,
  independentDimension = "width",
  url,
}: ImageV2Props) {
  const dimensionlessUrl = `${url}?auto=format`;

  return (
    <div
      className={`${
        independentDimension === "height"
          ? "h-full w-auto"
          : independentDimension === "width"
          ? "h-auto w-full"
          : independentDimension === "cover"
          ? "h-full w-full"
          : ""
      } max-h-full max-w-full overflow-hidden flex-col flex items-center justify-center relative`}
      style={{
        backgroundImage: `url(\"${metadata.lqip}\")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <picture
        className={`${
          independentDimension === "height"
            ? "h-full w-auto"
            : independentDimension === "width"
            ? "h-auto w-full"
            : independentDimension === "cover"
            ? "h-full w-full object-cover"
            : ""
        } flex`}
      >
        {[...supportedIntrinsicWidths].reverse().map((dim) => (
          <source
            key={dim}
            media={`(min-width: ${dim}px)`}
            srcSet={`${dimensionlessUrl}&w=${dim}&q=75`}
          />
        ))}
        <img
          src={`${dimensionlessUrl}&w=${supportedIntrinsicWidths[0]}`}
          loading="lazy"
          height={metadata.dimensions.height}
          width={metadata.dimensions.width}
          className={`${
            independentDimension === "height"
              ? "h-full w-auto"
              : independentDimension === "width"
              ? "h-auto w-full"
              : independentDimension === "cover"
              ? "h-full w-full object-cover"
              : ""
          }`}
        />
      </picture>
      {/* </div> */}
    </div>
  );
}
