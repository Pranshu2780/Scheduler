# Generated by Django 3.2.4 on 2021-06-19 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SchedulerApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedule',
            name='ParticipantName',
            field=models.CharField(default='', editable=False, max_length=100),
        ),
    ]