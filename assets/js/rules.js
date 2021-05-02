class RULES {

	constructor() {

	}

	get_attribute_dice(value) {
		let dice = 0;
		switch(true) {
			case (value <= -6):
				dice = 'fucked';
				break;
			case (value == -5 || value == -4 || value == -3):
				dice = '-1w20';
				break;
			case (value == -2 || value == -1):
				dice = '-1w8';
				break;
			case (value == 0 || value == 1):
				dice = '/';
				break;
			case (value == 2 || value == 3):
				dice = '1w4';
				break;
			case (value == 4 || value == 5 || value == 6):
				dice = '1w8';
				break;
			case (value == 7 || value == 8 || value == 9 || value == 10):
				dice = '1w12';
				break;
			case (value == 11 || value == 12 || value == 13 || value == 14 || value == 15):
				dice = '1w20';
				break;
			case (value == 16 || value == 17 || value == 18 || value == 19 || value == 20 || value == 21 || value == 22 || value == 23 || value == 24):
				dice = '1w8 + 1w20';
				break;
			case (value == 25):
				dice = '1w12 + 1w20';
				break;
			case (value == 26):
				dice = '2w20';
				break;
			case (value == 27):
				dice = '2w20 + 1w4';
				break;
			case (value == 28):
				dice = '2w20 + 1w6';
				break;
			case (value == 29):
				dice = '2w20 + 1w8';
				break;
			case (value == 30):
				dice = '2w20 + 1w10';
				break;
			default:
				dice = '?';
		}
		return dice;
	}
}
const RULE = new RULES();