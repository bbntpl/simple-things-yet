<template>
	<div class="main">
		<div class="container">
			<slot></slot>
			<el-backtop :right="100" :bottom="100" />
		</div>
	</div>
</template>

<script>
import { ElBacktop } from 'element-plus';
import '@/assets/styles/variables.css';

export default {
	name: 'MainWrapper',
	components: {
		ElBacktop,
	},
};
</script>

<style>
.main {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
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

.el-backtop {
	--el-backtop-text-color: var(--shuttle-gray-color);
}
</style>
