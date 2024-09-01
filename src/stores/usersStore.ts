import { defineStore } from 'pinia';


interface users {
    exp:number;
    nickname:string;
    token:string;
}
const usedate=new Date();
export const usersStore=defineStore('users',{
    state:()=>({
        userData:null as users | null,
        
    }),
    actions:{
        
        setToken(data:users) {
            this.userData = data;
            usedate.setDate(usedate.getDate()+1);
            document.cookie = `emptyTodo=${data.token}; expires=${usedate.toUTCString()}`;
          },
        clearToken() {
            this.userData = null;
            usedate.setDate(usedate.getDate()-2);
            document.cookie = `emptyTodo=${undefined}; expires=${usedate.toUTCString()}`;
          },
    },
    getters:{
        isAuthenticated: (state) => !!state.userData,
        getNickname : (state) => state.userData?.nickname,
    },
    persist:true
})