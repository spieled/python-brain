from django.contrib import admin
from application.models import Member

# Register your models here.

class MemberAdmin(admin.ModelAdmin):
    list_display = ["username", "fullname", "avatar"]
    fieldsets = [
        ("登录账号", {"fields": ["username"]}),
        ("全名", {"fields": ["fullname"]}),
        ("头像", {"fields": ["avatar"], "classes": ["collapse"]})]


admin.site.register(Member, MemberAdmin)
