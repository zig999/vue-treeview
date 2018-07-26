<template>
	<div id="app">
		<tree-view></tree-view>
	</div>
</template>

<script>
	require("../node_modules/bootstrap/dist/css/bootstrap.css");
	import TreeView from './components/TreeView.vue';
	export default {
		name: 'app',
		components: {
			TreeView
		}
	}
</script>