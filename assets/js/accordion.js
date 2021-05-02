var accordion_elements = {};
var submodule_accordion_list = [];

// ACCORDION MODULE
class ACCORDION {
	constructor (parent) {
		this.parent = parent;
		this.elements = parent.querySelectorAll('.element');
		this.active_element = "";

		this.accordions_inner = this.parent.querySelectorAll('[submodule=accordion_inner]');

		this._setup_user_buttons();
		if (this.accordions_inner) {
			this._setup_inner_accordions();
		}
	}

	open_element(elem, inner=false) {
		
		if(elem.nextElementSibling.classList.contains('active')) {
			this.close_element(elem.nextElementSibling);
		}else if (!inner) {
			if(this.active_element != "") {this.close_element(elem.nextElementSibling, true);}

			elem.nextElementSibling.classList.add('active');
			this.active_element = elem.nextElementSibling;
		} else {
			elem.nextElementSibling.classList.add('active');
		}
		
		return;
	}

	close_element(elem, parent_acc = false) {
		elem.classList.remove('active');

		if(parent_acc) {
			let active_elements = this.parent.querySelectorAll('[task=accordion_content].active');

			for (let i = 0; i < active_elements.length; i++) {
				active_elements[i].classList.remove('active');
			}
		}

		return;
	}

	_setup_user_buttons() {
		const that = this;

		let title_elements = this.parent.querySelectorAll('[task=accordion_title]:not(.sub-title)');
		for (let i = 0; i < title_elements.length; i++) {
		
			title_elements[i].addEventListener('click', function(e) {
				if(title_elements[i] == e.target) {
					that.open_element(this);
				}
			});
		}
		return;
	}

	_setup_inner_accordions() {
		const that = this;
		for (let i = 0; i < this.accordions_inner.length; i++) {
			let title_elements = this.accordions_inner[i].querySelectorAll('[task=accordion_title].sub-title');

			for (let i = 0; i < title_elements.length; i++) {
				title_elements[i].addEventListener('click', function(e) {
					that.open_element(this, true);
				});
			}

		}
	}
}

function setup_accordions() {
	accordion_elements = document.querySelectorAll('[submodule=accordion]');
	submodule_accordion_list = [];

	for (let i = 0; i < accordion_elements.length; i++) {
		submodule_accordion_list.push(new ACCORDION(accordion_elements[i]));
	}
}