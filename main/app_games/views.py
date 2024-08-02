from django.shortcuts import render
from django.views import View

class GamesView(View):
    def get(self, request):
        return render(request, 'app_games/games.html')