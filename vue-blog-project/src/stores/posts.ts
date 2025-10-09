import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([
    {id: 1, title: 'Post 1', content: 'Content 1', createdAt: new Date(), updatedAt: new Date() },
    {id: 2, title: 'Post 2', content: 'Content 2', createdAt: new Date(), updatedAt: new Date() },
  ]);

  function getPost(id: number): Post | undefined {
    return posts.value.find(p => p.id === id);
  }

  function addPost(title: string, content: string) {
    const newPost = {
      id: posts.value.length + 1,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    posts.value.push(newPost);
  }

  function updatePost(id: number, title: string, content: string) {
    const post = posts.value.find(p => p.id === id);
    if (post) {
      post.title = title;
      post.content = content;
      post.updatedAt = new Date();
    }
  }

  return { posts, getPost, addPost, updatePost };
});
