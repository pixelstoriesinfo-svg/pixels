export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
}

export interface Album {
  id: number;
  name: string;
  sub_category_id: number;
  created_at: Date;
  sub_category_name?: string;
  category_name?: string;
  cover_image?: string;
}

export interface Media {
  id: number;
  album_id: number;
  file_name: string;
  file_type: 'image' | 'video';
  order_index: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read';
  received_at: Date;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}