module Link = {
    @bs.module("next/link")
    @react.component
    external make: (
        ~href: string,
        ~\"as": string=?,
        ~replace: bool=?,
        ~scroll: bool=?,
        ~passHref: bool=?,
        ~prefetch: bool=?,
        ~children: React.element
    ) => React.element = "default"
}

module Head = {
    @bs.module("next/head")
    @react.component
    external make: (
        ~children: React.element
    ) => React.element = "default";
}