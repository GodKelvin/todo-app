<script lang="ts">
	import TasksForm from "../components/tasks-form.svelte";
	import TasksList from "../components/tasks-list.svelte";
	import type { Task, Filter } from "../types";
	
	let currentFilter = $state<Filter>("all");
	let tasks = $state<Task[]>([]);
	const aliasTaskLocal = "tasks-todo-app";

	let totalDone = $derived(
		tasks.reduce(
			(total, task) => total + Number(task.done), 0
		)
	)

	function loadTasks() {
		if (typeof window !== "undefined") { 
			const savedTasks = localStorage.getItem(aliasTaskLocal);
			if (savedTasks) {
				tasks = JSON.parse(savedTasks);
			}
		}
	}

	function saveTasks() {
		localStorage.setItem(aliasTaskLocal, JSON.stringify(tasks));
	}

	loadTasks();

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
			done: false,
			createdAt: new Date().toISOString(),
			finishedAt: ""
		});
		saveTasks();
	}

	function toggleDone(task: Task){
		task.done = !task.done;
		if(task.done){
			task.finishedAt = new Date().toISOString();
		} else {
			task.finishedAt = "";
		}
		saveTasks();
	}

	function removeTask(id: string){
		const index = tasks.findIndex((task) => task.id === id);
		if (window.confirm(`Tem certeza que deseja excluir a tarefa?`)) {
			tasks.splice(index, 1);
			saveTasks();
    }
	}


	function updateTask(id: string, newTitle: string) {
		const task = tasks.find(task => task.id === id);
		if (task) {
			task.title = newTitle;
			saveTasks();
		}
	}

	
</script>

{#snippet filterButton(filter: Filter, title: string)}
	<button onclick={() => currentFilter = filter} class="filter-button" class:active-filter={currentFilter === filter}>
		{title}
	</button>
{/snippet}

<main>
	<!--Criar data-->
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
	<TasksList tasks={filteredTasks} {toggleDone} {removeTask} {updateTask} />
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