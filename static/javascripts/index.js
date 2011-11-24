var SIGN = 
[ /* left : 1  front : 2 right : 3 */
	{
		name : "생활과학대학",
		num : "222",
		sector : "I",
		dir : 1
	},
	{
		name : "약학대학",
		num : "21",
		sector : "C",
		dir : 2
	},
	{
		name : "교수회관",
		num : "65",
		sector : "G",
		dir : 2
	},
	{
		name : "사범대학",
		num : "11",
		sector : "H",
		dir : 1
	},
	{
		name : "교수학습개발센터",
		num : "61",
		sector : "H",
		dir : 1
	},
	{
		name : "인문대학",
		num : "6",
		sector : "H",
		dir : 1
	},
	{
		name : "사회과학대학",
		num : "16",
		sector : "B",
		dir : 1
	},
	{
		name : "기초교육원",
		num : "61",
		sector : "H",
		dir : 1
	},
	{
		name : "공과대학",
		num : "39",
		sector : "E",
		dir : 3
	},
	{
		name : "멀티미디어강의동||",
		num : "43-1",
		sector : "E",
		dir : 3
	}
];

var Timer = (function(){
	var _timer;
	return {
		start : function(){
			_timer = (new Date).getTime();
		},
		end : function(){
			return (new Date).getTime() - _timer;
		}
	};
})();

var answer_sheet = {};
var exp1 = [], exp2 = [];
var order = [1,2], order_val = 0;

function random(max){
	return Math.floor(Math.random()*max);
}

function phase_template(close, open){
	return function(){
		$(close).animate({height : "toggle", opacity : 0},
		function(){$(this).css("display","none"); $(open).fadeIn(); Timer.start();});
	};
}

stringfy = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

var phases = {
	phase1 : function(){
		$("#agree").fadeOut();
		$("#global").slideUp(function(){
			$("#survey1").fadeIn();
			Timer.start();
		});
	},
	phase2 : phase_template("#survey1", "#opener"),
	phase3 : function(){
		phase_template("#opener", "#exp"+order[order_val]+", #exp"+order[order_val]+"1")();
	},
	phase4 : function(){
		phase_template("#opener2", "#exp"+order[order_val]+", #exp"+order[order_val]+"1")();
	},
	phase5 : phase_template("#opener3", "#exp3, #exp31"),
	after11 : phase_template("#exp11", "#exp12"),
	after12 : phase_template("#exp12", "#exp13"),
	after13 : phase_template("#exp13", "#exp14"),
	after14 : phase_template("#exp14", "#exp15"),
	after15 : function(){
		if(order_val === 1){phase_template("#exp15, #exp1", "#opener3")();}
		else{ order_val++; phase_template("#exp15, #exp1", "#opener2")();}
	},
	after21 : phase_template("#exp21", "#exp22"),
	after22 : phase_template("#exp22", "#exp23"),
	after23 : phase_template("#exp23", "#exp24"),
	after24 : phase_template("#exp24", "#exp25"),
	after25 : function(){
		if(order_val === 1){phase_template("#exp25, #exp2", "#opener3")();}
		else{ order_val++; phase_template("#exp25, #exp2", "#opener2")();}
	},
	after31 : phase_template("#exp31", "#exp3, #exp32"),
	after32 : phase_template("#exp32", "#exp3, #exp33"),
	after33 : phase_template("#exp33", "#exp3, #exp34"),
	after34 : function(){
		phase_template("#exp34, #exp3", "#finish")();
		$.ajax({
			url : "/new",
			type : "post",
			dataType : "text",
			data : "result="+stringfy(answer_sheet),
			success : function(text){
			},
			error : function(e){
			},
			complete : function(){
				$("#send").html("전송 완료!");
			}
		});
	}
};

function pick_template(pn, answer, callback){
	return function(){
		answer_sheet[pn] = answer;
		answer_sheet[pn+'t'] = Timer.end();
		callback();
	};
}
    
function score_pick_template(pn, answer, prefix){
	return function(){
		if(answer_sheet[pn])
			$(prefix+answer_sheet[pn]).removeClass("selected");

		answer_sheet[pn] = answer;
		$(prefix+answer).addClass("selected");
	}
}

