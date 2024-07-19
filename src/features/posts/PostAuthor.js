import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);

    const author = users.find(user => user.id === userId);

    return <span>by {author ? author.name : 'Unknown author'}</span>
}
// const PostAuthor = ({ author }) => {
//     const postAuthor = author?.charAt(0).toUpperCase() + author?.slice(1)

//     return <span>by {author ? postAuthor : 'Unknown author'}</span>
// }

export default PostAuthor