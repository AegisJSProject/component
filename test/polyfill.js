DocumentFragment.prototype.setHTML = function(input, policy) {
	return HTMLElement.prototype.setHTML.call(this, input, policy);
};
