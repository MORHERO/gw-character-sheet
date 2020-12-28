<? //include_once('./modules/get_character.php'); ?>

<!DOCTYPE html>
<html>
<head>
	<title>CHARACTER CREATION</title>
	<meta charset="utf-8">
	<?php
		include 'templates/styles.php';
	?>
</head>
<body>
	<?php
		include 'templates/header.php';
		include 'templates/navigation.php';
	?>

	<main>
		<div class="inner">
			<div class="main-flex">

				<div class="character-wrapper">

					<div module="character-sheet">
						<?php 
							include 'modules/parts/character_header.php';
						?>
						<div class="flex">
							<?php 
								include 'modules/parts/character_attributes.php';
							?>
							<div class="main">
								<?php 
									include 'modules/parts/character_navigation.php';
								?>
								<div module="content-slider">
									<div class="slide">
										<?php include 'modules/parts/character_skills.php'; ?>
									</div>
									<div class="slide">
										<?php include 'modules/parts/character_fight.php'; ?>
									</div>
									<div class="slide">
										<?php include 'modules/parts/character_magic.php'; ?>
									</div>
									<div class="slide">
										<?php include 'modules/parts/character_equipment.php'; ?>
									</div>
									<div class="slide">
										<?php include 'modules/parts/character_base.php'; ?>
									</div>
								</div>
							</div>
						</div>
						<?php include 'modules/parts/overlays.php'; ?>
					</div>

				</div>

			</div>
		</div>
	</main>
	<?php
		include 'templates/footer.php';
		include 'templates/scripts.php';
	?>
</body>
</html>