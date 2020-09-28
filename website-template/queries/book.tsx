import { groq } from ".";
import asset from "./pipelines/asset";

export default (id) => groq`*[_id == "${id}" ][0]{
    ...,
    "cover": cover | ${asset},
    "genres": genres[]->,
    "recommendations": recommendations[]->{
        title,
        name,
        _id,
        _type,
        "cover": cover | ${asset},
    }
}`;
