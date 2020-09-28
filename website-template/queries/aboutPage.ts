import { groq } from ".";
import asset from "./pipelines/asset";

export default groq`*[_type == 'aboutMePage'][0]{ blurb, header, "headshot": headshot${asset} }`;
