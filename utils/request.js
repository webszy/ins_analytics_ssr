import axios from 'axios'
import { getShareData, getQueryHashByScript, getProfilePageContainerURL } from './tools'
import {Message} from 'element-ui'
const Service = axios.create({
  timeout: 7000, // 请求超时时间
  method: 'get'

})

const InsBaseProfileURL = 'https://www.instagram.com/'
Service.interceptors.response.use(
  response => {
    const res = response.data

    return res
  },
  error => {
    if (!error.response) {
      // Toast({
      //     message:'Oops! Something wrong with networks.',
      //     position: 'bottom',
      //     duration: 5000
      // });
    } else if (error.response.data.length > 0) {
      if (error.response.status === 404) {
        localStorage.setItem('status', 404)
        // Message.warning('Oops, this user doesn’t exist.')
      }
    } else {
      // Message.warning('Oops! Something wrong with networks.')
    }
    return Promise.reject(error)
  }
)

export function getUserBaseInfo (username) {
  return Service({
    url: InsBaseProfileURL + username + '/'
  })
    .then(res => {
      const jsFileURL = getProfilePageContainerURL(res)
      return getShareData(res, jsFileURL)
    })
}

export function getQueryHash (requestUrl) {
  return Service({
    method: 'get',
    url: requestUrl
  })
    .then(res => {
      return getQueryHashByScript(res, 'queryId')
    })
}

export function getNextPageData (userId, end_cursor, queryHash, tagname) {
  const p = {
    query_hash: queryHash,
    variables: ''
  }; let variables = {}
  if (tagname === undefined) {
    variables = {
      id: userId,
      first: 12,
      after: end_cursor
    }
  } else {
    variables = {
      tag_name: tagname,
      first: 6,
      after: end_cursor
    }
  }

  p.variables = JSON.stringify(variables)
  return Service({
    url: InsBaseProfileURL + 'graphql/query/',
    params: p
  })
}
export function getSingleMediaInfo (shortCode, username) {
  return Service({
    url: InsBaseProfileURL + username + '/p/' + shortCode + '/'
  })
    .then(res => {
      return getShareData(res)
    })
}
export function getHashTagData (tag) {
  return Service({
    url: InsBaseProfileURL + 'explore/tags/' + tag + '/',
    headers: {
      'Content-Type': 'text/html;charset=UTF-8'
    }
  })
    .then(res => {
      const jsFileURL = getProfilePageContainerURL(res, 'hashtag')
      return getShareData(res, jsFileURL)
    })
}
