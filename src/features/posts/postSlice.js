import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from "axios";

// base url
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

// async thunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        return [...response.data]
    } catch (err) {
        return err.message
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL, initialPost)
        return response.data
    } catch (err) {
        return err.message
    }
})

// subtract time now using sub from date-fns
// const initialState = [
//     {
//         id: 1,
//         title: 'Learning Redux Toolkit',
//         author: '',
//         content: "I've heard good things.",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {
//         id: 2,
//         title: 'Slices..',
//         author: '',
//         content: "The more I say slice, the more I want to eat pizza.", date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     }
// ]

const initialState = {
    postsArr: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.postsArr.push(action.payload)
            },
            // prepare(title, content, userId) {
            //     return {
            //         payload: {
            //             id: nanoid(),
            //             title,
            //             content,
            //             date: new Date().toISOString(),
            //             userId,
            //             reactions: {
            //                 thumbsUp: 0,
            //                 wow: 0,
            //                 heart: 0,
            //                 rocket: 0,
            //                 coffee: 0
            //             }
            //         }
            //     }
            // }
            prepare(title, content, author) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        author,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            // get the post id and reaction from the action payload
            const { postId, reaction } = action.payload
            // check the id from the post
            const existingPost = state.postsArr.find(post => post.id === postId)
            // if id matches add a reaction
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    // async thunk that happens outside the slice will handle using extraReducer
    extraReducers(builder) {
        // listen to promise action types - the first parameter in addCase
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post
                })

                // Add any fetched posts to the array
                state.postsArr = state.postsArr.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                state.postsArr.push(action.payload)
            })
    }
})

//create a dynamic selector , if there will be a change in the state it would be better to handle the logic here instead of checking and refactoring every component

export const selectAllPosts = (state) => state.posts.postsArr;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postSlice.actions

export default postSlice.reducer