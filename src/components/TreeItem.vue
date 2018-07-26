<template>
	<li v-if="treeItem" :class="{'bold':!isFolder}">
		<div>{{treeItem.node}}
			<span v-if="isFolder">[+]</span>
		</div>
		<ul>
			<tree-item
					v-for="(treeItem) in children"
					:key="treeItem.id"
					:pTreeItemId="treeItem.id"
					:pTreeViewIndex="pTreeViewIndex">
			</tree-item>
		</ul>
	</li>
</template>

<script>
	import Vue from 'vue';
	const TreeItem = require('./model/TreeItem');
	export default {
		name: 'TreeItem',

		props: {
			pTreeItemId: String,
			pTreeViewIndex: Object
		},

		watch: {
			pTreeItemId: {
				immediate: true,
				handler: function() {
					this.treeItem = this.pTreeViewIndex[this.pTreeItemId];
				}
			}
		},

		data: function() {
			return {
				treeItem: null
			}
		},

		computed: {
			isFolder: function() {
				//return this.treeItem.children.length > 0;
				return this.treeItem.hasChildren();
			},
			children: function() {
				let items = [];
				this.treeItem.children.map((item)=>{
					items.push(this.pTreeViewIndex[item]);
				});
				return items;
			}
		},

		methods: {


			walkNodes: function() {
				const dfs = (start) => {
					const listToExplore = [start];

					start.visited = true;

					while (listToExplore.length) {
						const item = listToExplore.pop();

						item.children.forEach(child => {
							if (!child.visited) {
								listToExplore.push(child);
							}
							child.visited = true;
							console.log(child.node);
						});
					}
				};
				dfs(this.treeItem);
			}
		}
	}
</script>

<style scoped>
	.item {
		cursor: pointer;
	}

	.bold {
		font-weight: bold;
	}

	ul {
		padding-left: 1em;
		line-height: 1.5em;
		list-style-type: dot;
	}
</style>