var pick={
 	 pick11 : pick_template(1, 1, phases.phase2)
	,pick12 : pick_template(1, 2, phases.phase2)
	,pick13 : pick_template(1, 3, phases.phase2)
	,pick14 : pick_template(1, 4, phases.phase2)
	
	,pick111 : pick_template(11, 1, phases.after11)
	,pick112 : pick_template(11, 2, phases.after11)
	,pick113 : pick_template(11, 3, phases.after11)

	,pick121 : pick_template(12, 1, phases.after12)
	,pick122 : pick_template(12, 2, phases.after12)
	,pick123 : pick_template(12, 3, phases.after12)

	,pick131 : pick_template(13, 1, phases.after13)
	,pick132 : pick_template(13, 2, phases.after13)
	,pick133 : pick_template(13, 3, phases.after13)

	,pick141 : pick_template(14, 1, phases.after14)
	,pick142 : pick_template(14, 2, phases.after14)
	,pick143 : pick_template(14, 3, phases.after14)

	,pick151 : pick_template(15, 1, phases.after15)
	,pick152 : pick_template(15, 2, phases.after15)
	,pick153 : pick_template(15, 3, phases.after15)

	,pick211 : pick_template(21, 1, phases.after21)
	,pick212 : pick_template(21, 2, phases.after21)
	,pick213 : pick_template(21, 3, phases.after21)

	,pick221 : pick_template(22, 1, phases.after22)
	,pick222 : pick_template(22, 2, phases.after22)
	,pick223 : pick_template(22, 3, phases.after22)

	,pick231 : pick_template(23, 1, phases.after23)
	,pick232 : pick_template(23, 2, phases.after23)
	,pick233 : pick_template(23, 3, phases.after23)

	,pick241 : pick_template(24, 1, phases.after24)
	,pick242 : pick_template(24, 2, phases.after24)
	,pick243 : pick_template(24, 3, phases.after24)

	,pick251 : pick_template(25, 1, phases.after25)
	,pick252 : pick_template(25, 2, phases.after25)
	,pick253 : pick_template(25, 3, phases.after25)

	,pick311 : pick_template(31, 1, phases.after31)
	,pick312 : pick_template(31, 2, phases.after31)

	,pick321 : pick_template(32, 1, phases.after32)
	,pick322 : pick_template(32, 2, phases.after32)
	,pick323 : pick_template(32, 3, phases.after32)
	,pick324 : function(){
		$("#pick32-etc").focus();
	}
	,pick325 : pick_template(32, $("#pick32-etc").val(), phases.after32)

	,pick331 : pick_template(33, 1, phases.after33)
	,pick332 : pick_template(33, 2, phases.after33)
	,pick333 : pick_template(33, 3, phases.after33)
	,pick334 : pick_template(33, 4, phases.after33)
	,pick335 : pick_template(33, 5, phases.after33)
	,pick336 : pick_template(33, 6, phases.after33)

	,pick341 : score_pick_template(34, 1, "#pick34")
	,pick342 : score_pick_template(34, 2, "#pick34")
	,pick343 : score_pick_template(34, 3, "#pick34")
	,pick344 : score_pick_template(34, 4, "#pick34")
	,pick345 : score_pick_template(34, 5, "#pick34")
	,pick346 : score_pick_template(34, 6, "#pick34")
	,pick347 : score_pick_template(34, 7, "#pick34")
	,pick348 : score_pick_template(34, 8, "#pick34")
	,pick349 : score_pick_template(34, 9, "#pick34")

	,pick351 : score_pick_template(35, 1, "#pick35")
	,pick352 : score_pick_template(35, 2, "#pick35")
	,pick353 : score_pick_template(35, 3, "#pick35")
	,pick354 : score_pick_template(35, 4, "#pick35")
	,pick355 : score_pick_template(35, 5, "#pick35")
	,pick356 : score_pick_template(35, 6, "#pick35")
	,pick357 : score_pick_template(35, 7, "#pick35")
	,pick358 : score_pick_template(35, 8, "#pick35")
	,pick359 : score_pick_template(35, 9, "#pick35")

	,finish : pick_template(99, 99, phases.after34)
};

