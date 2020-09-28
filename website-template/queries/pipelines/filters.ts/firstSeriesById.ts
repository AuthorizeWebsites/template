import pipe from "../pipe";
import series from "./series";
import _id from "./_id";
import _index from "./_index";

export default (ID: string) => pipe(series(), _id(ID), _index(0));
