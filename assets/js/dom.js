class DOM_MASTER {
	constructor() {


	}

	init_setup() {
		this.setup_header();
		this.setup_attributes();
		this.setup_skills();

		this.setup_note_field();
		_C._setup_onclicks();
	}


	setup_header() {
		//console.log(_C);console.log(_C._name);
		_C._name.main.element.innerHTML = _C._name.main.value;
		_C._name.nick.element.innerHTML = _C._name.nick.value;
		_C._gender.element.innerHTML = _C._gender.value;
		_C._race.element.innerHTML = _C._race.value;
		
		return;
	}

	setup_attributes() {

		for (let _i = 0; _i < _C._attributes.length; _i++) {
			for (let i = 0; i < _C._attributes[_i].data.length; i++) {
				let attr = _C._attributes[_i].data[i];
				let elem = _C.attribute.parent.querySelector('input[item='+ attr.type + ']');
				
				elem.value = attr.value;

				if(_i == 0) {
					let dice_dom = _C.attribute.parent.querySelector('.attribute[item='+ attr.type + '] .dice-preview p');
					dice_dom.innerHTML = RULE.get_attribute_dice(attr.value);
				}
			}
		}

		return;
	}

	setup_skills() {
		
		for (let x = 0; x < _C._skills.length; x++) {
			for (let t = 0; t < _C._skills[x].length; t++) {
				let dom_element_list = [];
				
				// <div class="element" catid="x-t">
				let dom_parent = this._createSimpleElement('div', 'element', [['catID', '' + x + '-' + t ]]);
				
				//dom_parent = this._create_skill_cat_dom(x, _C._skills[x][t]);

				// accordion title
				// <div class="main-title flex" task="accordion_title">
				let dom_title_wrap = this._createSimpleElement('div', ['main-title', 'flex'], [['task', 'accordion_title']]);
				// <p>
				let dom_title = this._createSimpleElement('p');
				
				// accordion title settings
				// <div class="flex">
				let dom_title_settings_wrap = this._createSimpleElement('div', 'flex');

				let dom_title_settings_add = this._get_dom_settings_btn('skill-add');
				let dom_title_settings_edit = this._get_dom_settings_btn('skill-edit', true);
				let dom_title_settings_remove = this._get_dom_settings_btn('skill-cat-remove');

				// combine settings wrap

				dom_title_settings_wrap = this._appendChild_loop(dom_title_settings_wrap, [dom_title_settings_add, dom_title_settings_edit, dom_title_settings_remove]);

				let dom_title_content = document.createTextNode(_C._skills[x][t].category);
				// <span> (0)</span>
				let dom_title_content_inner = this._createSimpleElement('span', '', '', ' (0)');
				
				// accordion content
				// <div task="accordion_content">
				let dom_content_wrap = this._createSimpleElement('div', '', [['task', 'accordion_content']]);

				// accordion title
				dom_title = this._appendChild_loop(dom_title, [dom_title_content, dom_title_content_inner]);
				dom_title_wrap = this._appendChild_loop(dom_title_wrap, [dom_title, dom_title_settings_wrap]);

				dom_parent.appendChild(dom_title_wrap);

				for (let i = 0; i < _C._skills[x][t].data.length; i++) {
					let skill = _C._skills[x][t].data[i];

					let catid = '' + x + '-' + t + '';

					let dom_content_inner = this.create_skill(skill, _C.skill[x].category, catid);

					dom_content_wrap.appendChild(dom_content_inner);
				}

				dom_parent.appendChild(dom_content_wrap);

				dom_element_list.push(dom_parent);

				for (let i = 0; i < dom_element_list.length; i++) {
					_C.skill[x].parent.appendChild(dom_element_list[i]);
				}
				
				if(t == _C._skills[x].length - 1) {
					let dom_skill_add_wrap = this._createSimpleElement('div', 'flex');
					
					let dom_skill_add_inner = this._createSimpleElement('button', '', [['task', 'skill-cat-add'], ['onclick', '_DOM._toggle_addSkillCat_overlay(this)']], '+ Fertigkeit hinzufügen');
					
					dom_skill_add_wrap.appendChild(dom_skill_add_inner);

					_C.skill[x].parent.appendChild(dom_skill_add_wrap);
				}
			}
		}
		this.setup_skill_cat_point();
	}
	setup_skill_cat_point() {
		var skill_titles = document.querySelectorAll('[submodule=skills] [task=accordion_title].main-title span');
		var skill_content = '';

		for (let i = 0; i < skill_titles.length; i++) {
			skill_content = skill_titles[i].parentElement.parentElement.parentElement.querySelectorAll('[item=skill] input');
			
			let sum = 0;
			let amount = 0;

			for (let s = 0; s < skill_content.length; s++) {
				sum = sum + parseInt(skill_content[s].value);
				amount = amount + 1;
			}
			let result = Math.round(sum / amount);

			if(isNaN(result)) {
				result = 0;
			}
			skill_titles[i].innerHTML = " (" + result + ")";
		}
		return;
	}
	create_skill_cat(type_id, cat) {
		let dom_parent = this._createSimpleElement('div', 'element', [['catID', '' + type_id + '-' + (_C._skills[type_id].length)]]);
		
		// accordion title
		// <div task="accordion_title">
		let dom_title_wrap = this._createSimpleElement('div', '', [['task', 'accordion_title']]);
		// <p>
		let dom_title = this._createSimpleElement('p');
		// "cat.category"
		let dom_title_content = document.createTextNode(cat.category);
		// <span> (0)</span>
		let dom_title_content_inner = this._createSimpleElement('span', '', '', ' (0)');
		
		// accordion content
		// <div task="accordion_content">
		let dom_content_wrap = this._createSimpleElement('div', '', [['task', 'accordion_content']]);

		// accordion title
		dom_title = this._appendChild_loop(dom_title, [dom_title_content, dom_title_content_inner]);
		dom_title_wrap.appendChild(dom_title);

		// dom full
		dom_parent = this._appendChild_loop(dom_parent, [dom_title_wrap, dom_content_wrap]);

		return dom_parent;
	}
	create_skill(skill, category, catid="") {
		let return_dom = {};

		// SETTINGS SETUP
		let dom_skill_setting_decrease = this._get_dom_settings_btn('decrease');
		let dom_skill_setting_increase = this._get_dom_settings_btn('increase');
		let dom_skill_setting_edit = this._get_dom_settings_btn('skill-edit', true);
		let dom_skill_setting_remove = this._get_dom_settings_btn('skill-remove');

		let dom_skill_settings_wrapper = document.createElement('div');
			dom_skill_settings_wrapper.classList.add('flex');

		dom_skill_settings_wrapper = this._appendChild_loop(dom_skill_settings_wrapper, [dom_skill_setting_edit, dom_skill_setting_remove]);

		// START ACCORDION DECLARATION
		// <div class="flex" item="skill">
		let dom_content_inner = this._createSimpleElement('div', 'flex', [['item', 'skill'], ['catid', catid], ['skill-title', skill.title]]);
		
		// START ACCORDION TITLE
		// <div>
		let dom_content_title_sep = this._createSimpleElement('div');
		
		// <span item="skill-title">SKILL-TITLE</span>
		let dom_skill_title = this._createSimpleElement('span', '', [['item', 'skill-title']], skill.title);

		dom_content_title_sep.appendChild(dom_skill_title);
		// END ACCORDION TITLE

		// START ACCORDION CONTENT
		// <div>
		let dom_content_value_sep = this._createSimpleElement('div');
		
		// <input class="btn-clean" item="skill-value" title="SKILL-TITLE" category="CATEGORY" type="number" value="SKILL-VALUE"/>
		let dom_skill_value = this._createSimpleElement('input', 'btn-clean', [['item', 'skill-value'],['title', skill.title],['category', category],['type','number'],['value', skill.value]]);

		if(category == 'magic') {
			// <div class="wrap">
			let m_content_wrap = this._createSimpleElement('div', 'wrap');
			
			// <input type="text" name="magic_description"/>
			let m_content_description = this._createSimpleElement('div', '', [['name', 'magic_description']]);

			m_content_wrap.appendChild(m_content_description);
		}

		dom_content_value_sep = this._appendChild_loop(dom_content_value_sep, [dom_skill_value, dom_skill_setting_decrease, dom_skill_setting_increase]);

		// END ACCORDION CONTENT

		// START ACCORDION
		dom_content_inner = this._appendChild_loop(dom_content_inner, [dom_content_title_sep, dom_content_value_sep, dom_skill_settings_wrapper]);
		// END ACCORDION
		// END ACCORDION DECLARATION

		return_dom = dom_content_inner;

		if(category == 'magic') {
			// START MAGIC ACCORDION DECLARATION
			// <div submodule="accordion_inner" sub_acc=true>
			let inner_acc = this._createSimpleElement('div', '', [['submodule', 'accordion_inner'], ['sub_acc', true]]);

			// <div class="flex">
			let inner_acc_main = this._createSimpleElement('div', 'flex');
			
			// <div class="element">
			let inner_acc_element = this._createSimpleElement('div', 'element');
			
			// <div task="accordion_title" class="sub-title">
			let inner_acc_title = this._createSimpleElement('div', 'sub-title', [['task', 'accordion_title']])

			// <div task="accordion_content">
			let inner_acc_content = this._createSimpleElement('div', '', [['task', 'accordion_content']])

			// END MAGIC ACCORDION DECLARATION

			//START MAGIC CONTENT
			// <div class="flex">
			let m_content = this._createSimpleElement('div', 'flex');
			
			//START MAGIC DESCRIPTION
			// <div class="element">
			let m_content_element = this._createSimpleElement('div', 'element');
			
			// <div class="wrap">
			let m_content_wrap = this._createSimpleElement('div', 'wrap');
			
			// <input type="text" name="magic_description"/>
			let m_content_description = this._createSimpleElement('div', '', [['name', 'magic_description']]);

			m_content_wrap.appendChild(m_content_description);
			m_content_element.appendChild(m_content_wrap);
			//END MAGIC DESCRIPTION

			// START MAGIC VALUES
			// <div class="element">
			let m_content_element2 = this._createSimpleElement('div', 'element');
			
			// <div class="flex">
			let m_content_wrap2 = this._createSimpleElement('div', 'flex');
			
			// <div class="inner" task="magic-values">
			let m_content_inner1 = this._createSimpleElement('div', 'inner', [['task', 'magic-values']]);
			
			// START MAGIC OPTIONS
			// <div class="inner" task="magic-options">
			let m_content_inner2 = this._createSimpleElement('div', 'inner', [['task', 'magic-options']]);
			
			// <div class="wrap">
			let m_content_inner2_save = this._createSimpleElement('div', 'wrap');
			
			// <button onclick="">SAVE</button
			let m_content_inner2_save_btn = this._createSimpleElement('button', '', [['onclick', '_C._save("skill")', 'Save']]);
			
			m_content_inner2_save.appendChild(m_content_inner2_save_btn);
			m_content_inner2.appendChild(m_content_inner2_save);
			// END MAGIC OPTIONS

			m_content_wrap2 = this._appendChild_loop(m_content_wrap2, [m_content_inner1, m_content_inner2]);

			m_content_element2.appendChild(m_content_wrap2);
			//END MAGIC VALUES

			m_content = this._appendChild_loop(m_content, [m_content_element, m_content_element2]);
			
			inner_acc_content.appendChild(m_content);
			// END MAGIC CONTENT

			// START MAGIC ACCORDION
			inner_acc_title.appendChild(dom_content_inner);

			inner_acc_element = this._appendChild_loop(inner_acc_element, [inner_acc_title, inner_acc_content]);

			inner_acc_main.appendChild(inner_acc_element);

			inner_acc.appendChild(inner_acc_main);
			// END MAGIC ACCORDION

			// overwrite default content dom
			return_dom = inner_acc;
		}


		return return_dom;
	}

	setup_inventory() {
		// TODO
	}

	setup_note_field() {
		let elem = _C.main_parent.querySelector('[item=base_notes]');
		elem.innerHTML = _C._notes;
	}

	//#########
	//### OVERLAY FUNCTIONS
	//#########
	_toggle_addSkillCat_overlay(trigger) {
		let skill_cat_add_save = _C.main_parent.querySelector('button[task=save_new_skill_cat]');

		let parent = trigger.parentElement.parentElement;
		_C.skill_cat_overlay.classList.add('active');
		skill_cat_add_save.setAttribute('typeid', parent.getAttribute('id'));
	}


	_toggle_addSkill_overlay(trigger) {
		let cat_parent = trigger.parentElement.parentElement.parentElement.parentElement;
		let skill_add_save = _C.main_parent.querySelector('button[task=save_new_skill]');

		_C.skill_overlay.classList.add('active');
		skill_add_save.setAttribute('catid', cat_parent.getAttribute('catid'));
	}

	_toggle_updateXP_overlay(trigger) {
		console.log(trigger);
	}

	_toggle_removeSkillCat_overlay(trigger="") {
		let overlay = _C.main_parent.querySelector('[overlay=remove_skill_cat]');
		overlay.classList.toggle('active');
		let btn = overlay.querySelector('[task=remove_skill_cat]');
		
		if(trigger) {
			btn.setAttribute('trigger', trigger.parentElement.parentElement.parentElement.parentElement.getAttribute('catid'));
		}
		return;
	}
	_toggle_removeSkill_overlay(trigger="") {
		let overlay = _C.main_parent.querySelector('[overlay=remove_skill]');
		overlay.classList.toggle('active');
		let btn = overlay.querySelector('[task=remove_skill]');

		if(trigger) {
			btn.setAttribute('catid', trigger.parentElement.parentElement.parentElement.getAttribute('catid'));
			btn.setAttribute('skill-title', trigger.parentElement.parentElement.parentElement.getAttribute('skill-title'));
		}
		return;
	}

	//#
	//# SETUP HELPERS
	//#
	_get_dom_settings_btn(icon, disabled=false) {

		let return_dom = this._createSimpleElement('div', 'settings-btn');
		
		if(disabled) {
			return_dom.classList.add('disabled');
		}

		let attributes = [['icon', icon]];
		if(icon == 'increase' || icon == 'decrease') {
			attributes = [['icon', icon], ['onclick', '_C.update_skill(this.getAttribute("icon"),this)']];
		}else if(icon == 'skill-add') {
			attributes = [['icon', icon], ['onclick', '_DOM._toggle_addSkill_overlay(this)']];
		}else if(icon == 'skill-cat-remove') {
			attributes = [['icon', icon], ['onclick', '_C.remove_skill_cat(this)']];
		}else if(icon == 'skill-remove') {
			attributes = [['icon', icon], ['onclick', '_C.remove_skill(this)']];
		}

		let dom_child = this._createSimpleElement('button', '', attributes);
		
		return_dom.appendChild(dom_child);

		return return_dom;
	}

	_appendChild_loop(parent, children) {
		for (let i = 0; i < children.length; i++) {
			parent.appendChild(children[i]);
		}
		return parent;
	}

	_createSimpleElement(tag_name='div', class_name='', attributes='',text='', text_wrapper=''){
		let element = document.createElement(tag_name);
		if(class_name) {
			if(typeof class_name == 'string') {
				element.classList.add(class_name);
			}else {
				for (let i = 0; i < class_name.length; i++) {
					element.classList.add(class_name[i]);
				}
			}
		}
		if(attributes) {
			if(typeof attributes == 'object') {
				for (let i = 0; i < attributes.length; i++) {
					element.setAttribute(attributes[i][0], attributes[i][1]);
				}
			}
		}
		if(text) {
			if(typeof text == 'string') {
				let node = document.createTextNode(text);
				if(text_wrapper) {
					let text_wrap = document.createElement(text_wrapper);
					text_wrap.appendChild(node);
					element.appendChild(text_wrap);
				}else {
					element.appendChild(node);
				}
			}
		}

		return element;
	}
}