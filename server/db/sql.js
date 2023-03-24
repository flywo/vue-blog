module.exports = {
    // 数据库初始化
    initDB: `
    SET GLOBAL time_zone = '+8:00';
    SET time_zone = '+8:00'; 
    FLUSH PRIVILEGES;
    CREATE DATABASE IF NOT EXISTS blog;
    USE blog;
    CREATE TABLE IF NOT EXISTS type (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(10) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS blog (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image VARCHAR(100) NOT NULL,
        time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(50) NOT NULL,
        preview VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        type_id INT NOT NULL,
        path VARCHAR(50) NOT NULL,
        CONSTRAINT fk_blog_type_id FOREIGN KEY (type_id) REFERENCES type(id)
    );
    `,
    // 查询类型列表
    queryTypeTable: `SELECT id, title, (SELECT COUNT(*) FROM blog WHERE type_id = type.id) AS total FROM type`,
    // 插入类型数据
    insertTypeData: title => `INSERT INTO type (title) VALUES ('${title}');`,
    // 删除类型
    deleteTypeData: id => `DELETE FROM type where id = '${id}';`,
    // 更新类型
    updateTypeData: (id, title) => `UPDATE type SET title = '${title}' WHERE id = '${id}';`,
    // 查询用户
    queryUserData: (username, password) => `SELECT * FROM user WHERE username = ${username} and password = ${password}`,
    // 查询博客列表
    queryBlogTable: (typeId, pageNo, pageSize) => {
        let sql = `SELECT blog.id, blog.image, blog.title, blog.preview, blog.time, blog.path, type.id typeId, type.title typeName 
        FROM blog, type WHERE 1=1`
        if (typeId) {
            sql += ` AND type_id = ${typeId}`
        }
        if (pageNo === -1 || pageSize === -1) {
            return sql + " AND blog.type_id = type.id ORDER BY time DESC;"
        }
        const start = (pageNo - 1) * pageSize;
        if (start < 0) {
            start = 0;
        }
        if (pageSize > 10) {
            pageSize = 10
        }
        return sql + ` AND blog.type_id = type.id ORDER BY time DESC LIMIT ${start}, ${pageSize};`
    },
    // 查询所有博客
    queryAllBlog: `SELECT * FROM blog`,
    // 查询单个博客
    querySingleBlog: (id) => `SELECT * FROM blog WHERE id = ${id};`,
    // 插入博客
    insertBlogData: (blog) => `INSERT INTO blog (image, title, preview, content, type_id, path) 
    VALUES ('${blog.image}', '${blog.title}', '${blog.preview}', ${blog.content}, '${blog.typeId}', '${blog.path}');`,
    // 删除博客
    deleteBlogData: id => `DELETE FROM blog where id = '${id}';`,
    // 更新博客
    updateBlogData: (blog) => `UPDATE blog SET image = '${blog.image}', preview = '${blog.preview}', title = '${blog.title}', path = '${blog.path}', content = ${blog.content}, type_id = '${blog.typeId}'
    WHERE id = '${blog.id}'`,
}