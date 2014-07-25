from django.http import HttpResponse
from application.models import Member

def member_save(request):
    member = Member()
    member.fullname = "熊猫大侠"
    member.username = "panda_man"
    member.avatar = "http://img.cloudvast.com"
    member.save()
    return HttpResponse(member, mimetype="application/json")

def member_show(request):
    members = Member.objects.all()
    [print(member) for member in members]
    return HttpResponse(members, mimetype="application/json")