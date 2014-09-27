__author__ = '刘少平'


def get_extension(path=None):
    """
    获取文件拓展名:
        如果path为None或非字符串类型，返回''
        eg:
            /tmp/log.log.txt 返回 'txt'
            /tmp/log.log 返回 'log'
            /tmp/log 返回 ''
    """
    if path is None:
        return ''
    if not isinstance(path, str):
        return ''
    import os
    basename = os.path.basename(path)
    names = basename.split('.')
    if len(names) <= 1:
        return ''
    return names[-1]


def has_text(text=None):
    """
    判断text是否有内容:
        非字符串类型 返回 False
        None,空字符串，空白字符串 返回 False
        非空白字符数量大于0 返回 True
    """
    if text is None:
        return False
    if not isinstance(text, str):
        return False
    if len(text.strip()) < 1:
        return False
    return True


def md5(src=None):
    """
    使用MD5算法加密字符串，返回加密后的字符串
    当src为非字符串类型时，返回''
    当src为<None、空字符串、空白字符>时，返回''
    md5('123456') 返回 E10ADC3949BA59ABBE56E057F20F883E
    """
    if not has_text(src):
        return ''
    import hashlib
    return hashlib.md5(src.encode()).hexdigest().upper()


def get_file_md5(path=None):
    """
    获取文件的MD5值
    如果文件不存在，返回''
    """
    import os
    import hashlib

    if not has_text(path):
        return ''
    if not os.path.isfile(path):
        return ''
    file = open(path, 'rb')
    file_md5 = hashlib.md5(file.read()).hexdigest().upper()
    file.close()
    return file_md5


def get_current_timestamp():
    """
    获取当前时间戳
    """
    from datetime import datetime
    now = datetime.now()
    return now.timestamp()


def get_current_nanosecond():
    """
    获取当前时间纳秒
    """
    from datetime import datetime
    return int(datetime.now().timestamp() * 1000000)


def get_current_microsecond():
    """
    获取当前时间毫秒
    """
    from datetime import datetime
    return int(datetime.now().timestamp() * 1000)


def get_current_second():
    """
    获取当前秒
    """
    from datetime import datetime
    return int(datetime.now().timestamp())


def get_current_ymd(timestamp=None):
    """
    获取当前年月日
    timestamp单位 秒
    """
    from datetime import datetime
    now = datetime.now()
    if isinstance(timestamp, int) or isinstance(timestamp, float):
        now = datetime.fromtimestamp(timestamp)
    return now.year * 10000 + now.month * 100 + now.day


def get_current_ym(timestamp=None):
    """
    获取当前年月
    timestamp单位 秒
    """
    from datetime import datetime
    now = datetime.now()
    if isinstance(timestamp, int) or isinstance(timestamp, float):
        now = datetime.fromtimestamp(timestamp)
    return now.year * 100 + now.month


def get_current_y(timestamp=None):
    """
    获取当前年月
    timestamp单位 秒
    """
    from datetime import datetime
    now = datetime.now()
    if isinstance(timestamp, int) or isinstance(timestamp, float):
        now = datetime.fromtimestamp(timestamp)
    return now.year


def get_human_time(timestamp=None):
    """
    获取自然人可读的时间表示
    """
    from datetime import datetime
    now = datetime.now()
    if isinstance(timestamp, int) or isinstance(timestamp, float):
        now = datetime.fromtimestamp(timestamp)
    return str(now.year).zfill(4) + '-' + str(now.month).zfill(2) + '-' + str(now.day).zfill(2) + ' ' + \
           str(now.hour).zfill(2) + ':' + str(now.minute).zfill(2) + ':' + str(now.second).zfill(2)

if __name__ == '__main__':
    print('extension of /tmp/log.log.txt is', get_extension('/tmp/log.log.txt'))
    print('extension of /tmp/log.log is', get_extension('/tmp/log.log'))
    print('extension of /tmp/log is', get_extension('/tmp/log'))

    print(has_text())
    print(has_text(""))
    print(has_text("      "))
    print(has_text("    \t \n\r "))
    print(has_text("   p  "))

    print(md5('123456'))
    print(md5())
    print(md5(''))
    print(md5('  '))

    print(get_file_md5())
    print(get_file_md5('./CommonUtil.py'))
    print(get_file_md5('README'))
    print(get_file_md5('bat.jpg'))

    print(get_current_timestamp())
    print(get_current_nanosecond())
    print(get_current_microsecond())
    print(get_current_second())
    print(get_current_ymd())
    print(get_current_ym())
    print(get_current_y())

    print(get_current_ymd(1311808262.762649))
    print(get_current_ymd(131180))

    print(get_human_time())