
var moment = require('moment-timezone');
var logger = require('../../logger');

var AC_MCR_HOST = process.env.AC_MCR_HOST; 

var IMAGE_PREFIX_USER   = AC_MCR_HOST + '/content/styles/guide_view_guide_picture/public/';
var IMAGE_PREFIX_REPORT = AC_MCR_HOST + '/content/';

module.exports = {
    formatReportFull: formatReportFull,
    formatReport: formatReport,
    formatUser: formatUser,
}

function formatReportFull(report, user) {
    var r = formatReport(report);
    if (typeof(r) === 'undefined') return;
    r.user = formatUser(user);
    return r;
}



function formatUser(user) {
    return {
        id:    Number.parseInt(user.uid),
        name:  user.name,
        certs: _f1(user, 'field_certifications', _safe),
        image: user.picture.url,
    }
}

function formatReport(r) {
    if (typeof(r.field_location.und) ==="undefined") {
        logger.info('MCR - formatReport(report_id=%d) - Missing location, skipping', r.nid);
        return;
    }

    return {
        id: Number.parseInt(r.nid),
        location: [
            Number.parseFloat(r.field_location.und[0].lon),
            Number.parseFloat(r.field_location.und[0].lat),
        ],
        title: _f1(r, 'title_field', _safe),
        body: _f1(r, 'body', _safe),
        permalink: r.path,
        dates: _fall(r, 'field_date', _getDate),
        images: _fall(r, 'field_image', function(i){ return i.uri.replace('public://', IMAGE_PREFIX_REPORT); }),
        location_desc: _f1(r, 'field_short_description', function(d){return d.safe_value}),
        groups: _getGroups(r),
    }
}


function _fall(r, key, trans)  {
    if(typeof(r[key])  === 'undefined') return;
    if(typeof(r[key].und)  === 'undefined') return;
    return r[key].und.map(trans)
}
function _f1(r, key, trans)  {
    var all = _fall(r, key, trans);
    if(typeof(all)  === 'undefined') return;
    if(all.length === 0) return;
    return all[0];
}

function _safe(x) { return x.safe_value; }

function _getDate(date) {
    var int_date = Number.parseInt(date.value);
    var dd = new Date(int_date * 1000);
    return moment.tz(dd, date.timezone).format();
}

function _getGroups(r) {
    if (typeof(r.og_groups) === 'undefined') return [];
    return r.og_groups.map(function(gg){
        return {
            name: gg.title,
            logo: _f1(gg, 'field_logo', function(i){ return i.uri.replace('public://', IMAGE_PREFIX_REPORT); }),
        };
    });
}
