const mysql = require("mysql");
const sql = require("./sql");

// 创建
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yuhua',
    port: '3306',
    multipleStatements: true,
    timezone: "08:00"
});

// 连接
con.connect(err => {
    if (err) {
        console.log("mysql连接失败:", err);
    } else {
        console.log("mysql连接成功:", con.threadId);
        exec(sql.initDB).then(result => {
            console.log("数据库准备完毕，可以正常使用！");
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