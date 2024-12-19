### README.md

```markdown
# Trash Classification Web App

A simple web application that classifies trash images into four categories: plastic, paper, metal, and glass.  
Users can upload an image, and the model (YOLOv8) predicts the category of the trash.

---

## Features
- Upload an image of trash and get a classification result.
- Supports 4 trash categories: **plastic**, **paper**, **metal**, and **glass**.
- Simple and user-friendly interface.

---

## Technologies Used
### Backend
- Django
- Django REST Framework

### Frontend
- ReactJS

### Machine Learning
- YOLOv8 (Ultralytics)

### Others
- OpenCV
- Axios

---

## Installation

### 1. Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository/backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: .\env\Scripts\activate
   ```
3. Install the required libraries:
   ```bash
   pip install django djangorestframework ultralytics opencv-python
   ```
4. Run the server:
   ```bash
   python manage.py runserver
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## How to Use
1. Start the backend and frontend servers.
2. Open the frontend in your browser at `http://localhost:3000`.
3. Upload an image of trash and wait for the result.

---

## Dataset
The dataset is collected from various sources, including [Kaggle Trash Dataset](https://www.kaggle.com/datasets/tatzuk/rac-json).

---

## License
This project is licensed under the MIT License.
```

---

### **File `requirements.txt`**
Here is a minimal version based on the libraries you provided:  

```plaintext
django>=4.2
djangorestframework>=3.14
ultralytics>=8.0
opencv-python>=4.8
```

---

If you need further assistance, feel free to ask! 🚀
