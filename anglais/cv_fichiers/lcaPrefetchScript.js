var hostParts = window.location.host.split('.');
var env = 'local';
var blobFolder = 'qa/';
var contentPath = '/payment/contents/';
var baseUrl = 'https://@@env.' + hostParts[1] + '.com/payment';
var basePortalUrl = 'https://@@env.' + hostParts[1] + '.com';
var vendorBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/vendor.bundle.js?v=1.0.0.353';
var developerBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/app.bundle.js?v=1.0.0.353';
var plansBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/plans-1.0.0.353.bundle.js';
var appJsSrc = 'https://@@env.' + hostParts[1] + '.com/payment/scripts/app.js?v=1.0.0.353';
var bootstrapSrc = 'styles/bootstrap/bootstrap.min.css';
var fontAwesomeSrc = 'fonts/fontawesome5-subset/css/all.min.css';
var jQuerySrc = '/blob/common/scripts/jquery-3.5.1.min.js';
var googleFontsSrc = 'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700|Source+Sans+Pro:200,300,400,600,700|Open+Sans:300,400,600,700,800|Roboto+Slab:100,300,400,700|Work+Sans:300,400,500,600,700|Merriweather:300,400,600,700';
var mainCssSrc = 'https://@@env.' + hostParts[1] + '.com/payment/stylesheets/lca/main.css?v=1.0.0.353';
var resFileName = 'reg.json?v=1.0.0.353';
var esShimSrc = 'scripts/es6/es6-shim.min.js';
switch (hostParts[0]) {
case 'reg':
case 'reg-app':
case 'pen':
    env = hostParts[0];
    blobFolder = 'reg/';
    resFileName = 'reg.json?v=1.0.0.353';
    break;
case 'stg':
case 'stg-app':
    env = 'stg';
    blobFolder = 'stg/';
    resFileName = 'stg.json?v=1.0.0.353';
    break;
case 'qa':
case 'qa-app':
    blobFolder = 'qa/';
    env = hostParts[0];
    break;
case 'perf':
case 'perf-app':
    blobFolder = 'perf/';
    env = hostParts[0];
    break;
case 'www':
    env = hostParts[0];
    blobFolder = 'prod/';
    resFileName = 'prod.json?v=1.0.0.353';
    break;
}

var localizedTextJsonPath = baseUrl.replace('@@env', env) + '/contents/' + blobFolder + 'livecareer.com/localizedText.json?v=1.0.0.353';
var commonLocalizedTextJsonPath = baseUrl.replace('@@env', env) + '/contents/' + blobFolder + 'common/localizedText.json?v=1.0.0.353';
var resfilePath = baseUrl.replace('@@env', env) + '/contents/' + blobFolder + 'livecareer.com/' + resFileName + '?v=1.0.0.353';
var nrJsPath = baseUrl.replace('@@env', env) + '/contents/' + blobFolder + 'livecareer.com/nr.js';

function prefetchFiles(src, callback) {
    var s, r, t;
    r = false;
    s = document.createElement('link');
    s.rel = 'prefetch';
    s.href = src;
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState == 'complete' || this.readyState == 'loaded')) {
            r = true;
            callback && callback();
        }
    };
    t = document.getElementsByTagName('link')[0];
    t.parentNode.insertBefore(s, t);
}

function loadImageFiles() {
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/wlb/loading.gif');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/wlb/grey-arrow.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/cancelsubscriptionpopup/resume-popup.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/coverletter-small.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/jobsnowapp.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/loading.gif');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/logo.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/multiformat-small.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/refund.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/resumecheck.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/resumecheck-small.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/trustpilot-exp/rating1.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/trustpilot-exp/rating2.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/trustpilot-exp/rating3.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/trustpilot-exp/read-review-pics.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/unlimitdownload.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/lca/unlimitdownload-small.svg');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/wlb/bold-logo.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/wlb/sprite-playstore.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/wlb/exe-girl.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/wlb/Heather_spielmaker.png');
    prefetchFiles(baseUrl.replace('@@env', env) + '/images/wlb/hubert_baker.png');
}

prefetchFiles(vendorBundleSrc.replace('@@env', env));		//prefetch vendor bundle
prefetchFiles(developerBundleSrc.replace('@@env', env));	//prefetch developer bundle
prefetchFiles(plansBundleSrc.replace('@@env', env));	//prefetch plans bundle
prefetchFiles(appJsSrc.replace('@@env', env));	//prefetch app JS 
prefetchFiles(contentPath + bootstrapSrc);						//prefetch bootstrap CSS
prefetchFiles(contentPath + fontAwesomeSrc);						//prefetch fontawesome CSS
prefetchFiles(jQuerySrc);						//prefetch jQuery
prefetchFiles(contentPath + esShimSrc);
prefetchFiles(googleFontsSrc);					//prefetch googleFonts CSS
prefetchFiles(mainCssSrc.replace('@@env', env));			//prefetch main CSS 
prefetchFiles(localizedTextJsonPath);            //prefetch ecom JSON
prefetchFiles(commonLocalizedTextJsonPath);
prefetchFiles(nrJsPath);
loadImageFiles();										//prefect image files
prefetchFiles(resfilePath);
