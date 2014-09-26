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
        att = MIMEText(open(filename, 'rb').read(), 'base64', 'gb2312')
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
    msg = MIMEText(content, _subtype=sub_type, _charset="gb2312")
    return _do_send_email(to_list, sub, msg)


def send_email_multipart(to_list, sub, content, sub_type='plain', charset='gb2312', attach_filename_list=list()):
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


def send_email_image(to_list, sub, content, sub_type='html', charset='gb2312', attach_filename_list=list(),
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


def get_email():
    import imaplib
    import email

    def extract_body(payload):
        if isinstance(payload,str):
            return payload
        else:
            return '\n'.join([extract_body(part.get_payload()) for part in payload])

    conn = imaplib.IMAP4_SSL("pop.qq.com", 993)
    conn.login(mail_user, mail_pass)
    conn.select()
    typ, data = conn.search(None, 'UNSEEN')
    try:
        for num in data[0].split():
            typ, msg_data = conn.fetch(num, '(RFC822)')
            for response_part in msg_data:
                print(repr(response_part))
                """
                (b'377 (RFC822 {3009}', b'Received: from 192.30.252.199 (unknown [192.30.252.199])\r\n\t
                by newmx23.qq.com (NewMx) with SMTP id \r\n\t
                for <472458220@qq.com>; Fri, 26 Sep 2014 19:48:29 +0800\r\n
                X-QQ-SSF: 00510000000000011x900001002060x\r\n
                X-QQ-FEAT: 8wrabb2CvriALOWqLMw5eFaz0frx03QFgFSdxZ3hIP8=\r\n
                X-QQ-mid: usamxproxy11t1411732112ta5k17j\r\n
                X-QQ-CSender: noreply@github.com\r\n
                X-KK-mid:usamxproxy11t1411732112ta5k17j\r\n
                Date: Fri, 26 Sep 2014 04:48:28 -0700\r\n
                From: Heinrich Fenkart <notifications@github.com>\r\n
                Reply-To: twbs/bootstrap <reply+i-44049676-ff3487fdef5f526a9666428fecd0f2b902402124-5487955@reply.github.com>\r\n
                To: twbs/bootstrap <bootstrap@noreply.github.com>\r\n
                Message-ID: <twbs/bootstrap/pull/14689/c56951246@github.com>\r\n
                In-Reply-To: <twbs/bootstrap/pull/14689@github.com>\r\n
                References: <twbs/bootstrap/pull/14689@github.com>\r\n
                Subject: Re: [bootstrap] Added position relative to fix overflow on iOS\r\n
                 (#14689)\r\nMime-Version: 1.0\r\nContent-Type: multipart/alternative;\r\n
                 boundary="--==_mimepart_5425528cc360e_529f3ffb7792329c110762e";\r\n
                 charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\nPrecedence: list\r\n
                 X-GitHub-Recipient: spieled\r\nList-ID: twbs/bootstrap <bootstrap.twbs.github.com>\r\n
                 List-Archive: https://github.com/twbs/bootstrap\r\n
                 List-Post: <mailto:reply+i-44049676-ff3487fdef5f526a9666428fecd0f2b902402124-5487955@reply.github.com>\r\n
                 List-Unsubscribe: <mailto:unsub+i-44049676-ff3487fdef5f526a9666428fecd0f2b902402124-5487955@reply.github.com>,\r\n
                 <https://github.com/notifications/unsubscribe/5487955__eyJzY29wZSI6Ik5ld3NpZXM6TXV0ZSIsImV4cGlyZXMiOjE3MjczNTEzMDgsImRhdGEiOnsiaWQiOjQzODc0Mjg4fX0=--06c0a99b82b5a134bd72e20d93e52cd3c4909f56>\r\n
                 X-Auto-Response-Suppress: All\r\nX-GitHub-Recipient-Address: 472458220@qq.com\r\n\r\n\r\n
                 ----==_mimepart_5425528cc360e_529f3ffb7792329c110762e\r\nContent-Type: text/plain;\r\n
                 charset=UTF-8\r\nContent-Transfer-Encoding: 7bit\r\n\r\nPlease post an example of the problem this fixes using JS Bin.
                 \r\n\r\n---\r\nReply to this email directly or view it on GitHub:\r\n
                 https://github.com/twbs/bootstrap/pull/14689#issuecomment-56951246\r\n
                 ----==_mimepart_5425528cc360e_529f3ffb7792329c110762e\r\nContent-Type: text/html;\r\n charset=UTF-8\r\n
                 Content-Transfer-Encoding: 7bit\r\n\r\n<p>Please post an example of the problem this fixes using JS Bin.</p>\r\n\r\n
                 <p style="font-size:small;-webkit-text-size-adjust:none;color:#666;">&mdash;<br>Reply to this email directly or
                 <a href="https://github.com/twbs/bootstrap/pull/14689#issuecomment-56951246">view it on GitHub</a>.
                 <img alt="" height="1" src="https://github.com/notifications/beacon/5487955__
                 eyJzY29wZSI6Ik5ld3NpZXM6QmVhY29uIiwiZXhwaXJlcyI6MTcyNzM1MTMwOCwiZGF0YSI6eyJpZCI6NDM4NzQyODh9fQ==--
                 8c8076c27fb952e75f0ce71ea5fe780c29307c5c.gif" width="1" /></p>\r\n
                 <script type="application/ld+json">{"@context":"http://schema.org","@type":"EmailMessage",
                 "description":"View this Pull Request on GitHub","action":{"@type":"ViewAction",
                 "url":"https://github.com/twbs/bootstrap/pull/14689#issuecomment-56951246","name":"View Pull Request"}}
                 </script>\r\n
                ----==_mimepart_5425528cc360e_529f3ffb7792329c110762e--\r\n')
                """
                if isinstance(response_part, tuple):
                    # 在下面这一行报错了
                    msg = email.message_from_string(response_part[1])
                    subject=msg['subject']
                    print(subject)
                    payload=msg.get_payload()
                    body=extract_body(payload)
                    print(body)
            typ, response = conn.store(num, '+FLAGS', r'(\Seen)')
    finally:
        try:
            conn.close()
        except:
            pass
        conn.logout()

if __name__ == "__main__":
    get_email()
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
