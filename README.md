# 🌱 VanaEcho - Eco-Social Platform 

**VanaEcho** is a full-stack eco-social platform designed to empower people to take climate action. Users can share their green initiatives, follow verified eco-organizations, plant trees, and visualize their positive impact on a real-time map. Built with a focus on security, interactivity, and sleek dark-themed aesthetics.

---

## 🚀 Features

- 🔒 **JWT Authentication with HttpOnly Cookies** – Secure login and session handling
- 🧑‍🤝‍🧑 **Social Interactions** – Like, comment, follow eco-orgs
- 🌱 **Tree Planting Module** – Log tree-planting with location and description
- 🗺️ **MapTiler Integration** – Live map showing eco-orgs and planted trees
- ✅ **Verified Eco-Organizations** – Admin approval system for org submissions
- 📰 **Curated Feed** – Showcase only verified and meaningful posts
- 💬 **Real-Time Comments** – Engaging and responsive  section
- 🎨 **Framer Motion Animations** – Smooth, modern UI transitions
- 🌘 **Dark Mode UI** – Custom aesthetic

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Auth with Cookies

### DevOps & Hosting
- Frontend: Vercel
- Backend/DB: Railway
- Map Tiles: MapTiler
- CI/CD: Environment-based config

---

## 🌍 How It Works

1. **SignUp/Login** securely via JWT and HttpOnly cookies.
2. Users can **share posts**, **comment**, and **like**.
3. **Tree planting**: Add latitude, longitude, description, and image (recommendation use latitude and longitude).
4. Admins **verify eco-organizations** to keep the platform impactful.
5. Map shows **eco-orgs and planted trees** in real time.
6. All actions have **smooth transitions** and **dark theme UI** to keep it modern.

---

## 🖼️ Screenshots

> Add screenshots here (UI, map, planting form, mobile view, etc.)
> <img width="807" height="791" alt="image" src="https://github.com/user-attachments/assets/ca99f8e6-0491-4814-b600-1d7025a6a588" />
> > > ![Uploading image.png…]()
> ![Uploading image.png…]()
---

## 🧪 Local Development

bash
# Clone the repository
git clone https://github.com/K-K-0/Eco-social.git
cd Eco-social

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run development server
npm run dev


<!-- 
VITE_BACKEND_URL=http://localhost:5000
DATABASE_URL=postgresql://user:password@localhost:5432/vanaecho
JWT_SECRET=your-secret
MAPTILER_API_KEY=your-key 
-->

🤝 Contributing
We welcome contributions! Fork the repo, make changes, and submit a PR. Let’s build a greener web together 🌿

📄 License
MIT License. Free to use, modify, and share.

✨ Acknowledgements
MapTiler

Railway

Vercel

Framer Motion

Built with 💚 by Aditya Yadav | Connect on GitHub
