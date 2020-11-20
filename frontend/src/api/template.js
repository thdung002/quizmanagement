import request from '@/utils/request'

import qs from 'qs'

export function GetTemplate(data){
  return request({
    url: '/v1/template/getall',
    method: 'get',
    params: data,
  })
}
export function GetOneTemplate(id){
  return request({
    url: '/v1/template/get/' +id,
    method: 'get'
  })
}

export function CreateTemplate(data){
  return request({
    url:'/v1/template/add',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function GetActiveTemplate(){
  return request({
    url: '/v1/exam/getactivetemplate',
    method: 'get',
  })
}
export function UpdateTemplate(data,id){
  return request({
    url:'v1/template/update/'+ id,
    method: 'put',
    data: qs.stringify(data)
  })
}
export function DeleteTemplate(id){
  return request({
    url: '/v1/template/delete/'+id,
    method: 'delete'
  })
}
