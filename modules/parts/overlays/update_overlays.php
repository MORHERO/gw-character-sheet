<!-- UPDATE CHARACTER HEADER INFO OVERLAY -->
<div class="overlay flex" overlay="update_header">
	<div class="inner">
		<div class="flex">
			<div class="element">
				<div class="input-wrap">
					<p>Name:</p>
					<input type="text" item="name_main" required/>
				</div>
				<div class="input-wrap">
					<p>Spitzname:</p>
					<input type="text" item="name_nick"/>
				</div>
				<div class="input-wrap">
					<p>Geheimer Name:</p>
					<input type="text" item="name_hidden"/>
				</div>
				<div class="input-wrap">
					<p>Rasse:</p>
					<select item="race" required disabled>
						<option value="" disabled selected>Bitte auswählen</option>
						<option value="0">Test</option>
						<option value="1">Placeholder</option>
					</select>
				</div>
			</div>

			<div class="element">
				<div class="input-wrap">
					<p>Geschlecht:</p>
					<select item="gender" required disabled>
						<option value="" disabled selected>Bitte auswählen</option>
						<option value="male">Männlich</option>
						<option value="female">Weiblich</option>
						<option value="diverse">Divers</option>
					</select>
				</div>
				<div class="input-wrap">
					<p>Alter:</p>
					<input type="number" item="age" required/>
				</div>
				<div class="input-wrap">
					<p>Größe:</p>
					<input type="text" item="height" required/>
				</div>
				<div class="input-wrap">
					<p>Gewicht:</p>
					<input type="text" item="weight" required/>
				</div>
				<div class="input-wrap">
					<p>Figur:</p>
					<select item="figure" required disabled>
						<option value="" disabled selected>Bitte auswählen</option>
						<option value="0">Figur 1</option>
						<option value="1">Figur 2</option>
						<option value="2">Figur 3</option>
					</select>
				</div>
			</div>

			<div class="element">
				<div class="input-wrap">
					<p>Rang:</p>
					<input type="number" item="rank" required/>
				</div>
				<div class="input-wrap">
					<p>Reputation:</p>
					<input type="number" item="reputation" required/>
				</div>
				<div class="input-wrap">
					<p>Karma:</p>
					<input type="number" item="karma" required/>
				</div>
				<div class="input-wrap">
					<p>Erfahrungspunkte:</p>
					<p class="add">Hinzufügen: <input type="number" item="add_xp"/></p>
					<p class="remove">Entfernen: <input type="number" item="remove_xp"/></p>
					<p>Gesamt: <span item="xp_total">/</span></p>
				</div>
			</div>
		</div>


		<div class="wrap">
			<button class="" onclick="_DOM._toggle_mainInfo_overlay(this)">Schließen</button>
			<button class="" onclick="_C.update_main_info()">Speichern</button>
		</div>
	</div>
</div>

<!-- UPDATE MONEY OVERLAY -->
<div class="overlay flex" overlay="update_money">
	<div class="inner">
		<div class="flex">

			<div item="money_main">
				<p>Verfügbar:</p>
				<div class="group" item="money_platin">
					<div class="flex">
						<p>Platin</p>
						<p item="money_amount"><input type="number" placeholder="0"/>P</p>
					</div>
					<p class="info">(1P = 10G)</p>
				</div>
				<div class="group" item="money_gold">
					<div class="flex">
						<p>Gold</p>
						<p item="money_amount"><input type="number" placeholder="0"/>G</p>
					</div>
					<p class="info">(1G = 100S)</p>
				</div>
				<div class="group" item="money_silver">
					<div class="flex">
						<p>Silber</p>
						<p item="money_amount"><input type="number" placeholder="0"/>S</p>
					</div>
					<p class="info">(1S = 10B)</p>
				</div>
				<div class="group" item="money_bronze">
					<div class="flex">
						<p>Bronze</p>
						<p item="money_amount"><input type="number" placeholder="0"/>B</p>
					</div>
					<p class="info">(1B = 100K)</p>
				</div>
				<div class="group" item="money_copper">
					<div class="flex">
						<p>Kupfer</p>
						<p item="money_amount"><input type="number" placeholder="0"/>K</p>
					</div>
					<p class="info">&nbsp;</p>
				</div>
			</div>
			<div item="money_bank">
				<p>Bank:</p>
				<div class="group" item="money_platin">
					<div class="flex">
						<p>Platin</p>
						<p item="money_amount"><input type="number" placeholder="0"/>P</p>
					</div>
					<p class="info">(1P = 10G)</p>
				</div>
				<div class="group" item="money_gold">
					<div class="flex">
						<p>Gold</p>
						<p item="money_amount"><input type="number" placeholder="0"/>G</p>
					</div>
					<p class="info">(1G = 100S)</p>
				</div>
				<div class="group" item="money_silver">
					<div class="flex">
						<p>Silber</p>
						<p item="money_amount"><input type="number" placeholder="0"/>S</p>
					</div>
					<p class="info">(1S = 10B)</p>
				</div>
				<div class="group" item="money_bronze">
					<div class="flex">
						<p>Bronze</p>
						<p item="money_amount"><input type="number" placeholder="0"/>B</p>
					</div>
					<p class="info">(1B = 100K)</p>
				</div>
				<div class="group" item="money_copper">
					<div class="flex">
						<p>Kupfer</p>
						<p item="money_amount"><input type="number" placeholder="0"/>K</p>
					</div>
					<p class="info">&nbsp;</p>
				</div>
			</div>

		</div>

		<div class="flex">
			<div class="wrap">
				<button class="" onclick="_C.update_money('remove')">Entfernen</button>
			</div>
			<div class="wrap">
				<button class="" onclick="_C.update_money('switch')">Übertragen</button>
			</div>
			<div class="wrap">
				<button class="" onclick="_C.update_money('add')">Hinzufügen</button>
			</div>
		</div>
		
	</div>
</div>