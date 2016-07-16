$(document).ready(function() {
	console.log('test');
	var point = "北京市"; //default
	myScroll = new IScroll('#wrapper', {
		scrollX: true,
		scrollY: false,
		mouseWheel: true,
		click: true
	});
	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);
	$("#scroller a").click(function() {
		$("#scroller li").removeClass('testClass');
		$(this).parent('li').addClass('testClass');
		var str = $(this).parent('li').attr("id");
		loadMap(str);
	});

	loadMap("all");
});

var myGeo = new BMap.Geocoder();

function geocodeSearch(add, id) {
	//		if(id < adds.length) {
	//			setTimeout(window.bdGEO, 400);
	//		}
	myGeo.getPoint(add, function(point) {
		if(point) {
			document.getElementById("result").innerHTML += "<div id='point_" + add + "'>" + add + ":" + point.lng + "," + point.lat + "</div></br>";
			var id = '#point' + add;
			$(id).data('pointX', point.lng);
			$(id).data('pointY', point.lat);
		}
	}, key);
}
var point = "大连市";
var myJSONObject = {
	"哈尔滨市": [{
		"id": "0",
		"name": "哈药集团世一堂制药厂",
		"pointX": "",
		"pointY": "",
		"tag": "废水",
		"qu": "道里区"
	}, {
		"id": "1",
		"name": "中国石油天然气股份有限公司哈尔滨石化分公司",
		"pointX": "",
		"pointY": "",
		"tag": "废水",
		"qu": "道里区"
	}, {
		"id": "2",
		"name": "哈尔滨东安发动机（集团）有限公司",
		"pointX": "",
		"pointY": "",
		"tag": "废水",
		"qu": "道里区"
	}],		

	"大庆市": [{
		"id": "1",
		"name": "大庆油田有限责任公司第一采油厂",
		"pointX": "",
		"pointY": "",
		"tag": "废水",
		"qu": "	萨尔图区"
	}, {
		"id": "2",
		"name": "大庆中蓝石化有限公司",
		"pointX": "",
		"pointY": "",
		"tag": "废水",
		"qu": "让胡路区"
	}]

};

function loadMap(item) {
	document.getElementById("result").innerHTML = "";
	$(".itemwrap").innerHTML = "";
	//var data_nanjing = Array("南京中电熊猫液晶显示科技有限公司", "中石化股份有限公司金陵分公司");
	//var data_dalian = Array("大连市第一中学", "大连市中山广场", "大连市修竹大厦");
	var point = $.trim($(".ac-pass").val());
	//	var myGeo = new BMap.Geocoder();
	var point = "哈尔滨市";

	//	var map = new BMap.Map("allmap");
	//	map.centerAndZoom(point, 14);
	//	var point = "大连";
	switch(item) {
		case 'all':

			var myIcon = new BMap.Icon("images/map/icon-06.png", new BMap.Size(75, 35));
			var address = "大连市第一中学";
			addPointToMap(point, myIcon, address);
			console.log('all');
			break;
		case 'guokong':
			//			var point = $.trim($(".ac-pass").val());
			for(key in myJSONObject) {
				//geocodeSearch(myJSONObject[key]);
				if(key == point) {
					for(details in myJSONObject[key]) {

						var add = myJSONObject[key][details].name;
						var id = myJSONObject[key][details].id;
						geocodeSearch(add, id);

						//console.log(add);
						//				var  longitude  = "";  
						//				var  latitude  =  "";  
						//				//获取起始地址经纬度  
						//				myGeo.getPoint(add, function(point, city) {
						//					if(details < myJSONObject[key].length) {
						//						setTimeout(window.bdGEO, 400);
						//					}
						//
//						if(myJSONObject[key][details].id == "0") {
//							var str = '<li class="current"><div class="itemDiv"><div class="item-img"></div>';
//							str += '<h4><span class="mui-badge mui-badge-primary" style="font-size: 15px;">国控单位</span>';
//							str += myJSONObject[key][details].name + '</h4></div></li>';
//						} else {
							var str = '<li><div class="itemDiv"><div class="item-img"></div>';
							str += '<h4><span class="mui-badge mui-badge-primary" style="font-size: 15px;">国控单位</span>';
							str += myJSONObject[key][details].name + '</h4></div></li>';
//						}
						//
						$(".itemwrap").append(str);
						sliderLoad();
						//					//					var id="#"+ myJSONObject[key][details].id;
						//					//					console.log(id);
						//					//					console.log(point.lng + "," + point.lat);
						//					//					var elem = $("");
						//					//					var childs=$(".itemwrap").children;
						//					//					console.log(childs);
						//					//					//					if(point) {  
						//
						//					//						
						//					////						elem.data("pointX", point.lng);
						//					//								console.log(elem.data("pointX"));			  
						//					//					}  else{
						//					//						console.log('aa');
						//					//					}        
						//				}, key);    
					}

				}

			}

			point = "哈尔滨市";
			var myIcon = new BMap.Icon("images/map/icon-04.png", new BMap.Size(75, 35));
			var address = "中国石油天然气股份有限公司哈尔滨石化分公司";
			addPointToMap(point, myIcon, address);
			console.log("国控单位");

			break;
		case 'shikong':
			console.log("市控单位");
			break;
		case 'huanbao':
			console.log("环保企业");
			break;
		case 'rencaixuqiu':
			console.log("人才需求");
			break;
		default:
			console.log("end");
	}
}

function addPointToMap(point, myIcon, address) {
	var map = new BMap.Map("allmap");
	map.centerAndZoom(point, 11);
	var myGeo = new BMap.Geocoder();
	console.log(address);
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(address, function(point, city) {
		if(point) {
			//						map.centerAndZoom(point, 14);
			var marker = new BMap.Marker(point, {
				icon: myIcon
			});
			var opt = 1;
			marker.setAnimation(BMAP_ANIMATION_DROP);
			marker.addEventListener("click", attribute);
			map.addOverlay(marker);

		} else {
			console.log("您选择地址没有解析到结果!");
		}
	});

}

function attribute(e) {

	var p = e.target;
	p.setAnimation(BMAP_ANIMATION_BOUNCE);

	alert("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);
	$("#result div").each(function() {
		var this_id = $(this).attr("id");
		alert(this_id);
	});
	navigate('prev');

}