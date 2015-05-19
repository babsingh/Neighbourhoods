/* Use web scrapping to get ONS data 
   Use ONS data to generate database 
 */

var request = require("request");
var mongoose = require('mongoose'),
	Element = mongoose.model('Element');

/* Updates indicators for all cities */
exports.getData = function(req, res) {
	Element.remove({}, function(err) {
		if (err) {
			throw err;
		}
		console.log("Elements removed");
		for (var key in cities) {
			var link = "http://neighbourhoodstudy.ca" + cities[key];
			console.log ("Name: " + key + " Webpage: " + link);
			get_site(link, key);
		}
	});
};

exports.cities = function (req, res) {
	var output = [];
	var i = 0
	for (var key in cities) {
		output[i] = key;
		i++;
	}
	res.json(output);
};

exports.indicators = function (req, res) {
	res.json(indicators);
};

/* 
   Extract information for all indicators for a city 
   from its respective ONS website 
 */
function get_site (input, city) {
	request({
		  uri: input,
		}, function(error, response, body) {
		  if (error) {
		  	console.log(error);
		  } else {
		  	var regex;
		  	var regex1 = /^<td>([0-9a-zA-Z.]+)<\/td>$/;
		  	var result;
		  	var result1;
		  	var lines = body.split("\n");
		  	var lines_len = lines.length;
		  	var indic_len = indicators.length;

		  	for (var i = 0; i < lines_len; i++) {
		  		for (var j = 0; j < indic_len; j++) {

		  			regex = new RegExp("^<td>" + indicators[j] + "<\/td>$");	
		  			result = lines[i].match(regex);
		  			if (result) {
		  				result1 = lines[i+1].match(regex1);
		  				console.log(city + ": " + indicators[j] + ": " + result1[1]);
		  				
		  				var element = new Element();
		  				element.location = city;
		  				element.indicator = indicators[j];
		  				element.value = result1[1];
		  				element.save(function (err) {
		  					if (err) {
		  						throw err;
		  					}
		  				});
		  			}
		  		}
		  	}
		  }
		});
}

/* Static list of cities and their corresponding pages 
   Will generate the below variable dynamically in future 
 */
