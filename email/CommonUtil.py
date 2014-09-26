__author__ = '刘少平'


def get_extension(path=''):
    """
    获取文件拓展名
    /tmp/log.log.txt 返回 'txt'
    /tmp/log.log 返回 'log'
    /tmp/log 返回 ''
    """
    import os
    basename = os.path.basename(path)
    names = basename.split('.')
    if len(names) <= 1:
        return ''
    return names[-1]


def has_text(text=None):
    """
    判断text是否有内容: None,空字符串，空白字符串都视为没有内容
    返回True/False
    """
    if text is None:
        return False
    if len(text.strip()) < 1:
        return False
    return True


def md5(src=None):
    """
    使用MD5算法加密字符串，返回加密后的字符串
    当src为<None、空字符串、空白字符>时，返回''
    md5('123456') 返回 E10ADC3949BA59ABBE56E057F20F883E
    """
    import hashlib
    if not has_text(src):
        return ''
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