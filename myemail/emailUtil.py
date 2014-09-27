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
    global server
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


def _attach_file(msg, attach_filename_list=list()):
    for filename in attach_filename_list:
        # 构建附件
        att = MIMEText(open(filename, 'rb').read(), 'base64', 'utf-8')
        att['Content-Type'] = 'application/octet-stream'
        # 这里的filename可以任意写，写什么名字，邮件中显示什么名字
        att['Content-Disposition'] = 'attachment; filename="' + os.path.basename(filename) + '"'
        msg.attach(att)


def _attach_img(msg, image_filename_list=list()):
    img_html = ''
    for filename in image_filename_list:
        image = MIMEImage(open(filename, 'rb').read())
        basename = os.path.basename(filename)
        image.add_header('Content-ID', basename)
        msg.attach(image)
        img_html += '<div><img src="cid:' + basename + '"/></div>'
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
    msg = MIMEText(content, _subtype=sub_type, _charset="utf-8")
    return _do_send_email(to_list, sub, msg)


def send_email_multipart(to_list, sub, content, sub_type='plain', charset='utf-8', attach_filename_list=list()):
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


def send_email_image(to_list, sub, content, sub_type='html', charset='utf-8', attach_filename_list=list(),
                     image_filename_list=list()):
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

    msg.attach(MIMEText(content + img_html, sub_type, charset))

    return _do_send_email(to_list, sub, msg)


def get_email_imap4():
    """
    Message b'1170', b'Date: Sat, 27 Sep 2014 10:07:15 +0800\r\nX-QQ-mid: esmtp27t1411783633t947t09703\r\nReceived: from [169.254.34.86] (unknown [175.152.119.29])\r\n\tby esmtp4.qq.com (ESMTP) with SMTP id 0\r\n\tfor <472458220@qq.com>; Sat, 27 Sep 2014 10:07:13 +0800 (CST)\r\nX-QQ-SSF: B101000000000060F1401500000000Z\r\nX-QQ-FEAT: wuSfJRaUZO5rorym8GJsOKt5eak/S3cDy8vfCS3rt443WKahERKt4SqjS7mdW\r\n\tTc2izuRydwGquSRMMU/oq3z0fU/ca8scXM6gVNvgAqUsTp2INgymXVwkSONgwz5wSroRp/m\r\n\t1nf6beLtx2gbDm8OX/WsMDZZX9nUfcsG5avWhq89ZEX3Rk6Bag==\r\nContent-Type: text/plain; charset="utf-8"\r\nMIME-Version: 1.0\r\nContent-Transfer-Encoding: base64\r\nSubject: hello\r\nFrom: <472458220@qq.com>\r\nTo: 472458220@qq.com\r\n\r\naGVsbG8gd29ybGQh\r\n'
    """
    import imaplib
    import email
    import base64
    imap_server = imaplib.IMAP4_SSL("imap.qq.com", 993)
    imap_server.login(mail_user, mail_pass)
    imap_server.select()
    typ, data = imap_server.search(None, 'UNSEEN')
    for num in data[0].split():
        typ, data = imap_server.fetch(num, '(RFC822)')
        msg = email.message_from_string(data[0][1].decode())

        subject = msg['Subject']
        print('Subject: ' + subject)
        From = msg['From']
        print('From: ' + From)
        To = msg['To']
        print('To; ' + To)
        if not msg.is_multipart():
            [print(key, ' : ', value) for key, value in _msg.items()]
            content = base64.b64decode(bytes(msg.get_payload(), 'utf-8')).decode('utf-8')
            print('content: ' + content)
        else:
            print('content: is still a list of Message')
            _msgs = msg.get_payload()
            for _msg in _msgs:
                [print(key, ' : ', value) for key, value in _msg.items()]

                from myemail import CommonUtil
                import codecs
                content_disposition = _msg.get('Content-Disposition')
                if CommonUtil.has_text(content_disposition):
                    _cons = content_disposition.split(';')
                    if _cons[0] == 'attachment':
                        filename = _cons[1].split('=')[1].replace('"', '')
                        content = base64.b64decode(bytes(_msg.get_payload(), 'utf-8')).decode('utf-8')
                        file_raw = codecs.open('./attachment_raw/' + filename, 'w', 'utf-8')
                        file_raw.write(content)
                        file_raw.close()
                        file_encrypt = open('./attachment_encrypt/' + filename, 'wb')
                        file_encrypt.write(bytes(_msg.get_payload(), 'utf-8'))
                        file_encrypt.close()
                elif _msg.get_content_maintype() == 'text' and _msg.get_content_subtype() != 'base64':
                    content = base64.b64decode(bytes(_msg.get_payload(), 'utf-8')).decode('utf-8')
                    print(content)
                elif _msg.get_content_maintype() == 'image':
                    # Content-ID  :  bat.jpg
                    cid = _msg.get('Content-ID')
                    file_encrypt = open('./attachment_encrypt/' + cid, 'wb')
                    file_encrypt.write(base64.b64decode(bytes(_msg.get_payload(), 'utf-8')))
                    file_encrypt.close()

    imap_server.close()
    imap_server.logout()


if __name__ == "__main__":

    # if send_mail_text(mailto_list, "hello", "hello world!"):
    #     print("发送成功")
    # else:
    #     print("发送失败")
    #
    # if send_mail_text(mailto_list, "百度", "请打开<a href='http://www.baidu.com' target='_blank' style='color:red;'>百度</a>",
    #                   sub_type="html"):
    #     print("发送成功")
    # else:
    #     print("发送失败")
    #
    # if send_email_multipart(mailto_list, "hello", "hello world!", attach_filename_list=['./emailUtil.py', '../brain']):
    #     print("发送成功")
    # else:
    #     print("发送失败")
    #
    # if send_email_image(mailto_list, "hello", "hello world!", attach_filename_list=['./emailUtil.py', '../brain'],
    #                     image_filename_list=['./bat.jpg', './member.jpg']):
    #     print("发送成功")
    # else:
    #     print("发送失败")

    get_email_imap4()
