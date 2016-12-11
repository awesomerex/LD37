module.exports = {
	factory: function particalSpawner(){
		return {
			number: 1,
			vx: (Math.random() * 2 )- 1,
			vy: (Math.random() * 2 )- 1,
			time: 0,
			maxTime: 25
		};
	},
	reset : function(particalSpawner){
		particalSpawner.number = 1;
		particalSpawner.vx = (Math.random() * 2 )- 1;
		particalSpawner.vy = (Math.random() * 2 )- 1;
		particalSpawner.time = 0;
		particalSpawner.maxTime = 25;
	}
}