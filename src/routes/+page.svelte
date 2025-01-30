<script lang="ts">
	import TasksForm from "../components/tasks-form.svelte";
	import TasksList from "../components/tasks-list.svelte";
	import type { Task, Filter } from "../types";

	let message: string = "Tarefas";
	let currentFilter = $state<Filter>("all");
	let tasks = $state<Task[]>([]);

	let totalDone = $derived(
		tasks.reduce(
			(total, task) => total + Number(task.done), 0
		)
	)

	let filteredTasks = $derived.by(() => {
		switch(currentFilter){
			case "all":{
				return tasks;
			}

			case "done": {
				return tasks.filter((task) => task.done)
			}

			case "todo": {
				return tasks.filter((task) => !task.done)
			}
		}
		return tasks;
	});

	function addTask(newTask: string){
		tasks.push({
			id: crypto.randomUUID(),
			title: newTask,
			done: false
		});
	}

	function toggleDone(task: Task){
		task.done = !task.done;
	}

	function removeTask(id: string){
		const index = tasks.findIndex((task) => {
			task.id === id
		});
		tasks.splice(index, 1)
	}

	
</script>

{#snippet filterButton(filter: Filter, title: string)}
	<button onclick={() => currentFilter = filter} class="filter-button" class:active-filter={currentFilter === filter}>
		{title}
	</button>
{/snippet}

<main>
	<!--Criar data-->
	<h1>{message}</h1>
	<TasksForm {addTask}/>
	<p class="task-status">
		{#if tasks.length} 
			{totalDone} / {tasks.length} tarefas completadas
		{:else}
		<span class="no-tasks">Crie uma tarefa para começar!</span>
		{/if}
	</p>

	{#if tasks.length}
		<div class="button-container">
			 {@render filterButton("all", "Todas")}
			 {@render filterButton("todo", "Pendentes")}
			 {@render filterButton("done", "Concluídas")}
		</div>
	{/if}
	<TasksList tasks={filteredTasks} {toggleDone} {removeTask}/>
</main>

<style>
	main{
		margin: 1rem auto;
		max-width: 800px;
	}

	.button-container{
		justify-self: center;
		display: flex;
		justify-content: end;
		margin-bottom: 1rem;
		gap: 0.5rem;
	}

	.filter-button {
		padding: 0.5rem 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		font-size: 1rem;
	}

	.filter-button:hover {
		background-color: #0056b3;
	}

	/* Estilo para o botão ativo */
	.active-filter {
		background-color: #0056b3;
	}

	.task-status {
		text-align: center;
		color: #666;
		font-size: 1rem;
		margin: 1rem 0;
	}

	.no-tasks {
		color: #888;
		font-style: italic;
	}
</style>