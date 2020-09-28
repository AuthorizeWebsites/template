import pipe from "../pipe";
import universe from "./universe";
import _id from "./_id";
import _index from "./_index";

export default (ID: string) => pipe(universe(), _id(ID), _index(0));
