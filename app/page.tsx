import PostPage from "./(viewer)/[...slug]/page"

const Index = () => {
    return (
        <PostPage params={{ slug: 'index' }} />
    )
}
export default Index