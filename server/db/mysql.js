const mysql = require("mysql");

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
        exec(`CREATE DATABASE IF NOT EXISTS blog;`).then(result => {
            exec(`USE blog;`).then(result => {
                exec(`CREATE TABLE IF NOT EXISTS type (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(10) NOT NULL
                );`).then(result => {
                    exec(`CREATE TABLE IF NOT EXISTS blog (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        image VARCHAR(100) NOT NULL,
                        time DATETIME NOT NULL,
                        title VARCHAR(20) NOT NULL,
                        preview VARCHAR(50) NOT NULL,
                        content TEXT NOT NULL,
                        type_id INT NOT NULL,
                        CONSTRAINT fk_blog_type_id FOREIGN KEY (type_id) REFERENCES type(id)
                    );`).then(result => {
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