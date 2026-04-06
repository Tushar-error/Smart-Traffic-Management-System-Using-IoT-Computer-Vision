# Smart Traffic Management System - Frontend Structure

## Folder Structure
```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── TrafficMap.tsx
│   │   ├── LiveFeed.tsx
│   │   ├── StatisticsCard.tsx
│   │   └── AlertPanel.tsx
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── Analytics.tsx
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Component Overview

### **Navbar.tsx**
- Navigation bar with routing
- App logo and menu items

### **Dashboard Page**
Main view containing:
- **TrafficMap.tsx** - Interactive map showing traffic conditions
- **LiveFeed.tsx** - Real-time traffic camera feeds
- **StatisticsCard.tsx** - Traffic metrics and KPIs
- **AlertPanel.tsx** - Traffic alerts and notifications

### **Analytics Page**
- Charts and visualizations
- Traffic reports and insights

## Tech Stack
- **React** with TypeScript
- **Vite** for build tooling
- Mock data for prototype demonstration