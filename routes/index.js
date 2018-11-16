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
        // host: 'smtp.163.com',
        service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        // port: 465, // SMTP 端口
        // secureConnection: true, // 使用了 SSL
        auth: {
            user: 'zhaosky_mail@163.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: '163shouquanma',
        }
    })
    let mailOptions = {
        from: '个人主页留言 <zhaosky_mail@163.com>', // sender address
        to: '13426031783@139.com', // list of receivers
        subject: `【留言】个人主页留言 - ${params.name}`, // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: `<p>称呼:${params.name}</p><p>邮箱:${params.email}</p><p>手机号:${params.mobile}</p><p>内容:${params.content}</p>` // html body
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(error)
            next()
            return console.log(error);
        }
        res.send(info)
        console.log('Message sent: %s', info.messageId);
        next()
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    })
})

module.exports = router