export function HiddenCollectionsBar({
  numHidden,
  singular,
  plural,
}: {
  numHidden: number;
  singular: string;
  plural: string;
}) {
  return (
    <div className="flex items-center justify-center p-4 bg-gray-700 rounded-md shadow-lg">
      <p className="text-lg font-light tracking-wider text-center text-gray-200 opacity-100">
        {numHidden} {numHidden > 1 ? `${plural} were` : `${singular} was`}{" "}
        hidden based on your filter criteria.
      </p>
    </div>
  );
}
