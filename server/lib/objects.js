module.exports = {

    merge: function merge(a,b) {
        for(var property in b){
            a[property] = b[property];
        }
        return a;
    }
}