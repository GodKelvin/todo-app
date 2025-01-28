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

<form onsubmit={formSubmitted}>
	<label>
		TAREFAS A SEREM REALIZADAS
		<input name="newTask" bind:value={newTask}>
	</label>

	<div class="button-container">
		<button>Criar</button>
	</div>
</form>

<style>
	form{
		margin-bottom: 1rem;
	}
	.button-container{
		display: flex;
		justify-content: end;
	}
</style>
