
function loadMap(item) {

	var point = "哈尔滨市";

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
						geocodeSearch(add);

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