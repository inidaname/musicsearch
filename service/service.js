angular.module('MusicSearch')
.service('CommonProp', function() {
  return{
	  someData: '',
	  SetData: (theData)=>{
		  this.someData = theData;
	  },

	  GetData: () => {
		  return this.someData;
	  }
  }
})
