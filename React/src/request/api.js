import axios from 'axios'
import config from '@/config'
import qs from 'qs'

export function GlobalPoTickList(){
    return axios.get(`/p0ticket/Global`).then(result=>{
        return Promise.resolve(result.data)
    });
}
export function ChinaPoTickList(){
    return axios.get(`/p0ticket/China`).then(result=>{
        return Promise.resolve(result.data)
    });
}
export function UpdateP0tick(params){
    return axios.put( `/p0ticket`,
        qs.stringify({
            p0ticket: params.p0,
            name: params.name
        })).then(result=>{
        return Promise.resolve(result.data)
    });
}
