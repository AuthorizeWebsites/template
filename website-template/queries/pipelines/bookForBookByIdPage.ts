import firstBookById from "./filters.ts/firstBookById";
import _index from "./filters.ts/_index";
import pipe from "./pipe";
import universe from "./universe";

export default (ID: string) => pipe(universe(), firstBookById(ID));
