// JavaScript Document

/* 2021 Programmed by Natsuha Nakamura */

function setup()
{
	var date = new Date();
	var week = date.getDay();
	
	// Set diagrams //
	toUniversityDiagram = new Object();
	toUniversityDiagram.minutes = makeMinutesFromDiagram((week==0||week==6) ? toUniversitySat.diagram : toUniversity.diagram);
	toStationDiagram = new Object();
	toStationDiagram.minutes = makeMinutesFromDiagram((week==0||week==6) ? toStationSat.diagram : toStation.diagram);
	
	update();
	setInterval(update, 1000.0);
	
	var busWeekElements = window.document.querySelectorAll("[data-type=service]");
	for (var i=0; i<busWeekElements.length; i++) {
		var busWeekElement = busWeekElements[i];
		var weekdayString = busWeekElement.getAttribute("data-weekday");
		
		var holidayString = busWeekElement.getAttribute("data-holiday");
		busWeekElement.innerHTML = (week==0||week==6) ? holidayString : weekdayString;
	}
}


/* ===============成安造形大学行き 平日=============== */
// 時刻の配列 //
var to_univ_times = ["8:20", "8:40", "8:47", "8:55", "9:12", "9:27", "9:44", "10:06", "10:36", "10:52", "11:20", "11:37", "11:52", "12:20", "12:37", "12:52", "13:20", "13:37", "13:53", "14:20", "14:35", "14:52", "15:11", "15;27", "15:54", "16:10", "16:26", "16:53", "17:11", "17:38", "17:54", "18:11", "18:38", "18:54", "19:11", "19:12", "19:43", "19:53", "20:06", "20:22", "20:37", "21:06", "21:21", "21:51"];
var r_to_univ_times = to_univ_times.reverse(); // 逆順に並び替え

// HTML内にあるsectionタグの雛形(id="to_univ_section_template"とする） //
var toUnivSectionElement = window.document.querySelector("#to_univ_section_template");

// Sliderのdivタグ（id="to_univ_slider"）の取得 //
var sliderElement = window.document.querySelector("#to_univ_slider");

 // divタグ内をリセット（空にする）//
sliderElement.innerHTML = ""; 

// 配列の数だけsectionタグを複製し、sliderタグ内に追加
for (var i=0; i< r_to_univ_times.length; i++) {
    var sectionElement = toUnivSectionElement.cloneNode(true);  // 雛形からHTML要素を複製
    sectionElement.setAttribute("data-etime",  r_to_univ_times[i]); // data-etimeに値を設定
    sliderElement.appendChild(sectionElement); // divタグに新しい要素を追加
    var timeElemenets = sectionElement.querySelectorAll('[data-type=to-seian]'); // sectionタグ内のdata-type="to-seian"のタグ
    for (var ii=0; ii< timeElemenets.length; ii++) {
        var timeElement = timeElemenets[ii];
        timeElement.setAttribute("data-offset", i); // data-offsetをiに設定
     }
	console.log(i);
    // 他、必要な処理
}


/* ===============成安造形大学行き 土休日=============== */
// 時刻の配列 //
var to_univSat_times = ["8:45", "8:58", "9:14", "9:30", "9:46", "10:06", "10:36", "10:52", "11:21", "11:37", "11:52", "12:21", "12:37", "12:52", "13:21", "13:37", "13:53", "14:20", "14:35", "14:52", "15:11", "15;27", "15:54", "16:10", "16:26", "16:53", "17:11", "17:38", "17:54", "18:11", "18:38", "18:54", "19:11", "19:13", "19:44", "20:07", "20:38"];
var r_to_univSat_times = to_univSat_times.reverse(); // 逆順に並び替え

// HTML内にあるsectionタグの雛形(id="to_univ_section_template"とする） //
var toUnivSatSectionElement = window.document.querySelector("#to_univSat_section_template");

// Sliderのdivタグ（id="to_univ_slider"）の取得 //
var sliderElement = window.document.querySelector("#to_univSat_slider");

 // divタグ内をリセット（空にする）//
sliderElement.innerHTML = ""; 

// 配列の数だけsectionタグを複製し、sliderタグ内に追加
for (var i=0; i< r_to_univSat_times.length; i++) {
    var sectionElement = toUnivSatSectionElement.cloneNode(true);  // 雛形からHTML要素を複製
    sectionElement.setAttribute("data-etime",  r_to_univSat_times[i]); // data-etimeに値を設定
    sliderElement.appendChild(sectionElement); // divタグに新しい要素を追加
    var timeElemenets = sectionElement.querySelectorAll('[data-type=to-seian]'); // sectionタグ内のdata-type="to-seian"のタグ
    for (var ii=0; ii< timeElemenets.length; ii++) {
        var timeElement = timeElemenets[ii];
        timeElement.setAttribute("data-offset", i); // data-offsetをiに設定
     }
	console.log(i);
    // 他、必要な処理
}



