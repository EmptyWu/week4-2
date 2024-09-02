import { ref, computed } from 'vue'
import { defineStore } from 'pinia';


export const useTokenStore =defineStore('token',{
    state:()=>({
        token: null as string | null  ,
    }),
    actions:{
        setToken(toekn:string) {
           this.token=toekn;
           
          },
        clearToken() {
            this.token=null;
           
          },
    },
    getters:{
        isAuthenticated: (state) => !!state.token,        
    },
    persist:true
})