from django.http import Http404, HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, "hello/index.html")

texts = [
    "单页面应用说明文档\n================\n\n项目概述:\n--------\n这是一个基于 Django 的单页面应用(SPA)，包含三个主要功能模块：\n1. Page1 - 控制台: 模拟系统控制台，支持命令交互\n2. Page2 - 学生信息: 显示个人资料和技能信息\n3. Page3 - 文件浏览器: 展示项目文件结构\n\n技术特性:\n--------\n前端技术:\n- 纯 JavaScript 单页面应用\n- 无刷新页面切换\n- 实时命令交互系统\n- VS Code 风格界面设计",
    "交互功能:\n- 标签页切换\n- 控制台命令执行\n- 命令历史记录\n- 实时状态更新\n- 技能信息展示\n\n文件结构:\n--------\ntemplates/hello/single_page.html  - 主页面模板\nstatic/hello/js/singlepage.js     - 交互逻辑脚本\nmysite/singlepage_info.txt        - 说明文档\n\n使用说明:\n--------\n控制台命令:\nhelp        - 显示帮助信息\nclear       - 清空控制台\ntime        - 显示当前时间\nstudent     - 显示学生信息",
    "version     - 显示版本信息\nswitch page1 - 切换到控制台\nswitch page2 - 切换到学生信息\nswitch page3 - 切换到文件浏览器\n\n开发者信息:\n----------\n姓名: 田彬彬\n学号: 20231201022\n项目: Django 单页面应用\n日期: 2024年\n\n感谢使用本应用！\n\n注意：这是一个学习Django框架的示例项目，展示了单页面应用的基本实现。"
]

def section(request, num):
    if 1 <= num <= 3:
        return HttpResponse(texts[num - 1])
    else:
        raise Http404("No such section")