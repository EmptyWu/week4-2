import { apiUrl } from "./baseUrl";
export const TodosUrl=`${apiUrl}todos/`;
const getTodoUrl = (id:string, action:string = '') => `${apiUrl}todos/${id}${action ? `/${action}` : ''}`;

export const TodosToggleUrl=(id:string)=>getTodoUrl(id,'toggle');
export const TodosPutDelUrl=(id:string)=>getTodoUrl(id);
