from django.contrib import admin
from .models import Customer

@admin.register(Customer)
class AuthorAdmin(admin.ModelAdmin):
    pass
