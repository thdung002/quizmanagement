import request from '@/utils/request'

import qs from 'qs'

export function login(data) {
  return request({
    url: '/v1/user/login',
    method: 'post',
    data: qs.stringify(
      data)
}).then(respone=>{
    return respone;
  }).catch(e=> {
    console.log(e);
  });
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
