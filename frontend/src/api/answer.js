import request from '@/utils/request'

import qs from 'qs'

export function GetAnswer(data){
  return request({
    url: '/v1/answer/getall',
    method: 'get',
    params: data,
  })
}

export function CreateAnswer(data){
  return request({
    url:'/v1/answer/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function UpdateAnswer(data,id){
  return request({
    url:'v1/answer/update/'+ id,
    method: 'put',
    data: qs.stringify(data)
  })
}
export function DeleteAnswer(id){
  return request({
    url: '/v1/answer/delete/'+id,
    method: 'delete'
  })
}
