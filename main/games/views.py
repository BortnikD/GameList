from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from .serializer import GameSerializer
from .models import Game
from .paginations.games_paginations import GamePagination


class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    filter_backends = [OrderingFilter, SearchFilter]
    pagination_class = GamePagination
    search_fields = ['name']

    def get_queryset(self):
        return Game.objects.all()
    
    def perform_create(self, serializer):
        serializer.save()
        
