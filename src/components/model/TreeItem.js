var count = 0;
var TreeItem = function(config) {
	this.id = `ti-${count++}`;
	//this.name = config.node || '';
	this.node = config.node || '';
	this.children = config.children || [];
	this.parent = config.parent || null;
};

TreeItem.prototype.findChildrenNode = function(node, index) {
	var item = null;
	var children = this.children.map(item => index[item]);
	console.log(children);
	for (let i = 0; i < children.length; i++) {
		if (children[i].node === node) {
			item = children[i];
			break;
		}
	}
	return item;
};

TreeItem.prototype.hasChildren = function() {
	return this.children.length > 0;
};

module.exports = TreeItem;