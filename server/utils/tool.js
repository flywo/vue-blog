const fs = require("fs");

async function removeNoUseImage(blogs) {
    fs.readdir(__dirname + "/../upload", (err, files) => {
        if (!err) {
            files.forEach(file => {
                if (!blogs.some(blog => blog.image.indexOf(file) !== -1)) {
                    fs.unlink(__dirname + "/../upload/" + file, error => {
                        if (error) {
                            console.log("无用图片删除失败！");
                        } else {
                            console.log("无用图片已删除！");
                        }
                    });
                }
            })
        }
    });
}

module.exports = {
    removeNoUseImage
}