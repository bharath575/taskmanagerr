import React from 'react';


function TaskList({ tasks, onUpdate, onDelete }) {

    const toggleComplete = (task) => {
        onUpdate(task._id, { ...task, completed: !task.completed });

    };

    if (tasks.length === 0) {
        return <p className="no-tasks">No tasks yet. Add one above!</p>;
    }

    return (
        <div className="tasks">

            {tasks.map(task => (
                <div key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
                    <div className="task-content">
                        <h3>{task.title}</h3>
                        {task.description && <p>{task.description}</p>}
                        <small>
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                        </small>
                    </div>
                    <div className="task-actions">
                        <button
                            onClick={() => toggleComplete(task)}
                            className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
                        >
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button
                            onClick={() => onDelete(task._id)}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}    

        </div>
    )

}

export default TaskList;