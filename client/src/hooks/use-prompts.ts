import { useQuery } from "@tanstack/react-query";
import { PromptItem } from "@/types/prompt";

// Sample data for static deployment
const allPrompts: PromptItem[] = [
  {
    id: "foundation-service_interface-development",
    title: "Service Interface",
    description: "Foundation service interface with dependency injection and logging",
    content: `Create a foundation service interface following Helix architecture principles. Include async methods, error handling, and comprehensive logging.

// Foundation service interface
public interface I{{ServiceName}}Service
{
    Task<{{ReturnType}}> {{MethodName}}Async({{Parameters}});
    void LogOperation(string operation, object data = null);
}

public class {{ServiceName}}Service : I{{ServiceName}}Service
{
    private readonly ILogger<{{ServiceName}}Service> _logger;

    public {{ServiceName}}Service(ILogger<{{ServiceName}}Service> logger)
    {
        _logger = logger;
    }

    public async Task<{{ReturnType}}> {{MethodName}}Async({{Parameters}})
    {
        try
        {
            _logger.LogInformation("Starting {{MethodName}} operation");
            
            // Implementation logic here
            var result = await ProcessAsync({{Parameters}});
            
            _logger.LogInformation("{{MethodName}} completed successfully");
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in {{MethodName}}: {Error}", ex.Message);
            throw;
        }
    }

    public void LogOperation(string operation, object data = null)
    {
        _logger.LogInformation("Operation: {Operation}, Data: {@Data}", operation, data);
    }
}`,
    category: "foundation",
    component: "Service Layer",
    sdlcStage: "Development",
    tags: ["service", "interface", "DI", "logging"],
    context: "Backend Development"
  },
  {
    id: "foundation-repository_pattern-implementation",
    title: "Repository Pattern",
    description: "Generic repository pattern with Entity Framework integration",
    content: `Implement a robust repository pattern with Entity Framework Core, including generic CRUD operations and specification pattern.

// Generic repository interface
public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}

// Repository implementation
public class Repository<T> : IRepository<T> where T : class
{
    private readonly DbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(DbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _dbSet.FindAsync(id) != null;
    }
}`,
    category: "foundation",
    component: "Data Access Layer",
    sdlcStage: "Development",
    tags: ["repository", "pattern", "EF", "CRUD"],
    context: "Data Management"
  },
  {
    id: "feature-user_management-system",
    title: "User Management System",
    description: "Complete user management with authentication, authorization, and profile management",
    content: `Implement a comprehensive user management system with registration, authentication, profile management, and role-based authorization.

// User domain model
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; }
    public bool IsEmailVerified { get; set; }
    public string? ProfileImageUrl { get; set; }
    public List<UserRole> Roles { get; set; } = new();
}

// User service interface
public interface IUserService
{
    Task<User> RegisterAsync(RegisterUserDto dto);
    Task<AuthResult> LoginAsync(LoginDto dto);
    Task<User> GetByIdAsync(int id);
    Task<User> GetByEmailAsync(string email);
    Task<User> UpdateProfileAsync(int userId, UpdateProfileDto dto);
    Task<bool> VerifyEmailAsync(string token);
    Task SendPasswordResetAsync(string email);
    Task<bool> ResetPasswordAsync(string token, string newPassword);
}`,
    category: "feature",
    component: "Authentication",
    sdlcStage: "Development",
    tags: ["user", "auth", "profile", "management"],
    context: "User Management"
  },
  {
    id: "component-react_form-validation",
    title: "React Form with Validation",
    description: "Reusable React form component with comprehensive validation",
    content: `Create a reusable React form component with validation using React Hook Form and Zod.

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Form validation schema
const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

interface FormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export const ValidatedForm: React.FC<FormProps> = ({ onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};`,
    category: "components",
    component: "Form Component",
    sdlcStage: "Development",
    tags: ["react", "form", "validation", "zod"],
    context: "Frontend Development"
  },
  {
    id: "sdlc-project_setup-template",
    title: "Project Setup Checklist",
    description: "Comprehensive project initialization and setup checklist",
    content: `# Project Setup Checklist

## 🚀 Initial Setup
- [ ] Create project repository
- [ ] Set up development environment
- [ ] Configure package.json
- [ ] Initialize Git repository
- [ ] Set up CI/CD pipeline

## 📋 Configuration
- [ ] Environment variables setup
- [ ] Database configuration
- [ ] Authentication setup  
- [ ] Logging configuration
- [ ] Error handling setup

## 🛠️ Development Tools
- [ ] Code linting (ESLint)
- [ ] Code formatting (Prettier)
- [ ] Type checking (TypeScript)
- [ ] Testing framework setup
- [ ] Pre-commit hooks

## 📚 Documentation
- [ ] README.md with setup instructions
- [ ] API documentation
- [ ] Deployment guide
- [ ] Contributing guidelines
- [ ] Code of conduct

## 🔒 Security
- [ ] Security headers configuration
- [ ] Input validation
- [ ] Authentication & authorization
- [ ] CORS configuration
- [ ] Rate limiting

## 🧪 Testing
- [ ] Unit tests setup
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance tests
- [ ] Security tests`,
    category: "sdlc_templates",
    component: "Project Management",
    sdlcStage: "Planning",
    tags: ["setup", "checklist", "initialization", "project"],
    context: "Project Setup"
  },
  {
    id: "project-full_stack-architecture",
    title: "Full Stack Architecture",
    description: "Complete full-stack application architecture template",
    content: `# Full Stack Architecture Template

## 🏗️ Architecture Overview

### Frontend (React + TypeScript)
\`\`\`
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # API services
├── stores/        # State management
├── utils/         # Utility functions
└── types/         # TypeScript definitions
\`\`\`

### Backend (Node.js + Express)
\`\`\`
server/
├── controllers/   # Request handlers
├── services/      # Business logic
├── repositories/  # Data access layer
├── middleware/    # Custom middleware
├── models/        # Data models
└── utils/         # Server utilities
\`\`\`

### Database Design
\`\`\`sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table for authentication
CREATE TABLE user_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL
);
\`\`\`

### API Design
\`\`\`typescript
// RESTful API endpoints
GET    /api/users          # List users
POST   /api/users          # Create user
GET    /api/users/:id      # Get user
PUT    /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user

// Authentication
POST   /api/auth/login     # User login
POST   /api/auth/logout    # User logout
POST   /api/auth/refresh   # Refresh token
\`\`\``,
    category: "project",
    component: "Architecture",
    sdlcStage: "Design",
    tags: ["fullstack", "architecture", "design", "structure"],
    context: "System Architecture"
  },
  {
    id: "testing-unit_test-template",
    title: "Unit Test Template",
    description: "Comprehensive unit testing template with Jest and React Testing Library",
    content: `# Unit Test Template

## 🧪 Component Testing
\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  it('should render form fields', () => {
    render(<UserForm onSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    const mockSubmit = jest.fn();
    render(<UserForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<UserForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
\`\`\`

## 🔧 Service Testing
\`\`\`typescript
import { UserService } from './UserService';
import { mockRepository } from '../__mocks__/repository';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockRepository);
    jest.clearAllMocks();
  });

  it('should create user successfully', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };
    mockRepository.create.mockResolvedValue({ id: 1, ...userData });

    const result = await userService.createUser(userData);

    expect(result).toEqual({ id: 1, ...userData });
    expect(mockRepository.create).toHaveBeenCalledWith(userData);
  });

  it('should throw error for duplicate email', async () => {
    mockRepository.findByEmail.mockResolvedValue({ id: 1 });

    await expect(
      userService.createUser({ email: 'test@example.com', password: 'pass' })
    ).rejects.toThrow('Email already exists');
  });
});
\`\`\``,
    category: "testing",
    component: "Unit Testing",
    sdlcStage: "Development",
    tags: ["testing", "jest", "unit", "react-testing-library"],
    context: "Quality Assurance"
  },
  {
    id: "styling-css_architecture",
    title: "CSS Architecture",
    description: "Scalable CSS architecture with BEM methodology",
    content: `/* CSS Architecture Template */

/* 1. Base styles */
.button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

/* 2. Modifiers */
.button--primary {
  background-color: #3b82f6;
  color: white;
}

.button--secondary {
  background-color: #6b7280;
  color: white;
}

/* 3. States */
.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
    category: "styling",
    component: "CSS Framework",
    sdlcStage: "Development",
    tags: ["css", "architecture", "bem", "styling"],
    context: "Frontend Styling"
  }
];

// Helper functions
const searchPrompts = (prompts: PromptItem[], query: string): PromptItem[] => {
  if (!query || query.length < 2) return prompts;
  
  const lowercaseQuery = query.toLowerCase();
  return prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(lowercaseQuery) ||
    prompt.description.toLowerCase().includes(lowercaseQuery) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    prompt.category.toLowerCase().includes(lowercaseQuery)
  );
};

const getPromptsByCategory = (prompts: PromptItem[], category: string): PromptItem[] => {
  return prompts.filter(prompt => prompt.category === category);
};

const getPromptById = (prompts: PromptItem[], id: string): PromptItem | undefined => {
  return prompts.find(prompt => prompt.id === id);
};

export function usePrompts() {
  return useQuery<PromptItem[]>({
    queryKey: ["prompts"],
    queryFn: () => Promise.resolve(allPrompts),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePrompt(id: string) {
  return useQuery<PromptItem | undefined>({
    queryKey: ["prompts", id],
    queryFn: () => {
      const prompt = getPromptById(allPrompts, id);
      return Promise.resolve(prompt);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePromptsByCategory(category: string) {
  return useQuery<PromptItem[]>({
    queryKey: ["prompts", "category", category],
    queryFn: () => Promise.resolve(getPromptsByCategory(allPrompts, category)),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchPrompts(query: string) {
  return useQuery<PromptItem[]>({
    queryKey: ["prompts", "search", query],
    queryFn: () => Promise.resolve(searchPrompts(allPrompts, query)),
    enabled: !!query && query.length > 2,
    staleTime: 5 * 60 * 1000,
  });
}
