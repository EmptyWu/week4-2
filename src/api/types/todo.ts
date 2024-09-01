import type {AxiosResponse} from 'axios';
import {BaseResponse, MsgResponse} from '@/api/types/users';

export interface Todo {
    id:string;
    createTime: number;  // `createTime` 是一个数字类型，表示时间戳
    content: string;     // `content` 是一个字符串类型，表示待办事项内容
    status: boolean;   
}

export interface NewTodo extends BaseResponse{
    newTodo: Todo; 
}

export interface TodoList extends BaseResponse{
    data: Todo[]; 
}

export type NetTodoResponseData=AxiosResponse<NewTodo>;
export type GetTodoResponseData=AxiosResponse<TodoList>;
export type MsgTodoResponseData=AxiosResponse<MsgResponse>;