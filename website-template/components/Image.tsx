import { RefObject, useEffect, useRef, useState } from "react";
import {
  Color,
  NumberBasicValueType,
  ObjectType,
  StringBasicValueType,
} from "../@types/sanity";

export interface ImageProps {
  alt?: string;
  lqipOnly?: boolean;
  lqipText?: string;
  queryParams?: [string, string][];
  breakPointScalar?: number;
  cover?: boolean;
  metadata: ObjectType & {
    dimensions: ObjectType & {
      aspectRatio: NumberBasicValueType;
      height: NumberBasicValueType;
      width: NumberBasicValueType;
    };
    lqip: StringBasicValueType;
    palette: ObjectType & {
      darkMuted: Color;
      darkVibrant: Color;
      dominant: Color;
      lightMuted: Color;
      lightVibrant: Color;
      muted: Color;
      vibrant: Color;
    };
  };
  url: string;
}

const supportedDimensions = [500, 700, 1000, 1400, 1900];

export default {};

function Image(props: ImageProps) {
  const imageRef: RefObject<HTMLImageElement> = useRef(null);
  const [showLQIP, setShowLIQP] = useState(true);

  useEffect(() => {
    if (showLQIP && imageRef.current?.complete) setShowLIQP(false);
  }, [imageRef.current?.complete]);

  const dimensionlessUrl = `${props.url}?auto=format${
    props.queryParams?.length
      ? `&${props.queryParams
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : ""
  }`;

  const chosenColorPair = (Object.entries(props.metadata.palette) as [
    string,
    Color
  ][])
    .filter(
      ([key]) => !(key.toLowerCase().includes("vibrant") || key === "dominant")
    )
    .map(([_, value]) => value)
    .reduce((acc, elem) => (acc.population > elem.population ? acc : elem));

  return (
    <div
      className="relative w-full h-full overflow-hidden /flex /items-center /justify-center"
      style={{
        background: showLQIP ? chosenColorPair.background : "transparent",
      }}
    >
      <div
        className="w-full transform scale-110 border"
        style={{
          paddingTop: `${100 / props.metadata.dimensions.aspectRatio}%`,
          background: `url(${props.metadata.lqip})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          filter: "blur(10px)",
        }}
      />
      {showLQIP && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="p-4 text-2xl font-light leading-tight tracking-wider text-center"
            style={{
              color: chosenColorPair.foreground,
            }}
          >
            {props.lqipText}
          </h1>
        </div>
      )}
      {!props.lqipOnly && (
        <picture className="absolute inset-0 justify-center min-w-full min-h-full transition-all duration-150 ease-in-out transform justify-self-stretch">
          {[...supportedDimensions].reverse().map((dim) => (
            <source
              key={dim}
              media={`(min-width: ${Math.round(
                dim * (props.breakPointScalar ?? 1.25)
              )}px)`}
              srcSet={`${dimensionlessUrl}&w=${dim}`}
            />
          ))}
          <img
            ref={imageRef}
            src={`${dimensionlessUrl}&w=${Math.round(
              supportedDimensions[0] / 1.5
            )}`}
            className={`${
              props.cover ? "object-cover self-stretch" : ""
            } min-w-full min-h-full`}
            alt={props.alt}
          />
        </picture>
      )}
    </div>
  );
}
