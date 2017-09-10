(function(exports){
    var QS_DELIMITER = '?';
    var HASH_DELIMITER = '#';
    var PARAM_DELIMITER = '&';
    var VALUE_DELIMITER = '=';
    
    exports.parse = function (querystring) {
        if (!querystring) {
            return {};
        }
        
        var qs = querystring;
        
        if (qs.indexOf(QS_DELIMITER) >= 0) {
            qs = qs.split(QS_DELIMITER)[1];
        }
        
        if (qs.indexOf(HASH_DELIMITER) >= 0) {
            qs = qs.split(HASH_DELIMITER)[0];
        }
        
        if (qs.length === 0) {
            return {};
        }
        
        return qs.split(PARAM_DELIMITER).reduce(function(query, param) {
            var parts = param.split(VALUE_DELIMITER);
            var name = parts[0] ? parts[0] : '_';
            var value = decodeURI(parts[1]);
            
            if (query[name]) {
                if (Array.isArray(query[name]) && query[name].indexOf(value) < 0) {
                    query[name].push(value);
                } else if (query[name] !== value) {
                    query[name] = [query[name], value];
                }
            } else {
                query[name] = value;
            }
            
            return query;
        }, {});
    };
    
    exports.stringify = function (q) {
        if (!q) {
            return '';
        }
        
        var names = Object.keys(q);
        
        return names.reduce(function(params, name) {
            if (Array.isArray(q[name])) {
                q[name].forEach(function(value) {
                    value && params.push(name + VALUE_DELIMITER + encodeURI(value));
                });
            } else if (typeof q[name] === 'object') {
                params.push(name + VALUE_DELIMITER + encodeURI(JSON.stringify(q[name])));
            } else if (q[name]) {
                params.push(name + VALUE_DELIMITER + encodeURI(q[name]));
            }
            
            return params;
        }, []).join(PARAM_DELIMITER);
    };
    
    return exports;
})(typeof exports === 'undefined' ? {} : exports);