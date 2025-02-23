
export type PostType = 'storytelling' | 'reflection' | 'thread';

export type PostStatus = 'draft' | 'scheduled' | 'validated';

export interface Post {
  id: string;
  hook: string;
  content: string;
  type: PostType;
  status: PostStatus;
  scheduledFor?: Date;
  likes?: number;
  comments?: number;
  engagement?: number;
  createdAt: Date;
  updatedAt: Date;
}
