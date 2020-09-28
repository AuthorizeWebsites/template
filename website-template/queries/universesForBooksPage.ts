import { groq } from ".";
import coverAndId from "./pipelines/coverAndId";

export default groq`*[_type == "universe"]{
    _id,
    name,
    "series": series[]->{
        _id,
        name,
        "books": books[]->${coverAndId}
    },
    "standAloneBooks": standAloneBooks[]->${coverAndId}
}`;
