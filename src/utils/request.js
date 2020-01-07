import axios from 'axios';
import {BASE_API_URL} from "./globals";
import {loaderDisplay} from "./methods";

export const api = async (path,type,body = null) => {
    loaderDisplay('block');
    let instance = axios.create({
        baseURL: BASE_API_URL,
        method: type,
        data: body,
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer `}
    });
    let {data} = await instance(path);
    loaderDisplay('none');

    return data;
};