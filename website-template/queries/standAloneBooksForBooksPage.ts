import { groq } from ".";
import coverAndId from "./pipelines/coverAndId";

export default groq`
    *[
	    _type == "book" && count(
  	        *[_type == "universe" && ^._id in standAloneBooks[]._ref]
        ) + count(
            *[_type == "series" && ^._id in books[]._ref]
        ) == 0
    ] | ${coverAndId}
`;
