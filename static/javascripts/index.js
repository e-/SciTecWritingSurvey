var SIGN = 
[
	{
		name : "생활과학대학",
		num : "222",
		sector : "I"
	},
	{
		name : "약학대학",
		num : "21",
		sector : "C"
	},
	{
		name : "교수회관",
		num : "65",
		sector : "G"
	},
	{
		name : "사범대학",
		num : "11",
		sector : "H"
	},
	{
		name : "교수학습개발센터",
		num : "61",
		sector : "H"
	},
	{
		name : "인문대학",
		num : "6",
		sector : "H"
	},
	{
		name : "사회과학대학",
		num : "16",
		sector : "B"
	},
	{
		name : "기초교육원",
		num : "61",
		sector : "H"
	},
	{
		name : "공과대학",
		num : "39",
		sector : "E"
	},
	{
		name : "멀티미디어강의동||",
		num : "43-1",
		sector : "E"
	}
];

var phases = {
	phase0 : function(){
		$("#agree").fadeOut();
		$("#global").slideUp(function(){
			$("#opener").fadeIn();
		});
	},
	phase1 : function(){
		$("#opener").animate({
			height : "toggle",
			opacity : 0
		},
		function(){
			$(this).css("display","none"); 
			$("#survey1").fadeIn();
		});
	}
};


$(function(){
	$(".action").click(function(){
		phases[$(this).attr("data-trigger")]();
		return false;
	});
});
