from django.urls import path
from .views import YOLOAPIView, YOLOImageAPIView

urlpatterns = [
    path('api/yolo', YOLOAPIView.as_view(), name='yolo'),
    path('api/yolo_image', YOLOImageAPIView.as_view(), name='yolo_image'),
]

# path('stream_video/', StreamVideo.as_view(), name='stream_video'),