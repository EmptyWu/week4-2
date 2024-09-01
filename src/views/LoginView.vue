<script setup lang="ts">
import {ref} from 'vue';
import axios from 'axios';
import { SigninUrl,SignupUrl } from '@/api/url/usersurl';
import { Signin,  MsgResponse, SingupRes } from '@/api/types/users';
import type { res,SigninResponseData } from '@/api/types/users';
import { usersStore } from '@/stores/usersStore';
import {useRouter} from 'vue-router';

const isLogin=ref(false);
const isemail=ref(false);
const {setToken}=usersStore();
const router = useRouter();
const SignPram =ref<Signin>({
    email:'',
    password:'',
    nickname:'',
    cofpwd:''
});

const signinFn =async():Promise<void>=>{
    isemail.value=false;
    if(SignPram.value.email ===""){
        isemail.value=true;
    }
    try{
        const response:SigninResponseData= await axios.post(SigninUrl
            ,{
            email: SignPram.value.email,
            password: SignPram.value.password       
            });
        if(response.data.status){
            setToken(response.data);
            router.push('/');
        }
    }
    catch(error:any){
        const e=error.response.data as MsgResponse;
        if(!e.status){
            alert(e.message);
        }
    }

};
const signupFn= async ():Promise<void> =>{
    try{
        isemail.value=false;
        if(SignPram.value.cofpwd==='' || SignPram.value.password !== SignPram.value.cofpwd){
            throw new Error('密碼輸入有誤');
        }
        
        const response:SingupRes= await axios.post(SignupUrl
            ,{
            email: SignPram.value.email,
            password: SignPram.value.password,
            nickname: SignPram.value.nickname
            });
        console.log(response.data);
        if(response.data.status){
            alert('註冊成功');
            router.push('/login#loginPage');
        }
    }
    catch(error:any){
        if (error.response) {
            const e=error.response.data as MsgResponse;
            if(!e.status){
                alert(e.message);
            }       
        }else {
            alert(error.message);
        }
    }
};

const reg=(status:boolean)=>{
    isLogin.value=status;
};

</script>
<template>
    <!-- login_page -->
<div id="loginPage" class="bg-yellow" v-if="!isLogin">
  <div class="conatiner loginPage vhContainer ">
    <div class="side">
      <a href="#"><img class="logoImg" src="/logo.png" alt=""></a>
      <img class="d-m-n" src="/img.png" alt="workImg">
    </div>
    <div>
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
        <label class="formControls_label" for="email">Email</label>
        <input class="formControls_input" type="text" id="email" v-model="SignPram.email" name="email" placeholder="請輸入 email" required>
        <span v-show="isemail">此欄位不可留空</span>
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" name="pwd" v-model="SignPram.password" id="pwd" placeholder="請輸入密碼" required>
        <input class="formControls_btnSubmit" type="button" @click="signinFn" value="登入">
        <a class="formControls_btnLink" v-on:click="reg(!isLogin)">註冊帳號</a>
      </form>
    </div>
  </div>
</div>

<!-- sign up -->
<div id="signUpPage" class="bg-yellow" v-else>
  <div class="conatiner signUpPage vhContainer">
    <div class="side">
      <a href="#"><img class="logoImg" src="/logo.png" alt=""></a>
      <img class="d-m-n" src="/img.png" alt="workImg">
    </div>
    <div>
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">註冊帳號</h2>
        <label class="formControls_label" for="email">Email</label>
        <input class="formControls_input" type="text" v-model="SignPram.email" id="email" name="email" placeholder="請輸入 email" required>
        <label class="formControls_label" for="name">您的暱稱</label>
        <input class="formControls_input" type="text" v-model="SignPram.nickname" name="name" id="name" placeholder="請輸入您的暱稱">
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" v-model="SignPram.password" name="pwd" id="pwd" placeholder="請輸入密碼" required>
        <label class="formControls_label" for="pwd">再次輸入密碼</label>
        <input class="formControls_input" type="password" v-model="SignPram.cofpwd" name="pwd" id="pwd" placeholder="請再次輸入密碼" required>
        <input class="formControls_btnSubmit" type="button" @click="signupFn" value="註冊帳號">
        <a class="formControls_btnLink" v-on:click="reg(!isLogin)">登入</a>
      </form>
    </div>
  </div>

</div>
</template>