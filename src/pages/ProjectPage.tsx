import Header from '../components/Header'
import SideBar from '../components/SideBar'
import ProjectsList from '../hooks/ProjectsList'
import CreateProjectForm from '../components/CreateProjectForm'
import { useState } from 'react'
import EditProjectForm from '../components/EditComponent'

function ProjectPage() {
	const [showForm, setShowForm] = useState(false)
	const [editProjectId, setEditProjectId] = useState<number | null>(null)
	const handleUpdate = () => {
		setEditProjectId(null)
		window.location.reload() // Refresh the project list after update
	}
	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<div className='flex flex-1'>
				<SideBar />
				<div className='p-4 flex-1 bg-slate-200 rounded-l-3xl overflow-auto'>
					<div className='flex items-start mx-7 my-7 space-x-4'>
						<div className='flex-1'>
							{!showForm && !editProjectId && <ProjectsList onEdit={id => setEditProjectId(id)}/>}
						</div>
						{!showForm && !editProjectId && (
							<button
								onClick={() => setShowForm(true)}
								className='bg-gray-300 px-4 py-2 rounded-xl self-start'
							>
								Create Project
							</button>
						)}
					</div>

					{showForm && <CreateProjectForm onClose={() => setShowForm(false)}   onUpdate={handleUpdate} />}
					{editProjectId && (
						<EditProjectForm
							projectId={editProjectId}
							onClose={() => setEditProjectId(null)}
							onUpdate={handleUpdate}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectPage
