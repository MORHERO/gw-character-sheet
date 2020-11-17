const url_params = new URLSearchParams(window.location.search)
const uid = url_params.get('uid');
var xhttp = new XMLHttpRequest();
var character_full = [];
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		character_full = JSON.parse(this.responseText);
		setup_character_data();
		character_loaded();
		//return JSON.parse(this.responseText);
	}
};
xhttp.open("GET", './modules/get_character.php?uid='+ uid, true);
xhttp.send();
/*
class DB {
	constructor() {
		this.xhttp = new XMLHttpRequest();
		this.;
		this.data = [];
	}
	set_data() {
		 this.exec_ajax();
	}

	exec_ajax(target) {
		const that = this;
		this.
	}
}
const db = new DB();*/
//var character_full = db.get_character();

const main_module = document.querySelector('[module=character-sheet]');
const active_item_settings_classname = 'active-item-settings';

const master_slider = tns({
		container: '[module=content-slider]',
		items: 1,
		slideBy: 'page',
		autoplay: false,
		center: true,
		loop: false,
		autoHeight: false,
		gutter: 20,
		speed: 0,
		nav: false,
		controls: false
	});

function setup_character_navigation() {
	const nav_elements = main_module.querySelectorAll('.nav-elem button');

	for (let i = 0; nav_elements.length > i; i++) {
		nav_elements[i].addEventListener('click', function() {
			master_slider.goTo(nav_elements[i].getAttribute('index'));
		})
	}
}
setup_character_navigation();

class ACCORDION {
	constructor (parent) {
		this.parent = parent;
		this.elements = parent.querySelectorAll('.element');
		this.active_element = "";

		this.setup_user_buttons();
	}

	open_element(elem) {
		if(this.active_element == elem.nextElementSibling) {
			this.close_element();
		}else {
			if(this.active_element != "") {this.close_element();}
			elem.nextElementSibling.classList.add('active');
			this.active_element = elem.nextElementSibling;
		}

		return;
	}

	close_element() {
		this.active_element.classList.remove('active');
		this.active_element = "";
		return;
	}


	setup_user_buttons() {
		const that = this;

		let title_elements = this.parent.querySelectorAll('[task=accordion_title]');

		for (let i = 0; i < title_elements.length; ++i) {
			title_elements[i].addEventListener('click', function(e) {
				that.open_element(this);
			});
		}
		return;
	}
}
const accordion_elements = document.querySelectorAll('[submodule=accordion]');
const submodule_accordion_list = [];
for (let i = 0; i < accordion_elements.length; i++) {
	submodule_accordion_list.push(new ACCORDION(accordion_elements[i]));
}

class ITEM_ATTRIBUTE {
	constructor (parent, active_classname) {
		this.parent = parent;
		this.button = this.parent.querySelector('button');
		this.settings = this.parent.querySelectorAll('.setting');
		this.value = parseInt(this.button.innerHTML);
		this.active = false;
		this.active_classname = active_classname;

		const that = this;

		this.button.addEventListener('click', function() {
			that.toggle_active();
		});

		for (let i = 0; i < this.settings.length; i++) {
			this.settings[i].addEventListener('click', function() {
				let task = this.getAttribute('task');
				if(task == 'increase' || task == 'decrease') {
					that.mod_value(task);
				}else if(task == 'close') {
					that.toggle_active();
				}
			})
		}

		this.update_attribute();
	}
	toggle_active() {
		console.log(character_full);
		
		if(this.active) {
			this.parent.classList.remove(this.active_classname);
			this.active = false;
		}else {
			this.parent.classList.add(this.active_classname);
			this.active = true;
		}
	}
	mod_value(task) {
		if(task == 'increase') {
			this.value = this.value + 1;
		}else if(task == 'decrease') {
			this.value = this.value - 1;
		}
		this.update_attribute();
	}
	update_attribute(value=this.value) {
		this.button.innerHTML = value;
	}
}
const attribute_elements = document.querySelectorAll('[submodule=attributes] .attribute');
const attribute_element_list = [];
const attribute_types = [];

for (let i = 0; i < attribute_elements.length; i++) {
	let type = attribute_elements[i].getAttribute('item');
	
	attribute_element_list[type] = new ITEM_ATTRIBUTE(attribute_elements[i], active_item_settings_classname);
	attribute_types.push(type);
}

class ITEM_SKILLS() {

}


function setup_character_data() {
	character_full['attributes'] = JSON.parse(character_full['attributes']);
	character_full['attributes_special'] = JSON.parse(character_full['attributes_special']);
	character_full['base_xp'] = JSON.parse(character_full['base_xp']);
	character_full['money'] = JSON.parse(character_full['money']);
	character_full['skills_fight'] = JSON.parse(character_full['skills_fight']);
	character_full['skills_magic'] = JSON.parse(character_full['skills_magic']);
	character_full['skills_main'] = JSON.parse(character_full['skills_main']);
}
function character_loaded() {
	console.log(character_full);

	for (let i = 0; i < attribute_types.length; i++) {
		attribute_element_list[attribute_types[i]].update_attribute(character_full['attributes'][attribute_types[i]])
	}
}