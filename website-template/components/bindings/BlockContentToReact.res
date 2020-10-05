module BlockContent = {
    @bs.module("@sanity/block-content-to-react")
    @react.component
    external make: (
        ~blocks: array<'a>, // todo : tighten to actual type
        ~renderContainerOnSingleChild: bool=?,
        ~className: string=?
    ) => React.element = "default"
}