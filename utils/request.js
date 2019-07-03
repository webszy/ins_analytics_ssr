import axios from 'axios'
import {getShareData,getQueryHashByScript,getProfilePageContainerURL} from './tools'
const Service = axios.create({
    timeout: 7000, // 请求超时时间
    method:'get',

})
const InsBaseProfileURL='https://www.instagram.com/'
Service.interceptors.response.use(
        response => {
            const res = response.data
          
            return res
        },
        error => {
            return Promise.reject(error)
        }
    )

export function getUserBaseInfo(username){
  return Service({
    url:InsBaseProfileURL+username+'/'
  })
  .then(res=>{
    let jsFileURL=getProfilePageContainerURL(res)
    return getShareData(res,jsFileURL)
  })
}

export function getQueryHash(requestUrl){
    return Service({
        method: 'get',
        url: requestUrl,
    })
    .then(res=>{
      return  getQueryHashByScript(res,'queryId')
    })
}
export function getNextPageData(userId, end_cursor,queryHash) {
     let p={
        query_hash:queryHash,
        variables:''
    },
    variables={
        id:userId,
        first:12,
        after:end_cursor
    }
    p.variables=JSON.stringify(variables)
    return Service({
         url:InsBaseProfileURL+'graphql/query/',
         params:p
    })
}
export function getSingleMediaInfo(shortCode,username){
  return Service({
    url:InsBaseProfileURL+username+'/p/'+shortCode+'/'
  })
  .then(res=>{
    return getShareData(res)
  })
}
