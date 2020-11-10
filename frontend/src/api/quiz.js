import request from '@/utils/request'

import qs from 'qs'

export function GetQuiz(data){
  return request({
    url: '/v1/quiz/getall',
    method: 'get',
    params: data,
  })
}
export function CreateQuiz(data){
  return request({
    url:'/v1/quiz/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function UpdateQuiz(data,id){
  return request({
    url:'v1/quiz/update/'+ id,
    method: 'put',
    data: qs.stringify(data)
  })
}
export function DeleteQuiz(id){
  return request({
    url: '/v1/quiz/delete/'+id,
    method: 'delete'
  })
}
