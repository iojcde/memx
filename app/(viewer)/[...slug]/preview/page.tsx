import PostPage from "../page";
const PreviewPage = ({params}) => {
    return (
        <PostPage params={params} preview={false} />
    )
}
export default PreviewPage