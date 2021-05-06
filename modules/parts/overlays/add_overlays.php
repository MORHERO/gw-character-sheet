<!-- ADD SKILL OVERLAY -->
<div class="overlay flex" task="add_skill">
	<div class="inner">
		<div class="flex">

			<div class="wrap size-l">
				<p>Skill Titel:</p>
				<input type="text" name="skill_title">
			</div>

			<div class="wrap size-s">
				<p>Skill Wert:</p>
				<input type="number" name="skill_value">
			</div>

		</div>

		<div class="wrap">
			<button class="" task="save_new_skill" onclick='_C._add_skill(this.getAttribute("catid"), _C.skill_overlay.querySelector("[name=skill_title]"), _C.skill_overlay.querySelector("[name=skill_value]"))'>Save</button>
		</div>
	</div>
</div>

<!-- ADD SKILL CATEGORY OVERLAY -->
<div class="overlay flex" task="add_skill_cat">
	<div class="inner">
		<div class="flex">

			<div class="wrap">
				<p>Kategorie Titel:</p>
				<input type="text" name="skill_cat_title">
			</div>

		</div>
		
		<div class="wrap">
			<button class="" task="save_new_skill_cat" onclick='_C._add_skill_cat(this.getAttribute("typeid"), _C.skill_cat_overlay.querySelector("[name=skill_cat_title]").value)'>Save</button>
		</div>
	</div>
</div>