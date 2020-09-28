import { groq } from "..";

export default groq`
    {
        alt,
        "asset": asset->{
            "dimensions": metadata.dimensions{
                aspectRatio,
                height,
                width
            },
            "dominant": metadata.palette.dominant.background,
            url,   
        }
    }
`;
