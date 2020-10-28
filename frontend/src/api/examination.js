import request from '@/utils/request'

import qs from 'qs'

export function GetExam(data){
  return request({
    url: '/v1/exam/getall',
    method: 'get',
    params: data,
  })
}
export function GetActiveExam(){
  return request({
    url: '/v1/exam/getactive',
    method: 'get',
  })
}

export function CreateExam(data){
  return request({
    url:'/v1/exam/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function UpdateExam(data,id){
  return request({
    url:'v1/exam/update/'+ id,
    method: 'put',
    data: qs.stringify(data)
  })
}
export function DeleteExam(id){
  return request({
    url: '/v1/exam/delete/'+id,
    method: 'delete'
  })
}
