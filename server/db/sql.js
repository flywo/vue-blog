module.exports = {
    // 创建数据库
    createBlogDB: `CREATE DATABASE IF NOT EXISTS blog;`,
    // 使用数据库
    useBlogDB: `USE blog;`,
    // 创建类型表
    createTypeTable: `CREATE TABLE IF NOT EXISTS type (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(10) NOT NULL
    );`,
    // 创建博客表
    createBlogTable: `CREATE TABLE IF NOT EXISTS blog (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image VARCHAR(100) NOT NULL,
        time DATETIME NOT NULL,
        title VARCHAR(20) NOT NULL,
        preview VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        type_id INT NOT NULL,
        CONSTRAINT fk_blog_type_id FOREIGN KEY (type_id) REFERENCES type(id)
    );`,
}