/* ==============おごと温泉駅行き 平日=============== */
// 時刻の配列 //
var to_station_times = ["8:28", "8:48", "9:03", "9:20", "9:35", "9:50", "10:12", "10:45", "11:00", "11:26", "11:45", "12:05", "12:26", "12:45", "13:00", "13:26", "13:45", "14:01", "14:25", "14:41", "15:00", "15:19", "15:35", "16:02", "16:18", "16:34", "17:01", "17:19", "17:46", "18:03", "18:19", "18:46", "19:02", "19:19", "19:20", "19:51", "20:01", "20:14", "20:30", "20:45", "21:14", "21:29", "21:59"];
var r_to_station_times = to_station_times.reverse(); // 逆順に並び替え

// HTML内にあるsectionタグの雛形(id="to_station_section_template"とする） //
var toStationSectionElement = window.document.querySelector("#to_station_section_template");

// Sliderのdivタグ（id="to_station_slider"）の取得 //
var sliderElement = window.document.querySelector("#to_station_slider");

 // divタグ内をリセット（空にする）//
sliderElement.innerHTML = ""; 

// 配列の数だけsectionタグを複製し、sliderタグ内に追加
for (var i=0; i< r_to_station_times.length; i++) {
    var sectionElement = toStationSectionElement.cloneNode(true);  // 雛形からHTML要素を複製
    sectionElement.setAttribute("data-etime",  r_to_station_times[i]); // data-etimeに値を設定
    sliderElement.appendChild(sectionElement); // divタグに新しい要素を追加
    var timeElemenets = sectionElement.querySelectorAll('[data-type=to-ogoto]'); // sectionタグ内のdata-type="to-seian"のタグ
    for (var ii=0; ii< timeElemenets.length; ii++) {
        var timeElement = timeElemenets[ii];
        timeElement.setAttribute("data-offset", i); // data-offsetをiに設定
     }
	console.log(i);
    // 他、必要な処理
}


/* ==============おごと温泉駅行き 土休日=============== */
// 時刻の配列 //
var to_stationSat_times = ["8:53", "9:06", "9:22", "9:38", "9:52", "10:12", "10:45", "11:00", "11:29", "11:45", "12:05", "12:29", "12:45", "13:00", "13:29", "13:45", "14:01", "14:25", "14:41", "15:00", "15:19", "15:35", "16:02", "16:18", "16:34", "17:01", "17:19", "17:46", "18:03", "18:19", "18:46", "19:02", "19:19", "19:21", "19:52", "20:15", "20:46"];
var r_to_stationSat_times = to_stationSat_times.reverse(); // 逆順に並び替え

// HTML内にあるsectionタグの雛形(id="to_station_section_template"とする） //
var toStationSatSectionElement = window.document.querySelector("#to_stationSat_section_template");

// Sliderのdivタグ（id="to_station_slider"）の取得 //
var sliderElement = window.document.querySelector("#to_stationSat_slider");

 // divタグ内をリセット（空にする）//
sliderElement.innerHTML = ""; 

// 配列の数だけsectionタグを複製し、sliderタグ内に追加
for (var i=0; i< r_to_stationSat_times.length; i++) {
    var sectionElement = toStationSatSectionElement.cloneNode(true);  // 雛形からHTML要素を複製
    sectionElement.setAttribute("data-etime",  r_to_stationSat_times[i]); // data-etimeに値を設定
    sliderElement.appendChild(sectionElement); // divタグに新しい要素を追加
    var timeElemenets = sectionElement.querySelectorAll('[data-type=to-ogoto]'); // sectionタグ内のdata-type="to-seian"のタグ
    for (var ii=0; ii< timeElemenets.length; ii++) {
        var timeElement = timeElemenets[ii];
        timeElement.setAttribute("data-offset", i); // data-offsetをiに設定
     }
	console.log(i);
    // 他、必要な処理
}




/* ===============スライダー=============== */
 $('.slider').slick({
		autoplay: false,//自動的に動き出すか。初期値はfalse。
		infinite: false,//スライドをループさせるかどうか。初期値はtrue。
		speed: 300,//スライドのスピード。初期値は300。
		slidesToShow: 4,//スライドを画面に4枚見せる
		slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
		prevArrow: '<div class="slickSeian-prev"></div>',//矢印部分PreviewのHTMLを変更
		nextArrow: '<div class="slickSeian-next"></div>',//矢印部分NextのHTMLを変更
		centerMode: true,//要素を中央ぞろえにする
		variableWidth: true,//幅の違う画像の高さを揃えて表示
		dots: false,//下部ドットナビゲーションの表示
	 swipe: true,
	 focusOnSelect: true,
	});



