import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import AddPostForm from "./AddPostForm";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostsList = () => {
    // get all posts
    const posts = useSelector(selectAllPosts)

    // sort the order
    // create a shallow copy using slice()
    // return -1 or +1 or 0 based on if 1 > the other,
    // it converts it date string using localeCompate function
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))



    const renderPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                {/* <PostAuthor userId={post.userId} /> */}
                <PostAuthor author={post.author} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
        </article>
    ))

    return (
        <section>
            <AddPostForm />
            <h2>Posts</h2>
            {renderPosts}
        </section>
    )
}

export default PostsList