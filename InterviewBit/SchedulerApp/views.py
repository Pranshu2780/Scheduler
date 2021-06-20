from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.core.mail import send_mail
from django.http.response import JsonResponse
from django.conf import settings
from SchedulerApp.models import Candidates, Schedule 
from SchedulerApp.serializers import CandidateSerializer, ScheduleSerializer
# print(Candidates.objects.all().count())
# Create your views here.

@csrf_exempt
def candidateApi(request,id=0):
    if request.method == 'GET':
        candidates = Candidates.objects.all()
        candidates_serializer = CandidateSerializer(candidates, many  = True)
        return JsonResponse(candidates_serializer.data, safe = False)
   
    elif request.method == 'POST': 
        candidate_data = JSONParser().parse(request);
        candidate_serializer = CandidateSerializer(data= candidate_data)
        if candidate_serializer.is_valid(): 
            candidate_serializer.save()
            # subject = "Regarding interview"
            # message = "You have an interview"
            # from_email = settings.EMAIL_HOST_USER
            # to_list = [candidate_data.CandidateEmail,settings.EMAIL_HOST_USER]
            # send_mail(subject,message,from_email,to_list,fail_silently=True)
            return JsonResponse("Added Successfully !! ", safe=False)
        return JsonResponse("Failed to add",safe=False)

    elif request.method =='PUT':
        candidate_data = JSONParser().parse(request)
        candidate = Candidates.objects.get(CandidateId = candidate_data['CandidateId'] )
        candidate_serializer = CandidateSerializer(candidate,data= candidate_data)
        if candidate_serializer.is_valid():
            candidate_serializer.save()
            return JsonResponse("Updated Successfully !! ", safe=False)
        return JsonResponse("Failed to Update",safe=False)

    elif request.method == 'DELETE':
        candidate = Candidates.objects.get(CandidateId = id )
        candidate.delete()
        return JsonResponse("Deleted Successfully !!!", safe=False)

        
# def candidateDelete(request,id=0):
#     candidate = Candidates.objects.all.get(CandidateId = id )
#     candidate.delete()
#     return JsonResponse("Deleted Successfully !!!", safe=False)

@csrf_exempt
def scheduleApi(request,id=0):
    if request.method == 'GET':
        schedule = Schedule.objects.all()
        schedule_serializer = ScheduleSerializer(schedule, many  = True)
        return JsonResponse(schedule_serializer.data, safe = False)
   
    elif request.method == 'POST': 
        lengt = Candidates.objects.all().count();
        # store = Schedule.objects.all();
        print(lengt)
        schedule_data = JSONParser().parse(request);
        schedule_serializer = ScheduleSerializer(data= schedule_data)
        if schedule_serializer.is_valid():
            if lengt<2: 
                return JsonResponse("No. of participant is less than 2",safe=False)
            schedule_serializer.save()
            return JsonResponse("Added Successfully !! ", safe=False)
        return JsonResponse("Failed to add",safe=False)

    elif request.method =='PUT':
        schedule_data = JSONParser().parse(request)
        schedule = Schedule.objects.get(ScheduleId = schedule_data['ScheduleId'] )
        schedule_serializer = ScheduleSerializer(schedule,data= schedule_data)
        if schedule_serializer.is_valid():
            schedule_serializer.save()
            return JsonResponse("Updated Successfully !! ", safe=False)
        return JsonResponse("Failed to Update",safe=False)

    elif request.method == 'DELETE':
        schedule = Schedule.objects.get(ScheduleId = id )
        schedule.delete()
        return JsonResponse("Deleted Successfully !!!", safe=False)