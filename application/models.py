from django.db import models

# Create your models here.
class Member(models.Model):
    # 用户名，登录账号
    username = models.CharField(max_length=50)
    # 全名
    fullname = models.CharField(max_length=50)
    # 头像
    avatar = models.CharField(max_length=200)

    # On Python 3
    def __str__(self):
        return self.fullname
    # On Python 2
    def __unicode__(self):
        return self.fullname