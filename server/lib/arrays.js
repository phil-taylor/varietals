/**
 * Array extensions
 */

Array.prototype.clean = function clean() {
  return this.filter(function(item){ return item });
};

Array.prototype.chunk = function chunk(chunkSize) {
    var array=this;
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
};

Array.prototype.unique = function unique() {
    return this.reduce(function(a,item){
        var key = item.toLowerCase();
        if (!a[key]) a.push(key);
        return a;
    }, []);
};

Array.prototype.flatten = function flatten(){
    return [].concat.apply([], this);
};