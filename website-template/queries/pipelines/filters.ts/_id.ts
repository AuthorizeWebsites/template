import { groq } from "../..";
import _type from "./_type";

export default (ID: string) => groq`[_id == "${ID}"]`;
