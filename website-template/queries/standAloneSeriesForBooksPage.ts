import { groq } from ".";
import coverAndId from "./pipelines/coverAndId";

export default groq`
    *[
	    _type == "series" && count(
  	        *[_type == "universe" && ^._id in series[]._ref]
        ) == 0
    ] | {
        _id,
        name,
        "books": books[]->${coverAndId}
    }
`;
