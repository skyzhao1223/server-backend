var express = require('express');
var router = express.Router();

var User = require('../models/User');


router.get('/', (req, res, next) => {
    res.send('index')
})

router.get('/bianjubang', (req, res, next) => {
    res.render('bianjubang')
})

router.post('/bjb/record', (req, res, next) => {
    console.log(req.body)
    var user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save((err) => {
        console.log('save status:', err ? 'failed' : 'success');
    })
    res.send(req)
})
const nodemailer = require('nodemailer')
router.post('/mail', (req, res, next) => {
    let params = req.body
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: 'zhaosky_mail@163.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: '163shouquanma',
        }
    })
    let mailOptions = {
        from: `${params.name} <zhaosky_mail@163.com>`, // sender address
        to: '13426031783@139.com', // list of receivers
        subject: `【留言】${name}个人主页留言`, // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: `称呼：${params.name}邮箱：${params.email}手机号：${params.mobile}内容：${params.content}` // html body
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        console.log('123');
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    })
    res.send('done')
})

module.exports = router