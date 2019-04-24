function Car(name, ind){
	this.name = name;
	this.index = ind;
	this.imageLink = name+'.jpg';
	this.numOfClicks = 0;
	this.incrementClicks = function(){
		this.numOfClicks++;
	};
}


let model = {
	cars: [],
	init: function() {
		for(let i = 0; i < 5; i++){
			this.cars[i] = new Car(`Car ${i+1}`, i);
		}
	},
	updateParameters: function(carName, carUrl, carClicks, index) {
		this.cars[index].name = carName;
		this.cars[index].imageLink = carUrl;
		this.cars[index].numOfClicks = carClicks;
	}
};

let view = {
	listOfCarsElem: document.createElement('div'),
	imageView: document.getElementById('image'),
	carNameView: document.getElementById('car_name'),
	numOfClicksView: document.getElementById('num_clicks'),
	adminButton: document.getElementById('admin-button'),
	saveButton: document.getElementById('save-button'),
	cancelButton: document.getElementById('cancel-button'),
	adminCarName: document.getElementById('admin-car-name'),
	adminCarUrl: document.getElementById('admin-car-url'),
	adminCarClicks: document.getElementById('admin-car-clicks'),

	updateImageView: function(car){
		this.imageView.setAttribute('src', car.imageLink);
		this.carNameView.textContent = car.name;
		this.numOfClicksView.textContent = car.numOfClicks;
		this.imageView.selectedIndex = car.index;
		this.adminCarName.value = car.name;
		this.adminCarUrl.value = car.imageLink;
		this.adminCarClicks.value = car.numOfClicks;
	},

	clickReaction: function(){
		let count = controller.updateCount(view.imageView.selectedIndex);
		view.numOfClicksView.textContent = count;
		this.adminCarClicks.value = count;
	},

	init: function(){
		for(let i = 0; i < 5; i++){
			let paragraph = document.createElement('p');
			paragraph.className = 'car_item';
			paragraph.style.margin = "10px";
			paragraph.carIndex = i;
			paragraph.textContent = controller.getCar(i).name;
			this.listOfCarsElem.appendChild(paragraph);
		}

		document.body.insertBefore(this.listOfCarsElem, document.getElementsByTagName('div')[0]);
		
		this.listOfCarsElem.addEventListener("click", function(event){
			if(event.target.tagName === "P"){
				view.updateImageView(controller.getCar(event.target.carIndex));
			}
		});
		this.imageView.addEventListener("click", function(){
			view.clickReaction();
		});
		this.adminButton.addEventListener("click", function(){
			$("form").toggle();
		});
		this.saveButton.addEventListener("click", function(){
			controller.changeCarParameters(view.adminCarName.value, view.adminCarUrl.value, view.adminCarClicks.value);
			view.updateImageView(controller.getCar(view.imageView.selectedIndex));
			$("form").hide();
		});
		this.cancelButton.addEventListener("click", function(){
			view.updateImageView(controller.getCar(view.imageView.selectedIndex));
			$("form").hide();
		});
		view.updateImageView(controller.getCar(0));
	}
};

let controller = {
	getCar: function (carIndex){
		return model.cars[carIndex];
	},

	updateCount: function(index){
		console.log(index);
		model.cars[index].incrementClicks();
		return model.cars[index].numOfClicks;
	},
	changeCarParameters: function(carName, carUrl, carClicks){
		model.updateParameters(carName, carUrl, carClicks, view.imageView.selectedIndex);
	}
};

model.init();
view.init();