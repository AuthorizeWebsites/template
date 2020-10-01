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
  let dimensionClasses: string;

  switch (independentDimension) {
    case "height":
      dimensionClasses = "h-full w-auto";
      break;
    case "width":
      dimensionClasses = "w-full h-auto";
      break;
    case "cover":
      dimensionClasses = "min-w-full min-h-full";
      break;
  }

  const dimensionlessUrl = `${url}?auto=format`;

  return (
    <div
      className={`${dimensionClasses} max-h-full max-w-full overflow-hidden flex items-center justify-center relative`}
    >
      <img
        src={metadata.lqip}
        height={metadata.dimensions.height}
        width={metadata.dimensions.width}
        className={`${dimensionClasses} transform scale-110`}
        style={{
          filter: "blur(16px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <picture className={`${dimensionClasses}`}>
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
            className={`${dimensionClasses}`}
          />
        </picture>
      </div>
    </div>
  );
}
