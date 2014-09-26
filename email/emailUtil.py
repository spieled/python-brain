__author__ = '刘少平'

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

mailto_list = ["472458220@qq.com"]
mail_host = "smtp.qq.com:25"
mail_user = "472458220"
mail_pass = "lsp_916"
mail_postfix = "qq.com"


def _do_send_email(to_list, sub, msg):
    result = False
    me = "<" + mail_user + "@" + mail_postfix + ">"
    msg["Subject"] = sub
    msg["From"] = me
    msg["To"] = ";".join(to_list)
    try:
        server = smtplib.SMTP()
        server.connect(mail_host)
        server.login(mail_user, mail_pass)
        server.sendmail(me, to_list, msg.as_string())
        result = True
    except Exception as e:
        print(str(e))
    finally:
        server.close()
    return result


def _attach_file(msg, attach_filename_list=[]):
    for filename in attach_filename_list:
        # 构建附件
        att = MIMEText(open(filename, 'rb').read(), 'base64', 'gb2312')
        att['Content-Type'] = 'application/octet-stream'
        # 这里的filename可以任意写，写什么名字，邮件中显示什么名字
        att['Content-Disposition'] = 'attachment; filename="'+os.path.basename(filename)+'"'
        msg.attach(att)


def _attach_img(msg, image_filename_list=[]):
    img_html = ''
    for filename in image_filename_list:
        image = MIMEImage(open(filename, 'rb').read())
        basename = os.path.basename(filename)
        image.add_header('Content-ID', basename)
        msg.attach(image)
        img_html += '<div><img src="cid:'+basename+'"/></div>'
    return img_html


def send_mail_text(to_list, sub, content, sub_type="plain"):
    """
    发送无附件，纯文本邮件
    to_list: 发送对象（邮件将发给谁）
    sub: 主题
    content: 内容
    sub_type: 格式邮件（plain/html） 默认为plain
    return: 返回True/False, 表示发送成功与否
    """
    msg = MIMEText(content, _subtype=sub_type, _charset="gb2312")
    return _do_send_email(to_list, sub, msg)

def send_email_multipart(to_list, sub, content, sub_type='plain', charset='gb2312', attach_filename_list=[]):
    """
    发送带附件邮件
    to_list: 发送对象（邮件将发给谁）
    sub: 主题
    content: 内容
    sub_type: 格式邮件（plain/html） 默认为plain
    charset: 内容编码
    attach_filename_list: 附件文件名列表
    return: 返回True/False, 表示发送成功与否
    """
    # 创建一个带附件的实例
    msg = MIMEMultipart()

    _attach_file(msg, attach_filename_list)

    msg.attach(MIMEText(content, sub_type, charset))

    return _do_send_email(to_list, sub, msg)


def send_email_image(to_list, sub, content, sub_type='html', charset='gb2312', attach_filename_list=[], image_filename_list=[]):
    """
    发送带附件邮件
    to_list: 发送对象（邮件将发给谁）
    sub: 主题
    content: 内容
    sub_type: 格式邮件（plain/html） 默认为plain
    charset: 内容编码
    attach_filename_list: 附件文件名列表
    image_filename_list: 图片文件名列表
    return: 返回True/False, 表示发送成功与否
    """
    # 创建一个带附件的实例
    msg = MIMEMultipart()

    _attach_file(msg, attach_filename_list)

    img_html = _attach_img(msg, image_filename_list)

    msg.attach(MIMEText(content+img_html, sub_type, charset))

    return _do_send_email(to_list, sub, msg)


if __name__ == "__main__":
    if send_mail_text(mailto_list, "hello", "hello world!"):
        print("发送成功")
    else:
        print("发送失败")

    if send_mail_text(mailto_list, "百度", "请打开<a href='http://www.baidu.com' target='_blank' style='color:red;'>百度</a>", sub_type="html"):
        print("发送成功")
    else:
        print("发送失败")

    if send_email_multipart(mailto_list, "hello", "hello world!", attach_filename_list=['./emailUtil.py', '../brain']):
        print("发送成功")
    else:
        print("发送失败")

    if send_email_image(mailto_list, "hello", "hello world!", attach_filename_list=['./emailUtil.py', '../brain'], image_filename_list=['./bat.jpg', './member.jpg']):
        print("发送成功")
    else:
        print("发送失败")

