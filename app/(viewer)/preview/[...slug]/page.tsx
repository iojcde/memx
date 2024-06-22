import PostPage from "../../[...slug]/page";
const PreviewPage = ({params}) => {
    return (
        <PostPage params={params} preview={true} />
    )
}
export default PreviewPage