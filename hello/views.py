from django.shortcuts import render
from django.http import HttpResponse

def single_page_view(request):
    """单页面应用视图"""
    return render(request, 'hello/single_page.html')

def hello_world(request):
    """Hello World 基础视图"""
    return HttpResponse("20231201022，田彬彬")

def hello_name(request, name):
    """带参数的问候视图"""
    return HttpResponse(f"Hello {name}!")