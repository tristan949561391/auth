/**
 * Created by tc949 on 2016/10/14.
 */
function NOTNULL(data) {
    return (data == "" || data == undefined || data == null) ? false : true;
}
module.exports.NOTNULL = NOTNULL
