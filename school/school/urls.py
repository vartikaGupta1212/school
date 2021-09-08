
from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('assignments/', include('api.assignments.urls')),
    path('graded-assignments/', include('api.graded_assignments.urls')),
    path('uploadDjango/', include('blog.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)