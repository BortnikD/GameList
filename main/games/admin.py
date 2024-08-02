from django.contrib import admin

from .models import Game, GameType

app_name = 'games'

admin.site.register([Game, GameType])
