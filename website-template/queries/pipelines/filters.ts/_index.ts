import { groq } from "../..";

export default (INDEX: number) => groq`[${INDEX}]`;
