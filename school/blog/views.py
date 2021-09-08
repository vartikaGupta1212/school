from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from django.views.generic import View
from .models import User, Post
from django.http import HttpResponse
from django.contrib import messages
from django.views.generic import View

# Create your views here.
class HomePageView(ListView):
    def get(self, request):
        '''
        If user request get method in url direct than reach home page.
        '''
        all_posts = Post.objects.all().order_by('-id')
        
        print(all_posts)
        thisset={"rr"}
        thisset.clear()
        
        for post in all_posts:
            
            thisset.add(post.title)
           
           
        s= list(thisset) 
        param = {'posts':all_posts,'sub':s}
        
        return render(request, 'home.html', param)

    

class UploadView(View):
    def get(self, request, user_name):
        param={'user_name':user_name}
        return render(request, 'upload_file.html',param)
        

    def post(self, request, user_name):
        filename = request.FILES['filename']
        title = request.POST['title']
        desc = request.POST['desc']

        user_obj = User.objects.get(username=user_name)
        upload_post = Post(user=user_obj, title=title, file_field=filename, desc=desc)
        upload_post.save()
        messages.success(request, 'Your Post has been uploaded successfully.')
        param={'user_name':user_name}
        return render(request, 'upload_file.html',param)



class ProfileView(View):
    def get(self, request, user_name):
        user_obj = User.objects.get(username=user_name)
       
        user_posts = user_obj.post_set.all().order_by('-id')
      
        param = {'user_data':user_obj, 'user_posts': user_posts}
        return render(request, 'profile.html', param)




class DeleteView(ListView):
    model = Post
    def get(self, request, post_id):
        delete_post = self.model.objects.get(id=post_id)
        user2=delete_post.user.username
        print(delete_post.user.username)
        delete_post.delete()
        messages.success(request, 'Your post has been deleted successfully.')
        return redirect(f'/uploadDjango/profile/{user2}')



class SearchView(ListView):
    def get(self, request):
        query = request.GET['query']
        search_users = User.objects.filter(username__icontains=query)
        search_title = Post.objects.filter(title__icontains = query)
        search_desc = Post.objects.filter(desc__icontains = query)
        search_result = search_title.union(search_desc)
        param = {'query':query, 'search_result':search_result, 'search_users':search_users}
        return render(request, 'search.html', param)



class SubView(View):
    def get(self, request, subject):
        user_posts = Post.objects.filter(title=subject)
       
       
        param = {'user_posts':user_posts,'sub':user_posts[0].title}
        return render(request, 'subject.html', param)


class ProfileView2(View):
    def get(self, request, user_name):
        user_obj = User.objects.get(username=user_name)
       
        user_posts = user_obj.post_set.all().order_by('-id')
      
        param = {'user_data':user_obj, 'user_posts': user_posts}
        return render(request, 'profile2.html', param)



