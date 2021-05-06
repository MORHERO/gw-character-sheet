<!-- UPDATE MONEY OVERLAY -->
<div class="overlay flex active" overlay="update_money">
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