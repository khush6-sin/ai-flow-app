# Visual AI Flow App

🔗 Demo: ai-flow-app-eight.vercel.app

An interactive full-stack MERN application that allows users to submit a prompt, receive an AI-generated response, and view the process through a draggable node-based visual workflow.

---

## 🛠️ Tech Stack

| Layer    | Technologies             |
| -------- | ------------------------ |
| Frontend | React (Vite), React Flow |
| Backend  | Node.js, Express.js      |
| Database | MongoDB                  |
| AI API   | OpenRouter API           |

---

## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mhw3011/ai-flow-builder.git
cd ai-flow-builder
```

---

### 2. Backend Installation

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and add:

```env
OPENROUTER_API_KEY=your_openrouter_key
MONGO_URI=your_mongodb_uri
```

---

## 🔑 Required Keys

### OpenRouter

1. Visit https://openrouter.ai/
2. Sign in / create an account
3. Navigate to **API Keys**
4. Generate a key
5. Paste it into `.env`

### MongoDB

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Click **Connect → Drivers**
4. Copy the URI
5. Replace `<password>` with your database password

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Installation

```bash
cd frontend
npm install
npm run dev
```

---

## ▶️ How It Works

- Type a prompt inside the input node
- Press **Run Flow** to request AI output
- The response appears in the output node
- Click **Save** to persist the data in MongoDB

---

## 🔒 Environment Variables

Ensure the following variables exist in your backend `.env` file:

```env
OPENROUTER_API_KEY=your_openrouter_key
MONGO_URI=your_mongodb_uri
```

---

## 📎 Additional Info

- Backend server runs using `npm run dev`
- Data is stored in MongoDB
- Nodes in the UI are draggable and connected visually
- API keys remain hidden using environment variables
- Built using React Flow for visual pipeline interaction
