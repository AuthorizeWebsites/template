import { groq } from ".";

export default groq`*[_type == 'siteConfiguration'][0]{ authorName, socialMedia[]{ 'platform': _type, link }}`;
