
//彭东健：http://192.168.2.26:8888
//高山：http://192.168.2.88:8888"

import resourceConfig from './resourceConfig';

let hostUrl = "";
let cdnUrl = "";

if(resourceConfig.isDev) {
  hostUrl = "http://192.168.2.79:8989/";
} else if(resourceConfig.isTest) {
  hostUrl = "172.16.40.55:8888";
} else if(resourceConfig.isProd) {
  hostUrl = location.origin;
}

export {
  hostUrl,
  cdnUrl
}
