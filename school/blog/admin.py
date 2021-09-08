from django.contrib import admin
from .models import  Post





@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'file_field']
