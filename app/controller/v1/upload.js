'use strict';
const Controller = require('egg').Controller;
const UUID = require('uuid/v1');
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const path = require('path');
const fileUtil = require('../../../utils/fileUtil')
module.exports = class UplodController extends Controller {
    async image() {
        const stream = await this.ctx.getFileStream();
        const time = new Date().Format('yyyy-MM-dd');
        const filePath = `/public/upload/${time}`;
        const root = path.join(this.config.baseDir, `app${filePath}`)
        await fileUtil.createdDir(root);//创建目录
        const filename = encodeURIComponent(UUID().replace(/-/g, '')) + path.extname(stream.filename).toLowerCase();
        const target = path.join(this.config.baseDir, `app${filePath}`, filename);
        const writeStream = fs.createWriteStream(target);
        try {
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            await sendToWormhole(stream);
            return this.ctx.throw(500, '文件上传失败');
        }
        this.ctx.body = {
            url: `${filePath}/${filename}`,
            name: filename
        }
    }
    async editor() {
        const stream = await this.ctx.getFileStream();
        const time = new Date().Format('yyyy-MM-dd');
        const filePath = `/public/upload/${time}`;
        const root = path.join(this.config.baseDir, `app${filePath}`)
        await fileUtil.createdDir(root);
        const filename = encodeURIComponent(UUID().replace(/-/g, '')) + path.extname(stream.filename).toLowerCase();
        const target = path.join(this.config.baseDir, `app${filePath}`, filename);
        const writeStream = fs.createWriteStream(target);
        try {
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            await sendToWormhole(stream);
            return this.ctx.throw(500, '文件上传失败',{
                errno:1
            });
        }
        this.ctx.body = {
            data: [`${filePath}/${filename}`],
            errno: 0
        }
    }
}