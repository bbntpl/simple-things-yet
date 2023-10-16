<template>
	<div class="main">
		<div class="container">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MainWrapper',
};
</script>

<style>
.main {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	align-self: stretch;
	width: 100%;
}

.container {
	display: flex;
	padding: 4px 0px;
	flex-direction: column;
	align-items: center;
	flex: 1 0 0;
	width: 100%;
}
</style>
