import pipe from "../pipe";
import books from "./books";
import _id from "./_id";
import _index from "./_index";
import _type from "./_type";

export default (ID: string) => pipe(books(), _id(ID), _index(0));
