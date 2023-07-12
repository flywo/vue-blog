import axios from "axios";
import {
    Message
} from "element-ui";
import localforage from "localforage";

// 创建实例
const service = axios.create({
    timeout: 8000
});

// 请求拦截
service.interceptors.request.use(request => {
    request.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return request;
});

// 统一调用该函数进行网络请求。可进行后续封装，但务必都调用该函数发送请求。
export function request(
    axiosOptions,
    showSuccessTips,
    showFailTips,
    success,
    fail
) {
    return service(axiosOptions)
        .then((res) => {
            if (res.data.code === 0) {
                if (showSuccessTips === true) {
                    Message.success("操作成功！");
                }
                if (success) {
                    success(res.data.data);
                }
            } else {
                if (showFailTips === true) {
                    Message.error(res.data.message ? res.data.message : "操作失败，请重试！");
                }
                if (fail) {
                    fail(res.data.message);
                }
            }
        })
        .catch((err) => {
            let msg = err.response.data.message;
            if (!msg) {
                msg = "操作失败，请重试！";
            }
            if (showFailTips === true) {
                Message.error(msg);
            }
            if (fail) {
                fail(msg);
            }
        });
}

// 对上面的函数进行封装 showSuccessTips:是否展示成功弹窗  showFailTips:是否展示失败弹窗
export function post(
    url,
    params,
    body,
    showSuccessTips,
    showFailTips,
    success,
    fail
) {
    return request({
            url: "/api" + url,
            params,
            data: body,
            method: "post",
        },
        showSuccessTips,
        showFailTips,
        success,
        fail
    );
}

// 对上面的函数进行封装
export function get(
    url,
    params,
    showSuccessTips,
    showFailTips,
    success,
    fail
) {
    return request({
            url: "/api" + url,
            params,
            method: "get",
        },
        showSuccessTips,
        showFailTips,
        success,
        fail
    );
}

// 上传文件
export function upload(
    url,
    file,
    showSuccessTips,
    showFailTips,
    progress,
    success,
    fail
) {
    const form = new FormData();
    form.append("file", file);
    return request({
            headers: {
                "Content-Type": "multipart/form-data",
            },
            url: "/api" + url,
            data: form,
            onUploadProgress: progress,
            method: "post",
        },
        showSuccessTips,
        showFailTips,
        success,
        fail
    );
}

// 下载文件
export async function download(
    url,
    progress,
    success,
    fail
) {
    localforage.config({
        name: "BigFile",
    });
    const result = await localforage.getItem(url);
    if (result) {
        success(window.URL.createObjectURL(result));
    } else {
        axios({
            method: "GET",
            url,
            responseType: "blob",
            onDownloadProgress: (event) => {
                progress((event.progress * 100).toFixed(2));
            },
        }).then(response => {
            localforage.setItem(url, response.data);
            success(window.URL.createObjectURL(response.data))
        }).catch(fail)
    }
}