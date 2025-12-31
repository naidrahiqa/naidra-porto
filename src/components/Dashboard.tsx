import React, { useState, useEffect } from 'react';
import type { Project, ProjectCategory, ProjectStatus, PortfolioSettings } from '../types';
import { 
  fetchProjects, 
  createProject, 
  updateProjectDB, 
  deleteProjectDB, 
  fetchSettings, 
  saveSettingsDB 
} from '../services/db';
import { getSettings as getLocalSettings } from '../utils/storage'; 
import './Dashboard.css';

const Dashboard: React.FC = () => {
  // Init with local settings to avoid flicker, then fetch DB
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<PortfolioSettings>(getLocalSettings());
  const [activeTab, setActiveTab] = useState<'projects' | 'settings' | 'data'>('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projData, settData] = await Promise.all([
        fetchProjects(),
        fetchSettings()
      ]);
      setProjects(projData);
      setSettings(settData);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = () => {
    setIsAddingProject(true);
    setEditingProject(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsAddingProject(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setIsLoading(true);
      await deleteProjectDB(id);
      await loadData();
      setIsLoading(false);
    }
  };

  const handleSaveProject = async (projectData: Partial<Project>) => {
    setIsLoading(true);
    try {
      if (editingProject) {
        await updateProjectDB(editingProject.id, projectData);
      } else {
        await createProject(projectData as any);
      }
      await loadData();
      setEditingProject(null);
      setIsAddingProject(false);
      alert("Project saved to Cloud Database!");
    } catch (e: any) {
      alert(`Error saving project: ${e.message || JSON.stringify(e)}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setIsAddingProject(false);
  };

  const handleUpdateSettings = async (newSettings: PortfolioSettings) => {
    setIsLoading(true);
    try {
      await saveSettingsDB(newSettings);
      setSettings(newSettings);
      alert('Settings saved to Cloud Database!');
    } catch (e) {
      console.error(e);
      alert(`Failed to save settings: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => { alert("Export disabled in Cloud Mode"); };
  const handleReset = () => { alert("Reset disabled in Cloud Mode"); };

  return (
    <div className="dashboard">
      {isLoading && <div style={{
        position: 'fixed', top:0, left:0, right:0, bottom:0, 
        background:'rgba(0,0,0,0.7)', color:'white', 
        display:'flex', alignItems:'center', justifyContent:'center', 
        zIndex:9999
      }}>Loading Cloud Data...</div>}

      <div className="dashboard-container">
        <div className="dashboard-header jp-border">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Manage your portfolio (Cloud Mode)</p>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="tab-en">Projects</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="tab-en">Settings</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            <span className="tab-en">Data</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="dashboard-content">
          {activeTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              isAddingProject={isAddingProject}
              editingProject={editingProject}
              onAddProject={handleAddProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onSaveProject={handleSaveProject}
              onCancelEdit={handleCancelEdit}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab settings={settings} onUpdateSettings={handleUpdateSettings} />
          )}

          {activeTab === 'data' && (
            <DataTab onExport={handleExport} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// Projects Tab Component
// ============================================
interface ProjectsTabProps {
  projects: Project[];
  isAddingProject: boolean;
  editingProject: Project | null;
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onSaveProject: (project: Partial<Project>) => void;
  onCancelEdit: () => void;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  isAddingProject,
  editingProject,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onSaveProject,
  onCancelEdit,
}) => {
  return (
    <div className="projects-tab">
      <div className="tab-header">
        <h2>Your Projects ({projects.length})</h2>
        {!isAddingProject && !editingProject && (
          <button className="btn btn-primary" onClick={onAddProject}>
            + Add New Project
          </button>
        )}
      </div>

      {(isAddingProject || editingProject) && (
        <ProjectForm
          project={editingProject}
          onSave={onSaveProject}
          onCancel={onCancelEdit}
        />
      )}

      <div className="projects-list">
        {projects.map(project => (
          <ProjectListItem
            key={project.id}
            project={project}
            onEdit={() => onEditProject(project)}
            onDelete={() => onDeleteProject(project.id)}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Project Form Component
// ============================================
interface ProjectFormProps {
  project: Project | null;
  onSave: (project: Partial<Project>) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Project>>(
    project || {
      title: '',
      description: '',
      longDescription: '',
      category: 'Web Development' as ProjectCategory,
      tags: [],
      image: '',
      liveDemoUrl: '',
      githubUrl: '',
      featured: false,
      status: 'In Progress' as ProjectStatus,
      completedDate: '',
    }
  );

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: '',
        description: '',
        longDescription: '',
        category: 'Web Development' as ProjectCategory,
        tags: [],
        image: '',
        liveDemoUrl: '',
        githubUrl: '',
        featured: false,
        status: 'In Progress' as ProjectStatus,
        completedDate: '',
      });
    }
  }, [project]);

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag) || [],
    });
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Project Title *</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g. Portfolio Website"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
            required
          >
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Short Description *</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={3}
          placeholder="Brief overview of the project"
        />
      </div>

      <div className="form-group">
        <label htmlFor="longDescription">Long Description</label>
        <textarea
          id="longDescription"
          value={formData.longDescription}
          onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
          rows={5}
          placeholder="Detailed explanation, technologies used, challenges faced..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL *</label>
        <input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Preview" onError={(e) => (e.currentTarget.style.display = 'none')} />
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="liveDemoUrl">Live Demo URL</label>
          <input
            id="liveDemoUrl"
            type="url"
            value={formData.liveDemoUrl}
            onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            id="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <div className="tag-input-wrapper">
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            placeholder="Add a tag and press Enter"
          />
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>
        <div className="tags-display">
          {formData.tags?.map(tag => (
            <span key={tag} className="tag-item">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)}>&times;</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
            required
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="completedDate">Completed Date</label>
          <input
            id="completedDate"
            type="date"
            value={formData.completedDate}
            onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          Featured Project
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {project ? 'Update Project' : 'Add Project'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

// ============================================
// Project List Item Component
// ============================================
interface ProjectListItemProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project, onEdit, onDelete }) => {
  return (
    <div className="project-list-item glass-card">
      <div className="project-item-image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-item-content">
        <div className="project-item-header">
          <h3>{project.title}</h3>
          {project.featured && <span style={{fontSize: '1rem'}}>⭐</span>}
        </div>
        <div className="project-item-category">{project.category}</div>
        <p className="project-item-description">{project.description}</p>
        <div className="project-item-tags">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag-item" style={{fontSize: '0.7rem', padding: '2px 8px'}}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && <span className="tag-item" style={{fontSize: '0.7rem', padding: '2px 8px'}}>+{project.tags.length - 3}</span>}
        </div>
      </div>
      <div className="project-item-actions">
        <button onClick={onEdit} className="btn btn-secondary btn-sm">Edit</button>
        <button onClick={onDelete} className="btn btn-primary btn-sm" style={{background: '#ef4444', borderColor: '#ef4444'}}>Delete</button>
      </div>
    </div>
  );
};

// ============================================
// Settings Tab Component
// ============================================
interface SettingsTabProps {
  settings: PortfolioSettings;
  onUpdateSettings: (settings: PortfolioSettings) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onUpdateSettings }) => {
  const [formData, setFormData] = useState<PortfolioSettings>(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="card">
        <h2>Personal Information</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Professional Title *</label>
            <input
              id="title"
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio *</label>
          <textarea
            id="bio"
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
      </div>

      <div className="card mt-lg">
        <h2>Social Links</h2>

        <div className="form-group">
          <label htmlFor="github">GitHub URL</label>
          <input
            id="github"
            type="url"
            value={formData.github || ''}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn URL</label>
          <input
            id="linkedin"
            type="url"
            value={formData.linkedin || ''}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="twitter">Twitter URL</label>
          <input
            id="twitter"
            type="url"
            value={formData.twitter || ''}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            placeholder="https://twitter.com/username"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>
      </div>
    </form>
  );
};

// ============================================
// Data Tab Component
// ============================================
interface DataTabProps {
  onExport: () => void;
  onReset: () => void;
}

const DataTab: React.FC<DataTabProps> = ({ onExport, onReset }) => {
  return (
    <div className="data-tab">
      <h2>Data Management</h2>
      <p className="data-description">
        Manage your portfolio data. In Cloud Mode, direct export/import is disabled. 
        Please allow the database to handle synchronization.
      </p>

      <div className="data-actions">
        <div className="data-action-card">
          <h3>Backup Data</h3>
          <p>Download a JSON backup of your current portfolio data.</p>
          <button className="btn btn-secondary" onClick={onExport} disabled>
            Export to JSON (Disabled)
          </button>
        </div>

        <div className="data-action-card">
          <h3>Restore Data</h3>
          <p>Restore your portfolio data from a JSON backup file.</p>
          <label className="btn btn-secondary" style={{display: 'inline-block', opacity: 0.5, cursor: 'not-allowed'}}>
            Import from JSON (Disabled)
          </label>
        </div>

        <div className="data-action-card warning">
          <h3>Reset All</h3>
          <p>Reset all data to default sample content.</p>
          <button className="btn btn-primary" style={{background: '#ef4444', borderColor: '#ef4444'}} onClick={onReset} disabled>
            Reset to Defaults (Disabled)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
