# Generated by Django 5.1.6 on 2025-02-13 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_alter_person_photo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movie',
            name='trailer_url',
        ),
    ]
