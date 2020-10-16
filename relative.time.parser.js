// TODO get the code below using yarn / npm from https://github.com/cmaurer/relative.time.parser

/* (The MIT License)

    Copyright (c) 2015 Christian Maurer

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//(function() {

    var relativeTimeRe = /([-+])(\d*)(minutes|minute|min|hours|hour|days|day|weeks|week|months|month|mon|years|year|Quarters|Quarter|seconds|second|sec|s|m|h|d|M|y|Y|Q|ms|w)/,
    unitConverter = function(unit){
        switch(unit){
            case 'ms':
                return 'milliseconds';
            case 's':
                return 'seconds';
            case 'sec':
                return 'seconds';
            case 'second':
                return 'seconds';
            case 'seconds':
                return 'seconds';
            case 'min':
                return 'minutes';
            case 'm':
                return 'minutes';
            case 'minute':
                return 'minutes';
            case 'minutes':
                return 'minutes';
            case 'hour':
                return 'hours';
            case 'hours':
                return 'hours';
            case 'h':
                return 'hours';
            case 'day':
                return 'days';
            case 'days':
                return 'days';
            case 'd':
                return 'days';
            case 'w':
                return 'weeks';
            case 'week':
                return 'weeks';
            case 'weeks':
                return 'weeks';
            case 'mon':
                return 'months';
            case 'month':
                return 'months';
            case 'months':
                return 'months';
            case 'M':
                return 'months';
            case 'y':
                return 'years';
            case 'Y':
                return 'years';
            case 'year':
                return 'years';
            case 'years':
                return 'years';
            case 'Q':
                return 'quarters';
            case 'Quarter':
                return 'quarters';
            case 'Quarters':
                return 'quarters';
            default:
                return null;
        }

    }, initializeMomentRelative;

    export default initializeMomentRelative = function(moment) {
        moment.fn.relativeTime = function (relativeTimeString) {
            if (relativeTimeString.trim() === 'now') {
                return moment();
            } else {
                if (relativeTimeRe.test(relativeTimeString.trim())) {
                    var result = relativeTimeRe.exec(relativeTimeString),
                        amount = result[2],
                        unit = unitConverter(result[3]);
                    if (unit === null) {
                        return null;
                    }
                    if (result[1] === '-') {
                        return moment().subtract(+amount, unit);
                    } else {
                        return moment().add(+amount, unit);
                    }
                } else {
                    return null;
                }
            }
        };
        moment.fn.isRelativeTimeFormat = function(relativeTimeString){
            if (relativeTimeString.trim() === 'now') {
                return true;
            }
            return relativeTimeRe.test(relativeTimeString);
        };
        return moment;
    };
//}).call(this);
