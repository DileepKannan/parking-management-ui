$(document)
	.ready(
		function() {
			$('#vehicleNo').focus();

			var jsonObj;
			var slotName = "";
			const arr = [];
			$
				.ajax({
					type: "GET",
					crossDomain: true,
					url: "http://localhost:8081/parkings",
					success: function(obj) {
						for (var key in obj) {
							jsonObj = obj[key];
							slotName = jsonObj["slotName"];
							console.log("--------");
							console.log(slotName);
							console.log("--------");
							
							$("#slotName > option").each(function() {
							    console.log(this.text + ' ' + this.value);
								if(this.value == slotName){
									this.disabled = true;			
								}else{
									arr.push(this.value );
								}
							});
							
						}
					$('#slotName').children('option:enabled').eq(0).prop('selected', true);
					console.log(arr)
					}
				});

			$(function() {

				$('#dtpickerdemo').datetimepicker({
					//format: 'DD/MM/YYYY HH:mm',
					defaultDate: new Date(),
				});

			});

			$("#btnSave")
				.click(
					function(e) {
						e.preventDefault(); // prevent actual form submit
						var vehicleNo = $('#vehicleNo')
							.val();
						if (vehicleNo != null && vehicleNo != "") {
							var formData = jQuery('#homePage').serializeArray(); // store json string
							var indexed_array = {};
							$.map(formData,function(n, i) {
								indexed_array[n['name']] = n['value'];
							});

							console.log(indexed_array)
							$
								.ajax({
									type: "POST",
									crossDomain: true,
									contentType: "application/json",
									url: "http://localhost:8081/parking",
									data: JSON
										.stringify(indexed_array),
									success: function(data) {
										$(
											'#exampleModal')
											.modal(
												'show');
									}
								});
						} else {
							$('#vehicleNo').val("")
							alert("Enter Vehicle No.");
							$('#vehicleNo').focus();
						}

					});
		});

function funReload() {

	/* $('#homePage').attr('action', 'booking'); //this fails silently
	$('#homePage').get(0).setAttribute('action', 'booking'); //this works
	$('#homePage').submit(); */
	window.location.reload()
}