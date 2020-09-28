import { groq } from ".";
import coverAndId from "./pipelines/coverAndId";

export default (id) => groq`*[_id == "${id}"][0]{
    ...,
    "books": *[
	    _type == "book" && "${id}" in genres[]._ref && count(
  	        *[_type == "universe" && "${id}" in genres[]._ref && ^._id in standAloneBooks[]._ref]
        ) + count(
            *[_type == "series" && "${id}" in genres[]._ref && ^._id in books[]._ref]
        ) == 0
    ] | ${coverAndId},
    "series": *[
	    _type == "series" && "${id}" in genres[]._ref && count(
  	        *[_type == "universe" && "${id}" in genres[]._ref && ^._id in series[]._ref]
        ) == 0
    ] | {
        _id,
        name,
        "books": books[]->${coverAndId}
    },
    "universes": *[_type == "universe" && "${id}" in genres[]._ref]{
        _id,
        name,
        "standAloneBooks": standAloneBooks[]->${coverAndId},
        "series": series[]->{
            ...,
            "books": books[]->${coverAndId}
        }
    },
}`;
