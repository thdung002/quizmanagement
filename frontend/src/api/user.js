import request from '@/utils/request'

import qs from 'qs'

export function login(data) {
  return request({
    url: '/v1/user/login',
    method: 'post',
    data: qs.stringify(data)
})
}


export function getInfo(token) {
  return request({
    url: '/v1/user/get/'+token,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/v1/user/logout',
    method: 'post'
  })
}
export function GetUser(data){
  return request({
    url: '/v1/user/getall',
    method: 'get',
    params: data,
  })
}

export function CreateUser(data){
  return request({
    url:'/v1/user/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function UpdateUser(data,id){
  return request({
    url:'v1/user/update/'+ id,
    method: 'put',
    data: qs.stringify(data)
  })
}
export function DeleteUser(id){
  return request({
    url: '/v1/user/delete/'+id,
    method: 'delete'
  })
}
