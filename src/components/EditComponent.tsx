import React, { useState, useEffect } from 'react'
import { projectsApi } from '../services/apiService'

interface EditProjectFormProps {
	projectId: number
	onClose: () => void
	onUpdate: () => void
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ projectId, onClose, onUpdate }) => {
	const [projectData, setProjectData] = useState({
		name: '',
		field: '',
		experience: '',
		deadline: '',
		description: ''
	})

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const data = await projectsApi.getProjectById(projectId)
				setProjectData(data)
			} catch (error) {
				alert('Failed to load project data')
			}
		}
		fetchProject()
	}, [projectId])

	const handleSaveChanges = async () => {
		try {
		 
		  await projectsApi.updateProject(projectId, projectData);
	  
		
		  const storedProjects = localStorage.getItem('projects');
		  const projects = storedProjects ? JSON.parse(storedProjects) : [];
	  

		  const updatedProjects = projects.map((project: any) =>
			project.id === projectId ? { ...projectData, id: projectId } : project
		  );
		  localStorage.setItem('projects', JSON.stringify(updatedProjects));
	  
		 
		  alert('Project updated successfully');
		  
		 
		  onUpdate();
		  onClose(); 
		} catch (error) {
		  console.error('Error during project creation:', error);
		  alert('Failed to update project');
		}
	  };
	  const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this project?')) {
		  try {
			
			await projectsApi.deleteProject(projectId);
	  
			
			const storedProjects = localStorage.getItem('projects');
			const projects = storedProjects ? JSON.parse(storedProjects) : [];
	  
			
			const updatedProjects = projects.filter((project: any) => project.id !== projectId);
			localStorage.setItem('projects', JSON.stringify(updatedProjects));
	  
			
			alert('Project deleted successfully');
			
			
			onUpdate();
		  } catch (error) {
			 console.error('Error during project creation:', error);
			alert('Failed to delete project');
		  }
		}
	  };

	return (
		<div className='bg-white shadow rounded  p-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-bold mb-4'>Editing Project</h2>
				<button
					onClick={handleDelete}
					className='bg-gray-300  px-4 py-2 rounded hover:bg-gray-400 mb-4'
				>
					Delete Project
				</button>
			</div>

			<div className='grid grid-cols-2 gap-4 mb-4'>
				<input
					type='text'
					placeholder='Name'
					className='border p-2 rounded'
					value={projectData.name}
					onChange={e => setProjectData({ ...projectData, name: e.target.value })}
				/>
				<select
					className='border p-2 rounded'
					value={projectData.field}
					onChange={e => setProjectData({ ...projectData, field: e.target.value })}
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
					value={projectData.experience}
					onChange={e => setProjectData({ ...projectData, experience: e.target.value })}
				/>
				<input
					type='date'
					placeholder='Deadline'
					className='border p-2 rounded'
					value={projectData.deadline}
					onChange={e => setProjectData({ ...projectData, deadline: e.target.value })}
				/>
			</div>
			<textarea
				placeholder='Description'
				className='border p-2 rounded w-full mb-4'
				rows={4}
				value={projectData.description}
				onChange={e => setProjectData({ ...projectData, description: e.target.value })}
			></textarea>
			<div className='flex justify-between'>
				<button
					onClick={handleSaveChanges}
					className='bg-gray-300  px-4 py-2 rounded hover:bg-gray-400'
				>
					Save Changes
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

export default EditProjectForm
