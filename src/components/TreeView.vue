<template>
	<div>
		<input v-model="filterText" @input="debounceFilter">
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

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			console.log('debounced');
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	var component = {
		name: 'TreeView',
		components: {
			TreeItemComponent
		},

		data: function() {
			return {
				treeData: null,
				itemIndex: {},
				filterText: ''
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
				this.itemIndex[root.id] = root;
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
				return root.id;
			},

			filterNode: function(node) {
				if (typeof node != 'string') {
					node = this.filterText;
				}
				for (let item in this.itemIndex) {
					let treeItem = this.itemIndex[item];
					treeItem.visible = (treeItem.node.indexOf(node) >= 0);
					if (treeItem.visible) {
						treeItem.updateParents('visible', true);
					}
				}
			}
		}
	};
	component.methods.debounceFilter = debounce(component.methods.filterNode, 300);
	export default component;
</script>