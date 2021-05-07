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
			
			let active_nav_element = main_module.querySelector('.nav-elem button.active');

			if(active_nav_element != this) {
				master_slider.goTo(nav_elements[i].getAttribute('index'));

				if(active_nav_element) {
					active_nav_element.classList.remove('active');
				}
				this.classList.add('active');
			}
			
		})
	}
}
setup_character_navigation();


/***CONTENT SETUP***/

// BASE CONTENT SETUP
function setup_character_data() {
		
	try {
		character_full['base_name_main'] = JSON.parse(character_full['base_name_main']);
	} catch {
		console.log('base_name_main is no json');
	}
	try {
		character_full['base_name_nick'] = JSON.parse(character_full['base_name_nick']);
	} catch {
		console.log('base_name_nick is no json');
	}
	try {
		character_full['base_name_hidden'] = JSON.parse(character_full['base_name_hidden']);
	} catch {
		console.log('base_name_hidden is no json');
	}

	character_full['attributes'] = JSON.parse(character_full['attributes']);
	character_full['base_xp'] = JSON.parse(character_full['base_xp']);
	character_full['money'] = JSON.parse(character_full['money']);
	character_full['skills_fight'] = JSON.parse(character_full['skills_fight']);
	character_full['skills_magic'] = JSON.parse(character_full['skills_magic']);
	character_full['skills_main'] = JSON.parse(character_full['skills_main']);
	try {
		character_full['extra_notes'] = decodeURIComponent(JSON.parse(character_full['extra_notes']));
	} catch {
		console.log('extra_notes is no json');
	}
}
function character_loaded() {
	setup_accordions();
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
		this._xp = xp;
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
		this.skill_overlay = this.main_parent.querySelector('.overlay[task=add_skill]');
		this.skill_cat_overlay = this.main_parent.querySelector('.overlay[task=add_skill_cat]');

		// DEBUG: FOR ALREADY CREATED CHARACTERS
		// TODO: REMOVE IF ALL CHARS HAVE INIT MONEY
		//console.log(this._money);
		try {
			if(typeof(this._money.bank[0]) == "undefined") {
				console.log("init money");
				this._money = {bank:[0,0,0,0,0], mobile:[0,0,0,0,0]};
				this._save('money', this._money);
			}
		}catch{this._money = {bank:[0,0,0,0,0], mobile:[0,0,0,0,0]};
				this._save('money', this._money);}

	}

	//#########
	//### SETUP ONCLICKS FUNCTIONS
	//#########
	_setup_onclicks() {
		const that = this;
		this._setup_onclick_attributes(that);
		this._setup_onclick_skills(that);
		this._setup_onclick_overlays(that);

		// save notes
		let notes_elem = this.main_parent.querySelector('[item=base_notes]');
		notes_elem.addEventListener('blur', function(e) {
			that._notes = this.value;
			that._save("extra_notes", that._notes, true);
		});
	}

	_setup_onclick_attributes(that) {

		let attribute_values = this.attribute['parent'].querySelectorAll('[task=attribute-main]');

		for (let i = 0; i < attribute_values.length; i++) {
			attribute_values[i].addEventListener('blur', function(e) {
				that.update_attribute(parseInt(e.target.value), e.target);
			});
		}

		return;
	}

	_setup_onclick_skills(that) {

		for (let cat = 0; cat < this.skill.length; cat++) {
			let skills_value = this.skill[cat].parent.querySelectorAll('[item=skill] input');

			for (let i = 0; i < skills_value.length; i++) {
				skills_value[i].addEventListener('blur', function(e) {
					that.update_skill(parseInt(e.target.value), e.target);
				});
			}
		}

		return;
	}

	_setup_onclick_overlays(that) {
		
		let overlays = that.main_parent.querySelectorAll('.overlay');
		for (let i = 0; i < overlays.length; i++) {
			overlays[i].addEventListener('click', function(e) {

				if(e.target.classList.contains('active')) {
					e.target.classList.remove('active');
				}
			});
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
				
				if( attr[i].type == target.getAttribute('item') ) {

					if(typeof(task) == 'number') {

						let xp_cost = 0;
						let new_value = task;

						if(this.main_parent.querySelector('[item=xp_auto_cost]').checked) {
							xp_cost = RULE.get_xp_cost('attribute', attr[i].value, new_value);
						}

						if(xp_cost <= (this._xp.total - this._xp.used) ){
							attr[i].value = new_value;
							this.update_xp(xp_cost);
							this.update_attribute_dice(target);
						}else {
							target.value = attr[i].value;
						}
					}
				}

			}
		}
		this.update_calc_attributes();
		this._save('attribute');
	}
	update_attribute_dice(target) {

		let dice_dom = _C.attribute.parent.querySelector('.attribute[item='+ target.getAttribute('item') + '] .dice-preview[dice=true] p');

		if(dice_dom) {
			dice_dom.innerHTML = RULE.get_attribute_dice(target.value);
		}
		return;
	}
	update_calc_attributes() {
		// Size class
		// TODO ADD LAST THREE
		this.attribute.parent.querySelector('[task=attribute-main][item=size]').value = RULE.get_calculated_attribute('size');
		this.attribute.parent.querySelector('[task=attribute-main][item=speed]').value = RULE.get_calculated_attribute('speed');
		this.attribute.parent.querySelector('[task=attribute-main][item=initative]').value = RULE.get_calculated_attribute('initative');
		//this.attribute.parent.querySelector('[task=attribute-main][item=health]').value = RULE.get_calculated_attribute('health');
		//this.attribute.parent.querySelector('[task=attribute-main][item=mana]').value = RULE.get_calculated_attribute('mana');
		//this.attribute.parent.querySelector('[task=attribute-main][item=defense]').value = RULE.get_calculated_attribute('defense');
		this.attribute.parent.querySelector('[task=attribute-main][item=mental_willpower]').value = RULE.get_calculated_attribute('mental_willpower');
		this.attribute.parent.querySelector('[task=attribute-main][item=body_willpower]').value = RULE.get_calculated_attribute('body_willpower');
		return;
	}

	update_skill(task, target) {
		// TODO BUGFIX: ALL THE SAME NAMED SKILLS WILL BE SET THE SAME VALUE
		// TODO: FEATURE SAVE DIFFERENT VALUES ( MAGIC -> descr, damage, etc.)

		var tp = target;
		if(typeof(task) == 'string') {

			tp = target.parentElement.parentElement.children[0];
		}

		var category = tp.getAttribute('category');

		for (let t = 0; t < this._skills.length; t++) {
			for (let cat = 0; cat < this._skills[t].length; cat++) {
				let skill = this._skills[t][cat].data;
		
				
				for (let i = 0; i < this._skills[t][cat].data.length; i++) {
					if( skill[i].title == tp.getAttribute('title') || skill[i].title == tp.getAttribute('icon')) {
						if(typeof(task) == 'string') {

							if(task == 'increase') {
								let xp_cost = 0;
								let new_value = skill[i].value + 1;

								if(this.main_parent.querySelector('[item=xp_auto_cost]').checked) {
									xp_cost = RULE.get_xp_cost('skill', skill[i].value, new_value);
								}

								if(xp_cost <= (this._xp.total - this._xp.used) ){
									this._skills[t][cat].data[i].value = new_value;
									this.update_xp(xp_cost);
								}else {
									tp.value = this._skills[t][cat].data[i].value;
								}
								
							}else if(task == 'decrease') {
								let xp_cost = 0;
								let new_value = skill[i].value - 1;

								if(this.main_parent.querySelector('[item=xp_auto_cost]').checked) {
									xp_cost = RULE.get_xp_cost('skill', skill[i].value, new_value);
								}

								if(xp_cost <= (this._xp.total - this._xp.used)){
									this._skills[t][cat].data[i].value = new_value;
									this.update_xp(xp_cost);
								}else {
									tp.value = this._skills[t][cat].data[i].value;
								}
								
							}

						}else if(typeof(task) == 'number') {
							let xp_cost = 0;
								let new_value = task;

								if(this.main_parent.querySelector('[item=xp_auto_cost]').checked) {
									xp_cost = RULE.get_xp_cost('skill', skill[i].value, new_value);
								}

							if(xp_cost <= (this._xp.total - this._xp.used)){
								this._skills[t][cat].data[i].value = new_value;
								this.update_xp(xp_cost);
							}else {
								tp.value = this._skills[t][cat].data[i].value;
							}
							
						}
						tp.value = this._skills[t][cat].data[i].value;
					}

				}
			}
		}
		this._save('skill');
		_DOM.setup_skill_cat_point();
		return;
	}

	update_money(type) {
		let money_main_inputs = this.main_parent.querySelectorAll('[overlay=update_money] [item=money_main] [item=money_amount] input');
		let money_bank_inputs = this.main_parent.querySelectorAll('[overlay=update_money] [item=money_bank] [item=money_amount] input');

		let money_main_displays = this.main_parent.querySelectorAll('#money_content [item=money_main] [item=money_amount] span');
		let money_bank_displays = this.main_parent.querySelectorAll('#money_content [item=money_bank] [item=money_amount] span');

		if(type=="add") {
			for (let i = 0; i < money_main_inputs.length; i++) {
				if(money_main_inputs[i].value) {
					this._money.mobile[i] += parseInt(money_main_inputs[i].value);
				}
				if(money_bank_inputs[i].value) {
					this._money.bank[i] += parseInt(money_bank_inputs[i].value);
				}
			}
		}else if(type=="remove") {
			for (let i = 0; i < money_main_inputs.length; i++) {
				if(money_main_inputs[i].value) {
					this._money.mobile[i] -= parseInt(money_main_inputs[i].value);
				}
				if(money_bank_inputs[i].value) {
					this._money.bank[i] -= parseInt(money_bank_inputs[i].value);
				}
			}
		}else if(type=="switch") {

			for (let i = 0; i < money_main_inputs.length; i++) {
				if(money_main_inputs[i].value) {
					this._money.mobile[i] -= parseInt(money_main_inputs[i].value);
					this._money.bank[i] += parseInt(money_main_inputs[i].value);
				}
				if(money_bank_inputs[i].value) {
					this._money.bank[i] -= parseInt(money_bank_inputs[i].value);
					this._money.mobile[i] += parseInt(money_bank_inputs[i].value);
				}
			}

		}

		_DOM.setup_money();
		this._save('money', this._money);
		return;
	}

	update_main_info() {
		let overlay = _C.main_parent.querySelector('[overlay=update_header]');

		let dom_name_main =		overlay.querySelector('[item=name_main]');
		let dom_name_nick =		overlay.querySelector('[item=name_nick]');
		let dom_name_hidden =	overlay.querySelector('[item=name_hidden]');
		let dom_race =			overlay.querySelector('[item=race]');
		let dom_gender =		overlay.querySelector('[item=gender]');
		let dom_age =			overlay.querySelector('[item=age]');
		let dom_height =		overlay.querySelector('[item=height]');
		let dom_weight =		overlay.querySelector('[item=weight]');
		let dom_figure =		overlay.querySelector('[item=figure]');
		let dom_rank =			overlay.querySelector('[item=rank]');
		let dom_reputation =	overlay.querySelector('[item=reputation]');
		let dom_karma =			overlay.querySelector('[item=karma]');
		let dom_xp_add =		overlay.querySelector('[item=add_xp]');
		let dom_xp_remove =		overlay.querySelector('[item=remove_xp]');

		let save_datas = [];

		// NAME MAIN
		if(dom_name_main.value != this._name.main.value) {
			this._name.main.value = dom_name_main.value;
			save_datas.push(this._create_savedata('base_name_main', this._name.main.value));
		}
		// NAME NICK
		if(dom_name_nick.value != this._name.nick.value) {
			this._name.nick.value = dom_name_nick.value;
			save_datas.push(this._create_savedata('base_name_nick', this._name.nick.value));
		}
		// NAME HIDDEN
		if(dom_name_hidden.value != this._name.hidden.value) {
			this._name.hidden.value = dom_name_hidden.value;
			save_datas.push(this._create_savedata('base_name_hidden', this._name.hidden.value));
		}
		// RACE
		// TODO
		if(dom_race.value != this._race.id) {
			//this._race.id = dom_race.value;
			//save_datas.push(this._create_savedata('base_race_id', parseInt(this._race.id)));
		}
		// GENDER
		// TODO
		if(dom_gender.value != this._gender.value) {
			//this._gender.value = dom_gender.value;
			//save_datas.push(this._create_savedata('base_gender', this._gender.value));
		}
		// AGE
		if(dom_age.value != this._age.value) {
			this._age.value = dom_age.value;
			save_datas.push(this._create_savedata('base_age', parseInt(this._age.value)));
		}
		// HEIGHT
		if(dom_height.value != this._height.value) {
			this._height.value = dom_height.value;
			save_datas.push(this._create_savedata('base_height', parseInt(this._height.value)));
		}
		// WEIGT
		if(dom_weight.value != this._weight.value) {
			this._weight.value = dom_weight.value;
			save_datas.push(this._create_savedata('base_weight', parseInt(this._weight.value)));
		}
		// FIGURE
		if(dom_figure.value != this._figure.id) {
			//this._figure.id = dom_figure.value;
			//save_datas.push(this._create_savedata('base_figure_id', parseInt(this._figure.id)));
		}
		// RANK
		if(dom_rank.value != this._rank.value) {
			this._rank.value = dom_rank.value;
			save_datas.push(this._create_savedata('base_rank', parseInt(this._rank.value)));
		}
		// REPUTATION
		if(dom_reputation.value != this._reputation.value) {
			this._reputation.value = dom_reputation.value;
			save_datas.push(this._create_savedata('base_reputation', parseInt(this._reputation.value)));
		}
		// KARMA
		if(dom_karma.value != this._karma.value) {
			this._karma.value = dom_karma.value;
			save_datas.push(this._create_savedata('base_karma', parseInt(this._karma.value)));
		}
		// XP ADD
		if(dom_xp_add.value) {
			this._xp.total += parseInt(dom_xp_add.value);
			save_datas.push(this._create_savedata('base_xp', this._xp));
			this.update_xp();
		}
		// XP REMOVE
		if(dom_xp_remove.value) {
			this._xp.total -= parseInt(dom_xp_remove.value);
			save_datas.push(this._create_savedata('base_xp', this._xp));
			this.update_xp();
		}

		if(save_datas[0]) {
			this._save(save_datas);
		}
	}

	update_xp(xp="") {
		if(xp){
			this._xp.used += xp;
		}
		this._save('base_xp', this._xp);
		_DOM.setup_xp();
		return;
	}

	//#########
	//### ADD FUNCTIONS
	//#########

	_add_skill_cat(typeid, title) {
		let cat_obj = {'category':title, 'data':[]};
		let type_id = '';
		if(typeid == 'skills_content') {
			type_id = 0;
		}else if(typeid == 'skills_fight_content') {
			type_id = 1;
		}else if(typeid == 'skills_magic_content') {
			type_id = 2;
		}

		this._skills[type_id].push(cat_obj);

		let content_dom = this.skill[type_id].parent;

		let new_skill_cat_dom = _DOM.create_skill_cat(type_id, cat_obj);

		content_dom.insertBefore(new_skill_cat_dom, content_dom.lastChild);

		_DOM._toggle_addSkillCat_overlay();

		this._save('skill');

		return;
	}
	_add_skill(catid, title, value) {
		let type_id = parseInt(catid.substr(0, catid.indexOf('-')));
		let cat_id = parseInt(catid.substr(catid.indexOf('-') + 1));

		let skill_obj = {'title':title.value,'value':parseInt(value.value)};

		this._skills[type_id][cat_id].data.push(skill_obj);
		
		let cat_dom = this.main_parent.querySelector('[catid="' + catid + '"]');
		let content_dom = cat_dom.querySelector('[task=accordion_content]');

		let new_skill_dom = _DOM.create_skill(skill_obj);

		content_dom.insertBefore(new_skill_dom, content_dom.lastChild);

		_DOM._toggle_addSkill_overlay();

		this._save('skill');

		return;
	}

	//#########
	//### REMOVE FUNCTIONS
	//#########
	remove_skill_cat(trigger) { // user triggert remove
		_DOM._toggle_removeSkillCat_overlay(trigger);

		return;
	}
	_remove_skill_cat(trigger) {
		let catid = "";
		if(trigger.hasAttribute('trigger')) {
			catid = trigger.getAttribute('trigger');
		}else {
			catid = trigger.parentElement.parentElement.parentElement.getAttribute('catid');
		}

		let type_id = catid.match(/^[0-9]+/)[0];
		let cat_id = catid.match(/[0-9]+$/)[0];

		let i = -1;
		this._skills[type_id] = this._skills[type_id].filter(x => {
			i++;
			return i != cat_id;
		});
		let skill_cat_dom = this.main_parent.querySelector('[catid="' + catid + '"]');
		skill_cat_dom.remove();

		_DOM._toggle_removeSkillCat_overlay();

		this._save('skill');

		return;
	}
	remove_skill(trigger) {
		_DOM._toggle_removeSkill_overlay(trigger);

		return;
	}
	_remove_skill(trigger) {
		let catid = "";
		let skill_title = "";
		if(trigger.hasAttribute('catid')) {
			catid = trigger.getAttribute('catid');
			skill_title = trigger.getAttribute('skill-title');
		}else {
			catid = trigger.parentElement.parentElement.parentElement.getAttribute('catid');
			skill_title = trigger.parentElement.parentElement.parentElement.getAttribute('skill-title');
		}
		let type_id = catid.match(/^[0-9]+/)[0];
		let cat_id = catid.match(/[0-9]+$/)[0];

		let i = -1;
		this._skills[type_id][cat_id].data = this._skills[type_id][cat_id].data.filter(x => {
			return x.title != skill_title;
		});

		let skill_dom = this.main_parent.querySelector('[item=skill][skill-title='+skill_title+']');
		skill_dom.remove();

		_DOM._toggle_removeSkill_overlay();

		this._save('skill');

		return;
	}

	//#########
	//### SAVE FUNCTIONS
	//#########
	_save(cat='', content='', encoded=false) {
		
		var data = '';
		if(cat == 'attribute') {
			data = this._get_attribute_savedata();
		}else if(cat == 'skill') {
			data = this._get_skill_savedata();
		}else if(Array.isArray(cat)) {
			data = this._split_savedata(cat);
		}else{
			data = this._create_savedata(cat, content, encoded);
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


	_split_savedata(content) {
		let data = "";

		for (let i = 0; i < content.length; i++) {
			data += content[i];

			if(content[i+1]) {
				data += ',';
			}
		}

		return data;
	}
	_get_full_character_data() {
		//TODO
		return;
	}



	_create_savedata (table, content, encoded=false){
		let data = ""
		if(encoded) {
			data = ""+ table + " = '"+ encodeURIComponent(JSON.stringify(encodeURIComponent(content))) +"'";
		}else {
			data = ""+ table + " = '"+  JSON.stringify(content) +"'";
		}
		
		return data;
	}
}


const _DOM = new DOM_MASTER();

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

	_DOM.init_setup();
}

