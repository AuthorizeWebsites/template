import { groq } from "../..";

export default () => groq`{ "recommendations": recommendations[]-> }`;
