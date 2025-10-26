import { useQuery } from "@tanstack/react-query";
import { PromptItem } from "@/types/prompt";

// Sample data for static deployment
const samplePrompts: PromptItem[] = [
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
    category: "Foundation Layer",
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
    category: "Foundation Layer",
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
    category: "Feature Layer",
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
    category: "Components",
    component: "Form Component",
    sdlcStage: "Development",
    tags: ["react", "form", "validation", "zod"],
    context: "Frontend Development"
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
    queryFn: () => Promise.resolve(samplePrompts),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePrompt(id: string) {
  return useQuery<PromptItem | undefined>({
    queryKey: ["prompts", id],
    queryFn: () => {
      const prompt = getPromptById(samplePrompts, id);
      return Promise.resolve(prompt);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePromptsByCategory(category: string) {
  return useQuery<PromptItem[]>({
    queryKey: ["prompts", "category", category],
    queryFn: () => Promise.resolve(getPromptsByCategory(samplePrompts, category)),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchPrompts(query: string) {
  return useQuery<PromptItem[]>({
    queryKey: ["prompts", "search", query],
    queryFn: () => Promise.resolve(searchPrompts(samplePrompts, query)),
    enabled: !!query && query.length > 2,
    staleTime: 5 * 60 * 1000,
  });
}
