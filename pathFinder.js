/**
 * Name:            pathFinder.js
 * Description:     path finder class for creating a grid system with path finding via breadth first search method
 * Author:          Evan Soubliere
 */

 /**
  * Point is an abstract Point with coordinates used to fill a grid for a path finder.
  */
class Point{
    
    /**
     * Point constructor, sets coords as given x and y
     * @param  {int} xCoordinate
     * @param  {int} yCoordinate
     */
    constructor(xCoordinate, yCoordinate){
        this.coords = {x:xCoordinate, y:yCoordinate};
        this.foundFrom = null;
        this.searched = false;
        this.active = true;
    }
    /**
     * sets active variable for point to false
     */
    deactivate(){
        this.active = false
    }

}

/**
 * Path manager class which generates a grid given a specific size, of Point objects.
 * Used to find the shortest routh between 2 points.
 */
class PathManager{
    
    /**
     * PathManager constructor, takes size and generates grid with x and y equal to size
     * @param  {int} size
     */
    constructor(size){
        this.size = size;
        this.startPoint = null;
        this.endPoint = null;
        this.path = []
        this.queue = new Queue();
        this.isSearching = true;

        this.directions = [
            [0,-1],
            [1,0],
            [0,1],
            [-1,0]
        ]

        // setup the grid
        this.grid = [];

        for (let x = 0; x < this.size; x++) {
            let yGrid = [];
            for (let y = 0; y < this.size; y++) {
                yGrid.push(new Point(x, y));
            }
            this.grid.push(yGrid);
        }
    }
    
    /**
     * sets start point to the object in the grid at position x:y
     * @param  {int} x
     * @param  {int} y
     */
    setStartPoint(x, y){
        if (0 <= x && x < this.size && 0 <= y && y < this.size){
            this.startPoint = this.grid[x][y];
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * sets end point to the object in the grid at position x:y
     * @param  {int} x
     * @param  {int} y
     */
    setEndPoint(x, y){
        if (0 <= x && x < this.size && 0 <= y && y < this.size){
            this.endPoint = this.grid[x][y];
            return true;
        }
        else {
            return false;
        }
    }
    
    /**
     * deactivates the point at position x:y
     * @param  {int} xCoord
     * @param  {int} yCoord
     */
    deactivatePoint(xCoord, yCoord){
        if (0 <= xCoord && xCoord < this.size && 0 <= yCoord && yCoord< this.size) {
            let newCoord = this.grid[xCoord][yCoord];
            if (newCoord != this.startPoint && newCoord != this.endPoint){
                this.grid[xCoord][yCoord].deactivate();
            }
        }
        
        
    }
    /**
     * finds the shortest route from the start position to the end position
     */
    findPath() {
        this.queue.enqueue(this.startPoint);
        // while the queue is not empty, continue searching
        while(this.queue.isEmpty() == false && this.isSearching == true) {
            
            let searchCenter = this.queue.dequeue();
            searchCenter.searched = true;
            this.haltIfEndFound(searchCenter);
            this.exploreNeighbours(searchCenter);
        }
        this.reversePath();
    }
    /**
     * checks if current searching point is the endpoint and halts searching if so
     * @param {Point} searchCenter 
     */
    haltIfEndFound(searchCenter) {
        if (searchCenter == this.endPoint) {
            this.isSearching = false;
        }
    }
    /**
     * Takes a Point and adds all adjacent Points on the grid to the queue
     * @param {POint} searchCenter 
     */
    exploreNeighbours(searchCenter) {
        this.directions.forEach(direction => {
            let exploreCoords = {x:direction[0] + searchCenter.coords.x, y:direction[1] + searchCenter.coords.y};

            if (0 <= exploreCoords.x  && exploreCoords.x < this.size && 0 <= exploreCoords.y && exploreCoords.y < this.size) {
                let searchPoint = this.grid[exploreCoords.x][exploreCoords.y];
                if (searchPoint.active == true && searchPoint.searched == false) {
                    
                    this.queue.enqueue(searchPoint);
                    searchPoint.foundFrom = searchCenter;
                    searchPoint.searched = true;
                }
            }
        });
    }
    /**
     * reverses the path from the endpoint and adds each Point from the foundFrom property to the Path list
     */
    reversePath() {
        let currentPoint = this.endPoint;
        while (currentPoint != this.startPoint) {
            this.path.push(currentPoint);
            if (currentPoint.foundFrom != null) {
                currentPoint = currentPoint.foundFrom;
            }
            else {
                currentPoint = this.startPoint;
            }
        }
    }
}