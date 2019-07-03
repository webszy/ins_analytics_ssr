


export function getShareData(str,url){
  if(url===undefined){
    return JSON.parse(str.match(/(window._sharedData\s?)(=\s?)(.*?);<\/script>/)[3])
  }else{
    return {
      profile:JSON.parse(str.match(/(window._sharedData\s?)(=\s?)(.*?);<\/script>/)[3]),
      jsFileURL:url
    }
  }
  
}
export function getProfilePageContainerURL(str){
    let reg=/<script.*src="(.*ProfilePageContainer.*)".*<\/script>/
    return 'https://www.instagram.com'+str.match(reg)[1].split('"')[0]
}
export function getQueryHashByScript(str,word,arr){
    arr=arr?arr:[]
    let i=0,str2='',key=''
    i=str.indexOf(word)  
	// console.log('TCL: getQueryId -> str2', str2)
    if(i>-1){
        key=str.substr(i+9,32)
        arr.push(key)
        str2=str.substring(i+42)  
        return getQueryHashByScript(str2,word,arr)
    }else{
        return arr
    }
}


