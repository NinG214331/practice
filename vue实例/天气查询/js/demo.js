
var app = new Vue({
	el:"#app",
	data:{
		city:'',
		weatherList:[]
	},
	methods:{
		searchWeather:function(){
			var This = this;
			axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city)
			.then(function(response){
				This.weatherList = response.data.data.forecast;
			})
			.catch(function(err){
				console.log(err);
			})
		},
		text:function(e){
			console.log(e.target);
			this.city = e.target.innerHTML;
			this.searchWeather();
		}
	}
})