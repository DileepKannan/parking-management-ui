	$(document)
				.ready(
						function() {
							$('#dateTime, #slotName, #vehicleState, #totalHours, #closingTime').prop('disabled', true);
							$("#vehicleNo").focus();
							$(function() {
								$('#closingTime').datetimepicker({
									defaultDate : new Date(),
								});
							});
						});

		var jsonObj;

		$('#vehicleNo')
				.autocomplete(
						{
							source : function(request, response) {
								$.ajax({
									type : "GET",
									url : "http://localhost:8081/vehicle",
									async : true,
									data : {
										term : request.term
									},
									success : function(data) {
										jsonObj = data;
										const veh = [];
										var iLength = data.length;
										for (i = 0; i < iLength; i++) {
											veh.push(data[i].vehicleNo); // Adds "Kiwi"
										}
										response(veh)
									}
								});
							},
							select : function(event, ui) {
								var iLength = jsonObj.length;
								for (i = 0; i < iLength; i++) {
									if (ui.item.value == jsonObj[i].vehicleNo) {
										$("#dateTime").val(jsonObj[i].dateTime)
										$(
												"#slotName option[value="
														+ jsonObj[i].slotName
														+ "]").attr('selected',
												'selected');
										$(
												"#vehicleState option[value="
														+ jsonObj[i].vehicleState
														+ "]").attr('selected',
												'selected');
										$("#parkingId").val(
												jsonObj[i].parkingId)
										$('#vehicleState').val(
												jsonObj[i].vehicleState)
												.trigger('change');

										$(
												'#dateTime, #slotName, #vehicleState, #totalHours, #closingTime')
												.prop('disabled', true);

										var now = new Date($("#closingTime")
												.val());
										var past = new Date();

										var bookedDateTime = $("#dateTime")
												.val().split(" ")
										var bookedDate = bookedDateTime[0];
										var bookedTime = bookedDateTime[1];

										var presentDateTime = $("#closingTime")
												.val().split(" ")

										var presentDate = bookedDateTime[0];
										var presentTime = bookedDateTime[1];
										var diffMs = (bookedDate - presentDate);

										var milliSec = Math.abs(new Date($(
												"#dateTime").val())
												- new Date($("#closingTime")
														.val()));

										var diff = msToTime(milliSec);
										$('#totalHours').val(diff);
									}
								}

								$('#vehicleNo').val(ui.item.value);

							},
							minLength : 2
						});

		function msToTime(ms) {
			let seconds = (ms / 1000).toFixed(1);
			let minutes = (ms / (1000 * 60)).toFixed(1);
			let hours = (ms / (1000 * 60 * 60)).toFixed(1);
			let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
			if (seconds < 60)
				return seconds + " Sec";
			else if (minutes < 60)
				return minutes + " Min";
			else if (hours < 24)
				return hours + " Hrs";
			else
				return days + " Days"
		}

		$("#btnUpdate")
				.click(
						function(e) {
							e.preventDefault(); // prevent actual form submit
							var val = $("#vehicleNo").val();
							if(val!=null && val!=""){
							$(
									'#dateTime, #slotName, #vehicleState, #totalHours, #closingTime')
									.prop('disabled', false);
							var formData = jQuery(':input,:hidden')
									.serializeArray(); // store json string
							$(
									'#dateTime, #slotName, #vehicleState, #totalHours, #closingTime')
									.prop('disabled', true);
							var indexed_array = {};

							$.map(formData, function(n, i) {
								indexed_array[n['name']] = n['value'];
							});

							console.log(indexed_array)
							$.ajax({
								type : "POST",
								crossDomain : true,
								contentType : "application/json",
								url : "http://localhost:8081/updateParking",
								data : JSON.stringify(indexed_array),
								success : function(data) {
									$('#exampleModal').modal('show');
								}
							});
							}else{
								alert("Please select Vehicle No.");
								$("#vehicleNo").val("");
								$("#vehicleNo").focus();
							}
						});

		function funReload() {

			//$('#closinPage').attr('action', 'closing'); //this fails silently
			//$('#closinPage').submit();
			window.location.reload()
		}