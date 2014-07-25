from django.shortcuts import render_to_response
import datetime

# Create your views here.

def hello(request):
    now = datetime.datetime.now()
    return render_to_response("hello.html", {"currentTime":now})

def page_not_found(request):
    return render_to_response("404.html")
