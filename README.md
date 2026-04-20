# 🏋️ Reps n Reason

> An AI-powered voice fitness assistant that creates personalized workout and diet plans - just by having a conversation.


[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-00B4D8?style=for-the-badge&logo=vercel&logoColor=white)](https://reps-n-reason.vercel.app)

---

## 📌 Overview

**Reps n Reason** is a full-stack AI fitness application where users can sign up, speak to an AI voice agent in plain English, and receive a fully personalized workout schedule and diet plan — all generated in real time.

No forms. No manual input. Just a conversation.

---

## ✨ Features

- 🎙️ **Voice-first interaction** — Talk to your AI fitness coach naturally in English
- 🤖 **AI-generated plans** — Personalized workout and diet plans powered by Google Gemini
- 🔐 **Secure authentication** — Sign up and log in with Clerk
- 💾 **Persistent storage** — Plans saved to your account via Convex
- 📱 **Modern UI** — Clean, accessible interface built with ShadCN and Tailwind CSS
- ⚡ **Edge-ready deployment** — Hosted on Vercel for fast, global performance

---

## 📸 Screenshots

### Landing Page
![Landing Page](./public/screenshots/landing.png)

### Program Gallery & Terminal Overlay
![Program Gallery](./public/screenshots/gallery.png)

### AI-Generated Program Cards
![Program Cards](./public/screenshots/cards.png)

---

## 🧠 How It Works

```
User speaks → Vapi captures voice → AI agent collects fitness data →
Gemini generates plan → Convex stores it → User receives their plan
```

1. **Sign up / Log in** via Clerk authentication
2. **Start a voice session** with the AI fitness coach
3. The agent collects your details one at a time:
   - Age, weight, height
   - Injuries or physical limitations
   - Fitness goal (fat loss / muscle gain / maintenance / performance)
   - Available workout days per week
   - Fitness level (beginner / intermediate / advanced)
   - Dietary restrictions
4. Collected data is sent to **Google Gemini** via the `generate_program` tool
5. Gemini returns a personalized **workout plan** and **diet plan**
6. The plan is **stored in Convex** and presented to the user
7. The agent closes the session warmly

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) | Full-stack React framework with App Router |
| **UI** | [ShadCN UI](https://ui.shadcn.com) + [Tailwind CSS](https://tailwindcss.com) | Component library and styling |
| **Authentication** | [Clerk](https://clerk.com) | User sign-up, login, and session management |
| **Voice AI** | [Vapi](https://vapi.ai) | Voice agent, speech-to-text, and conversation flow |
| **AI Model** | [Google Gemini](https://deepmind.google/technologies/gemini) | Generating personalized fitness and diet plans |
| **Database** | [Convex](https://convex.dev) | Real-time database for storing user plans |
| **Deployment** | [Vercel](https://vercel.com) | Hosting and edge deployment |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                  │
│                                                      │
│   Next.js App Router  ←→  ShadCN UI Components      │
│         │                                            │
│    Clerk (Auth)    Vapi Web SDK (Voice)              │
└──────────┬──────────────────┬───────────────────────┘
           │                  │
           ▼                  ▼
┌──────────────────┐   ┌─────────────────────────────┐
│  Convex Database │   │         Vapi Platform        │
│                  │   │                              │
│  - User plans    │   │  AI Assistant (GPT/Gemini)   │
│  - User profiles │   │  Speech-to-Text (Deepgram)   │
└──────────────────┘   │  Text-to-Speech (Voice)      │
           ▲           └──────────────┬───────────────┘
           │                          │
           │                          ▼
           │              ┌───────────────────────┐
           └──────────────│    Google Gemini API   │
                          │                       │
                          │  generate_program()   │
                          │  → workout_plan       │
                          │  → diet_plan          │
                          └───────────────────────┘
```

---

## 📁 Project Structure

```
REPS-N-REASON/
├── app/
│   ├── (auth)/                  ← Clerk auth route group (sign-in, sign-up)
│   ├── generate-program/        ← API route for Gemini plan generation
│   ├── profile/                 ← User profile page
│   ├── globals.css              ← Global styles
│   ├── layout.tsx               ← Root layout with ClerkProvider
│   └── page.tsx                 ← Landing page
├── components/
│   ├── ui/                      ← ShadCN auto-generated components
│   ├── CornerElements.tsx        ← Decorative UI elements
│   ├── Footer.tsx               ← App footer
│   ├── Navbar.tsx               ← Navigation bar
│   ├── NoFitnessPlan.tsx        ← Empty state when no plan exists
│   ├── ProfileHeader.tsx        ← User profile header
│   ├── TerminalOverlay.tsx      ← Voice agent terminal UI overlay
│   └── UserPrograms.tsx         ← Displays user's generated plans
├── convex/
│   ├── _generated/              ← Auto-generated Convex types
│   ├── auth.config.ts           ← Convex auth configuration
│   ├── http.ts                  ← HTTP action handlers
│   ├── plans.ts                 ← Queries and mutations for plans
│   ├── schema.ts                ← Database schema definition
│   └── users.ts                 ← User-related queries and mutations
├── constants/                   ← App-wide constants
├── lib/                         ← Utility functions (cn, etc.)
├── providers/                   ← React context providers
├── public/                      ← Static assets
├── middleware.ts                ← Clerk auth middleware
├── next.config.ts               ← Next.js configuration
├── .env.local                   ← Environment variables (not committed)
└── components.json              ← ShadCN configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account
- A [Vapi](https://vapi.ai) account
- A [Convex](https://convex.dev) account
- A [Google Gemini](https://aistudio.google.com) API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reps-n-reason.git
   cd reps-n-reason
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Vapi
   NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key

   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

   # Gemini
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key for client-side auth |
| `CLERK_SECRET_KEY` | Clerk secret key for server-side auth |
| `NEXT_PUBLIC_VAPI_API_KEY` | Vapi public key for voice agent |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL |
| `GEMINI_API_KEY` | Google Gemini API key for plan generation |

---

## 🤖 Vapi Agent Configuration

The voice agent is configured as a Vapi **Assistant** with the following setup:

- **Transcriber:** Deepgram (speech-to-text)
- **Model:** OpenAI GPT-4.1 (conversation management)
- **Voice:** Vapi default TTS
- **Custom Tool:** `generate_program` — triggers the Gemini API call with collected user data

### Data Collected by the Agent

| Field | Description |
|---|---|
| `age` | User's age in years |
| `weight` | Weight with unit (kg/lb) |
| `height` | Height with unit (cm or ft/in) |
| `injuries` | Physical limitations or "none" |
| `fitness_goal` | fat loss / muscle gain / maintenance / performance |
| `workout_days` | Days per week available (1–7) |
| `fitness_level` | beginner / intermediate / advanced |
| `dietary_restrictions` | Diet preferences or "none" |

---

## ☁️ Deployment

This project is deployed on **Vercel**.


[![Deployed Project](https://img.shields.io/badge/Deployed%20Project-Visit%20Site-00B4D8?style=for-the-badge&logo=vercel&logoColor=white)](https://reps-n-reason.vercel.app)

For manual deployment:
```bash
npm run build
vercel --prod
```

Make sure to add all environment variables in your Vercel project dashboard under **Settings → Environment Variables**.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ by Aaditya Gupta using Next.js, Vapi, Convex, Gemini, Clerk, and Vercel</p>

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
 
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