//===============日曜日だけ表示を変更する。また、時間スクルーバス終了時間に表示を変更する========================
document.addEventListener("DOMContentLoaded", function(){

  "use strict";


  //対象のクラス名
  const class_name = "dtimer";
	
  //対象クラスの領域削除判定(true:false)
  const area_delete = true;

  //再表示時CSS display値※対象クラスの領域削除判定がtrueの場合のみ影響有
  const before_disp = "block";

  //点滅開始終了前時間(設定秒前)
  const flash_time = 600;

  //点滅間隔(設定秒間隔)
  const interval_time = 1;



  //スタイルシートをhead内に挿入

  (function(){
    const css = document.createElement("style");
    css.type = "text/css";
    const keyframes = "\n@keyframes flash { \n" + 
                      "  0%{visibility: visible;}\n" +
                      "  50%{visibility: hidden;}\n" + 
                      "}\n";

    const rules = document.createTextNode(keyframes);
    css.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(css);
  }());

  //時分秒を秒変換
  const getSeconds = function(h, m){
    const s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    h = isNaN(h) ? 24 : h;
    return (h * 60 + m) * 60 + s;
  };

  //分割、値の有無判断共通
  const commonSplit = function(data, reg){
    let num;
    if(data !== undefined){
      if(arguments.length == 3){
        num = ~~(data.split(reg)[arguments[2]]) ? ~~(data.split(reg)[arguments[2]]) : undefined;
      }else{
        num = data.split(reg);
      }
    }
    return num;
  }

  //ノード単体に対する設定を行う
  let fl = true;
  function display(elem, nmonth, nday, nweek, ntime){

    //ノードに設定されている値を取得する
    const data   = elem.dataset;
    const smonth = commonSplit(data.sdate, "/", 0)||1;
    const emonth = commonSplit(data.edate, "/", 0)||12;
    const sday   = commonSplit(data.sdate, "/", 1)||1;
    const eday   = commonSplit(data.edate, "/", 1)||31;
    const dday   = commonSplit(data.dday, ",");
    const week   = commonSplit(data.week, ",");
    const stime  = getSeconds(commonSplit(data.stime, ":", 0)|0, commonSplit(data.stime, ":", 1)|0);
    const etime  = getSeconds(commonSplit(data.etime, ":", 0)||24, commonSplit(data.etime, ":", 1)|0);
    const flash  = data.flash||false;
    const color  = data.color||false;
    const tag    = elem.tagName;

    //スタイル変更用フラグ
    let show_flg  = false;
    let flash_flg = false;
    let color_flg = false;

    //表示判定
    if((!week || week.indexOf(nweek) !== -1) && (!dday || dday.indexOf(nday + "") !== -1) &&
       (smonth <= nmonth && nmonth <= emonth) && (sday <= nday && nday <= eday) &&
       (stime <= ntime && ntime <= etime)){
      show_flg  = true;
    }

    //スタイル変更する
    const add_style = "flash " + interval_time + "s steps(1) infinite";
    if(area_delete){
      elem.style.display = show_flg ? before_disp : "none";
    }else{
      elem.style.visibility = show_flg ? "visible" : "hidden";
    }
    elem.style.animation = flash_flg ? add_style : "none";
    elem.style.color = color_flg ? color : null;
  }

  //指定したノードリストに対する点灯・点滅設定を行う
  const elem_all = document.querySelectorAll('.dtimer');
  const elems = Array.prototype.slice.call(elem_all,0);

  (function displayAll(){
    const ndate = new Date();
    const nmonth = ndate.getMonth() + 1
    const nday   = ndate.getDate()
    const ntime = getSeconds(ndate.getHours(), ndate.getMinutes(), ndate.getSeconds());
    const nweek = "日月火水木金土".substr(ndate.getDay(), 1);
    elems.forEach(function(elem){display(elem, nmonth, nday, nweek, ntime);});
    setTimeout(displayAll, 1000);
}());
});


/*===============位置情報を取得するjs========================

  if (navigator.geolocation) {
        // 現在の位置情報取得を実施
        navigator.geolocation.getCurrentPosition(
        // 位置情報取得成功時
        function (position) {
                var location ="<li>"+"Latitude：" + position.coords.latitude + "</li>"; //緯度
                location += "<li>"+"longitude：" + position.coords.longitude + "</li>"; //経度
                location += "<li>"+"altitude：" + position.coords.altitude + " m</li>"; //高度
                location += "<li>"+"accuracy：" + position.coords.accuracy + " m</li>"; //緯度・経度の誤差
                location += "<li>"+"altitudeAccuracy：" + position.coords.altitudeAccuracy + " m</li>"; //高度の誤差
                location += "<li>"+"heading：" + position.coords.heading + "</li>"; //方向 0-360
                location += "<li>"+"speed：" + position.coords.speed + " m/sec</li>"; //速度
                document.getElementById("location").innerHTML = location;
        },
        // 位置情報取得失敗時
        function (error) {
                switch(error.code)
                  {
                    case 1:
                      var location = "<li>位置情報の利用が許可されていません</li>";
                      break;
                    case 2:
                      var location = "<li>デバイスの位置が判定できませんでした</li>";
                      break;
                    case 3:
                      var location = "<li>タイムアウトが発生しました</li>";
                      break;
                  }
                document.getElementById("location").innerHTML = location;
        });
    } else {
        window.alert("<li>Geolocation APIが搭載されていないブラウザです。</li>");
    }*/