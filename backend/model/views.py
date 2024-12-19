from PIL import Image, ImageDraw, ImageFont
from ultralytics import YOLO
from django.http import FileResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
import io
import numpy as np
from collections import Counter

class YOLOAPIView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file = request.data['file']
        file_name = file.name
        image = Image.open(io.BytesIO(file.read()))
        
        image.save(f'images/original_{file_name}', format='PNG')

        if image.mode != 'RGB':
            image = image.convert('RGB')

        image_array = np.array(image)
        model = YOLO(r'D:\bao_cao\Cap_truong\test_model\runs_cau_hinh_out\runs\segment\train\weights\best.pt')
        results = model(image_array, conf=0.2)

        object_counts = Counter()
        
        img_draw = image.copy()
        draw = ImageDraw.Draw(img_draw)
        
        try:
            font = ImageFont.truetype("arial.ttf", 20)
        except IOError:
            font = ImageFont.load_default()

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                cls = int(box.cls[0])
                name = model.names[cls]

                draw.rectangle([x1, y1, x2, y2], outline="blue", width=2)
                draw.text((x1, y1 - 25), name, fill="blue", font=font)

                object_counts[name] += 1

        img_draw.save('processed_image.png', format='PNG')

        total_objects = sum(object_counts.values())
        object_counts['Total'] = total_objects

        return Response({
            "message": "Original image and processed image saved.",
            "object_counts": dict(object_counts)
        })

class YOLOImageAPIView(APIView):
    def get(self, request, *args, **kwargs):
        image_type = request.query_params.get('type', 'processed')
        if image_type == 'original':
            image_path = f'images/original_{request.query_params.get("filename")}'
        else:
            image_path = 'processed_image.png'
        response = FileResponse(open(image_path, 'rb'), content_type='image/png')
        return response