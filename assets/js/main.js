const master_slider = tns({
		container: '[module=master-slider]',
		items: 1,
		slideBy: 'page',
		autoplay: false,
		center: true,
		loop: false,
		autoHeight: false,
		gutter: 20,
		controlsPosition: "bottom",
		navPosition: "bottom"
	});

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

class SLIDE {
	constructor(index, parent) {
		const that = this;

		this.index = index;
		this.parent = parent;
		this.slides_amount = master_slider.getInfo().slideCount - 1;
		this.inputs = parent.querySelectorAll('input, select');
		this.input_listeners = [];

		for (let i = 0; i < this.inputs.length; ++i) {
			this.input_listeners.push(this.inputs[i].addEventListener('input', function(e) {
				that.check_slide_inputs();
			}));
		}
	}

	check_slide_inputs() {
		if(this.index != 0 && this.index != this.slides_amount) {
			let empty_inputs = this.get_empty_input_fields();

			if(empty_inputs.length != 0) {
				toggle_slide_button(true);
			}else {
				toggle_slide_button(false)
			}
		}else {
			if(this.index == 0) {
				toggle_slide_button(false);
			}
		}

		return;
	}

	get_empty_input_fields() {
		let inputs = this.parent.querySelectorAll('input[required=true]');
		let empty_inputs = [];

		for (let i = 0; i < inputs.length; ++i) {
			if(inputs[i].nodeName == 'INPUT' && inputs[i].type == 'text' || inputs[i].type == 'number') {
				let v = inputs[i].value.replace(/\s/g, '');
				
				if(inputs[i].value == "") {
					empty_inputs.push(inputs[i]);
				}
			}
		}

		return empty_inputs;
	}
}

class SELECT {
	constructor(parent, help_content) {
		const that = this;

		this.parent = parent;
		this.content = help_content;
		this.active_option_id = this.parent.value;
		this.help_box_element = this.parent.parentElement.parentElement.querySelector('.help-box .inner');

		this.parent.addEventListener('change', function(e) {
			that.set_active_option();
		});
	}

	set_active_option() {
		this.active_option_id = this.parent.value;

		this.change_help_content();
		this.change_content();
		return;
	}

	change_help_content() {
		let content_elem = document.createElement('p');
		content_elem.innerHTML = this.content[this.active_option_id].help_text;

		this.help_box_element.innerHTML = "";

		this.help_box_element.append(content_elem);

		return;
	}

	change_content() {
		let active_content = this.content[this.active_option_id];

		for (let i = 0; i < active_content.inputs.length; ++i) {
			let input_elem = document.querySelector('input[name='+  active_content.inputs[i].id +']');

			input_elem.min = active_content.inputs[i].min;
			input_elem.max = active_content.inputs[i].max;
		}

		return;
	}



}

// state(BOOLEAN) => true == deactivate, false == active
function toggle_slide_button(new_state) {
	let btn = master_slider.getInfo()['nextButton'];
	if(new_state) {
		btn.classList.add('disabled');
	}else {
		btn.classList.remove('disabled');
	}
	return;
}
function slider_changed_state() {
	let index = master_slider.getInfo().index;
	slide_list[index].check_slide_inputs();
}
master_slider.events.on('indexChanged', slider_changed_state);

let slide_elements = master_slider.getInfo()['slideItems'];
var slide_list = [];
for (let i = 0; i < slide_elements.length; ++i) {
	slide_list.push(new SLIDE(i, slide_elements[i]));
}

let accordion_elements = document.querySelectorAll('[submodule=accordion]');
var submodule_accordion_list = [];
for (let i = 0; i < accordion_elements.length; ++i) {
	submodule_accordion_list.push(new ACCORDION(accordion_elements[i]));
}

let select_elements = document.querySelectorAll('select');
var select_list = [];
var select_content_list = [
		{
			'race_human':  {
				'help_text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 100
					},
					{
						'id': 'base_height',
						'min': 150,
						'max': 215
					},
					{
						'id': 'base_weight',
						'min': 50,
						'max': 160
					},
				]
			},
			'race_elb': {
				'help_text': 'This is the elb text',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 250
					},
					{
						'id': 'base_height',
						'min': 170,
						'max': 235
					},
					{
						'id': 'base_weight',
						'min': 50,
						'max': 120
					},
				]
			},
			'race_dwarf': {
				'help_text': 'dwarfy dwarfo',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 300
					},
					{
						'id': 'base_height',
						'min': 80,
						'max': 135
					},
					{
						'id': 'base_weight',
						'min': 40,
						'max': 110
					},
				]
			},
			'race_ork': {
				'help_text': 'ork no good rok great',
				'inputs': [
						{
						'id': 'base_age',
						'min': 0,
						'max': 80
					},
					{
						'id': 'base_height',
						'min': 185,
						'max': 255
					},
					{
						'id': 'base_weight',
						'min': 90,
						'max': 160
					},
				]
			},
			'race_reptiloid': {
				'help_text': 'reptiloido',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 320
					},
					{
						'id': 'base_height',
						'min': 160,
						'max': 225
					},
					{
						'id': 'base_weight',
						'min': 70,
						'max': 130
					},
				]
			},
			'race_gnom': {
				'help_text': 'gnom text',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 400
					},
					{
						'id': 'base_height',
						'min': 50,
						'max': 100
					},
					{
						'id': 'base_weight',
						'min': 15,
						'max': 40
					},
				]
			},
			'race_werewolf': {
				'help_text': 'where is the wolf',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 120
					},
					{
						'id': 'base_height',
						'min': 180,
						'max': 225
					},
					{
						'id': 'base_weight',
						'min': 60,
						'max': 150
					},
				]
			},
			'race_varg': {
				'help_text': 'varg you',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 140
					},
					{
						'id': 'base_height',
						'min': 185,
						'max': 240
					},
					{
						'id': 'base_weight',
						'min': 80,
						'max': 160
					},
				]
			},
			'race_ent': {
				'help_text': 'ent of the world',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 1800
					},
					{
						'id': 'base_height',
						'min': 280,
						'max': 560
					},
					{
						'id': 'base_height',
						'min': 280,
						'max': 850
					},
				]
			},
			'race_fee': {
				'help_text': 'fee mee',
				'inputs': [
					{
						'id': 'base_age',
						'min': 0,
						'max': 1200
					},
					{
						'id': 'base_height',
						'min': 8,
						'max': 20
					// weight is 10 x gram not kg
					},
					{
						'id': 'base_weight',
						'min': 1,
						'max': 5
					},
				]
			}
		}
	];
for (let i = 0; i < select_elements.length; ++i) {
	select_list.push(new SELECT(select_elements[i], select_content_list[i]));
}

// TODO:
// check input max min if correct input is made
// improve help boxes generated by js