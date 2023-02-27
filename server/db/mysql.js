const mysql = require("mysql");
const sql = require("./sql");

// 创建
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yuhua',
    port: '3306',
});

// 连接
con.connect(err => {
    if (err) {
        console.log("mysql连接失败:", err);
    } else {
        console.log("mysql连接成功:", con.threadId);
        exec(sql.createBlogDB).then(result => {
            exec(sql.useBlogDB).then(result => {
                exec(sql.createTypeTable).then(result => {
                    exec(sql.createBlogTable).then(result => {
                        console.log("数据库准备完毕，可以正常使用！");
                    }).catch(err => {
                        console.log("建博客表发生错误:", err);
                    })
                }).catch(err => {
                    console.log("建类型表发生错误:", err);
                });
            }).catch(err => {
                console.log("使用blog数据库发生错误:", err);
            })
        }).catch(err => {
            console.log("建blog数据库发生错误:", err);
        });
    }
})

// 执行函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        // 执行sql语句
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    // 防止sql注入，escape方法将特殊字符格式化
    escape: mysql.escape
}