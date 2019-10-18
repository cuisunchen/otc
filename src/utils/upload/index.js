import user from "../../models/user";
import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, {
  retries: 5,
  retryCondition(err) {
    var url = window.location.href;
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    if (url === "pay") {
      return ["post"].indexOf(err.config.method) > -1;
    }
    // return ["post"].indexOf(err.config.method) > -1;
  }
});

function retryFailedRequest(err) {
  if (err.status === 500 && err.config && !err.config.__isRetryRequest) {
    err.config.__isRetryRequest = true;
    return axios(err.config);
  }
  // console.log("====================" + err);
  throw err;
}
axios.interceptors.response.use(undefined, retryFailedRequest);

let upload = {};

upload.verify = function(file_name) {
  let file_info = file_name.split(".");
  if (file_info.length < 1) {
    return false;
  }
  let suffix = file_info[file_info.length - 1].toLowerCase();

  if (["jpg", "png", "jpeg", "gif"].indexOf(suffix) < 0) {
    return false;
  }

  return true;
};

upload.getSuffix = function(file_name) {
  let file_info = file_name.split(".");
  let suffix = file_info[file_info.length - 1];
  return suffix;
};

upload.uploadImg = function(file, type) {
  return new Promise((resolve, reject) => {
    user
      .getUploadInfo(type)
      .then(data => {
        let uploadInfo = data.data;
        let params = new FormData();
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        params.append("acl", uploadInfo.acl);
        params.append("Content-Type", uploadInfo.contentType);
        params.append("bucket", uploadInfo.bucket);
        params.append(
          "key",
          uploadInfo.path + uploadInfo.key + "." + this.getSuffix(file.name)
        );
        params.append("success_action_status", 200);
        // acl: "public-read"
        // algorithm: "AWS4-HMAC-SHA256"
        // bucket: "testupload.17otc.org"
        // contentType: "image/"
        // credential: "AKIAZDPHOUBNDPDEC5PK/20190809/ap-east-1/s3/aws4_request"
        // date: "20190809T190136Z"
        // host: "http://testupload.17otc.org"
        // key: "10008cs6t2n"
        // path: "f2222/"
        // policy: "eyJleHBpcmF0aW9uIjoiMjAxOS0wOC0wOVQxOTowNjozNi4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoidGVzdHVwbG9hZC4xN290Yy5vcmcifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsImYyMjIyLyJdLHsiYWNsIjoicHVibGljLXJlYWQifSxbInN0YXJ0cy13aXRoIiwiJENvbnRlbnQtVHlwZSIsImltYWdlLyJdLHsic3VjY2Vzc19hY3Rpb25fc3RhdHVzIjoiMjAwIn0seyJ4LWFtei1jcmVkZW50aWFsIjoiQUtJQVpEUEhPVUJORFBERUM1UEsvMjAxOTA4MDkvYXAtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotZGF0ZSI6IjIwMTkwODA5VDE5MDEzNloifV19"
        // signature: "2e2a53b47224be3eaa88cdbf3c537f354e18c63bc6495a200df5913d5866b62e"
  
        params.append("x-amz-algorithm", uploadInfo.algorithm);
        params.append("x-amz-credential", uploadInfo.credential);
        params.append("x-amz-date", uploadInfo.date);
        params.append("policy", uploadInfo.policy);
        params.append("x-amz-signature", uploadInfo.signature);
        params.append("file", file, file.name);
        // alert(uploadInfo.host)
        // alert(JSON.stringify(params))
        axios
          .post(uploadInfo.host, params, config)
          .then(data => {
          
            // console.log("uploadInfo = ")
            // let url_pic= '//' + uploadInfo.bucket + '/' + uploadInfo.path + uploadInfo.key + '.' +this.getSuffix(file.name)
            let url_pic =
              uploadInfo.host +
              "/" +
              uploadInfo.path +
              uploadInfo.key +
              "." +
              this.getSuffix(file.name);
            data =
              '{"success":true,"code":0,"message":"result_code.ok","data":{ "url":"' +
              url_pic +
              '"}}';

            resolve(data);
          })
          .catch(error => {
            // alert(JSON.stringify(error)+"dfdf")
            reject(error);
          });
      })
      .catch(e => {
        reject(e);
      });
  });
};

export default upload;