var cities = { 
	'Barrhaven' : '/?page_id=193',
	'Bayshore' : '/?page_id=417',
	'Beacon Hill - South Cardinal Heights' : '/?page_id=425',
	'Beaverbrook' : '/?page_id=429',
	'Bells Corners East' : '/?page_id=432',
	'Bells Corners West' : '/?page_id=435',
	'Billings Bridge - Alta Vista' : '/?page_id=440',
	'Blackburn Hamlet' : '/?page_id=445',
	'Borden Farm - Stewart Farm - Parkwood Hills - Fisher Glen' : '/?page_id=448',
	'Braemar Park - Bel Air Heights - Copeland Park' : '/?page_id=451',
	'Briar Green - Leslie Park' : '/?page_id=455',
	'Bridlewood - Emerald Meadows' : '/?page_id=458',
	'Britannia Village' : '/?page_id=461',
	'Byward Market' : '/?page_id=464',
	'Carleton Heights - Rideauview' : '/?page_id=468',
	'Carlington' : '/?page_id=471',
	'Carlingwood West - Glabar Park - McKellar Heights' : '/?page_id=474',
	'Carp - Hardwood Plains' : '/?page_id=477',
	'Carp Ridge' : '/?page_id=6901',
	'Carson Grove - Carson Meadows' : '/?page_id=479',
	'Centrepointe' : '/?page_id=677',
	'Centretown' : '/?page_id=241',
	'CFB Rockcliffe - NRC' : '/?page_id=683',
	'Chapman Mills - Rideau Crest - Davidson Heights' : '/?page_id=532',
	'Skyline - Fisher Heights' : '/?page_id=534',
	'Civic Hospital - Central Park' : '/?page_id=539',
	'Constance Bay' : '/?page_id=6903',
	'Corkery' : '/?page_id=6875',
	'Cityview - Crestview - Meadowlands' : '/?page_id=542',
	'Crystal Bay - Lakeview Park' : '/?page_id=546',
	'Cumberland' : '/?page_id=711',
	'Cummings' : '/?page_id=719',
	'Dunrobin' : '/?page_id=6905',
	'East Industrial' : '/?page_id=724',
	'Elmvale - Eastway - Riverview - Riverview Park West' : '/?page_id=729',
	'Emerald Woods - Sawmill Creek' : '/?page_id=736',
	'Galetta' : '/?page_id=6880',
	'Fitzroy Harbour - West Carleton' : '/?page_id=744',
	'Glebe - Dows Lake' : '/?page_id=750',
	'Glen Cairn - Kanata South Business Park' : '/?page_id=755',
	'Greely' : '/?page_id=759',
	'Greenbelt' : '/?page_id=764',
	'Greenboro East' : '/?page_id=768',
	'Hawthorne Meadows - Sheffield Glen' : '/?page_id=773',
	'Hintonburg - Mechanicsville' : '/?page_id=2161',
	'Hunt Club East-Western Community' : '/?page_id=783',
	'Hunt Club Ottawa Airport' : '/?page_id=958',
	'Hunt Club Park' : '/?page_id=965',
	'Hunt Club South Industrial' : '/?page_id=6907',
	'Hunt Club Upper - Blossom Park - Timbermill' : '/?page_id=970',
	'Hunt Club Woods - Quintarra - Revelstoke' : '/?page_id=974',
	'Iris' : '/?page_id=978',
	'Island Park' : '/?page_id=984',
	'Kanata Lakes - Marchwood - Lakeside - Morgans Grant - Kanata North Business Park' : '/?page_id=931',
	'Katimavik - Hazeldean' : '/?page_id=923',
	'Kinburn' : '/?page_id=6882',
	'Laurentian' : '/?page_id=917',
	'Ledbury - Heron Gate - Ridgemont - Elmwood' : '/?page_id=913',
	'Lindenlea - New Edinburgh' : '/?page_id=909',
	'Lowertown' : '/?page_id=904',
	'Manotick - North Gower' : '/?page_id=900',
	'Merivale Gardens - Grenfell Glen - Pineglen Country Place' : '/?page_id=897',
	'Metcalfe' : '/?page_id=893',
	'Munster Hamlet - Richmond' : '/?page_id=889',
	'Navan - Vars' : '/?page_id=882',
	'New Barrhaven - Stonebridge' : '/?page_id=877',
	'North Gower' : '/?page_id=6886',
	'Orleans - Avalon - Notting Gate - Fallingbrook- Gardenway South' : '/?page_id=871',
	'Orleans Central' : '/?page_id=549',
	'Orleans — Chapel Hill' : '/?page_id=557',
	'Orleans — Chapel Hill South' : '/?page_id=563',
	'Orléans Chatelaine Village' : '/?page_id=567',
	'Orleans North West' : '/?page_id=571',
	'OrlÃ©ans — Queenswood Heights' : '/?page_id=575',
	'Orleans Village — Chateauneuf' : '/?page_id=582',
	'Osgoode' : '/?page_id=6913',
	'Ottawa East' : '/?page_id=585',
	'Ottawa South' : '/?page_id=587',
	'Overbrook West — McArthur' : '/?page_id=592',
	'Pierces Corners' : '/?page_id=6915',
	'Pineview' : '/?page_id=596',
	'Playfair Park — Lynda Park — Guildwood Estates' : '/?page_id=600',
	'Qualicum — Redwood Park' : '/?page_id=604',
	'Richmond' : '/?page_id=6917',
	'Riverside Park' : '/?page_id=1428',
	'Riverside South — Leitrim' : '/?page_id=612',
	'Rockcliffe – Manor Park' : 'http://neighbourhoodstudy.ca/rockcliffe-manor-park/',
	'Rothwell Heights — Beacon Hill North' : '/?page_id=622',
	'Russell - Edwards' : '/?page_id=6894',
	'Sandy Hill-Ottawa East' : '/?page_id=627',
	'Sarsfield' : '/?page_id=6897',
	'South Keys — Heron Gate — Greenboro West' : '/?page_id=630',
	'Stittsville' : '/?page_id=633',
	'Tanglewood' : '/?page_id=358',
	'Trend - Arlington' : '/?page_id=367',
	'Vanier North' : '/?page_id=372',
	'Vanier South' : '/?page_id=376',
	'Vars' : '/?page_id=6899',
	'West Centretown' : '/?page_id=387',
	'Westboro' : '/?page_id=381',
	'Whitehaven - Queensway Terrace' : '/?page_id=394',
	'Woodroffe - Lincoln Heights' : '/?page_id=399',
	'Woodvale - Craig Henry - Manordale - Estates of Arlington Woods ' : '/?page_id=404',
};

/* Static array of indicators 
   Will generate the below variable dynamically in future 
 */
