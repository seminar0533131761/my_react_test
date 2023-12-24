export const addPosts = (post) =>{
    return{
        type: "ADDPOSTS",
        payload: post
    };
};