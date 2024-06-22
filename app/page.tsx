import PostPage from './(viewer)/[...slug]/page'

const Index = () => {
    return <PostPage preview={false} params={{ slug: `index` }} />
}
export default Index
