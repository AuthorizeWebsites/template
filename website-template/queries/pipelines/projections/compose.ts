export default (...vargs: string[]) =>
  "{ " + vargs.map((filter) => filter.trim().slice(1, -1)).join(", ") + " }";
