from django.db import models

class GameType(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=512)

    class Meta:
        db_table = 'game_types'

    def __str__(self):
        return self.name
    

class Game(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=512)
    price = models.IntegerField()
    rate = models.IntegerField()
    game_type = models.ForeignKey(to=GameType, on_delete=models.CASCADE)

    class Meta:
        db_table = 'games'

    def __str__(self):
        return self.name
    