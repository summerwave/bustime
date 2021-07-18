// JavaScript Document


/*成安造形大学の座標
    var lat2 = 35.1096388;
    var lng2 = 135.9020486;*/



//
// 球面三角法
//
function sphericalTrigonometry(lat1, lng1, lat2, lng2) {
    // 赤道半径
    var R = 6378137.0;

    function rad(deg) {
        return deg * Math.PI / 180;
    }

    return R *
        Math.acos(
            Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) *
            Math.cos(rad(lng2) - rad(lng1)) +
            Math.sin(rad(lat1)) *
            Math.sin(rad(lat2))
        );
}


var getSuccess = function(pos) {

    //現在地の緯度経度
    var lat1 = pos.coords.latitude;
    var lng1 = pos.coords.longitude;

    //成安造形大学の座標//
    var lat2 = 35.1096388;
    var lng2 = 135.9020486;

    //距離の計算//
    var ans2;
    try {
        ans2 = sphericalTrigonometry(lat1, lng1, lat2, lng2);
    } catch (e) {
        alert(e);
    }

    //結果
	console.log(ans2);
	
	var num = ans2;
	if (num < 1504.517){   /*1504.517(m)は成安造形大学から雄琴温泉駅の直線距離*/
		var uni_s = document.getElementById("to_univSat_slider");
		var sta_s = document.getElementById("to_stationSat_slider");
		var uni = document.getElementById("to_univ_slider");
		var sta = document.getElementById("to_station_slider");
		
var bustimeElement = document.getElementById("bustime"); // id=bustimeの要素を取得
bustimeElement.insertBefore(sta_s, uni_s); // bustime要素内のsta_sをuni_sの前に再挿入する
bustimeElement.insertBefore(sta, uni);	// bustime要素内のstaをuniの前に再挿入する	
	}
};

var geoError = function() {
    var pos = {
        'coords': {
            'latitude': 35.5562073,
            'longitude': 139.5723855
        }
    };
    getSuccess(pos);
    alert('Getting location failed.');
};

// 現在位置を取得する
navigator.geolocation.getCurrentPosition(getSuccess, geoError, {
        enableHighAccuracy: true
    });
