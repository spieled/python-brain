from django.shortcuts import render_to_response, get_object_or_404
import datetime
from application.models import Member

# Create your views here.

def hello(request):
    now = datetime.datetime.now()
    return render_to_response("hello.html", {"currentTime":now})

def page_not_found(request):
    return render_to_response("404.html")

def index(request):
    recent_members = Member.objects.order_by("username")[:5]
    [print(member) for member in recent_members]
    return render_to_response("application/index.html", {"recent_members": recent_members})

def member_detail(request, member_id):
    member = get_object_or_404(Member, pk=member_id)
    return render_to_response("application/detail.html", {"member": member})

