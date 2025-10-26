# PromptVault 2.0 🚀

A modern, comprehensive prompt management system built with React, TypeScript, and Express.js. PromptVault 2.0 provides developers with a powerful library of 75+ carefully crafted templates across 7 categories to accelerate development workflows.

## ✨ Features

- **📚 75+ Professional Templates** - Comprehensive collection across multiple categories
- **🔍 Advanced Search** - Fuzzy search with intelligent filtering
- **📱 Responsive Design** - Works seamlessly on all devices  
- **⚡ Modern Stack** - React, TypeScript, Express.js, PostgreSQL
- **🎨 Beautiful UI** - Built with Tailwind CSS and Radix UI components
- **🔧 Developer Friendly** - Hot reload, TypeScript support, modern tooling

## 🏗️ Template Categories

| Category | Count | Description |
|----------|-------|-------------|
| **Foundation Layer** | 5 | Core services and interfaces |
| **Feature Layer** | 12 | Business logic and feature implementations |
| **Project Layer** | 8 | Complete project templates |
| **Components** | 9 | Reusable UI components |
| **Testing** | 5 | Testing patterns and frameworks |
| **Styling** | 3 | CSS architectures and design systems |
| **SDLC Templates** | 33 | Development lifecycle workflows |

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sreenivasvaluelabs/PromptVault2.0.git
   cd PromptVault2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/promptvault
   SESSION_SECRET=your-super-secret-session-key
   ```

4. **Set up the database**
   ```bash
   # Push database schema
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5000
   ```

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | Type check with TypeScript |
| `npm run db:push` | Push database schema changes |

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type safety and better developer experience  
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Query** - Server state management
- **Vite** - Fast build tool and dev server

### Backend
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Full-stack type safety
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Robust relational database
- **Zod** - Schema validation

### Development Tools
- **tsx** - TypeScript execution engine
- **ESBuild** - Fast JavaScript bundler
- **Cross-env** - Cross-platform environment variables

## 📁 Project Structure

```
PromptVault-2.0/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── types/         # TypeScript type definitions
│   └── index.html
├── server/                # Express.js backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route handlers
│   ├── storage.ts         # Database operations
│   └── vite.ts           # Vite integration
├── shared/                # Shared code between client and server
│   └── schema.ts          # Database schema definitions
├── docs/                  # Comprehensive documentation
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Required
DATABASE_URL=postgresql://user:password@localhost:5432/promptvault
SESSION_SECRET=your-secret-key

# Optional
PORT=5000
NODE_ENV=development
LOG_LEVEL=info
```

### Database Setup

1. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE promptvault;
   ```

2. **Configure connection string**
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/promptvault
   ```

3. **Push schema**
   ```bash
   npm run db:push
   ```

## 📖 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Technical Specification](./docs/TECHNICAL_SPECIFICATION.md)** - Complete system architecture
- **[Architecture Diagrams](./docs/ARCHITECTURE_DIAGRAM.md)** - Visual system overview  
- **[User Manual](./docs/USER_MANUAL.md)** - Complete usage guide
- **[Real-time Examples](./docs/REAL_TIME_EXAMPLES.md)** - Implementation examples

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Setup

For production deployment:

1. Set `NODE_ENV=production`
2. Use a secure `SESSION_SECRET`
3. Configure production database URL
4. Set appropriate `ALLOWED_ORIGINS` for CORS

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Drizzle team for the excellent ORM
- Radix UI for accessible components
- Tailwind CSS for the utility-first approach

## 🐛 Issues & Support

- **Issues**: [GitHub Issues](https://github.com/sreenivasvaluelabs/PromptVault2.0/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sreenivasvaluelabs/PromptVault2.0/discussions)

---

**Built with ❤️ by the PromptVault Team**