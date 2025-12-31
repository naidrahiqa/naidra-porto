# Portfolio Website (Live CMS)

A modern, interactive portfolio website featuring a **Live Content Management System (CMS)** powered by Supabase. Built with React and TypeScript, it allows you to update your projects and profile information directly from the web interface without touching the code.

![Portfolio Preview](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop)

## ✨ Key Features

### � Live CMS (Cloud Database)

- **Real-time Updates**: Edit your content in the Dashboard, and changes appear instantly on the live site.
- **Cloud Storage**: All data is securely stored in Supabase (PostgreSQL), not just your local browser.
- **Zero Code Updates**: Add new projects, change descriptions, or update links via a user-friendly UI.

### 🎨 Premium Design

- **Glassmorphism UI**: Modern frosted glass effects and sleek cards.
- **Dynamic Animations**: Powered by Framer Motion, AOS, and React-Spring.
- **Interactive Particles**: Subtle background particle effects for depth.
- **Japanese Aesthetic**: A clean, minimalist visual theme with meaningful typography.

### �️ Tech Stack

- **Frontend**: React (v19), TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion, AOS, React-Parallax-Tilt
- **Icons**: React Icons (Fira Code Nerd Font)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A [Supabase](https://supabase.com) account (Free tier)

### Installation

1.  **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd naidra-porto
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory:

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Setup Database (Supabase)**

    - Create a new Project in Supabase.
    - Go to the **SQL Editor** in Supabase Dashboard.
    - Copy the content of `supabase_schema.sql` (found in this repo) and Run it.
    - This will create the `projects` and `settings` tables and configure security.

5.  **Start Local Server**
    ```bash
    npm run dev
    ```

## 📦 Deployment

This project is optimized for deployment on **Vercel** or **Netlify**.

### Important: Environment Variables

When deploying, you **MUST** add your Supabase credentials in the hosting provider's settings:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_SUPABASE_URL`: (Your URL)
  - `VITE_SUPABASE_ANON_KEY`: (Your Key)

Without these variables, the deployed site will fall back to local storage or fail to load data.

## 📂 Project Structure

```
naidra-porto/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx    # CMS Interface (Admin Panel)
│   │   ├── Portfolio.tsx    # Public Frontend
│   │   ├── Login.tsx        # Authentication Gate
│   │   └── ...
│   ├── services/
│   │   └── db.ts           # Supabase Database Logic
│   ├── lib/
│   │   └── supabase.ts     # Supabase Client Config
│   └── ...
├── supabase_schema.sql      # Database Setup Script
└── README.md
```

## �️ Tips for Management

- **Dashboard Access**: Access `/dashboard` to manage your content.
- **Security**: The current setup uses a simplified "Public Read / Public Write (Hidden)" model for ease of use. For production security, consider enabling Supabase Auth in the schema.
- **Backup**: Although cloud storage is used, you can occasionally export your table data as CSV from the Supabase Dashboard.

## 📝 License

This project is available under the [MIT License](LICENSE).

---

Made with ❤️ using **React** & **Supabase**.
