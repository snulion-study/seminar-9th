from django.shortcuts import render, redirect
from .models import Post, Comment, Like
from tags.models import Tag

# Create your views here.
def index(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        tags = Tag.objects.all()
        return render(request, 'blogPosts/index.html', {'posts': posts, 'tags': tags})
    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        post = Post.objects.create(title=title, content=content, author=request.user)
        for tag_id in request.POST.getlist('tags'):
            post.tags.add(tag_id)
        return redirect('blogPosts:index')


def new(request):
    tags = Tag.objects.all()
    return render(request, 'blogPosts/new.html', {'tags': tags})


def show(request, id):
    post = Post.objects.get(id=id)
    tags = Tag.objects.filter(posts=post)
    return render(request, 'blogPosts/show.html', {'post': post, 'tags': tags})


def delete(request, id):
    post = Post.objects.get(id=id)
    post.delete()
    return redirect('blogPosts:index')


class CommentView:
    def create(request, id):
        content = request.POST['content']
        Comment.objects.create(post_id=id, content=content, author=request.user)
        return redirect(f'/posts/{id}')
        
    def delete(request, id, cid):
        c = Comment.objects.get(id=cid)
        c.delete()
        return redirect(f'/posts/{id}')
    
    
class LikeView:
    def create(request, id):
        post = Post.objects.get(id=id)
        like_list = post.like_set.filter(user_id=request.user.id)
        if like_list.count() > 0:
            post.like_set.get(user=request.user).delete()
        else:
            Like.objects.create(user=request.user, post=post)
        return redirect ('/posts')
