//Adapter-Manager - Copyright (c) by Sebatian Bormann
//Please visit https://github.com/sbormann/ioBroker.adapter-manager for licence-agreement and further information

//Settings
var defaultDatapointRoles = {
	string: [
		"state",
		"adapter.messagebox",
		"adapter.wakeup",
		"date",
		"date.end",
		"date.start",
		"html",
		"info.address",
		"info.display",
		"info.ip",
		"info.mac",
		"info.name",
		"info.port",
		"info.standby",
		"info.status",
		"json",
		"text",
		"text.url",
		"text.phone",
		"url",
		"url.audio",
		"url.blank",
		"url.cam",
		"url.icon",
		"url.same",
		
		"[media]",
		"media.add",
		"media.album",
		"media.artist",
		"media.bitrate",
		"media.broadcastDate",
		"media.clear",
		"media.content",
		"media.cover",
		"media.cover.big",
		"media.cover.small",
		"media.date",
		"media.duration.text",
		"media.elapsed.text",
		"media.episode",
		"media.grenre",
		"media.input",
		"media.playid",
		"media.playlist",
		"media.season",
		"media.title",
		"media.title.next",
		"media.track",
		"media.tts",
		"media.url",
		"media.url.announcement",
		"media.browser",
		
		"[weather]",
		"location",
		"weather.chart.url",
		"weather.chart.url.forecast",
		"weather.direction.wind",
		"weather.direction.wind.forecast.0",
		"weather.html",
		"weather.icon",
		"weather.icon.forecast.1",
		"weather.icon.name",
		"weather.icon.wind",
		"weather.json",
		"weather.state",
		"weather.state.forecast.0",
		"weather.state.forecast.1",
		"weather.tile",
		"weather.tile.forecast.0",
		"weather.tile.short",
		"weather.type"
		],
	number: [
		"state",
		"date",
		
		"[level - to set a number value]",
		"level",
		"level.blind",
		"level.co2",
		"level.color.blue",
		"level.color.green",
		"level.color.hue",
		"level.color.luminance",
		"level.color.red",
		"level.color.rgb",
		"level.color.saturation",
		"level.color.temperature",
		"level.color.white",
		"level.curtain",
		"level.dimmer",
		"level.temperature",
		"level.tilt",
		"level.timer",
		"level.timer.sleep",
		"level.valve",
		"level.volume",
		"level.voluem.group",
		
		"[value - readonly]",
		"value",
		"value.battery",
		"value.blind",
		"value.brightness",
		"value.current",
		"value.curtain",
		"value.default",
		"value.direction",
		"value.distance",
		"value.distance.visibility",
		"value.gps",
		"value.gps.elevation",
		"value.gps.latitude",
		"value.gps.longitude",
		"value.humidity",
		"value.interval",
		"value.lock",
		"value.max",
		"value.min",
		"value.power.consumption",
		"value.pressure",
		"value.severity",
		"value.speed",
		"value.sun.azimuth",
		"value.sun.elevation",
		"value.temperature",
		"value.tilt",
		"value.time",
		"value.valve",
		"value.voltage",
		"value.waring",
		"value.window",

		"[media]",
		"level.bass",
		"level.trebble",
		"media.duration",
		"media.elapsed",
		"media.input",
		"media.jump",
		"media.mode.shuffle",
		"media.playid",
		"media.seek",
		"media.state",

		"[weather]",
		"date.forecast.1",
		"date.sunrise",
		"date.sunset",
		"dayofweek",
		"value.clouds",
		"value.direction.max.wind",
		"value.direction.min.wind",
		"value.direction.wind",
		"value.direction.wind.forecast.0",
		"value.direction.wind.forecast.1",
		"value.humidity",
		"value.humidity.max",
		"value.humidity.min",
		"value.precipitation",
		"value.precipitation.day.forecast.0",
		"value.precipitation.forecast.0",
		"value.precipitation.forecast.1",
		"value.precipitation.hour",
		"value.precipitation.night.forecast.0",
		"value.precipitation.today",
		"value.pressure",
		"value.pressure.forecast.0",
		"value.pressure.forecast.1",
		"value.radiation",
		"value.rain",
		"value.rain.hour",
		"value.rain.today",
		"value.snow",
		"value.snow.hour",
		"value.snow.today",
		"value.snowline",
		"value.speed.max.wind",
		"value.speed.min.wind",
		"value.speed.wind",
		"value.speed.wind.forecast.0",
		"value.speed.wind.forecast.1",
		"value.temperature",
		"value.temperature.dewpoint",
		"value.temperature.feelslike",
		"value.temperature.max",
		"value.temperature.max.forecast.0",
		"value.temperature.max.forecast.1",
		"value.temperature.min",
		"value.temperature.min.forecast.0",
		"value.temperature.min.forecast.1",
		"value.temperature.windchill",
		"value.uv"
	],
	boolean: [
		"state",

		"[button]",
		"button", 
		"button.long", 
		"button.mode", 
		"button.mode.auto", 
		"button.mode.manual", 
		"button.mode.silent", 
		"button.open.door", 
		"button.open.window", 
		"button.start", 
		"button.stop", 
		
		"[indicator - belongs to a main datapoint]", 
		"indicator", 
		"indicator.alarm", 
		"indicator.alarm.fire", 
		"indicator.alarm.flood", 
		"indicator.alarm.secure", 
		"indicator.connected", 
		"indicator.error", 
		"indicator.lowbat", 
		"indicator.maintenance", 
		"indicator.maintenance.alarm", 
		"indicator.maintenance.lowbat", 
		"indicator.maintenance.unreach", 
		"indicator.reachable", 
		"indicator.working", 
		
		"[sensor - is a main datapoint]",
		"sensor.alarm",
		"sensor.alarm.fire",
		"sensor.alarm.flood",
		"sensor.alarm.power",
		"sensor.alarm.secure",
		"sensor.door",
		"sensor.light",
		"sensor.lock",
		"sensor.motion",
		"sensor.noise",
		"sensor.rain",
		"sensor.window",

		"[switch]",
		"switch", 
		"switch.boost", 
		"switch.comfort", 
		"switch.enable", 
		"switch.light", 
		"switch.lock", 
		"switch.lock.door", 
		"switch.lock.window", 
		"switch.mode", 
		"switch.mode.auto", 
		"switch.mode.color", 
		"switch.mode.manual", 
		"switch.mode.moonlight", 
		"switch.mode.silent", 
		"switch.power", 

		"[media]",
		"button.fastforward",
		"button.fastreverse",
		"button.forward",
		"button.next",
		"button.pause",
		"button.play",
		"button.prev",
		"button.reverse",
		"button.stop",
		"button.volume.down",
		"button.volume.up",
		"media.mode.repeat",
		"media.mute",
		"media.mute.group",
		"switch.pause",
		"switch.power.zone"
	],
	array: [
		"list"
	]
}
var defaultMainRoles = [
	"unknown",
	"blind",
	"button",
	"camera",
	"ct",
	"dimmer",
	"door",
	"fireAlarm",
	"floodAlarm",
	"gate",
	"hue",
	"humidity",
	"image",
	"info",
	"instance",
	"light",
	"location",
	"lock",
	"media",
	"motion",
	"rgb",
	"rgbSingle",
	"slider",
	"socket",
	"temperature",
	"thermostat",
	"url",
	"valve",
	"volume",
	"volumeGroup",
	"warning",
	"weatherCurrent",
	"weatherForecast",
	"window",
	"windowTilt"
]

