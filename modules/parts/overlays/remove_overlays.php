<!-- REMOVE SKILL CATEGORY CONFIRMATION OVERLAY -->
<div class="overlay flex" overlay="remove_skill_cat">
	<div class="inner">
		<p>Fertigkeits kategorie wirklich entfernen?</p>
		<div class="flex">

			<div class="wrap">
				<button class="" task="remove_skill_cat" onclick='_C._remove_skill_cat(this)'>Entfernen</button>
			</div>
			<div class="wrap">
				<button class="" task="close_overlay" onclick='_DOM.toggle_removeSkillCat_overlay(this)'>Abbrechen</button>
			</div>

		</div>
		
		
	</div>
</div>
<!-- REMOVE SKILL CONFIRMATION OVERLAY -->
<div class="overlay flex" overlay="remove_skill">
	<div class="inner">
		<p class="heading">Fertigkeit wirklich entfernen?</p>
		<div class="flex">

			<div class="wrap">
				<button class="" task="remove_skill" onclick='_C._remove_skill(this)'>Entfernen</button>
			</div>
			<div class="wrap">
				<button class="" task="close_overlay" onclick='_DOM.toggle_removeSkill_overlay(this)'>Abbrechen</button>
			</div>

		</div>
		
		
	</div>
</div>