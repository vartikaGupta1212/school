from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
  
    path('<str:user_name>/upload_file/', views.UploadView.as_view(), name='upload_file'),
    path('profile/<str:user_name>/', views.ProfileView.as_view(), name='profile'),
    path('delete/<int:post_id>', views.DeleteView.as_view(), name='delete'),
    path('search/', views.SearchView.as_view(), name='search'),
    path('sub/<str:subject>', views.SubView.as_view(), name='subject'),
    path('profile2/<str:user_name>/', views.ProfileView2.as_view(), name='profile2'),
]