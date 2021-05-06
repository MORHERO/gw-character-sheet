<div submodule="equipment">
	<div class="flex">
		<div class="main">

			<div submodule="accordion" class="">
				<div class="flex" id="equipment_main_content">
					
					<div class="element">
						<div class="flex" task="accordion_title">
							<p>Inventar</p>
							<div class="flex">
								<div class="settings-btn disabled">
									<button icon="add" onclick=""></button>
								</div>
							</div>
						</div>
						<div task="accordion_content" class="">
							<div item="equipment">
								<div class="flex base-section">
									<p item="equipment-title">Gegenständename</p>
									<p item="equipment-rarity">(Seltenheit)</p>
									<div class="flex">
										<input class="btn-clean" item="equipment-amount" type="number" value="1">
										<div class="settings-btn">
											<button icon="decrease" onclick=""></button>
										</div>
										<div class="settings-btn">
											<button icon="increase" onclick=""></button>
										</div>
									</div>
									<div class="flex">
										<div class="settings-btn disabled">
											<button icon="skill-edit"></button>
										</div>
										<div class="settings-btn disabled">
											<button icon="skill-remove" onclick=""></button>
										</div>
									</div>
								</div>
								<div class="flex info-section">
									<div>
										<p>Größe: <span item="equipment-size">20cm</span></p>
										<p>Gewicht: <span item="equipment-weight">1.2kg</span></p>
										<p>Wert: <span item="equipment-value">2 G</span></p>
									</div>
									<div>
										<p>Zustand: <span item="equipment-condition">Neu</span></p>
										<p>Typ: <span item="equipment-type">Trank</span></p>
									</div>
									<div>
										<textarea item="equipment-description"></textarea>
									</div>
								</div>
							</div>
							<div item="equipment">
								<div class="flex base-section">
									<p item="equipment-title">Gegenständename</p>
									<p item="equipment-rarity">(Seltenheit)</p>
									<div class="flex">
										<input class="btn-clean" item="equipment-amount" type="number" value="1">
										<div class="settings-btn">
											<button icon="decrease" onclick=""></button>
										</div>
										<div class="settings-btn">
											<button icon="increase" onclick=""></button>
										</div>
									</div>
									<div class="flex">
										<div class="settings-btn disabled">
											<button icon="skill-edit"></button>
										</div>
										<div class="settings-btn disabled">
											<button icon="skill-remove" onclick=""></button>
										</div>
									</div>
								</div>
								<div class="flex info-section">
									<div>
										<p>Größe: <span item="equipment-size">20cm</span></p>
										<p>Gewicht: <span item="equipment-weight">1.2kg</span></p>
										<p>Wert: <span item="equipment-value">2 G</span></p>
									</div>
									<div>
										<p>Zustand: <span item="equipment-condition">Neu</span></p>
										<p>Typ: <span item="equipment-type">Trank</span></p>
									</div>
									<div>
										<textarea item="equipment-description"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="element">
						<div class="flex" task="accordion_title">
							<p>Eingelagerte Waren</p>
							<div class="flex">
								<div class="settings-btn disabled">
									<button icon="add" onclick=""></button>
								</div>
							</div>
						</div>
						<div task="accordion_content" class="">
							<div class="flex" item="equipment">
								<div>
									<span item="skill-title"></span>
								</div>
								<div>

								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>

		</div>
		<div class="sub">
			<div id="money_content">
				<div class="heading flex">
					<p>Geld</p>
					<div class="flex">
						<div class="settings-btn disabled">
							<button icon="add" onclick=""></button>
						</div>
					</div>
				</div>
				<div class="content flex">
					<div item="money_main">
						<p>Verfügbar:</p>
						<div class="group" item="money_platin">
							<div class="flex">
								<p>Platin</p>
								<p item="money_amount"><span>0</span>P</p>
							</div>
							<p class="info">(1P = 10G)</p>
						</div>
						<div class="group" item="money_gold">
							<div class="flex">
								<p>Gold</p>
								<p item="money_amount"><span>0</span>G</p>
							</div>
							<p class="info">(1G = 100S)</p>
						</div>
						<div class="group" item="money_silver">
							<div class="flex">
								<p>Silber</p>
								<p item="money_amount"><span>0</span>S</p>
							</div>
							<p class="info">(1S = 10B)</p>
						</div>
						<div class="group" item="money_bronze">
							<div class="flex">
								<p>Bronze</p>
								<p item="money_amount"><span>0</span>B</p>
							</div>
							<p class="info">(1B = 100K)</p>
						</div>
						<div class="group" item="money_copper">
							<div class="flex">
								<p>Kupfer</p>
								<p item="money_amount"><span>0</span>K</p>
							</div>
							<p class="info">&nbsp;</p>
						</div>
					</div>
					<div item="money_bank">
						<p>Bank:</p>
						<div class="group" item="money_platin">
							<div class="flex">
								<p>Platin</p>
								<p item="money_amount"><span>0</span>P</p>
							</div>
							<p class="info">(1P = 10G)</p>
						</div>
						<div class="group" item="money_gold">
							<div class="flex">
								<p>Gold</p>
								<p item="money_amount"><span>0</span>G</p>
							</div>
							<p class="info">(1G = 100S)</p>
						</div>
						<div class="group" item="money_silver">
							<div class="flex">
								<p>Silber</p>
								<p item="money_amount"><span>0</span>S</p>
							</div>
							<p class="info">(1S = 10B)</p>
						</div>
						<div class="group" item="money_bronze">
							<div class="flex">
								<p>Bronze</p>
								<p item="money_amount"><span>0</span>B</p>
							</div>
							<p class="info">(1B = 100K)</p>
						</div>
						<div class="group" item="money_copper">
							<div class="flex">
								<p>Kupfer</p>
								<p item="money_amount"><span>0</span>K</p>
							</div>
							<p class="info">&nbsp;</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>