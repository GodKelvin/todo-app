<script lang="ts">
	let newTask = $state("");
	let {
		addTask
	}: {addTask: (newTask: string) => void;

	} = $props();

	function formSubmitted(event: SubmitEvent){
		event.preventDefault();
		addTask(newTask);
		newTask ="";
	}
</script>

<form onsubmit={formSubmitted} class="todo-form">
	<label class="todo-label">
		TAREFAS A SEREM REALIZADAS
		<input name="newTask" bind:value={newTask} placeholder="Digite sua tarefa..." class="todo-input">
		<button class="todo-button">Criar</button>
	</label>


</form>

<style>
	form{
		margin-bottom: 1rem;
	}

	.todo-form {
		text-align: center;
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		width: 400px;
		max-width: 400px;
		margin: auto;
	}

	.todo-label {
		display: block;
		font-size: 1.1rem;
		font-weight: bold;
		color: #333;
		margin-bottom: 8px;
	}

	.todo-input {
		margin-top: 1rem;
		flex: 1;
		padding: 10px;
		border: 2px solid #ddd;
		border-radius: 6px;
		font-size: 1rem;
		outline: none;
		transition: border 0.3s ease;
	}

	.todo-button {
		background: #007bff;
		color: white;
		border: none;
		padding: 10px 15px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
	}
</style>
