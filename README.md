# AI Energy Radar

A modern web application for exploring and visualizing AI applications in the energy sector. Built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI.

## 🚀 Features

- **Interactive Radar Visualization** - Semicircle radar chart showing AI applications across energy sectors
- **Value Chain Mapping** - Energy value chain visualization with categorized applications
- **Use Case Management** - Submit and view community use cases
- **Advanced Filtering** - Filter by categories and technologies
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Beautiful interface with Tailwind CSS and Shadcn UI

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn UI
- **Language:** TypeScript
- **Build Tool:** Next.js built-in (Vite under the hood)

## 📊 Radar Features

- **8 Energy Sectors** - Grid Management, Renewable Energy, Energy Trading, etc.
- **5 Maturity Levels** - Idea → Development → Pilot → Productive → Lighthouse
- **Technology Color Coding** - Machine Learning, Predictive Analytics, Expert Systems, etc.
- **Interactive Data Points** - Click to view detailed information
- **Real-time Filtering** - Filter by categories and technologies

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
energy-ai-radar/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── EntryScreen.tsx
│   │   ├── Sidebar.tsx
│   │   ├── RadarChart.tsx
│   │   ├── ValueChainMap.tsx
│   │   ├── UseCaseForm.tsx
│   │   └── ui/ (Shadcn components)
│   └── data/
│       └── radarData.ts
```

## 🎯 Key Components

- **EntryScreen** - Landing page with navigation options
- **RadarChart** - Interactive semicircle radar visualization
- **ValueChainMap** - Energy value chain mapping
- **UseCaseForm** - Form for submitting new use cases
- **Sidebar** - Navigation between different views

## 🎨 Design System

Built with Tailwind CSS and Shadcn UI for a consistent, modern design:
- **Color Palette** - Energy-themed blues and greens
- **Typography** - Inter font family
- **Components** - Reusable UI components
- **Responsive** - Mobile-first design approach

## 📈 Data Structure

The application includes 24 AI energy applications across 8 categories:
- Grid Management & Smart Grid
- Renewable Energy
- Energy Trading & Markets
- Energy Storage
- Energy Efficiency
- Oil & Gas Operations
- Nuclear Energy
- Energy Analytics & IoT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
