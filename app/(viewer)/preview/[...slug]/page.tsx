import PostPage from "../../[...slug]/page";
const PreviewPage = ({params}) => {
    return (
        <PostPage params={params} preview={false} />
    )
}
export default PreviewPage