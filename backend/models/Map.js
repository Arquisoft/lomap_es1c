class Map {
    constructor(id, name, locations=[]) {
        this.id = id;
        this.name = name;
        this.locations = locations;
    }

    addLocation(location) {
        locations.push(location);
    }
    removeLocation(location){
        let index=locations.indexOf(location);
        this.locations.splice(index,1);
    }
    updateName(name){
        this.name=name;
    }
  }


  
module.exports = Map;