//Declarations
const udef = 'undefined';
var iobrokerObjects;
var iobrokerObjectsReady = false;
var iobrokerObjectsReadyFunctions = [];
var modalZIndexCount = 2000;

//++++++++++ GLOBAL FUNCTIONS ++++++++++
function initDialog(id, callback) {
	var $dialog = $('#' + id);
	if (!$dialog.data('inited')) {
		$dialog.data('inited', true);
		$dialog.modal({
			dismissible: false
		});
		$dialog.find('.btn-set').on('click', function () {
			var $dialog = $('#' + $(this).data('dialogid'));
			var callback = $dialog.data('callback');
			if (typeof callback === 'function') callback();
			$dialog.data('callback', null);
		});
	}
	$dialog.find('.btn-set').data('dialogid', id);
	$dialog.data('callback', callback);
}

var selectId;
function initSelectId(callback) {
	setTimeout(function(){ $('#dialogSelectId').css('z-index', modalZIndexCount++); }, 100);
	if (selectId) {
		return callback(selectId);
	}
	var options = {
		noMultiselect: true,
		imgPath:       '../../lib/css/fancytree/',
		filter:        {type: 'state'},
		name:          'scenes-select-state',
		texts: {
			select:          _('Select'),
			cancel:          _('Cancel'),
			all:             _('All'),
			id:              _('ID'),
			name:            _('Name'),
			role:            _('Role'),
			room:            _('Room'),
			value:           _('Value'),
			selectid:        _('Select ID'),
			from:            _('From'),
			lc:              _('Last changed'),
			ts:              _('Time stamp'),
			wait:            _('Processing...'),
			ack:             _('Acknowledged'),
			selectAll:       _('Select all'),
			unselectAll:     _('Deselect all'),
			invertSelection: _('Invert selection')
		},
		columns: ['image', 'name', 'role', 'room']
	};
	var toDo = function(){
		options.objects = iobrokerObjects;
		selectId = $('#dialogSelectId').selectId('init', options);
		callback(selectId);
	}
	if (iobrokerObjectsReady) {
		toDo();
	} else {
		iobrokerObjectsReadyFunctions.push(toDo); 
	}
}

