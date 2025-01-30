<script lang="ts">
	import type { Task } from "../types";
	let { tasks, toggleDone, removeTask } : {
		tasks: Task[];
		toggleDone: (task: Task) => void;
		removeTask: (id: string) => void;
	} = $props();


</script>

<section class="task-list">
	{#each tasks as task}
		<article class="task">
			<label class="task-label">
				<input 
					checked={task.done} 
					type="checkbox"
					onchange={() => toggleDone(task)}
					class="task-checkbox"
				>
				<span class:done={task.done}>{task.title}</span>
			</label>
			<button class="delete-button" onclick={() => removeTask(task.id)}>🗑️</button>
		</article>
	{/each}
</section>

<style>
	.done{
		text-decoration: line-through;
	}

	.task {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		padding: 10px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;
	}

	.task-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 400px;
		margin: auto;
		padding: 10px;
	}

	.task-label {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 1rem;
		color: #333;
		cursor: pointer;
		flex: 1
	}


	.task-checkbox {
		appearance: none;
		width: 18px;
		height: 18px;
		border: 2px solid #007bff;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
		flex-shrink: 0;
	}

	.task-checkbox:checked {
		background-color: #007bff;
		border-color: #007bff;
	}


	.task-checkbox:checked::after {
		content: "✔";
		color: white;
		font-size: 14px;
		position: absolute;
	}

	.delete-button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;
		color: #ff4d4d;
		transition: color 0.2s ease;
	}

		span {
			word-break: break-word;
		}
</style>