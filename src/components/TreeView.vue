<template>
	<div>
		<input />
		<ul>
			<TreeItemComponent
					:pTreeItemId="treeData"
					:pTreeViewIndex="itemIndex">
			</TreeItemComponent>
		</ul>
	</div>
</template>

<script>

	import TreeItemComponent from './TreeItem.vue';
	import axios from 'axios';

	const TreeItem = require('./model/TreeItem');

	export default {
		name: 'TreeView',
		components: {
			TreeItemComponent
		},

		data: function() {
			return {
				treeData: null,
				itemIndex: {}
			};
		},
		mounted: function() {
			var _this = this;
			axios.get('./data/tree2.json')
				.then((response) => {
				console.log(response);
					_this.treeData = this.loadTreeItems(response.data);
				});
		},
		methods: {
			/**
			 * Carrega a partir de uma lista de string a estrutura em árvore.
			 * @param data {string[]}
			 * @returns {string} Root Tree item Id.
			 */
			loadTreeItems: function(data) {
				var root = new TreeItem({
					node: 'root'
				});
				console.time('load');
				for (let i = 0; i < data.length; i++) {
					var pathParts = data[i].split('/');
					pathParts.shift();
					var currentLevel = root; //Initilize with root
					pathParts.forEach((path) => {
						var nextPath = currentLevel.findChildrenNode(path, this.itemIndex);
						if (nextPath) {
							currentLevel = nextPath;
						} else {
							var treeItem = new TreeItem({
								node: path
							});
							//Create an index of all the treeItems
							this.itemIndex[treeItem.id] = treeItem;
							//Associate parent model
							treeItem.parent = currentLevel;
							currentLevel.children.push(treeItem.id);
							currentLevel = treeItem;
						}
					});
				}
				console.timeEnd('load');
				return root.children[0];
			},

			filterNode: function(node) {
				var filtered = [];
				for (let item in this.itemIndex) {
					if (this.itemIndex[item].node.indexOf(node) >= 0) {
						this.itemIndex[item].visible = true;
					}
				}
			}
		}
	}
</script>