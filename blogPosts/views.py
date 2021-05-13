from django.shortcuts import render, redirect
from .models import Post
from accounts.models import Profile
from django.db.models import Count
from django.contrib.auth.models import User

# Create your views here.
def index(request):
    if request.method == 'GET': 
        posts = Post.objects.all()
        colleges = Profile.objects.values('college').annotate(count=Count('college')).order_by('count')
        users_with_same_college = None
        users_with_same_major = None
        
        if request.user.is_authenticated:
            users_with_same_college = User.objects.filter(profile__college=request.user.profile.college).exclude(id=request.user.id)
            users_with_same_major = User.objects.filter(profile__major=request.user.profile.major).exclude(id=request.user.id)
            
        return render(
            request, 
            'blogPosts/index.html', 
            {
                'posts': posts, 
                'colleges': colleges, 
                'users_with_same_college': users_with_same_college, 
                'users_with_same_major': users_with_same_major
            }
        )
    
    elif request.method == 'POST': 
        title = request.POST['title']
        content = request.POST['content']
        Post.objects.create(title=title, content=content)
        return redirect('blogPosts:index') 


def new(request):
    return render(request, 'blogPosts/new.html')


def show(request, id):
    post = Post.objects.get(id=id)
    return render(request, 'blogPosts/show.html', {'post':post})


def delete(request, id):
    post = Post.objects.get(id=id)
    post.delete() 
    return redirect('blogPosts:index')


def update(request, id):
    if request.method == 'GET':
        post = Post.objects.get(id=id)
        return render(request, 'blogPosts/update.html', {'post':post})
    
    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        Post.objects.filter(id=id).update(title=title, content=content)
        return redirect('blogPosts:show', id=id)
