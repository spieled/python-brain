#coding=utf-8
"""
这是模仿在各种查询IP解析的网站上输入IP查询地址的过程
"""

import re
from urllib import request


class bcolors:
    HEADER = '\033[95m'
    OK_BLUE = '\033[94m'
    OK_GREEN = '\033[92m'
    WARING_YELLOW = '\033[93m'
    FAIL = '\033[36m'
    FLASHING = '\033[35m'
    CRITICAL_RED = '\033[31m'
    END = '\033[0m'

def getip_qq(ip=None):
        """
        use QQ database
        """
        #请求URL，以及请求解析的URL格式变化
        url = "http://ip.qq.com/cgi-bin/searchip?searchip1=" + ip

        #不同的网站网页字符编码不同，匹配不同的内容，封装不同的编码
        html = request.urlopen(url).read().decode("gb2312")

        #查询匹配的内容
        pat = re.compile(r'<span>(.*)</span></p>')
        result = re.findall(pat, html)
        address = str(result).replace("[", "").replace("]", "").replace("'", "").replace("&nbsp;", " ")
        print("ip.qq.com 查询地址：")
        print('    ' + bcolors.OK_GREEN + ip + bcolors.END + " < --- > " + bcolors.WARING_YELLOW + address + bcolors.END)


def getip_ip138(ip=None):
        """
        use ip138
        """
        url = "http://ip138.com/ips1388.asp?ip=%s&action=2" % ip
        html = request.urlopen(url).read().decode("gb2312")

        #这是要查询匹配的内容
        string = "本站主数据："
        result = re.findall(string+'([^<>]+)</li>', html)
        address = str(result).replace("[", "").replace("]", "").replace("'", "")
        result = re.findall(' >> [0-9\.]*', html)
        ip_address = str(result).replace("[", "").replace("]", "").replace("'", "")
        print("ip138.com 查询地址：")
        print('    ' + bcolors.OK_GREEN + ip + ip_address + bcolors.END + " < --- > " + bcolors.WARING_YELLOW + address + bcolors.END)

def getip_cn(ip=None):
        """
        use ip.cn
        """
        url = "http://ip.cn/index.php?ip=%s" % ip
        html = request.urlopen(url).read().decode("utf-8")
        string = "来自："
        result = re.findall(string+'([^<>]+)</p>', html)
        address = str(result).replace("[", "").replace("]", "").replace("'", "")
        result = re.findall('<code>[0-9\.]+</code>', html)
        ip_address = str(result).replace("[", "").replace("]", "").replace("'", "").replace("<code>", "").replace("</code>", "")
        print("ip.cn 查询地址：")
        print('    ' + bcolors.OK_GREEN + ip + " >> " + ip_address + bcolors.END + " < --- > " + bcolors.WARING_YELLOW + address + bcolors.END)

if __name__ == '__main__':
        domain = "code.cloudvast.com"
        ip = '210.14.128.212'
        getip_qq(ip)
        getip_qq(domain)
        getip_ip138(ip)
        getip_ip138(domain)
        getip_cn(ip)
        getip_cn(domain)