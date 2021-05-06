<div submodule="attributes">
	<p class="heading">Attribute</p>
	<div id="attributes_content">
		<div class="attributes-wrapper">
			<div class="flex">
				
				<?php 
					$attributes = array(
						array(
							'type'			=> 'charisma',
							'title_full'	=> 'Ausstrahlung',
							'title_short'	=> 'AUS',
						),
						array(
							'type'			=> 'dexterity',
							'title_full'	=> 'Beweglichkeit',
							'title_short'	=> 'BEW',
						),
						array(
							'type'			=> 'intuition',
							'title_full'	=> 'Intuition',
							'title_short'	=> 'INT',
						),
						array(
							'type'			=> 'constitution',
							'title_full'	=> 'Konstitution',
							'title_short'	=> 'KON',
						),
						array(
							'type'			=> 'mystic',
							'title_full'	=> 'Mystik',
							'title_short'	=> 'MYS',
						),
						array(
							'type'			=> 'strength',
							'title_full'	=> 'Stärke',
							'title_short'	=> 'STÄ',
						),
						array(
							'type'			=> 'intelligence',
							'title_full'	=> 'Verstand',
							'title_short'	=> 'VER',
						),
						array(
							'type'			=> 'willpower',
							'title_full'	=> 'Willenskraft',
							'title_short'	=> 'WIL',
						)
					);
				?>

				<?php 
					
					foreach ($attributes as $key => $item) { ?>
						
					<div class="attribute" item="<?php echo($item['type']); ?>">
						<div class="full-title">
							<p><?php echo($item['title_full']); ?></p>
						</div>
						<div class="flex">
							<div class="title">
								<p><?php echo($item['title_short']); ?></p>
							</div>
							<div class="value">
								<input type="text" task="attribute-main" item="<?php echo($item['type']); ?>" value="0">
							</div>
							<div class="dice-preview" dice="true">
								<p></p>
							</div>
						</div>
					</div>

				<?php } ?>
			</div>
		</div>

		<div class="attributes-wrapper">
			<div class="flex">
				
				<?php 
					$attributes = array(
						array(
							'type'			=> 'size',
							'title_full'	=> 'Größenklasse',
							'title_short'	=> 'GK',
						),
						array(
							'type'			=> 'speed',
							'title_full'	=> 'Geschwindigkeit',
							'title_short'	=> 'GSW',
						),
						array(
							'type'			=> 'initative',
							'title_full'	=> 'Initiative',
							'title_short'	=> 'INI',
						),
						array(
							'type'			=> 'health',
							'title_full'	=> 'Lebenspunkte',
							'title_short'	=> 'LP',
						),
						array(
							'type'			=> 'mana',
							'title_full'	=> 'Manapunkte',
							'title_short'	=> 'MP',
						),
						array(
							'type'			=> 'defense',
							'title_full'	=> 'Verteidigung',
							'title_short'	=> 'VTD',
						),
						array(
							'type'			=> 'mental_willpower',
							'title_full'	=> 'Geistiger Wiederstand',
							'title_short'	=> 'GW',
						),
						array(
							'type'			=> 'body_willpower',
							'title_full'	=> 'Körperlicher Wiederstand',
							'title_short'	=> 'KW',
						)
					);
				?>

				<?php 
					
					foreach ($attributes as $key => $item) { ?>
						
					<div class="attribute" item="<?php echo($item['type']); ?>">
						<div class="full-title">
							<p><?php echo($item['title_full']); ?></p>
						</div>
						<div class="flex">
							<div class="title">
								<p><?php echo($item['title_short']); ?></p>
							</div>
							<div class="value">
								<input type="text" task="attribute-main" item="<?php echo($item['type']); ?>" value="0">
							</div>
							<div class="dice-preview" dice="false">
								<p></p>
							</div>
						</div>
					</div>

				<?php } ?>
			</div>
		</div>
	</div>
</div>