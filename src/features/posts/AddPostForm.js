import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postAdded } from "./postSlice"
import { selectAllUsers } from "../users/usersSlice"

const AddPostForm = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    // const [userId, setUserId] = useState("")
    const [author, setAuthor] = useState("")
    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers)

    // const renderOptions = users.map(user => (
    //     <option key={user.id} value={user.id}>
    //         {user.name}
    //     </option>
    // ))

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const onContentChanged = (e) => {
        setContent(e.target.value)
    }
    const onAuthorChanged = (e) => {
        // setUserId(e.target.value)
        setAuthor(e.target.value)
    }

    const onSavePostClicked = () => {
        if (title && content) {
            // dispatch(postAdded(title, content, userId))
            dispatch(postAdded(title, content, author))
        }

        // reset the form after sending to state
        setTitle("")
        setContent("")
        // setUserId("")
        setAuthor("")
    }

    // check if all forms are true
    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    const canSave = Boolean(title) && Boolean(content) && Boolean(author)

    const renderContent = (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Title: </label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postAuthor">Author: </label>
                {/* <select id="postAuthor" value={userId} name="postAuthor" onChange={onAuthorChanged}>
                    <option value=""></option>
                    {renderOptions}
                </select> */}
                <input
                    type="text"
                    id="postAuthor"
                    name="postAuthor"
                    value={author}
                    onChange={onAuthorChanged}
                />
                <label htmlFor="postContent">Content: </label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button disabled={!canSave} onClick={onSavePostClicked} type="button">Save Post</button>
            </form>
        </section>
    )

    return renderContent
}

export default AddPostForm