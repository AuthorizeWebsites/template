import { groq } from "../..";

export default (TYPE: string) => groq`[_type == "${TYPE}"]`;
