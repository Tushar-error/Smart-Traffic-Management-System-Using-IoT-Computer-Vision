# 🚦 Smart Traffic Management System Using IoT & Computer Vision

<div align="center">

**A real-time traffic monitoring and prediction system powered by Computer Vision, Machine Learning, and IoT**


</div>

---

## 📋 Overview

The **Smart Traffic Management System** is an advanced web-based application designed to revolutionize urban traffic management through the integration of IoT sensors, Computer Vision, and Machine Learning. This system monitors traffic conditions in real-time, predicts congestion patterns, and provides actionable insights for smart city traffic optimization.

### 🎯 Key Highlights

- **Real-time Traffic Monitoring**: Live video feed analysis using Computer Vision
- **AI-Powered Predictions**: Machine Learning models for traffic congestion forecasting
- **IoT Integration**: Sensor data collection and processing
- **Modern Web Interface**: Responsive React + TypeScript frontend with TailwindCSS
- **Scalable Architecture**: Microservices-based design for smart city deployment

---

## ✨ Features to add

### 🔍 Computer Vision Capabilities
- Vehicle detection and counting
- Traffic density analysis
- Lane occupancy monitoring
- Speed estimation
- License plate recognition (optional)

### 🤖 Machine Learning
- Pre-trained models for traffic prediction
- Congestion pattern recognition
- Historical data analysis
- Real-time anomaly detection

### 🌐 IoT Integration
- Sensor data aggregation
- Real-time data streaming
- Multi-device support
- Edge computing capabilities

### 📊 Dashboard Features
- Interactive traffic heatmaps
- Real-time analytics
- Historical trend visualization
- Alert and notification system
- Customizable reporting

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│          React + TypeScript + TailwindCSS                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ REST API / WebSocket
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   Backend Layer (Python)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Flask/     │  │   Computer   │  │      ML      │     │
│  │  FastAPI     │  │    Vision    │  │    Models    │     │
│  │   Server     │  │   Pipeline   │  │   (Trained)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Data Stream
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    IoT Layer                                │
│         Cameras • Sensors • Edge Devices                    │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack

**Frontend**
- React 18.x
- TypeScript 5.x
- TailwindCSS 3.x
- Axios / React Query
- Chart.js / Recharts
- Socket.io Client

**Backend**
- Python 3.8+
- Flask / FastAPI
- OpenCV
- TensorFlow / PyTorch
- NumPy, Pandas
- SQLite / PostgreSQL

**ML Models**
- YOLO (You Only Look Once) for object detection
- Custom trained traffic prediction models
- Time-series forecasting models

**IoT**
- Raspberry Pi / Edge devices
- IP Cameras / Sensors

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 16+** and **npm/yarn** ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **pip** (Python package manager)

### Clone the Repository

```bash
git clone https://github.com/yourusername/Smart-Traffic-Management-System-Using-IoT-Computer-Vision.git
cd Smart-Traffic-Management-System-Using-IoT-Computer-Vision
```

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download pre-trained models**
   ```bash
   # Download YOLO weights (if not included)
   python scripts/download_models.py
   ```

5. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Initialize the database**
   ```bash
   python manage.py db init
   python manage.py db migrate
   ```

7. **Start the backend server**
   ```bash
   # Development mode
   python app.py

   # Or with Flask
   flask run

   # Or with uvicorn (if using FastAPI)
   uvicorn main:app --reload
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory** (from project root)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```
   
   Example `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_WS_URL=ws://localhost:5000/ws
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The frontend will be available at `http://localhost:3000`

---

## 📖 Usage

### Running the Complete System

1. **Start the Backend Server**
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python app.py
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - Login with default credentials (if authentication is implemented)

### Connecting IoT Devices

1. Configure your IoT devices (cameras/sensors) with the backend endpoint
2. Use the MQTT broker settings from your `.env` file
3. Devices will automatically start streaming data to the system

## 🗂️ Project Structure

```
Smart-Traffic-Management-System/
├── backend/
│   ├── new.temp
│
├── python /
│   ├── Test.py
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   └── App.tsx            # Main App component
│   ├── public/                # Static assets
│   ├── package.json           # Node dependencies
│   ├── tsconfig.json          # TypeScript config
│   └── tailwind.config.js     # TailwindCSS config
│
├── .gitignore
├── LICENSE
└── README.md
```


## 👥 Authors

- **Tushar** - *
- **Luvin** - 
- **SanyuCt** -
- **Ishand** - 
- **Naman** - 


<div align="center">

**⭐ If you find this project useful, please consider giving it a star!**

Made with ❤️ for Smart Cities

</div>
