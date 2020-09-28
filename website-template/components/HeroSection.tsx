export function HeroSection({
  background,
  primaryText,
  secondaryText,
}: {
  background: {
    alt?: string;
    asset: {
      dimensions: {
        aspectRatio: number;
        height: number;
        width: number;
      };
      dominant: string;
      url: string;
    };
  };
  primaryText?: string;
  secondaryText?: string;
}) {
  return (
    <div className="relative flex items-center justify-center w-full px-4 py-24 mb-8 sm:py-64">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
        <img
          src={`${background.asset.url}?auto=format&w=1920`}
          alt={background.alt ?? "background"}
          width={background.asset.dimensions.width}
          height={background.asset.dimensions.height}
          className="absolute object-cover min-w-full min-h-full opacity-50"
        />
      </div>
      <div className="relative z-10 max-w-5xl text-center">
        {primaryText && (
          <h1 className="text-5xl font-semibold leading-tight tracking-wider text-white sm:text-6xl">
            {primaryText}
          </h1>
        )}
        {secondaryText && (
          <h3 className="text-2xl font-light tracking-wider text-gray-200">
            {secondaryText}
          </h3>
        )}
      </div>
    </div>
  );
}
