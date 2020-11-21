// AJAX RETRIEVING FULL CHARACTER DATA
var character_full = [];
const url_params = new URLSearchParams(window.location.search);
const uid = url_params.get('uid');
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log(this.responseText);
		character_full = JSON.parse(this.responseText);
		setup_character_data();
		character_loaded();

		setup_character();
		//return JSON.parse(this.responseText);
	}
};
xhttp.open("GET", './modules/get_character.php?uid='+ uid, true);
xhttp.setRequestHeader('Content-Type', 'application/json');
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
	constructor(uid, name_main, name_nick, name_hidden, race_id, gender, age, height, weight, figure_id, origin, linage, language_ids, education, rank, reputation, karma, xp, level, attributes, skills_main, skills_fight, skills_magic, inventory, inventory_extension, money, history, notes, informations, media, active_item_settings_classname, main_parent) {
		this._uid = uid;
		this._name = {
			'main':name_main,
			'nick':name_nick,
			'hidden':name_hidden};
		this._race = {
			'id':race_id,
			'value':''};
		this._gender = gender;
		this._age = age;
		this._height = height;
		this._weight = weight;
		this._figure = {
			'id':figure_id,
			'value':''};
		this._origin = origin;
		this._linage = linage;
		this._languages = {
			'id':language_ids,
			'value':[]};
		this._education = [];
		this._rank = rank;
		this._reputation = reputation;
		this._karma = karma;
		this._xp = {
			'total':xp.total,
			'used':xp.used};
		this._level = level;
		this._attributes = attributes;
		this._skills = {
			'main':skills_main,
			'fight':skills_fight,
			'magic':skills_magic};
		this._inventory = inventory;
		this._inventory_extension = inventory_extension;
		this._money = money;
		this._history = history;
		this._notes = notes;
		this._informations = informations;
		this._media = media;

		this.active_classname = active_item_settings_classname;

		this.main_parent = main_parent;
		this.attribute = {
			'parent':document.getElementById('attributes_content')
		};
		this.skills = {
			'main':[],
			'fight':[],
			'magic':[]};

		this._setup_attributes_dom()

		const that = this;

		this.attribute.parent.addEventListener('click', function(e) {
			if(e.target.hasAttribute('task', 'attribute-main')) {
				that.toggle_active(e.target);
			}
			if(e.target.hasAttribute('task', 'decrease')) {
				that.update_attribute(e.target.getAttribute('task'), e.target);
			}
			if(e.target.hasAttribute('task', 'increase')) {
				that.update_attribute(e.target.getAttribute('task'), e.target);
			}
			if(e.target.hasAttribute('task', 'close')) {
				that.toggle_active(e.target);
			}
		});
/*
	'parent': attribute_parent,
			'button': this.attribute.parent.querySelector('button'),


		button = this.parent;
		this.settings = this.parent.querySelectorAll('.setting');
		this.value = parseInt(this.button.innerHTML);
		this.active = false;
		this.active_classname = active_classname;
*/

		console.log('char_setup done');
	}

	_setup_attributes_dom() {
		for (let _i = 0; _i < this._attributes.length; _i++) {
			let attribute_list = this._attributes[_i];

			let dom_parent = document.createElement('div');
				dom_parent.classList.add('attributes-wrapper');

			let dom_inner = document.createElement('div');
				dom_inner.classList.add('flex');
				
			for (let i = 0; i < attribute_list.data.length; i++) {
					
				// dom attribute setting decrease
				let dom_attribute_setting_decrease = document.createElement('button');
					dom_attribute_setting_decrease.setAttribute('task', 'decrease');
					dom_attribute_setting_decrease.classList.add('setting');
					dom_attribute_setting_decrease.classList.add('pos-11');
					dom_attribute_setting_decrease.classList.add('btn-clean');
					dom_attribute_setting_decrease.innerHTML = "-";
				// dom attribute setting increase
				let dom_attribute_setting_increase = document.createElement('button');
					dom_attribute_setting_increase.setAttribute('task', 'increase');
					dom_attribute_setting_increase.classList.add('setting');
					dom_attribute_setting_increase.classList.add('pos-1');
					dom_attribute_setting_increase.classList.add('btn-clean');
					dom_attribute_setting_increase.innerHTML = "+";
				// dom attribute setting close
				let dom_attribute_setting_close = document.createElement('button');
					dom_attribute_setting_close.setAttribute('task', 'close');
					dom_attribute_setting_close.classList.add('setting');
					dom_attribute_setting_close.classList.add('pos-6');
					dom_attribute_setting_close.classList.add('btn-clean');
					dom_attribute_setting_close.innerHTML = "x";


				// dom attribute parent
				let dom_attribute = document.createElement('div');
					dom_attribute.classList.add('attribute');
					dom_attribute.setAttribute('item', attribute_list.data[i].type);
				// dom attribute title
				let dom_attribute_title = document.createElement('div');
					dom_attribute_title.classList.add('title');
				let dom_attribute_title_tag = document.createElement('p');
				let dom_attribute_title_content = document.createTextNode(attribute_list.data[i].short);
				// dom attribute value
				let dom_attribute_value = document.createElement('div');
					dom_attribute_value.classList.add('value');
				let dom_attribute_value_button = document.createElement('button');
					dom_attribute_value_button.classList.add('btn-clean');
					dom_attribute_value_button.setAttribute('task', 'attribute-main');
				let dom_attribute_value_button_content = document.createTextNode(attribute_list.data[i].value);

				//dom attribute title full
				dom_attribute_title_tag.appendChild(dom_attribute_title_content);
				dom_attribute_title.appendChild(dom_attribute_title_tag);

				//dom attribute value full
				dom_attribute_value_button.appendChild(dom_attribute_value_button_content);
				dom_attribute_value.appendChild(dom_attribute_value_button);

				//dom attribute full
				dom_attribute.appendChild(dom_attribute_title);
				dom_attribute.appendChild(dom_attribute_value);
				dom_attribute.appendChild(dom_attribute_setting_decrease);
				dom_attribute.appendChild(dom_attribute_setting_increase);
				dom_attribute.appendChild(dom_attribute_setting_close);
				
				dom_inner.appendChild(dom_attribute);
				
			}
			dom_parent.appendChild(dom_inner);
			this.attribute.parent.appendChild(dom_parent);
		}
		return;
	}

	toggle_active(target) {
		let tp = target.parentElement.parentElement;

		console.log(tp);
		if(tp.classList.contains(this.active_classname)) {
			tp.classList.remove(this.active_classname);
		}else {
			tp.classList.add(this.active_classname);

		console.log(tp);
		}
		return;
	}
	update_attribute(task, target) {
		if(typeof(task) == 'string') {
			if(task == 'increase') {
				this.value = this.value + 1;
			}else if(task == 'decrease') {
				this.value = this.value - 1;
			}
		}else if(typeof(task) == 'number') {
			this.value = task;
		}

		this.button.innerHTML = value;
	}
}/*
class ATTRIBUTE extends CHARACTER {
	constructor (parent, active_classname) {
		
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
		this.update();
	}
	update(value=this.value) {
		this.button.innerHTML = value;
	}
}*/
var _C = {};
function setup_character() {
	let _c = character_full;

	_C = new CHARACTER(
		_c.uid,
		_c.base_name_main,
		_c.base_name_nick,
		_c.base_name_hidden,
		_c.base_race,
		_c.base_gender,
		_c.base_age,
		_c.base_height,
		_c.base_weight,
		_c.base_figure_id,
		_c.base_origin,
		_c.base_linage,
		_c.base_language_ids,
		_c.base_education,
		_c.base_rank,
		_c.base_reputation,
		_c.base_karma,
		_c.base_xp,
		_c.base_level,
		_c.attributes,
		_c.skills_main,
		_c.skills_fight,
		_c.skills_magic,
		_c.inventory,
		_c.inventory_extension,
		_c.money,
		_c.extra_history,
		_c.extra_notes,
		_c.extra_informations,
		_c.media,
		active_item_settings_classname,
		main_module
	);
	/*for (let i = 0; i < attribute_elements.length; i++) {
		let type = attribute_elements[i].getAttribute('item');
		
		//attribute_element_list[type] = new ITEM_ATTRIBUTE(attribute_elements[i], active_item_settings_classname);
		attribute_element_list[type] = new ATTRIBUTE(attribute_elements[i], active_item_settings_classname);
		attribute_types.push(type);
	}*/
}
