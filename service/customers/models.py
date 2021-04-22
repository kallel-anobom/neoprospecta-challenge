from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Customer(models.Model):
  name = models.CharField(max_length=200)
  age = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
  city = models.CharField(max_length=100)
