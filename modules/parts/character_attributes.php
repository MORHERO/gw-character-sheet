<div submodule="attributes">
	<div class="flex">

		<div class="attributes-wrapper">
			<div class="flex">

				<?php
					$attributes = array(
						[
							'title' => 'Ausstrahlung',
							'title_short' => 'AUS',
							'value' => 0
						],
						[
							'title' => 'Beweglichkeit',
							'title_short' => 'BEW',
							'value' => 0
						],
						[
							'title' => 'Intuition',
							'title_short' => 'INT',
							'value' => 0
						],
						[
							'title' => 'Konstitution',
							'title_short' => 'KON',
							'value' => 0
						],
						[
							'title' => 'Mystik',
							'title_short' => 'MYS',
							'value' => 0
						],
						[
							'title' => 'Stärke',
							'title_short' => 'STÄ',
							'value' => 0
						],
						[

							'title' => 'Verstand',
							'title_short' => 'VER',
							'value' => 0
						],
						[
							'title' => 'Willenskraft',
							'title_short' => 'WIL',
							'value' => 0
						]
					);

					foreach ($attributes as $key => $attribute) {
					?>
						<div class="attribute">
							<div class="title"><p><?php echo($attribute['title_short']); ?></p></div>
							<div class="value"><button item="attribute_" class="btn-clean"><?php echo($attribute['value']); ?></button></div>
							<button task="decrease" class="setting pos-11 btn-clean">-</button>
							<button task="increase" class="setting pos-1 btn-clean">+</button>
							<button task="close" class="setting pos-6 btn-clean">x</button>
						</div>
					<?php
					}
				?>
			</div>
		</div>

		<div class="attributes-wrapper">
			<div class="flex">
				<?php
					$attributes = array(
						[
							'title' => 'Größenklasse',
							'title_short' => 'GK',
							'value' => 0
						],
						[
							'title' => 'Geschwindigkeit',
							'title_short' => 'GSW',
							'value' => 0
						],
						[
							'title' => 'Initiative',
							'title_short' => 'INI',
							'value' => 0
						],
						[
							'title' => 'Lebenspunkte',
							'title_short' => 'LP',
							'value' => 0
						],
						[
							'title' => 'Fokus',
							'title_short' => 'FK',
							'value' => 0
						],
						[
							'title' => 'Verteidigung',
							'title_short' => 'VTD',
							'value' => 0
						],
						[

							'title' => 'Geistige Willenskraft',
							'title_short' => 'GW',
							'value' => 0
						],
						[
							'title' => 'Körperliche Willenskraft',
							'title_short' => 'KW',
							'value' => 0
						]
					);

					foreach ($attributes as $key => $attribute) {
					?>
						<div class="attribute">
							<div class="title"><p><?php echo($attribute['title_short']); ?></p></div>
							<div class="value"><button item="attribute_" class="btn-clean"><?php echo($attribute['value']); ?></button></div>
							<button task="decrease" class="setting pos-11 btn-clean">-</button>
							<button task="increase" class="setting pos-1 btn-clean">+</button>
							<button task="close" class="setting pos-6 btn-clean">x</button>
						</div>
					<?php
					}
				?>
			</div>
		</div>

	</div>
</div>