function tryParseJSON(jsonString){ //Returns parsed object or false, if jsonString is not valid
    try {
        var o = JSON.parse(jsonString);
        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return false;
};

function removeDuplicates(array) { //Removes duplicates from an array
    var seen = [];
    return array.filter(function(item) {
		if(seen.indexOf(JSON.stringify(item)) > -1){
			return false;
		} else {
			seen.push(JSON.stringify(item));
			return true;
		}
    });
}

function multiReplace(string, replacementObj){ //Replaces multiple replacements in string. replacementObj = [{searchValue: "", newValue: ""}, ...]
	replacementObj.forEach(function(replacement){
		string = string.replace(replacement.searchValue, replacement.newValue);
	});
	return string;
}

//Combobox
var $enhanceTextInputToComboboxActualTarget;
function enhanceTextInputToCombobox(targetInput, options, iconsFromOption, onSelect){
	//targetInput - string - selector for text-input-field to enhance
	//options - string - "value1/caption1/icon1;value2/caption2/icon2;[optgroup-caption];value3/caption3/icon3;..."
	//iconsFromOption - boolean - if true, the values will be used to generate links to icons (\ will be replaced by / an link will be preceded), if no icon is given in options
	//onSelect - function - function that will be called with the argument (value), if a value is selected
	$(targetInput).one('blur', function(){
		var that = this;
		setTimeout(function(){var _that = that; _that.scrollLeft = 100000;}, 10);
	});
	$(targetInput).trigger('blur');
	var lastTargetInput;
	$(targetInput).each(function(){
		if(!$(this).parent('div').hasClass('combobox')){
			$(this).add('label').wrap("<div class='combobox'></div>");
			$(this).after("<a class='comboboxDropdownTrigger waves-effect waves-teal btn-small btn-flat' data-target='dropdown_" + encodeURIComponent(targetInput) + "' href='#' onclick='console.log(\"Combobox dropdown clicked\"); $enhanceTextInputToComboboxActualTarget = $(this).prevAll(\"input\"); enhanceTextInputToComboboxScrollDropdownTo($(this).data(\"target\"), $(this).prevAll(\"input\").val());'><i class='material-icons comboboxDropdownTriggerArrow' style='font-size: 25px;'>arrow_drop_down</i></a>");
		}
		$(this).data('combobox-onselect', onSelect);			
		lastTargetInput = this; 
	});
	options = options || $(lastTargetInput).data('options') || "";
	options = options.split(";");
	$("ul[id='dropdown_" + encodeURIComponent(targetInput) + "']").remove(); //If there was an old dropdownlist remove it
	var comboboxContent = "<ul id='dropdown_" + encodeURIComponent(targetInput) + "' class='dropdown-content'>";
	options.forEach(function(option){
		if (option.substring(0,1) == "[" && option.substr(-1) == "]"){ //Optgroup
			var caption = _(option.substring(1, option.length - 1));
			comboboxContent += "	<li class='divider' style='padding: 14px 4px 30px 4px; color:grey;' tabindex='-1'>";
			comboboxContent += "		" + caption + "&nbsp;";
			comboboxContent += "	</li>";				
		} else { //Normal option
			var optionParts = option.split("/");
			var value = encodeURIComponent(optionParts[0]);
			var caption = "";
			if (optionParts.length > 1){
				caption = optionParts[1];				
			} else {
				caption = optionParts[0];
			}
			var icon = "";
			if (optionParts.length > 2){
				icon = optionParts[2];
			} else if (iconsFromOption){
				icon = option.split("/")[0].replace(/\\/g, "/").substring(1) || "";
				if (icon != "") icon = link + icon;
			}
			comboboxContent += "	<li data-value='" + value + "'>";
			comboboxContent += "		<a href='#!'>";
			if (icon != ""){
				comboboxContent += "		<img src='" + icon + "' style='display: block; margin-bottom: 5px; min-width: 40px; max-width: 40px; max-height: 40px; width: auto; height: auto;'>";
			}
			comboboxContent += "			" + caption + "&nbsp;";
			comboboxContent += "		</a>";
			comboboxContent += "	</li>";				
		}
	});
	comboboxContent += "</ul>";
	$(lastTargetInput).after(comboboxContent);
	$('.comboboxDropdownTrigger').dropdown({alignment: 'right', constrainWidth: false, onItemClick: function(event){
		enhanceTextInputToComboboxEntryToInput($(event).data('value'));
	}});
}
function enhanceTextInputToComboboxScrollDropdownTo(dropdownlist, value){
	var $dropdownlist = $("ul[id='" + dropdownlist + "']");
	setTimeout(function(){
		var _$dropdownlist = $dropdownlist;
		_$dropdownlist.scrollTop(0);
	}, 15);
	setTimeout(function(){
		var _dropdownlist = dropdownlist;
		var _$dropdownlist = $dropdownlist;
		$("ul[id='" + _dropdownlist + "'] li").each(function(){
			$(this).removeClass('grey lighten-3');
			if ($(this).data('value') == encodeURIComponent((value || "").replace(/\//g, "\\"))){
				$(this).addClass('grey lighten-3');
				_$dropdownlist.scrollTop(_$dropdownlist.scrollTop() + $(this).position().top); 
			}
		});
	}, 300);
}
function enhanceTextInputToComboboxEntryToInput(value){
	var onSelect = $enhanceTextInputToComboboxActualTarget.data('combobox-onselect');
	if(decodeURIComponent(value).substring(0, 10) == "[VARIABLE]"){
		var variable = "";
		if(decodeURIComponent(decodeURIComponent(value)).indexOf("{}") > -1) {
			variable = prompt(_("Please enter datapoint id") + ":");
			if (variable == "") variable = null;
		}
		if(variable !== null){
			value = decodeURIComponent(decodeURIComponent(value).replace("[VARIABLE]", "")).replace("{}", "{" + variable + "}");
			$enhanceTextInputToComboboxActualTarget.val(value).trigger('change').trigger('blur');
			if(onSelect) onSelect(value);
		}
	} else {
		value = decodeURIComponent(value).replace(/\\/g, "/");
		$enhanceTextInputToComboboxActualTarget.val(value).trigger('change').trigger('blur');
		if(onSelect) onSelect(value);
	}
}

//Objects
function getCommonName(object){
	var name = false;
	if(object && typeof object.common != udef && typeof object.common.name != udef){
		if(typeof object.common.name == "object" && typeof object.common.name[systemLang] != udef){
			name = object.common.name[systemLang];
		} else if(typeof object.common.name == "object" && typeof object.common.name["en"] != udef){
			name = object.common.name["en"];
		} else if (typeof object.common.name == "string") {
			name = object.common.name;
		}
	}
	return name;
}

//Aliases
var aliases = {};
function loadAliases(callback){
	console.log("Loading aliases...");
	getAliases('', function(error, result){
		if(!error && result){
			aliases = result;
			console.log("Aliases ready.");
		} else {
			if(error) console.log("Error getting aliases: " + error); else console.log("There are no Aliases");
			$('#aliasesSelectedAliasProgress').hide();
		}
		if(callback) callback();
	});	
}
function getAliases(aliasName, callback) {
	aliasName = aliasName ? aliasName + '.' : '';
	var result = {};
    socket.emit('getObjectView', 'system', 'device', {startkey: 'alias' + aliasName, endkey: 'alias' + aliasName + '.\u9999'}, function (err, res) {
        if (!err && res) {
            for (var i = 0; i < res.rows.length; i++) {
                if (res.rows[i].id !== 'alias.' + aliasName) {
                    result[res.rows[i].id] = res.rows[i].value;
                }
            }
			socket.emit('getObjectView', 'system', 'channel', {startkey: 'alias' + aliasName, endkey: 'alias' + aliasName + '.\u9999'}, function (err, res) {
				if (!err && res) {
					for (var i = 0; i < res.rows.length; i++) {
						if (res.rows[i].id !== 'alias.' + aliasName) {
							result[res.rows[i].id] = res.rows[i].value;
						}
					}
					socket.emit('getObjectView', 'system', 'state', {startkey: 'alias' + aliasName, endkey: 'alias' + aliasName + '.\u9999'}, function (err, res) {
						if (!err && res) {
							for (var i = 0; i < res.rows.length; i++) {
								if (res.rows[i].id !== 'alias.' + aliasName) {
									result[res.rows[i].id] = res.rows[i].value;
								}
							}
							callback && callback(null, result);
						} else {
							callback && callback(err, {});
						}
					});
				} else {
					callback && callback(err, {});
				}
			});
        } else {
            callback && callback(err, {});
        }
    });
}
function getAliasName(alias){
	var name = _(alias);
	if(aliases[alias] && typeof aliases[alias].common != udef && typeof aliases[alias].common.name != udef){
		if(typeof aliases[alias].common.name == "object" && typeof aliases[alias].common.name[systemLang] != udef){
			name = aliases[alias].common.name[systemLang];
		} else if(typeof aliases[alias].common.name == "object" && typeof aliases[alias].common.name["en"] != udef){
			name = _(aliases[alias].common.name["en"]);
		} else if (typeof aliases[alias].common.name == "string") {
			name = _(aliases[alias].common.name);
		}
	}
	return name;
}
function getAliasesMain(){
	var aliasesMain = [];
	Object.keys(aliases).forEach(function(alias){
		aliasesMain.push(alias);
		var parentAlias = alias.substring(0, alias.lastIndexOf('.'));
		if(parentAlias != "Alias" && parseInt(parentAlias.substr(6)).toString() != parentAlias.substr(6)) aliasesMain.push(parentAlias);
	});
	aliasesMain = removeDuplicates(aliasesMain);
	aliasesMain = aliasesMain.filter(function(element){ //Filter for main Aliases (that are elements, that have sub-aliases OR that are direct childs of alias.0. [which means, lastIndexOf(".") == 7])
		if(element.lastIndexOf(".") == 7 || aliasesMain.filter(function(_element){ return (_element.indexOf(element + ".") == 0); }).length > 0) return true; else return false;
	});
	aliasesMain.sort();
	return aliasesMain;
}	


/************** LOAD ********************************************************
*** This will be called by the admin adapter when the settings page loads ***
****************************************************************************/
function load(settings, onChange) {
	//Loading begins
	var loading = true;

	//Hide Settings
	console.log("Loading iQontrol Settings");
	$('.hideOnLoad').hide();
	$('.showOnLoad').show();
	
	//Select elements with id=key and class=value and insert value
	if (!settings) return;
	$('.value').each(function () {
		var $key = $(this);
		var id = $key.attr('id');
		if ($key.attr('type') === 'checkbox') {
			if(typeof settings[id] != udef) $key.prop('checked', settings[id]);
			//do not call onChange direct, because onChange could expect some arguments
			$key.on('change', () => onChange());
		} else {
			if(typeof settings[id] != udef) $key.val(settings[id]);
			//do not call onChange direct, because onChange could expect some arguments
			$key.on('change', () => onChange()).on('keyup', () => onChange());
		}
	});

	//Signal to admin, that no changes yet
	onChange(false);	

	//Load Aliases
	loadAliases(function(){
		//Show Settings
		console.log("All settings loaded. Adapter ready.");
		$('.hideOnLoad').show();
		$('.showOnLoad').hide();
		loading = false;
		
		//Reinitialize all the Materialize labels on the page if you are dynamically adding inputs:
		if (M) M.updateTextFields();
		
		//Get iobrokerObjects
		setTimeout(function(){
			console.log("Getting ioBroker Objects...");
			$('.loadingObjects').show();
			socket.emit('getObjects', function (err, _objs) {
				console.log("Got ioBroker Objects.");
				iobrokerObjects = _objs;
				iobrokerObjectsReady = true;
				if(iobrokerObjectsReadyFunctions.length) console.log("There are some functions that were buffered while fetching the ioBroker Objects. They will be executed now...");
				for(i = 0; i < iobrokerObjectsReadyFunctions.length; i++){
					if (typeof iobrokerObjectsReadyFunctions[i] == 'function') iobrokerObjectsReadyFunctions[i]();
				}
				iobrokerObjectsReadyFunctions = [];
				$('.loadingObjects').hide();
				console.log("ioBroker Objects ready.");
			});
		}, 1000);
	})

	//++++++++++ TABS ++++++++++
	//Enhance Tabs with onShow-Function
	$('ul.tabs li a').on('click', function(){ onTabShow($(this).attr('href'));});
	function onTabShow(tabId){
		console.log("Open tab: " + tabId);
		switch(tabId){
			case "#tabAliases":
			loadTabAliases();
			break;
		}
	}

	//++++++++++ ALIASES ++++++++++
	var aliasesSelectedAlias = false;
	var aliasesUsedAliasIds = [];
	//Load Tab Aliases
	function loadTabAliases(showAlias){
		$('#aliasesSelectedAlias').addClass('disabled');
		$('#aliasesSelectedAliasProgress').show();
		$('.aliasesContentDiv').hide();
		$('.aliasesNothingSelectedDiv').show();
		
		//Get Aliases and add them to Selectbox
		$('#aliasesSelectedAlias').empty().append("<option disabled" + (showAlias ? "" : " selected") + " value>" + _("Select Alias") + "</option>");
		getAliasesMain().forEach(function(alias, index){ 
			var name = getAliasName(alias);
			$('#aliasesSelectedAlias').append("<option value='" + alias + "'>" + alias + (name != alias ? " (" + name + ")" : "&nbsp;") + "</option>"); 
		});
		$('#aliasesSelectedAlias').removeClass('disabled');
		$('#aliasesSelectedAlias').val(showAlias);
		$('#aliasesSelectedAlias').select().trigger('change');
		$('#aliasesSelectedAliasProgress').hide();
	}
		
	//Enhance aliasesSelectedAlias-Selectbox with functions
	$('#aliasesSelectedAlias').on('change', function(){
		loadAlias($('#aliasesSelectedAlias').val());
	});
	
	//Load Alias
	function loadAlias(aliasId){
		$('.aliasesDatapointSaveAll').hide();
		aliasesSelectedAlias = aliasId;
		if(aliasesSelectedAlias){
			//Fill Datapoint list			
			var mainFilled = false;
			$('#aliasesAliasMainList').empty();
			$('#aliasesDatapointList').empty();
			aliasesUsedAliasIds = [];
			for(alias in aliases){
				if(alias.indexOf(aliasesSelectedAlias) == 0){
					if(alias.length == aliasesSelectedAlias.length){ // Main
						var name = getAliasName(alias);
						aliasesDatapointListAddLine(alias, true);
						mainFilled = true;
					} else { //Datapoint
						aliasesDatapointListAddLine(alias);
					}
				}
			};
			if(!mainFilled){
				aliases[aliasesSelectedAlias] = {
					UNSAVED_NEW: true,
					type: "channel",
					common: { 
						name: aliasesSelectedAlias.substr(aliasesSelectedAlias.lastIndexOf('.') + 1),
						role: ""
					},
					_id: aliasesSelectedAlias
				};
				aliasesDatapointListAddLine(aliasesSelectedAlias, true);
			}
			$('.aliasesContentDiv').show();
			$('.aliasesNothingSelectedDiv').hide();
		} else {
			$('.aliasesContentDiv').hide();
			$('.aliasesNothingSelectedDiv').show();
		}		
	}
	
	//Add function to Add Alias Button
	$('#aliasesNewAlias').on('click', function(){
		var aliasId = prompt(_("Please enter ID of alias"), "alias.0.MyNewAlias");
		if(!aliasId) return;
		if(aliasId.indexOf("alias.0.") !== 0) aliasId = "alias.0." + aliasId;
		if(aliasId.length < 9) return;
		if(aliases[aliasId] && !aliases[aliasId].UNSAVED_NEW){
			alert("Error: This alias exists.");
			return;
		}
		$('#aliasesSelectedAlias').append("<option value='" + aliasId + "'>" + aliasId + " [" + _("NOT SAVED") + "]" + "</option>");
		$('#aliasesSelectedAlias').val(aliasId);
		$('#aliasesSelectedAlias').select().trigger('change');
	});

	//Add function to Add Datapoint Button
	$('#aliasesNewDatapoint').on('click', function(){
		var datapoint = prompt(_("Please enter ID of datapoint"), "SET");
		if(!datapoint) return;
		if(aliases[$('#aliasesSelectedAlias').val() + "." + datapoint]){
			alert("Error: This datapoint exists.");
			return;
		}
		aliases[$('#aliasesSelectedAlias').val() + "." + datapoint] = {
			UNSAVED_NEW: true,
			type: "state", 
			common: {
				name: datapoint, 
				type: "string", 
				role: "value", 
				unit: "",
				min: "",
				max: "",
				read: true, 
				write: true,
				alias: {id: "", read: "", write: ""}
			},
			_id: $('#aliasesSelectedAlias').val() + "." + datapoint
		};
		aliasesDatapointListAddLine($('#aliasesSelectedAlias').val() + "." + datapoint);
	});

	//Add function to Copy Button
	$('#aliasesCopyAlias').on('click', function(){
		copyAlias();
	});
	
	//Add function to Rename Button
	$('#aliasesRenameAlias').on('click', function(){
		copyAlias(true, true);
	});
	
	//Add function to Delete Button
	$('#aliasesDeleteAlias').on('click', function(){
		if(confirm(_("Really delete this Alias with all its datapoints? This cant't be undone!"))){
			var ids = [];
			$('#aliasesDatapointList > li').each(function(){
				ids.push($(this).data('id'));
			});
			ids.push(aliasesSelectedAlias);
			deleteDatapoints(ids, function(){
				loadTabAliases();
			});
		}
	});
	
	//Add function to Save all Buttons
	$('.aliasesDatapointSaveAll').on('click', function(){
		var ids = [];
		$('.aliasesDatapoint.save').each(function(){
			if($(this).css('display') != "none") ids.push($(this).data('id'));				
		});
		saveDatapoints(ids);
	});

	//Add Line to Datapoint List
	function aliasesDatapointListAddLine(alias, isMain){
		var listContent = "";
		var name = getAliasName(alias) || alias;
		var type = aliases[alias].common.type || "";
		var role = aliases[alias].common.role || "";
		var unit = aliases[alias].common.unit || "";
		var min = aliases[alias].common.min || "";
		var max = aliases[alias].common.max || "";
		var read = aliases[alias].common.read || false;
		var write = aliases[alias].common.write || false;
		var unsavedNew = aliases[alias].UNSAVED_NEW || false;
		var convertedToNumber = false;
		if(typeof min != "number" && min != ""){
			if(isNaN(min)) min = ""; else min = parseFloat(min);
			unsavedNew = true;
			convertedToNumber = true;
		}
		if(typeof max != "number" && max != ""){
			if(isNaN(max)) max = ""; else max = parseFloat(max);
			unsavedNew = true;
			convertedToNumber = true;
		}
		var aliasObj = aliases[alias].common.alias || {};
		var aliasId = aliasObj.id || "";
		var aliasRead = aliasObj.read || "";
		var aliasWrite = aliasObj.write || "";
		if(aliasId) aliasesUsedAliasIds.push(aliasId);
		listContent += "<li class='collection-item'  style='background-color: rgba(255,255,255,0.5); border-width: 4px;' data-id='" + alias + "' data-main='" + (isMain ? "true" : "false") + "'>";
		listContent += "<div class='row aliasesDatapointRow' style='background-color: rgba(0,0,0,0.2);'>";
		if(!isMain) listContent += 	"<i class='aliasesDatapoint delete material-icons' data-id='" + alias + "' data-setting='delete' data-main='" + (isMain ? "true" : "false") + "' style='position:absolute; right:6px; cursor:pointer; color:#e60000;'>delete</i>";
		listContent += 	"<div class='col s11 m6 l6'>";
		listContent += 		"<h6>" + alias + ":<h6>";
		listContent += 	"</div>";
		listContent += 	"<div class='col s12 m5 l5'>";
		listContent += 		"<input class='val aliasesDatapoint' name='aliasesDatapoint_" + alias + "_NAME' id='aliasesDatapoint_" + alias + "_NAME' data-id='" + alias + "' data-setting='name' value='" + name + "' data-main='" + (isMain ? "true" : "false") + "'></input>";
		listContent += 		"<label for='aliasesDatapoint_" + alias + "_NAME' class='translate'></label>";
		listContent += 		"<span class='translate'>Name</span>";
		listContent += 	"</div>";
		listContent += "</div>";
		listContent += "<div class='row aliasesDatapointRow' style='background-color: rgba(0,0,255,0.1);'>";
		listContent += 	"<div class='col s12 m6 l4'>";
		listContent += 		"<input class='val aliasesDatapoint' name='aliasesDatapoint_" + alias + "_ROLE' id='aliasesDatapoint_" + alias + "_ROLE' data-id='" + alias + "' data-setting='role' value='" + role + "' data-main='" + (isMain ? "true" : "false") + "'></input>";
		listContent += 		"<label for='aliasesDatapoint_" + alias + "_ROLE' class='translate'></label>";
		listContent += 		"<span class='translate'>common.role</span>";
		listContent += 	"</div>";
		if(aliases[alias].type == "state"){ //STATE
			listContent += 	"<div class='col s12 m6 l4'>";
			listContent += 		"<input class='val aliasesDatapoint' name='aliasesDatapoint_" + alias + "_TYPE' id='aliasesDatapoint_" + alias + "_TYPE' data-id='" + alias + "' data-setting='type' value='" + type + "'></input>";
			listContent += 		"<label for='aliasesDatapoint_" + alias + "_TYPE' class='translate'></label>";
			listContent += 		"<span class='translate'>common.type</span>";
			listContent += 	"</div>";
			listContent += 	"<div class='col s12 m6 l4'>";
			listContent += 		"<input class='val aliasesDatapoint' name='aliasesDatapoint_" + alias + "_UNIT' id='aliasesDatapoint_" + alias + "_UNIT' data-id='" + alias + "' data-setting='unit' value='" + unit + "'></input>";
			listContent += 		"<label for='aliasesDatapoint_" + alias + "_UNIT' class='translate'></label>";
			listContent += 		"<span class='translate'>common.unit</span>";
			listContent += 	"</div>";
			listContent += "</div>";
			listContent += "<div class='row aliasesDatapointRow' style='background-color: rgba(0,255,0,0.1);'>";
			listContent += 	"<div class='col s12 m6 l4'>";
			listContent += 		"<input class='val aliasesDatapoint' data-type='number' type='number' name='aliasesDatapoint_" + alias + "_MIN' id='aliasesDatapoint_" + alias + "_MIN' data-id='" + alias + "' data-setting='min' value='" + min + "'></input>";
			listContent += 		"<label for='aliasesDatapoint_" + alias + "_MIN' class='translate'></label>";
			listContent += 		"<span class='translate'>common.min</span>";
			listContent += 	"</div>";
			listContent += 	"<div class='col s12 m6 l4'>";
			listContent += 		"<input class='val aliasesDatapoint' data-type='number' type='number' name='aliasesDatapoint_" + alias + "_MAX' id='aliasesDatapoint_" + alias + "_MAX' data-id='" + alias + "' data-setting='max' value='" + max + "'></input>";
			listContent += 		"<label for='aliasesDatapoint_" + alias + "_MAX' class='translate'></label>";
			listContent += 		"<span class='translate'>common.max</span>";
			listContent += 	"</div>";
			listContent += 	"<div class='col s12 m6 l4'>";
			listContent += 		"<p><label>";
			listContent += 		"<input class='val aliasesDatapoint checkbox' data-type='checkbox' type='checkbox' name='aliasesDatapoint_" + alias + "_READ' id='aliasesDatapoint_" + alias + "_READ' data-id='" + alias + "' data-setting='read'" + (read ? " checked='checked'" : "") + "></input>";
			listContent += 		"<span class='translate'>common.read</span>";
			listContent += 		"</p></label>";
			listContent += 	"</div>";
			listContent += 	"<div class='col s12 m6 l4'>";
			listContent += 		"<p><label>";
			listContent += 		"<input class='val aliasesDatapoint checkbox' data-type='checkbox' type='checkbox' name='aliasesDatapoint_" + alias + "_WRITE' id='aliasesDatapoint_" + alias + "_WRITE' data-id='" + alias + "' data-setting='write'" + (write ? " checked='checked'" : "") + "></input>";
			listContent += 		"<span class='translate'>common.write</span>";
			listContent += 		"</p></label>";
			listContent += 	"</div>";
			listContent += "</div>";
			listContent += "<div class='row aliasesDatapointRow'  style='background-color: rgba(255,0,0,0.1);'>";
			listContent += 	"<div class='col s12 m6 l4' style='background-color: rgba(255,0,0,0.1);'>";
			listContent += 		"<input class='val aliasesDatapoint' name='aliasesDatapoint_" + alias + "_ALIAS_ID' id='aliasesDatapoint_" + alias + "_ALIAS_ID' data-id='" + alias + "' data-setting='aliasId' value='" + aliasId + "'></input>";
			listContent += 		"<label for='aliasesDatapoint_" + alias + "_ALIAS_ID' class='translate'></label>";
			listContent += 		"<span class='translate'>Alias id</span>";
			listContent += 		"<i class='material-icons aliasesDatapoint selectId' data-id='" + alias + "' data-selectidfor='aliasesDatapoint_" + alias + "_ALIAS_ID' style='position: absolute; right: 5px; top: 10px; cursor: hand;'>edit</i>";
			listContent += 	"</div>";
			listContent += 	"<div class='col s12 m6 l4'>";
			listContent += 		"<input class='val aliasesDatapoint' name='aliasesDatapoint_" + alias + "_ALIAS_READ' id='aliasesDatapoint_" + alias + "_ALIAS_READ' data-id='" + alias + "' data-setting='aliasRead' value='" + aliasRead + "'></input>";
			listContent += 		"<label for='aliasesDatapoint_" + alias + "_ALIAS_READ' class='translate'></label>";
			listContent += 		"<span class='translate'>Alias Read-Function (keyword for value is val)</span>";
			listContent += 	"</div>";
			listContent += 	"<div class='col s12 m6 l4'>";
			listContent += 		"<input class='val aliasesDatapoint' name='aliasesDatapoint_" + alias + "_ALIAS_WRITE' id='aliasesDatapoint_" + alias + "_ALIAS_WRITE' data-id='" + alias + "' data-setting='aliasWrite' value='" + aliasWrite + "'></input>";
			listContent += 		"<label for='aliasesDatapoint_" + alias + "_ALIAS_WRITE' class='translate'></label>";
			listContent += 		"<span class='translate'>Alias Write-Function (keyword for value is val)</span>";
			listContent += 	"</div>";
		}
		listContent += "</div>";
		listContent += "</div>";
		listContent += "<div class='row aliasesDatapointRow'>";
		listContent += 	"<div class='col s12 m6 l6'>";
		listContent += 		"<a class='aliasesDatapoint save waves-effect waves-light btn' id='aliasesDatapoint_" + alias + "_SAVE' data-id='" + alias + "' data-setting='save' style='margin-top: 20px;" + (unsavedNew ? "" : " display: none;") + "'><i class='material-icons left'>save</i><span class='translate'>Save changes</span></a>";
		listContent += 	"</div>";
		if(convertedToNumber){
			listContent += 	"<div class='col s12 m6 l6'>";
			listContent += 		"<i class='material-icons left'>info</i><span class='translate'>Converted some datapoints to type number</span>";
			listContent += 	"</div>";			
		}
		listContent += "</div>";
		listContent += "</li>";
		if(isMain){
			$('#aliasesAliasMainList').append(listContent);
		} else {
			$('#aliasesDatapointList').append(listContent);
		}
		if (M) M.updateTextFields();
		if(unsavedNew) $('.aliasesDatapointSaveAll').show();
		//Show save button on change
		$('.aliasesDatapoint.val[data-id="' + alias + '"]').on('input change', function(){
			$('.aliasesDatapoint.save[data-id="' + $(this).data('id') + '"]').show();
			$('.aliasesDatapointSaveAll').show();
		});
		//Save datapoint
		$('.aliasesDatapoint.save[data-id="' + alias + '"]').on('click', function(){
			saveDatapoints([alias]);
		});
		//Delete datapoint
		$('.aliasesDatapoint.delete[data-id="' + alias + '"]').on('click', function(){
			if(confirm(_("Delete datapoint? This can't be undone!"))) deleteDatapoints([alias], function(){
				$('#aliasesDatapointList li[data-id="' + alias + '"]').remove();
			});
		});
		//Enhance SelectId-Buttons with function
		$('.aliasesDatapoint.selectId[data-id="' + alias + '"]').on('click', function(){
			$('#dialogSelectId').data('selectidfor', $(this).data('selectidfor'));
			initSelectId(function (sid) {
				sid.selectId('show', $('#' + $('#dialogSelectId').data('selectidfor').replace(/\./g, '\\.').replace(/\ /g, '\\ ')).val(), {type: 'state'}, function (newId) {
					if (newId) {
						$('#' + $('#dialogSelectId').data('selectidfor').replace(/\./g, '\\.').replace(/\ /g, '\\ ')).val(newId).trigger('change');
					}
				});
			});
			
		});
		//Enhance type and role with function
		enhanceTextInputToCombobox('.aliasesDatapoint.val[data-id="' + alias + '"][data-setting="type"]', Object.keys(defaultDatapointRoles).join(";"), false);
		$('.aliasesDatapoint.val[data-id="' + alias + '"][data-setting="type"]').on('change init', function(){
			enhanceTextInputToCombobox('.aliasesDatapoint.val[data-id="' + $(this).data('id') + '"][data-setting="role"]', defaultDatapointRoles[$(this).val()].join(";"));
		}).trigger('init');
		enhanceTextInputToCombobox('.aliasesDatapoint.val[data-id="' + alias + '"][data-setting="role"][data-main="true"]', defaultMainRoles.join(";"), false);
	}
	

	//Copy (and rename)
	function copyAlias(deleteOld, saveNew){
		initDialog('dialogAliasesCopyAlias', function(){ //save dialog
			var oldName = $('#dialogAliasesCopyAlias').data('oldName');
			var newName = $('#dialogAliasesCopyAliasNewName').val();
			var oldId = aliasesSelectedAlias;
			var newId = $('#dialogAliasesCopyAliasNewId').val();
			var replacements = [];
			$('#dialogAliasesCopyAliasReplaceDatapointsList li').each(function(){
				var index = $(this).data('index');
				replacements.push({searchValue: $('.dialogAliasesCopyAliasReplaceDatapoints.searchvalue[data-index=' + index + ']').val(), newValue: $('.dialogAliasesCopyAliasReplaceDatapoints.newvalue[data-index=' + index + ']').val()});
			});
			var idsToSave = [];
			var idsToDelete = [];
			for(oldAlias in aliases){
				if(oldAlias.indexOf(oldId) == 0){
					var oldObj = aliases[oldAlias];
					var newAlias = newId + oldAlias.substring(oldId.length);
					if(saveNew) idsToSave.push(newAlias);
					aliases[newAlias] = JSON.parse(JSON.stringify(aliases[oldAlias])); //Copy old alias into new
					if(oldAlias.length == oldId.length){ // Main
						aliases[newAlias].UNSAVED_NEW = true;
						aliases[newAlias].type = oldObj.type || "channel";
						if(typeof aliases[newAlias].common != "object") aliases[newAlias].common = {};
						aliases[newAlias].common.name = newName;
						aliases[newAlias]._id = newAlias; 
					} else { //Datapoint
						aliases[newAlias].UNSAVED_NEW = true;
						aliases[newAlias].type = oldObj.type || "state";
						if(typeof aliases[newAlias].common != "object") aliases[newAlias].common = {};
						aliases[newAlias].common.name = (oldObj.common && oldObj.common.name || newName).replace(oldName, newName);
						if(typeof aliases[newAlias].common.alias != "object") aliases[newAlias].common.alias = {};
						aliases[newAlias].common.alias.id = multiReplace(oldObj.common && oldObj.common.alias && oldObj.common.alias.id || "", replacements);
						aliases[newAlias]._id = newAlias; 
					}
					if(deleteOld && oldAlias != newAlias){
						idsToDelete.push(oldAlias);
					}
				}
			};
			saveDatapoints(idsToSave, function(err){ 
				if(!err) deleteDatapoints(idsToDelete, function(err) {
					if(!err) loadTabAliases(newId); else alert(_("Error deleting old Datapoints"));
				}); else alert(_("Error saving Datapoints"));
			});	
		});
		$('#dialogAliasesCopyAlias').data('oldName', getAliasName(aliasesSelectedAlias));
		$('#dialogAliasesCopyAliasNewName').val(getAliasName(aliasesSelectedAlias));
		$('#dialogAliasesCopyAliasNewId').val(aliasesSelectedAlias);
		$('#dialogAliasesCopyAliasReplaceDatapointsList').empty();
		if(deleteOld) $('#dialogAliasesCopyAlias .modal-action.btn-set span').html(_("Rename this alias")); else $('#dialogAliasesCopyAlias .modal-action.btn-set span').html(_("Copy this alias"));
		$('#dialogAliasesCopyAlias').modal('open');
		$('#dialogAliasesCopyAlias').css('z-index', modalZIndexCount++);			
	}
	$('#dialogAliasesCopyAliasReplaceDatapointsAdd').on('click', function(){
		var index = $('#dialogAliasesCopyAliasReplaceDatapointsList').data('length') || 0;
		var listContent = "";
		listContent += "<li class='collection-item' data-index='" + index + "'>";
		listContent += "<div class='row'>";
		listContent += 	"<div class='col s12 m5 l5'>";
		listContent += 		"<input class='val dialogAliasesCopyAliasReplaceDatapoints searchvalue' name='dialogAliasesCopyAliasReplaceDatapoints_" + index + "_SEARCH_VALUE' id='dialogAliasesCopyAliasReplaceDatapoints_" + index + "_SEARCH_VALUE' data-index='" + index + "' data-setting='searchvalue' value=''></input>";
		listContent += 		"<label for='dialogAliasesCopyAliasReplaceDatapoints_" + index + "_SEARCH_VALUE' class='translate'></label>";
		listContent += 		"<span class='translate'>Replace this string...</span>";
		listContent += 	"</div>";
		listContent += 	"<div class='col s1 m1 l1'>";
		listContent += 		"<i class='material-icons' style='margin-top:35px;'>arrow_forward</i>";
		listContent += 	"</div>";
		listContent += 	"<div class='col s10 m5 l5'>";
		listContent += 		"<input class='val dialogAliasesCopyAliasReplaceDatapoints newvalue' name='dialogAliasesCopyAliasReplaceDatapoints_" + index + "_NEW_VALUE' id='dialogAliasesCopyAliasReplaceDatapoints_" + index + "_NEW_VALUE' data-index='" + index + "' data-setting='newvalue' value=''></input>";
		listContent += 		"<label for='dialogAliasesCopyAliasReplaceDatapoints_" + index + "_NEW_VALUE' class='translate'></label>";
		listContent += 		"<span class='translate'>...with this string.</span>";
		listContent += 		"<i class='material-icons dialogAliasesCopyAliasReplaceDatapoints selectId' data-index='" + index + "' data-selectidfor='dialogAliasesCopyAliasReplaceDatapoints_" + index + "_NEW_VALUE' style='position: absolute; right: 5px; top: 10px; cursor: hand;'>edit</i>";
		listContent += 	"</div>";
		listContent += 	"<div class='col s1 m1 l1'>";
		listContent += 		"<i class='material-icons'  style='margin-top:35px; cursor:pointer; color:#e60000;' onclick='$(\"#dialogAliasesCopyAliasReplaceDatapointsList li[data-index=" + index + "]\").remove();'>delete</i>";
		listContent += 	"</div>";
		listContent += "</div>";
		listContent += "</li>";
		$('#dialogAliasesCopyAliasReplaceDatapointsList').append(listContent);
		$('#dialogAliasesCopyAliasReplaceDatapointsList').data('length', index + 1);
		enhanceTextInputToCombobox('.dialogAliasesCopyAliasReplaceDatapoints.searchValue', aliasesUsedAliasIds.join(";"), false);
		$('.dialogAliasesCopyAliasReplaceDatapoints.selectId[data-index="' + index + '"]').on('click', function(){
			$('#dialogSelectId').data('selectidfor', $(this).data('selectidfor'));
			initSelectId(function (sid) {
				sid.selectId('show', $('#' + $('#dialogSelectId').data('selectidfor').replace(/\./g, '\\.').replace(/\ /g, '\\ ')).val(), {type: 'state'}, function (newId) {
					if (newId) {
						$('#' + $('#dialogSelectId').data('selectidfor').replace(/\./g, '\\.').replace(/\ /g, '\\ ')).val(newId).trigger('change');
					}
				});
			});
			
		});
	});

	//Save Datapoints
	function saveDatapoints(ids, callback){
		alias = ids.pop();
		if(alias){
			var newObj = Object.assign({}, aliases[alias]);
			var isMain = $('.aliasesDatapoint.val[data-id="' + alias + '"][data-setting="name"]').data('main');
			delete newObj.UNSAVED_NEW;
			if(typeof newObj.common != "object") newObj.common = {};
			if(typeof newObj.common.alias != "object" && !isMain) newObj.common.alias = {};
			$('.aliasesDatapoint.val[data-id="' + alias + '"]').each(function(){
				$this = $(this);
				var setting = $this.data('setting');
				if(setting == "aliasId") {
					newObj.common.alias["id"] = $this.val();
				} else if(setting == "aliasRead") {
					newObj.common.alias["read"] = $this.val();
				} else if(setting == "aliasWrite") {
					newObj.common.alias["write"] = $this.val();
				} else {
					if ($this.attr('type') === 'checkbox') {
						newObj.common[setting] = $this.prop('checked');
					} else if ($this.attr('type') === 'number') {
						if(isNaN($this.val())){
							alert("Error: NaN");
						} else {
							var numVal = parseFloat($this.val());
							if (numVal == null) numVal = "";
							newObj.common[setting] = numVal;
						}
					} else {
						newObj.common[setting] = $this.val();
					}
				}
			});
			if(isMain){ //Update Id and Name in Selectbox
			var name = $('.aliasesDatapoint.val[data-id="' + alias + '"][data-setting="name"]').val() || alias;
				$('#aliasesSelectedAlias option[value="' + alias + '"]').html(alias + (name != alias ? " (" + name + ")" : "&nbsp;"));
				$('#aliasesSelectedAlias').select();
			}
			(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
				var _ids = ids;
				var _alias = alias;
				var _callback = callback;
				socket.emit('setObject', alias, newObj, function(err){
					if(!err) {
						$('.aliasesDatapoint.save[data-id="' + _alias + '"]').hide();
						delete aliases[_alias].UNSAVED_NEW;
						var allSaved = true;
						$('.aliasesDatapoint.save').each(function(){
							if($(this).css('display') != "none") allSaved = false;
						});
						if(allSaved) $('.aliasesDatapointSaveAll').hide();
						if(_ids.length){
							saveDatapoints(_ids, _callback);
						} else {
							if(_callback) _callback();
						}
					} else {
						if(_callback) _callback("error");
					}
				});		
			})(); //<--End Closure
		} else {
			if(callback) callback();
		}
	}
	
	//Delete Datapoints
	function deleteDatapoints(ids, callback){
		alias = ids.pop();
		if(alias){
			(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
				var _ids = ids;
				var _alias = alias;
				var _callback = callback;
				socket.emit('delObject', alias, function(err){
					if(!err) {
						delete aliases[_alias];
						if(_ids.length){
							deleteDatapoints(_ids, _callback);
						} else {
							if(_callback) _callback();
						}
					} else {
						if(_callback) _callback("error");
					}
				});		
			})(); //<--End Closure
		} else {
			if(callback) callback();
		}
	}
}

/************** SAVE *****************************************************************
*** This will be called by the admin adapter when the user presses the save button ***
*************************************************************************************/
function save(callback) {
	//Select elements with class=value and build settings object
	var obj = {};
	$('.value').each(function () {
		var $this = $(this);
		if ($this.attr('type') === 'checkbox') {
			obj[$this.attr('id')] = $this.prop('checked');
		} else {
			obj[$this.attr('id')] = $this.val();
		}
	});
	callback(obj);
}
