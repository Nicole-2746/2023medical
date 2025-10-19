from django.http import HttpResponse


def hello_world(request):
    """简单的Hello World视图"""
    return HttpResponse("20231201022，田彬彬")


def hello_name(request, name):
    """带参数的Hello视图"""
    return HttpResponse(f"Hello, {name}!")