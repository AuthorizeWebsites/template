import { groq } from ".";
import asset from "./pipelines/asset";

export default groq`
    *[_id == "homePageDocumentId"][0]{
    "sections": sections[]{
        ...,
        "books": books[]->{
            _id,
            "authors": authors[]->,
            "cover": cover | ${asset},
            description,
            title,
        },
        autoPlay,
        infiniteLoop,
        interval,
        "background": background{
            alt,
            "asset": asset->{
                "dimensions": metadata.dimensions{
                aspectRatio,
            height,
            width
            },
                "dominant": metadata.palette.dominant.background,
                url
                }
            }
        },
    }
`;