$(function(){
	var i;

	Array.prototype.shuffle = function(){
		var length = this.length;
		var temp;
		for(var i=0;i<length*length/2;i++){
			e1 = Math.floor(Math.random()*length);
			e2 = Math.floor(Math.random()*length);
			temp = this[e1]; this[e1] = this[e2] ; this[e2] = temp;
		}
		return this;
	};
	
	Array.prototype.append = function(w){
		var length = w.length;
		for(var i=0;i<length;i++){
			this.push(w[i]);
		}
		return this;
	};

	Array.prototype.select = function(condition, number){
		var length = this.length;
		var result = [];
		for(var i=0;i<length;i++){
			if(condition(this[i])){
				result.push(this[i]);
			}
		}
		if(number !== undefined){
			var ret = [];
			result.shuffle();
			for(var i=0;i<number;i++){
				ret.push(result[i]);
			}
			return ret;
		}
		else
			return result;
	};
	
	Array.prototype.find = function(condition){
		var length = this.length;
		for(var i=0;i<length;i++){
			if(condition(this[i]))
				return i;
		}
	};

	order.shuffle();
	for(i=0;i<8;i+=1){
		exp1[i] = SIGN[random(SIGN.length)];
		exp2[i] = SIGN[random(SIGN.length)];
	}

	var exp11, exp12, exp13, exp14, exp15;
	var exp21, exp22, exp23, exp24, exp25;

	exp11 = SIGN[random(SIGN.length)];
	exp12 = SIGN.select(function(t){return t.name!=exp11.name;}, 1)[0];

	exp21 = SIGN[random(SIGN.length)];
	exp22 = SIGN.select(function(t){return t.name!=exp21.name;}, 1)[0];

	
	$("#exp11-key").html(exp11.name); answer_sheet['11a'] = exp11.dir;
	$("#exp12-key").html(exp12.name); answer_sheet['12a'] = exp12.dir;

	exp13 = SIGN.select(function(t){return t.dir==2;}, 1).append(
		SIGN.select(function(t){return t.dir!=2;}, 2)
	).shuffle();

	exp14 = SIGN.select(function(t){return t.dir==1;}, 1).append(
		SIGN.select(function(t){return t.dir!=1;}, 2)
	).shuffle();

	exp15 = SIGN[random(SIGN.length)];

	exp15_option = SIGN.select(function(t){return t.sector==exp15.sector;}, 1).append(
		SIGN.select(function(t){return t.sector!=exp15.sector;},2)
	).shuffle();

	answer_sheet['13a'] = exp13.find(function(t){return t.dir==2;})+1;
	answer_sheet['14a'] = exp14.find(function(t){return t.dir==1;})+1;
	answer_sheet['15a'] = exp15_option.find(function(t){return t.sector==exp15.sector;})+1;


	$("#pick131").html(exp13[0].name);
	$("#pick132").html(exp13[1].name);
	$("#pick133").html(exp13[2].name);

	$("#pick141").html(exp14[0].name);
	$("#pick142").html(exp14[1].name);
	$("#pick143").html(exp14[2].name);

	$("#exp15-key").html(exp15.sector);

	$("#pick151").html(exp15_option[0].name);
	$("#pick152").html(exp15_option[1].name);
	$("#pick153").html(exp15_option[2].name);


	$("#exp21-key").html(exp11.name); answer_sheet['21a'] = exp11.dir;
	$("#exp22-key").html(exp12.name); answer_sheet['22a'] = exp12.dir;

	exp23 = SIGN.select(function(t){return t.dir==2;}, 1).append(
		SIGN.select(function(t){return t.dir!=2;}, 2)
	).shuffle();

	exp24 = SIGN.select(function(t){return t.dir==1;}, 1).append(
		SIGN.select(function(t){return t.dir!=1;}, 2)
	).shuffle();

	exp25 = SIGN[random(SIGN.length)];

	exp25_option = SIGN.select(function(t){return t.sector==exp25.sector;}, 1).append(
		SIGN.select(function(t){return t.sector!=exp25.sector;},2)
	).shuffle();

	answer_sheet['23a'] = exp23.find(function(t){return t.dir==2;})+1;
	answer_sheet['24a'] = exp24.find(function(t){return t.dir==1;})+1;
	answer_sheet['25a'] = exp25_option.find(function(t){return t.sector==exp25.sector;})+1;


	$("#pick231").html(exp23[0].name);
	$("#pick232").html(exp23[1].name);
	$("#pick233").html(exp23[2].name);

	$("#pick241").html(exp24[0].name);
	$("#pick242").html(exp24[1].name);
	$("#pick243").html(exp24[2].name);

	$("#exp25-key").html(exp25.sector);

	$("#pick251").html(exp25_option[0].name);
	$("#pick252").html(exp25_option[1].name);
	$("#pick253").html(exp25_option[2].name);

	answer_sheet[34] = 5;
	answer_sheet[35] = 5;

	$(".action").click(function(){
		phases[$(this).attr("data-trigger")]();
		return false;
	});

	$(".answer-pick").click(function(){
		pick[$(this).attr("data-trigger")]();
		return false;
	});

//	$("#global, #agree, section").hide();
});