var indicators = [
	"Number of defibrillators",
	"Number of defibrillators per 1000 residents",
	"Avg. distance to a defibrillator (km)",
	"Number of pharmacies",
	"Number of pharmacies per 1000 residents",
	"Avg. distance to a pharmacy (km)",
	"Total Population",
	"Number of CHRCs",
	"Avg. distance to nearest CHRC (km)",
	"Number of child care agencies",
	"Number of child care agencies per 1000 people",
	"Avg. distance to a child care agency (km)",
	"Number of English Child Care Agencies",
	"Avg. distance to nearest English Child Care Agency (km)",
	"Number of French Child Care Agencies",
	"Avg. distance to the nearest French Child Care Agency (km)",
	"Avg. distance to nearest healthy financial service (m)",
	"Avg. distance to nearest 10 healthy financial services (m)",
	"Avg. number of healthy financial services within 1 km",
	"Avg. distance to nearest alternative financial service (m)",
	"Avg. distance to nearest 10 alternative financial services (m)",
	"Avg. number of alternative financial services within 1 km",
	"Number of alternative financial services ",
	"Number of healthy financial services",
	"Number of alternative financial services per 1000 people",
	"Number of healthy financial services per 1000 people",
	"Total number of dentists",
	"Number of dentists per 1000 people",
	"Avg. distance to a dentist (km)",
	"Avg. distance to a mental health service location (km)",
	"Total number of mental health service locations",
	"Total number of needle drop boxes",
	"Number of Needle Drop Boxes per 1000 people",
	"Avg. distance to a needle drop box (km)",
	"Number of Youth Services",
	"Number of Youth Services per 1000 residents",
	"Number of Aboriginal Resource Centres",
	"Number of Aboriginal Resource Centres per 1000 residents",
	"Avg. distance to nearest Aboriginal Resource Centre (km)",
	"Number of Employment Services",
	"Number of Employment Services per 1000 residents",
	"Avg. distance to nearest Employment Service (km)",
	"Number of Francophone Services",
	"Number of Francophone Services per 1000 residents",
	"Avg. distance to nearest Francophone Service (km)",
	"Number of Immigrant Services",
	"Number of Immigrant Services per 1000 residents",
	"Avg. distance to nearest Immigrant Service (km)",
	"Number of Libraries",
	"Number of Libraries per 1000 residents",
	"Avg. distance to nearest Library (km)",
	"Number of Optometrists",
	"Number of Optometrists per 1000 residents",
	"Avg. distance to nearest Optometrist (km)",
	"Overall Walkable Neighbourhood Score",
	"Pedestrian Infrastructure and Amenities",
	"Safety From Traffic",
	"Street Visibility From Houses",
	"Aesthetics",
	"Avg. distance to a Farmer's Market",
	"Number of Farmer's Markets",
	"Number of Farmer's Markets per 1000 people",
	"Avg. distance to a Good Food Box (m)",
	"Avg. number of Good Food Boxes within 1.5 km of majority of population",
	"Number of Good Food Boxes per 1000 people",
	"Total number of Good Food Boxes",
	"Avg. distance to nearest Grocery Store (km)",
	"Number of Grocery Stores",
	"Number of Grocery Stores per 1000 people",
	"Avg. distance to nearest Specialty Food Store (km)",
	"Number of Specialty Food Stores",
	"Number of Specialty Food Stores per 1000 people",
	"Avg. distance to nearest Restaurant (km)",
	"Number of Restaurants",
	"Number of Restaurants per 1000 people",
	"Avg. distance to nearest Mobile Food Trucks (km)",
	"Number of Mobile Food Trucks",
	"Number of Mobile Food Trucks per 1000 people",
	"Avg. distance to nearest Fast Food Outlet (km)",
	"Number of Fast Food Outlets",
	"Number of Fast Food outlets per 1000 people",
	"Number of Convenience Stores",
	"Avg. distance to nearest Convenience Store (km)",
	"Number of Convenience Stores per 1000 people",
	"Number of Bars/Nightclubs",
	"Number of Bars/Nightclubs per 1000 people",
	"Avg. distance to nearest Bar or Nightclub (km)",
	"Square meters of community garden per person in neighbourhood",
	"Avg. distance to nearest Community Garden (m)",
	"Number of community gardens in neighbourhood",
	"Number of community gardens per 1000 people within neighbourhood",
	"Area of all parks and paths (m2)",
	"Area of all parks and paths per person (m2)",
	"Number of Sports Field on School Property per 1000 people",
	"Avg. distance to a Sports Field on School Property (km)",
	"Number of Sports Field on School Property",
	"Avg. distance to a Baseball Diamond (km)",
	"Number of Baseball Diamonds",
	"Number of Baseball Diamonds per 1000 people",
	"Avg. distance to a Baseball Diamond located on a school property (km)",
	"Number of Baseball Diamonds located on a school property",
	"Avg. distance to a Basketball Court (km)",
	"Number of Basketball Courts",
	"Number of Basketball Courts per 1000 people",
	"Number of Community Rec. Centres",
	"Avg. distance to a Community Rec. Centre (km)",
	"Number of Community Rec. Centres per 1000 people",
	"Number of Bowling Lawns",
	"Avg. distance to a Bowling Lawn (km)",
	"Number of Bowling Lawns per 1000 people",
	"Number of Outdoor Pools",
	"Avg. distance to an Outdoor Pool (km)",
	"Number of Outdoor Pools per 1000 people",
	"Number of Outdoor Wading Pools",
	"Avg. distance to an Outdoor Wading Pool (km)",
	"Number of Outdoor Wading Pools per 1000 people",
	"Number of Outdoor Rinks",
	"Avg. distance to an Outdoor Rink (km)",
	"Number of Outdoor Rinks per 1000 people",
	"Number of Play Structures",
	"Avg. distance to a Play Structure (km)",
	"Number of Play Structures per 1000 people",
	"Number of Skateboard Parks",
	"Avg. distance to a Skateboard Park (km)",
	"Number of Skateboard Parks per 1000 people",
	"Number of Sledding Hills",
	"Avg. distance to a Sledding Hill (km)",
	"Number of Sledding Hills per 1000 people",
	"Number of Splash Pads",
	"Avg. distance to a Splash Pad (km)",
	"Number of Splash Pads per 1000 people",
	"Number of Sports Fields",
	"Avg. distance to a Sports Field on School Property (km)",
	"Number of Sports Fields per 1000 people",
	"Number of Tennis Court",
	"Avg. distance to a Tennis Court (km)",
	"Number of Tennis Court per 1000 people",
	"Number of Volleyball Courts",
	"Avg. distance to a Volleyball Court (km)",
	"Number of Volleyball Courts per 1000 people",
	"Total number of recreational sites per 1000 people",
	"Total Number of recreational sites",
	"Number of Beaches",
	"Number of Beaches per 1000 people",
	"Avg. distance to a Beach (km)",
	"Number of english elementary schools",
	"Number of english elementary schools per 1000 people",
	"Avg. distance to nearest english elementary school (km)",
	"Number of french elementary schools",
	"Number of french elementary schools per 1000 people",
	"Avg. distance to nearest french elementary school (km)",
	"Number of english high schools",
	"Number of english high schools per 1000 people",
	"Avg. distance to nearest english high school (km)",
	"Number of french high schools",
	"Number of french high schools per 1000 people",
	"Avg. distance to nearest french high school (km)",
	"Number of adult/alternative schools",
	"Number of adult/alternative schools per 1000 people",
	"Avg. distance to nearest adult/alternative school (km)",
	"Number of private schools",
	"Number of private schools per 1000 people",
	"Avg. distance to nearest private school (km)",
	"Area of neighbourhood (km2)",
	"Population density (# of people per km2)",
	"Area (m2) per person",
	"Total Male Population",
	"Total Female Population",
	"Number of social and affordable housing units",
	"Number of social and affordable housing units per 1000 people",
	"Number of Domiciliary Hostels",
	"Number of Domiciliary Hostels per 1000 residents",
	"Number of Long Term Care Homes",
	"Number of Long Term Care Homes per 1000 residents",
	"Number of Retirement Homes",
	"Number of Retirement Homes per 1000 residents",
	"Emergency visit rate for ACSC (per 100,000)",
	"Hospitalization rate for ACSC (per 100,000)",
	"ED visits for all unintentional injuries (all ages, per 100,000)",
	"ED visits for falls (all ages, per 100,000)",
	"Hospitalizations for all unintentional injuries (all ages, per 100,000)",
	"Hospitalizations for falls (all ages, per 100,000)",
	"Number of Beer Stores",
	"Number of Beer Stores per 1000 people",
	"Avg. distance to nearest Beer Store (km)",
	"Number of museums/galleries",
	"Number of museums/galleries per 1000 residents",
	"Avg. distance to a museum/gallery (km)"
];