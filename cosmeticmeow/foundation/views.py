from django.shortcuts import render

# Create your views here.


def main_page(request):
    context = {'dick': 'хуй'}
    return render(request, 'main.html', context)
