__author__ = '刘少平'

import unittest
from myemail import CommonUtil

# 定义空字符串
empty = ''


class CommonUtilTestCase(unittest.TestCase):

    def test_has_text(self):
        self.assertEqual(False, CommonUtil.has_text())
        self.assertEqual(False, CommonUtil.has_text(None))
        self.assertEqual(False, CommonUtil.has_text(''))
        self.assertEqual(False, CommonUtil.has_text(' '))
        self.assertEqual(False, CommonUtil.has_text('\t'))
        self.assertEqual(False, CommonUtil.has_text('\n'))
        self.assertEqual(False, CommonUtil.has_text('\r'))
        self.assertEqual(False, CommonUtil.has_text('   '))
        self.assertEqual(True, CommonUtil.has_text('s'))
        self.assertEqual(True, CommonUtil.has_text(' \ndss'))
        self.assertEqual(True, CommonUtil.has_text('dss  \t'))
        self.assertEqual(False, CommonUtil.has_text([]))
        self.assertEqual(False, CommonUtil.has_text({}))
        self.assertEqual(False, CommonUtil.has_text(('',)))
        self.assertEqual(False, CommonUtil.has_text(1))

    def test_get_extension(self):
        self.assertEqual(empty, CommonUtil.get_extension([]))
        self.assertEqual(empty, CommonUtil.get_extension({}))
        self.assertEqual(empty, CommonUtil.get_extension(('',)))
        self.assertEqual(empty, CommonUtil.get_extension())
        self.assertEqual(empty, CommonUtil.get_extension(None))
        self.assertEqual(empty, CommonUtil.get_extension(''))
        self.assertEqual(empty, CommonUtil.get_extension(' '))
        self.assertEqual(empty, CommonUtil.get_extension('\t'))
        self.assertEqual(empty, CommonUtil.get_extension('\n'))
        self.assertEqual(empty, CommonUtil.get_extension('/tmp/log'))
        self.assertEqual('log', CommonUtil.get_extension('/tmp/log.log'))
        self.assertEqual('txt', CommonUtil.get_extension('/tmp/log.log.txt'))
        self.assertEqual('txt', CommonUtil.get_extension('/tmp/log.txt'))
        self.assertEqual('', CommonUtil.get_extension('/tmp/log.'))
        self.assertEqual('', CommonUtil.get_extension('/tmp/log..'))

    def test_md5(self):
        self.assertEqual(empty, CommonUtil.md5([]))
        self.assertEqual(empty, CommonUtil.md5({}))
        self.assertEqual(empty, CommonUtil.md5(('',)))
        self.assertEqual(empty, CommonUtil.md5())
        self.assertEqual(empty, CommonUtil.md5(None))
        self.assertEqual(empty, CommonUtil.md5(''))
        self.assertEqual(empty, CommonUtil.md5(' '))
        self.assertEqual(empty, CommonUtil.md5('\t'))
        self.assertEqual(empty, CommonUtil.md5('\n'))
        self.assertEqual(empty, CommonUtil.md5('\r'))
        self.assertEqual(empty, CommonUtil.md5(' \t\n\r  '))
        self.assertEquals(32, len(CommonUtil.md5('d')))
        self.assertEqual('E10ADC3949BA59ABBE56E057F20F883E', CommonUtil.md5('123456'))

    def test_get_file_md5(self):
        self.assertEqual(empty, CommonUtil.get_file_md5())
        self.assertEqual(empty, CommonUtil.get_file_md5(None))
        self.assertEqual(empty, CommonUtil.get_file_md5([]))
        self.assertEqual(empty, CommonUtil.get_file_md5({}))
        self.assertEqual(empty, CommonUtil.get_file_md5(('',)))
        self.assertEqual(empty, CommonUtil.get_file_md5(2))
        self.assertEqual(empty, CommonUtil.get_file_md5(''))
        self.assertEqual(empty, CommonUtil.get_file_md5('no_file'))
        self.assertEqual('F6CA2D26B2EB6699D0C50925A71B5CF4', CommonUtil.get_file_md5('bat.jpg'))
        self.assertEqual(32, len(CommonUtil.get_file_md5('CommonUtilTest.py')))
        self.assertEqual(32, len(CommonUtil.get_file_md5('./CommonUtilTest.py')))


def suite():
    _suite = unittest.TestSuite()
    _suite.addTest(CommonUtilTestCase())
    return _suite

if __name__ == '__main__':
    unittest.main(defaultTest='suite')

