import { groq } from "..";
import asset from "./asset";

export default groq`
    {
        _id,
        "cover": cover | ${asset}
    }
`;
