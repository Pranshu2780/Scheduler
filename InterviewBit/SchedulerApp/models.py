from django.db import models

# Create your models here.

class Candidates(models.Model): 
    CandidateId = models.AutoField(primary_key=True)
    CandidateName = models.CharField(max_length=100)
    CandidateEmail = models.EmailField(max_length=128)
    Resume = models.FileField(default="")
class Schedule(models.Model):
    ScheduleId = models.AutoField(primary_key=True)
    ParticipantName = models.CharField(max_length=100)
    JoiningDate = models.DateField()
    StartTime = models.TimeField()
    EndTime = models.TimeField()
    