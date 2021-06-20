from rest_framework import serializers
from SchedulerApp.models import Candidates, Schedule

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('CandidateId', 'CandidateName', 'CandidateEmail','Resume')

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('ScheduleId', 'ParticipantName' , 'JoiningDate', 'StartTime', 'EndTime' ) 
