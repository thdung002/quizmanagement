import request from '@/utils/request'

import qs from 'qs'

export function GetQuestion(data){
  return request({
    url: '/v1/question/getall',
    method: 'get',
    params: data,
  })
}
export function GetActiveQuestion(){
  return request({
    url: '/v1/question/getactive',
    method: 'get',
  })
}
export function CreateQuestion(data){
  return request({
    url:'/v1/question/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function UpdateQuestion(data,id){
  return request({
    url:'v1/question/update/'+ id,
    method: 'put',
    data: qs.stringify(data)
  })
}
export function DeleteQuestion(id){
  return request({
    url: '/v1/question/delete/'+id,
    method: 'delete'
  })
}
