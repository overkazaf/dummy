var randArrayItem = function(array) {
    var rnd = ~~(Math.random() * array.length);
    return array[rnd];
};
var codeMap = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",

    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoriative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",

    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    306: "(Unused)",
    307: "Temporary Redirect",

    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Granted",
    403: "Forbidden",
    404: "File Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Time-out",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Large",
    415: "Unsupported Media Type",
    416: "Requested range not satisfiable",
    417: "Expectation Failed",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",

    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    507: "Insufficient Storage"
};
var ruleFactory = {
    HTTPResponseCode: function() {
        return randArrayItem(Object.keys(codeMap));
    },
    HTTPResponseCodeMessage: function() {
        return codeMap[randArrayItem(Object.keys(codeMap))];
    },
    FormatDate: function(format) {
        var maps = {
            'yyyy': function(d) {
                return d.getFullYear(); },
            'MM': function(d) {
                return fix(d.getMonth() + 1); },
            'dd': function(d) {
                return fix(d.getDate()); },
            'HH': function(d) {
                return fix(d.getHours()); },
            'mm': function(d) {
                return fix(d.getMinutes()); },
            'ss': function(d) {
                return fix(d.getSeconds()); }
        };

        var chunk = new RegExp(Object.keys(maps).join('|'), 'g');

        function fix(d) {
            d = "" + (d || "");
            if (d.length <= 1) {
                d = '0' + d;
            }
            return d;
        }

        function formatDate(value, format) {
            format = format || 'yyyy-MM-dd HH:mm:ss';
            value = new Date(value)
            return format.replace(chunk, function(capture) {
                return maps[capture] ? maps[capture](value) : '';
            })
        }

        return formatDate(new Date().getTime());
    }

};




module.exports = ruleFactory;
