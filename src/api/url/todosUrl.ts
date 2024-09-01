import { apiUrl } from "./baseUrl";
export const TodosUrl=`${apiUrl}todos/`;
const getTodoUrl = (id, action = '') => `${apiUrl}todos/${id}${action ? `/${action}` : ''}`;

export const TodosToggleUrl=(id)=>getTodoUrl(id,'toggle');
export const TodosPutDelUrl=(id)=>getTodoUrl(id);
