import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePostsStore } from '../posts';

// Date 객체의 비교를 위해 시간을 모의합니다.
// 테스트 시점의 시간을 고정하여 createdAt, updatedAt 비교를 안정적으로 만듭니다.
const mockDate = new Date(2025, 0, 1, 10, 0, 0); // 2025년 1월 1일 10시 0분 0초
vi.setSystemTime(mockDate);

describe('Posts Store', () => {
  beforeEach(() => {
    // 각 테스트 전에 Pinia 인스턴스를 초기화하여 테스트 간 격리 보장
    setActivePinia(createPinia());
    // 시스템 시간을 다시 모의된 시간으로 설정하여 각 테스트가 동일한 시작 시간을 가지도록 합니다.
    vi.setSystemTime(mockDate);
  });

  // 초기 상태 테스트
  it('초기 posts 배열이 올바르게 설정된다', () => {
    const store = usePostsStore();
    expect(store.posts).toHaveLength(2);
    expect(store.posts[0].id).toBe(1);
    expect(store.posts[0].title).toBe('Post 1');
    expect(store.posts[1].id).toBe(2);
    expect(store.posts[1].title).toBe('Post 2');
    expect(store.posts[0].createdAt).toEqual(mockDate);
    expect(store.posts[0].updatedAt).toEqual(mockDate);
  });

  // addPost 액션 테스트
  it('addPost 액션이 새 게시물을 추가한다', () => {
    const store = usePostsStore();
    const initialPostsLength = store.posts.length;

    store.addPost('New Post Title', 'New Post Content');

    expect(store.posts).toHaveLength(initialPostsLength + 1);
    const newPost = store.posts[store.posts.length - 1];

    expect(newPost.id).toBe(initialPostsLength + 1); // 기존 게시물 2개 + 새로 추가된 게시물
    expect(newPost.title).toBe('New Post Title');
    expect(newPost.content).toBe('New Post Content');
    expect(newPost.createdAt).toEqual(mockDate);
    expect(newPost.updatedAt).toEqual(mockDate);
  });

  // updatePost 액션 테스트
  it('updatePost 액션이 기존 게시물을 업데이트한다', () => {
    const store = usePostsStore();
    const postIdToUpdate = 1;
    const updatedTitle = 'Updated Post 1 Title';
    const updatedContent = 'Updated Post 1 Content';

    // 시간을 약간 미래로 변경하여 updatedAt이 실제로 업데이트되는지 확인
    const futureDate = new Date(2025, 0, 1, 10, 5, 0); // 5분 후
    vi.setSystemTime(futureDate);

    store.updatePost(postIdToUpdate, updatedTitle, updatedContent);

    const updatedPost = store.posts.find(p => p.id === postIdToUpdate);

    expect(updatedPost).toBeDefined();
    expect(updatedPost?.title).toBe(updatedTitle);
    expect(updatedPost?.content).toBe(updatedContent);
    expect(updatedPost?.updatedAt).toEqual(futureDate); // updatedAt이 변경되었는지 확인
    expect(updatedPost?.createdAt).toEqual(mockDate); // createdAt은 변경되지 않아야 함
  });

  it('존재하지 않는 게시물의 id로 updatePost를 호출하면 아무것도 변경되지 않는다', () => {
    const store = usePostsStore();
    const initialPosts = [...store.posts]; // 초기 상태 복사

    store.updatePost(999, 'Non Existent', 'Content'); // 존재하지 않는 ID

    expect(store.posts).toEqual(initialPosts); // posts 배열이 변경되지 않아야 함
  });

  // getPost 메서드 테스트 추가
  it('getPost 메서드가 존재하는 게시물을 올바르게 반환한다', () => {
    const store = usePostsStore();
    const existingPost = store.getPost(1);

    expect(existingPost).toBeDefined();
    expect(existingPost?.id).toBe(1);
    expect(existingPost?.title).toBe('Post 1');
  });

  it('getPost 메서드가 존재하지 않는 게시물에 대해 undefined를 반환한다', () => {
    const store = usePostsStore();
    const nonExistentPost = store.getPost(999); // 존재하지 않는 ID

    expect(nonExistentPost).toBeUndefined();
  });
});
