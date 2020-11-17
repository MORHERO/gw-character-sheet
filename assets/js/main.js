// AJAX RETRIEVING FULL CHARACTER DATA
var character_full = [];
const url_params = new URLSearchParams(window.location.search);
const uid = url_params.get('uid');
var xhttp = new XMLHttpRequest();
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

function update_db() {

}

// GLOBAL VARIABLES
const main_module = document.querySelector('[module=character-sheet]');
const active_item_settings_classname = 'active-item-settings';

// ATTRIBUTE VARIABLES
const attribute_elements = main_module.querySelectorAll('[submodule=attributes] .attribute');
var attribute_element_list = [];
var attribute_types = [];

// SKILLS VARIABLES
const skills_parent = document.getElementById('skills_content');
const skills_fight_parent = document.getElementById('skills_fight_content');
const skills_magic_parent = document.getElementById('skills_magic_content');
var skills_list = [];
var skills_fight_list = [];
var skills_magic_list = [];

var accordion_elements = {};
var submodule_accordion_list = [];

/***BASE SETUP***/
//SLIDER MODULE
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
// ACCORDION MODULE
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

/***CONTENT SETUP***/
// HEADER MODULE
function setup_header_content() {
	let name_main_element = main_module.querySelector('[item=base_name_main]');
	let name_nick_element = main_module.querySelector('[item=base_name_nick]');
	let gender_element = main_module.querySelector('[item=base_gender]');
	let race_element = main_module.querySelector('[item=base_race]');

	name_main_element.innerHTML = character_full['base_name_main'];
	name_nick_element.innerHTML = character_full['base_name_nick'];
	gender_element.innerHTML = character_full['base_gender'];
	race_element.innerHTML = character_full['base_race_id'];
}

// ATTRIBUTE MODULE
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
		if(typeof(task) == 'string') {
			if(task == 'increase') {
				this.value = this.value + 1;
			}else if(task == 'decrease') {
				this.value = this.value - 1;
			}
		}else if(typeof(task) == 'number') {
			this.value = task;
		}
		this.update_attribute();
	}
	update_attribute(value=this.value) {
		this.button.innerHTML = value;
	}
}
for (let i = 0; i < attribute_elements.length; i++) {
	let type = attribute_elements[i].getAttribute('item');
	
	attribute_element_list[type] = new ITEM_ATTRIBUTE(attribute_elements[i], active_item_settings_classname);
	attribute_types.push(type);
}

// SKILL MODULE
class ITEM_SKILLS{
	constructor(parent, data) {
		this.parent = parent;
		this.category = data.category;
		this.skills = data.data;

		this.dom_base = {};

		this.create_content_dom();
	}

	create_content_dom() {
		let dom_element_list = [];

		let dom_parent = document.createElement('div');
			dom_parent.classList.add('element');
		
		// accordion title
		let dom_title_wrap = document.createElement('div');
			dom_title_wrap.setAttribute('task', 'accordion_title');
		
		let dom_title = document.createElement('p');
		
		let dom_title_content = document.createTextNode(this.category);

		// accordion content
		let dom_content_wrap = document.createElement('div');
			dom_content_wrap.setAttribute('task', 'accordion_content');

		for (let i = 0; i < this.skills.length; i++) {
			// accordion content
			let dom_content_inner = document.createElement('div');
				dom_content_inner.classList.add('flex');
				dom_content_inner.setAttribute('item', 'skill');

			let dom_content_title_sep = document.createElement('div');

			let dom_skill_title = document.createElement('span');
				dom_skill_title.setAttribute('item', 'skill-title');

			let dom_skill_title_content = document.createTextNode(this.skills[i].title);

			let dom_content_value_sep = document.createElement('div');

			let dom_skill_value = document.createElement('button');
				dom_skill_value.classList.add('btn-clean');
				dom_skill_value.setAttribute('item', 'skill-value');

			let dom_skill_value_content = document.createTextNode(this.skills[i].value);

			// accordion content
			dom_skill_value.appendChild(dom_skill_value_content);
			dom_content_value_sep.appendChild(dom_skill_value);

			dom_skill_title.appendChild(dom_skill_title_content);
			dom_content_title_sep.appendChild(dom_skill_title);

			dom_content_inner.appendChild(dom_content_title_sep);
			dom_content_inner.appendChild(dom_content_value_sep);

			dom_content_wrap.appendChild(dom_content_inner);

			// accordion title
			dom_title.appendChild(dom_title_content);
			dom_title_wrap.appendChild(dom_title);

			// dom full
			dom_parent.appendChild(dom_title_wrap);
			dom_parent.appendChild(dom_content_wrap);

			dom_element_list.push(dom_parent)
		}

		for (let i = 0; i < dom_element_list.length; i++) {
			this.parent.appendChild(dom_element_list[i]);
		}
	}
}

// BASE CONTENT SETUP
function setup_character_data() {
	character_full['attributes'] = JSON.parse(character_full['attributes']);
	character_full['base_xp'] = JSON.parse(character_full['base_xp']);
	character_full['money'] = JSON.parse(character_full['money']);
	character_full['skills_fight'] = JSON.parse(character_full['skills_fight']);
	character_full['skills_magic'] = JSON.parse(character_full['skills_magic']);
	character_full['skills_main'] = JSON.parse(character_full['skills_main']);
}
function character_loaded() {
	// UPDATE HEADER VALUES
	setup_header_content();
	// UPDATE ATTRIBUTE VALUES
	for (let i = 0; i < attribute_types.length; i++) {
		attribute_element_list[attribute_types[i]].mod_value(character_full['attributes'][attribute_types[i]])
	}
	// SETUP SKILLS
	for (let i = 0; i < character_full['skills_main'].length; i++) {
		skills_list[character_full['skills_main'][i].category] = new ITEM_SKILLS(skills_parent, character_full['skills_main'][i]);
	}
	// SETUP FIGHT SKILLS
	for (let i = 0; i < character_full['skills_fight'].length; i++) {
		skills_fight_list[character_full['skills_fight'][i].category] = new ITEM_SKILLS(skills_fight_parent, character_full['skills_fight'][i]);
	}
	// SETUP MAGIC SKILLS
	for (let i = 0; i < character_full['skills_magic'].length; i++) {
		skills_magic_list[character_full['skills_magic'][i].category] = new ITEM_SKILLS(skills_magic_parent, character_full['skills_magic'][i]);
	}

	setup_accordions();
}
function setup_accordions() {
	accordion_elements = document.querySelectorAll('[submodule=accordion]');
	submodule_accordion_list = [];

	for (let i = 0; i < accordion_elements.length; i++) {
		submodule_accordion_list.push(new ACCORDION(accordion_elements[i]));
	}
}

class CHARACTER {
	constructor() {
		
	}
}