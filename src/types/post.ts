
export type PostType = 'storytelling' | 'reflection' | 'thread';

export type PostStatus = 'draft' | 'scheduled' | 'validated';

export interface Post {
  id: string;
  content: string;
  type: PostType;
  status: PostStatus;
  scheduledFor?: Date;
  createdAt: Date;
  updatedAt: Date;
}
