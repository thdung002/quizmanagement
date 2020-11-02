import request from '@/utils/request'

import qs from 'qs'

export function GetConfig(data){
  return request({
    url: '/v1/config/getall',
    method: 'get',
    params: data,
  })
}
export function GetActiveConfig(){
  return request({
    url: '/v1/config/getactiveconfig',
    method: 'get',
  })
}
export function CreateConfig(data){
  return request({
    url:'/v1/config/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function UpdateConfig(data,id){
  return request({
    url:'v1/config/update/'+ id,
    method: 'put',
    data: qs.stringify(data)
  })
}
export function DeleteConfig(id){
  return request({
    url: '/v1/config/delete/'+id,
    method: 'delete'
  })
}
