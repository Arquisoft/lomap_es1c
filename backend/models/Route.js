class Route {
    constructor(id=null, name, locations=[]) {
        if (!name || name.trim().length === 0) {
            throw new Error('Route name cannot be null or empty');
        }
    
      this.id = id ? id : this.generateRandomId();
      this.name = name;
      this.locations = locations;
    }
    addLocation(location) {
        this.locatiohs.push(location);
    }
    removeLocation(location){
        //TODO
        let index=locations.indexOf(location);
        this.locations.splice(index,1);
    }
    updateName(name){
        this.name=name;
    }

    
  }
  module.exports = Route;   