import axios from './axios-config.js'
import { logInContext } from "../models/UserContext"

export async function savePostFormData(formData , postID) {
    formData.append('postID' , postID)
    await axios.post('/posts/updatepostarray' , formData ,
        { headers: {'Content-Type': 'multipart/form-data'}})
}

export async function signIn(username , password , setContext) {
    const data = {
        username: username,
        password: password
    }
    return axios.post('/accounts/signin' , data)
        .then( result => {
            if(result.status === 200) {
                logInContext(result.data[0].email , result.data[0].username , result.data[0].role)
                setContext(result.data[0].email , result.data[0].username , result.data[0].role)
                return true
            }
        })
        .catch()
}

export async function signOut(username) {
    const data = {username: username}
    axios.post('/accounts/signout', data)
        .then() 
        .catch()
}   

export async function createAccount(username , password , email , role) {
    const data = {
        email: email,
        username: username,
        password: password,
        role: role
    }
    axios.post('/accounts/createaccount', data)
        .then()
        .catch(error => {})
}

export async function createBlog(title , author) {
    const data = {
        title: title,
        author: author
    }

    axios.post('/posts/createblog', data)
        .catch()
    
}

export async function createPost(author, blogID, postArray, title, publish) {
    const data = {
        publish: publish,
        author: author,
        blogID: blogID,
        title: title
    }

    await axios.post('/posts/createpost' , data)
        .then(async (result) => { 
            savePostFormData(postArray, result.data[0].id); })
        .catch()

}

export async function getMyBlogs(username) {
    return (
        axios.get('/posts/blogsbyauthor' , {
            params: {author : username}
        })
            .then(async result => {
                return result.data
            })
            .catch(error => {})
    )
}

export async function getBlogByBlogID(blogID) {
    return (
        axios.get('/posts/blogbyblogid' , {
            params: {blogID: blogID}
        })
            .then(async result => {
                return result.data[0]
            })
            .catch()
    )
}

export async function getPostsByBlogID(blogID) {
    return (
        axios.get('/posts/postsbyblogid', {
            params: {id: blogID}
        })
            .then(async result => {
                return result.data
            })
            .catch()
    )
}

export async function getPostByPostID(postID) {
    return (
        axios.get('/posts/postbypostid', {
            params: {postID : postID}
        })
            .then(async result => {
                return result.data[0]
            })
            .catch()
    )
}

export async function getAllBlogs() {
    return (
        axios.get('/posts/allblogs')
            .then( async result => {
                return result.data
            })
            .catch()
    )
}

export async function saveBlogTravelDates(dates , blogID) {
    const data = {travelDates : dates , blogID : blogID}
    axios.post('/posts/saveblogtraveldates' , data)
        .catch()

}

export async function saveBlogTitle(title , blogID) {
    const data = { title: title , blogID: blogID }
    axios.post('/posts/saveblogtitle' , data)
        .catch()
}

export async function changePublishPostStatus(postID) {
    const data = {postID: postID}
    axios.post('/posts/publishpost' , data)
        .catch()
}

export async function featureBlog(blogID) {
    const data = {blogID : blogID}
    axios.post('/posts/featureblog' , data)
        .catch()
}

export async function getFeaturedBlogAndPosts() {
    return (
        axios.get('/posts/getfeaturedblog')
            .then(async result => {return result.data})
            .catch()
    )
}
