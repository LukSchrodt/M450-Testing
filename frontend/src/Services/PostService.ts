import api from '../config/Api';

type Props = {
    title: string;
    text: string;
    priority: string;
}

const PostService = {
    getAllPosts: async () => {
        const data = await api.get(`/my_lists/mylist`).catch((error) => {;
            throw error;
        });
        return data.data;
    },
    getAllPostsSorted: async () => {
        const data = await api.get(`/my_lists/sorted`).catch((error) => {;
            throw error;
        });
        return data.data;
    },
    createPost: async (post : Props ) => {
        const data = await api.post('/my_lists/', {title: post.title, text: post.text, priority: post.priority}).catch((error) => {
            throw error;
        });
        return data.data;
        },
    deletePost: async (id: string) => {
        return await api.delete(`/my_lists/${id}`).catch((error) => {
            throw error;
        });
    },
    updatePost: async (id: string, post : Props ) => {
        const data = await api.put(`/my_lists/${id}`, {title: post.title, text: post.text, priority: post.priority}).catch((error) => {
            throw error;
        });
        return data.data;
    },
}

export default PostService;