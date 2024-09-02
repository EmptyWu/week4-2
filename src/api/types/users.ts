import type {AxiosResponse} from 'axios';

export interface BaseResponse{
    status:boolean;
}

export interface SigninResponse extends BaseResponse{
    exp:number;
    nickname?:string;
    token:string;
}

export interface SingupRes extends BaseResponse{
    uid:string;
}

export interface MsgResponse extends BaseResponse{
    message:string[];
}

export interface Signin{
    email:string;
    password:string;
    nickname:string;
    cofpwd:string;
}

export type SigninResponseData=AxiosResponse<SigninResponse>;
export type SingupResponseData=AxiosResponse<SingupRes>;
export type SinguoutResponseData=AxiosResponse<MsgResponse>;
export type res=AxiosResponse<void>;