<script setup lang="ts">
import {ref,onMounted } from 'vue';
import axios from 'axios';
import { RouterLink, useRouter } from 'vue-router'
import { usersStore } from '@/stores/usersStore';
import {SignoutUrl,CheckoutUrl} from '@/api/url/usersurl';
import { res,MsgResponse,SinguoutResponseData,SigninResponseData } from '@/api/types/users';
import { GetTodoResponseData,Todo} from '@/api/types/todo';
import { TodosUrl,TodosToggleUrl,TodosPutDelUrl } from '@/api/url/todosUrl';


const store =usersStore();
const {clearToken,setToken}=usersStore();
const router = useRouter();
const token=document.cookie.match(/(?:^|;\s*)emptyTodo=([^;]*)/)?.[1];
const todoList=ref<Todo[]>([]);
const content=ref('');
const signoutFn =async():Promise<void>=>{
    try{
        const response:SinguoutResponseData=await axios.post(SignoutUrl,{},{
            headers: {Authorization: store.userData?.token}
        });
        clearToken();
        //console.log(response.data);
        router.push('/login');
    }catch(error:any){
        const e=error.response.data as MsgResponse;
        console.log(e.status);
        e.message.forEach((msg)=>{
            console.log("Error",msg);
        });
    }
};

const AddTodos=async():Promise<void>=>{
    try{
        await axios.post(TodosUrl,{
            content:content.value
        },{
            headers: {Authorization: token}
        });
        content.value='';
        getTodos();
    }catch(error:any){
        if (error.response) {
            const e=error.response.data as MsgResponse;
            if(!e.status){
                router.push('/');
            }       
        }else {
            alert(error.message);
        }
    }
};

const checkOut =async():Promise<void>=>{
    try{
        const { data: responseData }: { data: SigninResponseData } = await axios.get(CheckoutUrl, {
            headers: { Authorization: token },
        });
        //console.log(responseData);
        setToken({
            status :responseData.status,
            token :token,
            nickname: responseData?.nickname,
        });
    }catch(error:any){
        if (error.response) {
            const e=error.response.data as MsgResponse;
            if(!e.status){
                router.push('/login');
            }       
        }else {
            alert(error.message);
        }
    }
};

const getTodos=async():Promise<void>=>{
    try{
        const response:GetTodoResponseData=await axios.get(TodosUrl,{
            headers: {Authorization: token}
        });
        if(response.data.data.length >0){
            todoList.value=response.data.data;
           
        }else {
            
        }
    }catch(error:any){
        const e=error.response.data as MsgResponse;
            if(!e.status){
                alert(e.message);
            }     
    }
};

const toggle=async(id:string):Promise<void>=>{
    try{
        await axios.patch(TodosToggleUrl(id),{},{
            headers: {Authorization: token}
        });
        getTodos();
       
    }catch(error:any){
        const e=error.response.data as MsgResponse;
            if(!e.status){
                alert(e.message);
            }       
    }
};

const delTodo=async(id:string):Promise<void>=>{
    try{
        await axios.delete(TodosPutDelUrl(id),{
            headers: {Authorization: token}
        });
        getTodos();
    }catch(error:any){
        const e=error.response.data as MsgResponse;
        if(!e.status){
            alert(e.message);
        }     
    }
};

onMounted(()=>{
    checkOut();
    getTodos();
});

</script>

<template>
  <section>
    <div id="todoListPage" class="bg-half">
  <nav>
    <h1><a href="#">ONLINE TODO LIST</a></h1>
    <ul>
      <li class="todo_sm"><a href="#"><span>{{store.userData?.nickname  }}的代辦</span></a></li>
      <li><a @click="signoutFn">登出</a></li>
    </ul>
  </nav>
  <div class="conatiner todoListPage vhContainer">
    <div class="todoList_Content">
      <div class="inputBox">
        <input type="text" v-model="content" placeholder="請輸入待辦事項">
        <a href="#" @click="AddTodos">
          <font-awesome-icon :icon="['fas', 'plus']" />
          
        </a>
      </div>
      <div class="todoList_list">
        <ul class="todoList_tab">
          <li><a href="#" class="active">全部</a></li>
          <li><a href="#">待完成</a></li>
          <li><a href="#">已完成</a></li>
        </ul>
        <div class="todoList_items">
          <ul class="todoList_item">
            <li v-for="(item,index) in todoList" :key="item.id">
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" value="true" @change="toggle(item.id)":checked="item.status" :id="item.id">
                <span>{{item.content}}</span>
              </label>
              <a href="#" @click="delTodo(item.id)">
                <font-awesome-icon :icon="['fas', 'xmark']" />
                
              </a>
            </li>
           
          </ul>
          <div class="todoList_statistics">
            <p> {{ todoList.length }} 個已完成項目</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </section>  
</template>

<style lang="scss" scoped>

</style>