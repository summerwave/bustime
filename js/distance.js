// JavaScript Document


/*成安造形大学の座標
    var lat2 = 35.1096388;
    var lng2 = 135.9020486;*/

var getSuccess = function(pos) {
    //現在地 lat:緯度,lng:経度
    var geo = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
    };
    //現在地の緯度経度
    var lat1 = geo.lat;
    var lng1 = geo.lng;

    /*成安造形大学の座標*/
    var lat2 = 35.1096388;
    var lng2 = 135.9020486;

    //距離の計算//
    function getDistance(lat1, lng1, lat2, lng2) {

       function radians(deg){
          return deg * Math.PI / 180;
       }

       return 6378.14 * Math.acos(Math.cos(radians(lat1))* 
        Math.cos(radians(lat2))*
        Math.cos(radians(lng2)-radians(lng1))+
        Math.sin(radians(lat1))*
        Math.sin(radians(lat2)));
    }
    /*結果*/
    alert(getDistance(lat1,lng1,lat2,lng2));
};


// グローバル変数
var syncerWatchPosition = {
	count: 0 ,
	lastTime: 0 ,
} ;

// 成功した時の関数
function successFunc( position )
{
	// データの更新
	++syncerWatchPosition.count ;					// 処理回数
	var nowTime = ~~( new Date() / 1000 ) ;	// UNIX Timestamp

	// 前回の書き出しから3秒以上経過していたら描写
	// 毎回HTMLに書き出していると、ブラウザがフリーズするため
	if( (syncerWatchPosition.lastTime + 3) > nowTime )
	{
		return false ;
	}

	// 前回の時間を更新
	syncerWatchPosition.lastTime = nowTime ;

	// HTMLに書き出し
	document.getElementById( 'result' ).innerHTML = '<dt>緯度</dt><dd>' + position.coords.latitude + '</dd><dt>経度</dt><dd>' + position.coords.longitude + '</dd><dt>高度</dt><dd>' + position.coords.altitude + '</dd><dt>速度</dt><dd>' + position.coords.speed + '</dd><dt>実行回数</dt><dd>' + syncerWatchPosition.count + '回</dd>' ;

}

// 失敗した時の関数
function errorFunc( error )
{
	// エラーコードのメッセージを定義
	var errorMessage = {
		0: "原因不明のエラーが発生しました…。" ,
		1: "位置情報の取得が許可されませんでした…。" ,
		2: "電波状況などで位置情報が取得できませんでした…。" ,
		3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。" ,
	} ;

	// エラーコードに合わせたエラー内容を表示
	alert( errorMessage[error.code] ) ;
}

// オプション・オブジェクト
var optionObj = {
	"enableHighAccuracy": false ,
	"timeout": 1000000 ,
	"maximumAge": 0 ,
} ;

// 現在位置を取得する
navigator.geolocation.watchPosition( successFunc , errorFunc , optionObj ) ;