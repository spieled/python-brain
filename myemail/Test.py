__author__ = 'Administrator'

# import sys
#
# print(sys.path)
#
# print(dir(sys))
#
#import os

#
# print(dir(os))
#
# print(os.curdir)
# print(os.path)
# os.mkdir("nimei")

# target = 'aGVsbG8gd29ybGQh'
# src = 'hello world!'
import base64
# result = base64.b64encode(bytes(src, 'utf-8'))
# print(type(result))
# print(str(result))
#
# _src = base64.b64decode(bytes(target, 'utf-8'))
# print(_src)

# file = open('brain', 'rb')
# content = base64.b64decode(bytes(file.read())).decode('utf-8')
# file.close()
# print(content)

from urllib import request
# url = 'http://img3.douban.com/view/dale-online/dale_ad/public/303afa0eafb71de.jpg'
# data = request.urlopen(url).read()
# f = open('hi.jpg', 'wb')
# f.write(data)
# f.close()

import calendar
# print(datetime._datetime_is_leap(400))
print(calendar.isleap(5))
print(calendar.isleap(400))
print(calendar.isleap(100))
# print(calendar.isleap('12'))
# print(calendar.isleap([]))
# print(calendar.isleap({}))
# print(calendar.isleap(('',)))

from myemail import CommonUtil
print(CommonUtil.is_leap())
print(CommonUtil.is_leap(0))
print(CommonUtil.is_leap(1))
print(CommonUtil.is_leap(4))
print(CommonUtil.is_leap(5))
print(CommonUtil.is_leap(100))
print(CommonUtil.is_leap(400))
print(CommonUtil.is_leap(600))
print(CommonUtil.is_leap('sd'))
print(CommonUtil.is_leap([]))
print(CommonUtil.is_leap({}))
print(CommonUtil.is_leap(('',)))