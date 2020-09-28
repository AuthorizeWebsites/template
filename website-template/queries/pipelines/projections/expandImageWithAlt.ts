import { groq } from "../..";
import pipe from "../pipe";
import compose from "./compose";
import expandAsset from "./expandAsset";
import _rest from "./_rest";

export default (KEY: string) => groq`
    {
        "${KEY}": ${pipe(KEY, compose(_rest(), expandAsset()))}
    }
`;
