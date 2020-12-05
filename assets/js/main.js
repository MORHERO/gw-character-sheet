// AJAX RETRIEVING FULL CHARACTER DATA
var character_full = [];
const url_params = new URLSearchParams(window.location.search);
const uid = url_params.get('uid');
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		//console.log(this.responseText);
		character_full = JSON.parse(this.responseText);
		setup_character_data();

		setup_character();

		character_loaded();
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
				'main': {
					'value': name_main,
					'element': main_parent.querySelector('[item=base_name_main]')
				},
				'nick': {
					'value': name_nick,
					'element': main_parent.querySelector('[item=base_name_nick]')
				},
				'hidden': {
					'value': name_hidden,
					'element': main_parent.querySelector('[item=base_name_hidden]')
			}
		};
		this._race = {
			'id':race_id,
			'value':'',
			'element': main_parent.querySelector('[item=base_race]')
		};
		this._gender = {
			'value':gender,
			'element': main_parent.querySelector('[item=base_gender]')
		};
		this._age = {
			'value':age,
			'element': main_parent.querySelector('[item=base_age]')
		};
		this._height = {
			'value':height,
			'element': main_parent.querySelector('[item=base_height]')
		};
		this._weight = {
			'value':weight,
			'element': main_parent.querySelector('[item=base_weight]')
		};
		this._figure = {
			'id':figure_id,
			'value':'',
			'element':main_parent.querySelector('[item=base_figure]')
		};
		this._origin = {
			'value':origin,
			'element': main_parent.querySelector('[item=base_origin]')
		};
		this._linage = {
			'value':linage,
			'element': main_parent.querySelector('[item=base_linage]')
		};
		this._languages = {
			'id':language_ids,
			'value':[],
			'element':main_parent.querySelector('[item=base_languages]')
		};
		this._education = {
			'value':[],
			'element': main_parent.querySelector('[item=base_education]')
		};
		this._rank = {
			'value':rank,
			'element': main_parent.querySelector('[item=base_rank]')
		};
		this._reputation = {
			'value':reputation,
			'element': main_parent.querySelector('[item=base_reputation]')
		};
		this._karma = {
			'value':karma,
			'element': main_parent.querySelector('[item=base_karma]')
		};
		this._xp = {
			'total':{
				'value':xp.total,
				'element': main_parent.querySelector('[item=base_xp_total]')
			},
			'used':{
				'value':xp.used,
				'element': main_parent.querySelector('[item=base_xp_used]')
			}
		};
		this._level = {
			'value':level,
			'element': main_parent.querySelector('[item=base_level]')
		};
		this._attributes = attributes;
		this._skills = [
			skills_main,
			skills_fight,
			skills_magic
		];
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
		this.skill = [
			{
				'category':'main',
				'parent':document.getElementById('skills_content')
			},
			{
				'category':'fight',
				'parent':document.getElementById('skills_fight_content')
			},
			{
				'category':'magic',
				'parent':document.getElementById('skills_magic_content')
			}
		];

		// Setup doms
		this._setup_header_dom();
		this._setup_attributes_dom();
		this._setup_skills_dom();

		const that = this;

		// Setup onlicks
		this.attribute.parent.addEventListener('click', function(e) {
			if(e.target.getAttribute('task') == 'attribute-main' || e.target.getAttribute('task') == 'close') {console.log(1);
				that.toggle_active(e.target);
			}else if(e.target.getAttribute('task') == 'decrease' || e.target.getAttribute('task') == 'increase') {console.log(2);
				that.update_attribute(e.target.getAttribute('task'), e.target);
			}
		});

		for (let cat = 0; cat < this.skill.length; cat++) {
			let skills_settings = this.skill[cat].parent.querySelectorAll('[item=skill] button');
			let skills_value = this.skill[cat].parent.querySelectorAll('[item=skill] input');
			
			for (let i = 0; i < skills_settings.length; i++) {
				skills_settings[i].addEventListener('click', function(e) {
					that.update_skill(e.target.getAttribute('task'), e.target);
				});
			}

			for (let i = 0; i < skills_value.length; i++) {
				skills_value[i].addEventListener('blur', function(e) {
					that.update_skill(parseInt(e.target.value), e.target, );
				});
				skills_value[i].addEventListener('keypress', function(e) {
					if(/[^0-9]/.exec(e.key)){
						e.preventDefault();
					}
				});
			}
		}
		console.log('char_setup done');
	}

	//#########
	//### SETUP DOM FUNCTIONS
	//#########
	_setup_header_dom() {
		this._name.main.element.innerHTML = this._name.main.value;
		this._name.nick.element.innerHTML = this._name.nick.value;
		this._gender.element.innerHTML = this._gender.value;
		this._race.element.innerHTML = this._race.value;
		
		return;
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

		for (let cat = 0; cat < this._attributes.length; cat++) {
			let attr = this._attributes[cat].data;
			
			for (let i = 0; i < attr.length; i++) {
				this.attribute[attr[i].type] = {};

				let attr_elem = this.attribute.parent.querySelector('[item='+ attr[i].type +']');
				
				this.attribute[attr[i].type].element = attr_elem.querySelector('[task=attribute-main]');
				
			}
		}
		return;
	}
	_setup_skills_dom() {
		
		for (let x = 0; x < this._skills.length; x++) {
			for (let t = 0; t < this._skills[x].length; t++) {
				let dom_element_list = [];

				let dom_parent = document.createElement('div');
					dom_parent.classList.add('element');
				
				// accordion title
				let dom_title_wrap = document.createElement('div');
					dom_title_wrap.setAttribute('task', 'accordion_title');
				
				let dom_title = document.createElement('p');

				let dom_title_content = document.createTextNode(this._skills[x][t].category);
				let dom_title_content_inner = document.createElement('span');
				let dom_title_content_inner_sum = document.createTextNode(' (0)');
				
				// accordion content
				let dom_content_wrap = document.createElement('div');
					dom_content_wrap.setAttribute('task', 'accordion_content');

				for (let i = 0; i < this._skills[x][t].data.length; i++) {
					let skill = this._skills[x][t].data[i];

					// dom skill setting decrease
					let dom_skill_setting_decrease = document.createElement('button');
						dom_skill_setting_decrease.setAttribute('task', 'decrease');
						dom_skill_setting_decrease.classList.add('setting');
						//dom_skill_setting_decrease.classList.add('pos-11');
						dom_skill_setting_decrease.classList.add('btn-clean');
						dom_skill_setting_decrease.innerHTML = "-";
					// dom skill setting increase
					let dom_skill_setting_increase = document.createElement('button');
						dom_skill_setting_increase.setAttribute('task', 'increase');
						dom_skill_setting_increase.classList.add('setting');
						//dom_skill_setting_increase.classList.add('pos-1');
						dom_skill_setting_increase.classList.add('btn-clean');
						dom_skill_setting_increase.innerHTML = "+";

					// accordion content
					let dom_content_inner = document.createElement('div');
						dom_content_inner.classList.add('flex');
						dom_content_inner.setAttribute('item', 'skill');

					let dom_content_title_sep = document.createElement('div');

					let dom_skill_title = document.createElement('span');
						dom_skill_title.setAttribute('item', 'skill-title');

					let dom_skill_title_content = document.createTextNode(skill.title);

					let dom_content_value_sep = document.createElement('div');

					let dom_skill_value = document.createElement('input');
						dom_skill_value.classList.add('btn-clean');
						dom_skill_value.setAttribute('item', 'skill-value');
						dom_skill_value.setAttribute('title', skill.title);
						dom_skill_value.setAttribute('category', this.skill[x].category);
						dom_skill_value.setAttribute('type', 'number');
						dom_skill_value.value = skill.value;

					//let dom_skill_value_content = document.createTextNode(skill.value);

					// accordion content
					//dom_skill_value.appendChild(dom_skill_value_content);
					dom_content_value_sep.appendChild(dom_skill_value);
					dom_content_value_sep.appendChild(dom_skill_setting_decrease);
					dom_content_value_sep.appendChild(dom_skill_setting_increase);

					dom_skill_title.appendChild(dom_skill_title_content);
					dom_content_title_sep.appendChild(dom_skill_title);

					dom_content_inner.appendChild(dom_content_title_sep);
					dom_content_inner.appendChild(dom_content_value_sep);

					dom_content_wrap.appendChild(dom_content_inner);

					// accordion title

					dom_title_content_inner.appendChild(dom_title_content_inner_sum);
					dom_title.appendChild(dom_title_content);
					dom_title.appendChild(dom_title_content_inner);
					dom_title_wrap.appendChild(dom_title);

					// dom full
					dom_parent.appendChild(dom_title_wrap);
					dom_parent.appendChild(dom_content_wrap);

					dom_element_list.push(dom_parent)
				}
				for (let i = 0; i < dom_element_list.length; i++) {
					this.skill[x].parent.appendChild(dom_element_list[i]);
				}
			}
		}
		this._setup_skill_cat_point();
	}
	_setup_inventory_dom() {
		// TODO
	}

	_setup_skill_cat_point() {
		console.log('in');
		var skill_titles = document.querySelectorAll('[submodule=skills] [task=accordion_title] span');
		var skill_content = '';

		for (let i = 0; i < skill_titles.length; i++) {
			skill_content = skill_titles[i].parentElement.parentElement.parentElement.querySelectorAll('[item=skill] input');
			
			let sum = 0;
			let amount = 0;
			for (let s = 0; s < skill_content.length; s++) {
				sum = sum + parseInt(skill_content[s].value);
				amount = amount + 1;
			}
			console.log(skill_titles);
			skill_titles[i].innerHTML = " (" + (sum / amount) + ")";
		}
		return;
	}

	//#########
	//### UPDATE FUNCTIONS
	//#########
	toggle_active(target) {
		let tp = (target.getAttribute('task') == 'close')? target.parentElement : target.parentElement.parentElement;
	
		if(tp.classList.contains(this.active_classname)) {
			tp.classList.remove(this.active_classname);
			this._save(tp.className);
		}else {
			tp.classList.add(this.active_classname);
		}

		return;
	}
	update_attribute(task, target) {

		for (let cat = 0; cat < this._attributes.length; cat++) {
			let attr = this._attributes[cat].data;
			
			for (let i = 0; i < this._attributes[cat].data.length; i++) {
				
				if( attr[i].type == target.parentElement.getAttribute('item') ) {
					
					if(typeof(task) == 'string') {
						if(task == 'increase') {
							this._attributes[cat].data[i].value = attr[i].value + 1;
						}else if(task == 'decrease') {
							this._attributes[cat].data[i].value = attr[i].value - 1;
						}
					}else if(typeof(task) == 'number') {
						attr[i].value = task;
					}
					
					this.attribute[attr[i].type].element.innerHTML = attr[i].value;
				}

			}
		}

		//this._save(this._attributes);
	}
	update_skill(task, target) {
		// TODO BUGFIX: ALL THE SAME NAMED SKILLS WILL BE SET THE SAME VALUE

		var tp = target;
		if(typeof(task) == 'string') {
			tp = target.parentElement.children[0];
		}

		var category = tp.getAttribute('category');
		console.log(category);

		for (let t = 0; t < this._skills.length; t++) {
			for (let cat = 0; cat < this._skills[t].length; cat++) {
				let skill = this._skills[t][cat].data;
				
				for (let i = 0; i < this._skills[t][cat].data.length; i++) {
					if( skill[i].title == tp.getAttribute('title') ) {
						if(typeof(task) == 'string') {

							if(task == 'increase') {
								this._skills[t][cat].data[i].value = skill[i].value + 1;
							}else if(task == 'decrease') {
								this._skills[t][cat].data[i].value = skill[i].value - 1;
							}

						}else if(typeof(task) == 'number') {
							this._skills[t][cat].data[i].value = task;
						}
						console.log(typeof(task));
						tp.value = this._skills[t][cat].data[i].value;
					}

				}
			}
		}
		this._save('skill')
		return;
	}

	//#########
	//### SAVE FUNCTIONS
	//#########
	_save(cat = '') {

		var data = '';
		if(cat == 'attribute') {
			data = this._get_attribute_savedata();
		}else if(cat == 'skill') {
			data = this._get_skill_savedata();
		}else{

		}

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//console.log(this.responseText);
			}
		};
		xhttp.open("GET", './modules/get_character.php?uid='+ this._uid +'&task=save_character_by_uid&data='+ data, true);
		xhttp.setRequestHeader('Content-Type', 'application/json');

		xhttp.send();

		return;
	}
	_get_attribute_savedata() {
		let content = JSON.stringify(this._attributes);
		let data = "attributes = '"+ content +"'";

		return data;
	}
	_get_skill_savedata() {
		let content_main = JSON.stringify(this._skills[0]);
		let content_fight = JSON.stringify(this._skills[1]);
		let content_magic = JSON.stringify(this._skills[2]);
		
		let data = "skills_main = '"+ content_main +"',skills_fight = '"+ content_fight +"',skills_magic = '"+ content_magic +"'";

		return data;
	}
	_get_full_character_data() {
		//TODO
		return;
	}
}

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


//#########
//### DEV VOID
//#########

/*
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

// HEADER MODULE
/*function setup_header_content() {
	let name_main_element = main_module.querySelector('[item=base_name_main]');
	let name_nick_element = main_module.querySelector('[item=base_name_nick]');
	let gender_element = main_module.querySelector('[item=base_gender]');
	let race_element = main_module.querySelector('[item=base_race]');

	name_main_element.innerHTML = character_full['base_name_main'];
	name_nick_element.innerHTML = character_full['base_name_nick'];
	gender_element.innerHTML = character_full['base_gender'];
	race_element.innerHTML = character_full['base_race_id'];
}*/

// ATTRIBUTE MODULE
/*
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
*/
