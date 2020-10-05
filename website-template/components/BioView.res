module BlockContent = BlockContentToReact.BlockContent
module Link = Next.Link

@gentype.as("BioView")
@react.component
let make = (~content) => {
    <div className=%tw("flex flex-col p-8 space-y-4 bg-white border border-gray-100 rounded-md shadow-lg")>
        <h1 className=%tw("text-4xl font-bold leading-none tracking-wider text-gray-900")>
            {React.string("Bio")}
        </h1>
        <BlockContent blocks=content renderContainerOnSingleChild=true className=%tw("prose max-w-none") />
        <Link href="/about">
            <a className=%tw("self-start px-3 py-2 text-lg font-semibold tracking-wider text-white rounded-md shadow-lg focus:outline-none focus:from-teal-500 focus:to-teal-600 hover:from-teal-500 hover:to-teal-600 bg-gradient-to-tr from-teal-400 to-teal-500")>
                {React.string("Read More")}
            </a>
        </Link>
    </div>
}