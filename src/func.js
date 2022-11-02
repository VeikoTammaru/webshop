Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var i = 0; i < this.length; i++) {
        if (this[i] === el) {
            idxs.push(i);
        }
    }
    return idxs;
};