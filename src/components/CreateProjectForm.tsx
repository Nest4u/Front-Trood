import React, { useState } from 'react'
import { projectsApi } from '../services/apiService'

interface ProjectFormProps {
	onClose: () => void
	onUpdate: () => void
}

const CreateProjectForm: React.FC<ProjectFormProps> = ({ onClose, onUpdate }) => {
	const [newProject, setNewProject] = useState({
		name: '',
		field: '',
		experience: '',
		deadline: '',
		description: ''
	})

	const handleCreateProject = async () => {
		try {
		  
		  const createdProject = await projectsApi.createProject(newProject);
	  
		 
		  const storedProjects = localStorage.getItem('projects');
		  const projects = storedProjects ? JSON.parse(storedProjects) : [];
	  
		  
		  const updatedProjects = [...projects, createdProject];
		  localStorage.setItem('projects', JSON.stringify(updatedProjects));
	  
		  
		  alert('Project created successfully');
		  
		 
		  onUpdate();
		  onClose(); 
		} catch (error) {
		 
		  alert('Failed to create project');
		}
	  };

	return (
		<div className='bg-white shadow rounded p-6  '>
			<h2 className='text-lg font-bold mb-4'>Creating Project</h2>
			<div className='grid grid-cols-2 gap-4 mb-4'>
				<input
					type='text'
					placeholder='Name'
					className='border p-2 rounded'
					value={newProject.name}
					onChange={e => setNewProject({ ...newProject, name: e.target.value })}
				/>
				<select
					className='border p-2 rounded'
					value={newProject.field}
					onChange={e => setNewProject({ ...newProject, field: e.target.value })}
				>
					<option value=''>Select Field</option>
					<option value='Design'>Design</option>
					<option value='Development'>Development</option>
					<option value='Marketing'>Marketing</option>
				</select>
				<input
					type='text'
					placeholder='Experience'
					className='border p-2 rounded'
					value={newProject.experience}
					onChange={e => setNewProject({ ...newProject, experience: e.target.value })}
				/>
				<input
					type='date'
					placeholder='Deadline'
					className='border p-2 rounded'
					value={newProject.deadline}
					onChange={e => setNewProject({ ...newProject, deadline: e.target.value })}
				/>
			</div>
			<textarea
				placeholder='Description'
				className='border p-2 rounded w-full mb-4'
				rows={4}
				value={newProject.description}
				onChange={e => setNewProject({ ...newProject, description: e.target.value })}
			></textarea>
			<div className='flex justify-between'>
				<button
					onClick={handleCreateProject}
					className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
				>
					Create Project
				</button>
				<button
					onClick={onClose}
					className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400'
				>
					Cancel
				</button>
			</div>
		</div>
	)
}

export default CreateProjectForm
