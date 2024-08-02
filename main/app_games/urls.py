from django.urls import path, include

from .views import GamesView

urlpatterns = [
    path('', GamesView.as_view(), name='games'),
]
