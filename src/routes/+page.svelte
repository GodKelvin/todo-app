<script lang="ts">
	import TasksForm from "../components/tasks-form.svelte";
	import TasksList from "../components/tasks-list.svelte";
	import type { Task } from "../types";

	let message: string = "Tarefas";
	let tasks = $state<Task[]>([]);

	let totalDone = $derived(
		tasks.reduce(
			(total, task) => total + Number(task.done), 0
		)
	)

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

	function removeTask(index: number){
		tasks.splice(index, 1)
	}
</script>

<main>
	<!--Criar data-->
	<h1>{message}</h1>
	<TasksForm {addTask}/>
	<p>
		{#if tasks.length} 
			{totalDone} / {tasks.length} tarefas completadas
		{:else}
			Crie uma tarefa para começar!
		{/if}
	</p>

	{#if tasks.length}
		<div class="button-container">
			<button>Todas</button>
			<button>Pendentes</button>
			<button>Concluídas</button>
		</div>
	{/if}
	<TasksList {tasks} {toggleDone} {removeTask}/>
</main>

<style>
	main{
		margin: 1rem auto;
		max-width: 800px;
	}

	.button-container{
		display: flex;
		justify-content: end;
		margin-bottom: 1rem;
	}
</style>