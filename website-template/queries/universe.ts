import { groq } from ".";
import asset from "./pipelines/asset";
import coverAndId from "./pipelines/coverAndId";

export default (id) => groq`*[_id == "${id}"][0]{
    ...,
    "genres": genres[]->,
    "recommendations": recommendations[]->{
        title,
        name,
        _id,
        _type,
        "cover": cover | ${asset},
    },
    "standAloneBooks": standAloneBooks[]->${coverAndId},
    "series": series[]->{
        ...,
        "books": books[]->${coverAndId}
    }
}`;
