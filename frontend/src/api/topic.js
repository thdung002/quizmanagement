import request from '@/utils/request'

import qs from 'qs'

export function getInfo(token) {
  return request({
    url: '/v1/topic/get/'+token,
    method: 'get'
  })
}

export function GetTopic(data){
  return request({
    url: '/v1/topic/getall',
    method: 'get',
    params: data,
  })
}

export function CreateTopic(data){
  return request({
    url:'/v1/topic/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function UpdateTopic(data,id){
  return request({
    url:'v1/topic/update/'+ id,
    method: 'put',
    data: qs.stringify(data)
  })
}
export function DeleteTopic(id){
  return request({
    url: '/v1/topic/delete/'+id,
    method: 'delete'
  })
}
