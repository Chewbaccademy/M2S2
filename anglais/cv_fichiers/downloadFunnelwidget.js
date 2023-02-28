window.DFW = window.DFW || {};
window.RTN = window.RTN || {};
DFW.renderCount = 0;
DFW.showPreDownloadPopup = false;
DFW.isDFBoldProAdExp = false;
DFW.DF_Exp_AdSlot = '';
DFW.resumeReasonOption = localStorage.getItem('resumereason') || 'jobs';
DFW.DocType={
  Resume:'RSME',
  Letter:'LETR'
}
DFW.FileExtension = {
  "PDF": "PDF",
  "TXT": "TXT",
  "DOCX": "DOCX",
  "SVG": "SVG",
  "JPG": "JPEG"
}
DFW.Widget = (function (scope) {
  if (DFW.Environment == "dev") {
    loadScript(DFW.LocalBaseurl + "build/downloadfunnelwidget-bundle.js").then(function () {
      DFW.BundleLoaded = true;
    });
    addLinkTag("stylesheet", DFW.LocalBaseurl + "build/stylesheet/" + DFW.PortalCd + "/main.css");
  }
  else {
    loadScript((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/downloadfunnelwidget-bundle.js").then(function () {
      DFW.BundleLoaded = true;
    });
    //will remove mprjt code support from widget and should derived from DFW object.
    
	if (DFW.isINTLJoshua || (DFW.isJoshua && DFW.PortalCd == "mpc")){
          addLinkTag("stylesheet", DFW.Baseurl + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "jt/main.css");
	}
	else{
		addLinkTag("stylesheet", (DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "/main.css");
	}
  }

  function checkBrowserCompatibility() {
    DFW.BundleLoaded = false;
    var objAgent = navigator.userAgent;
    var objfullVersion = "" + parseFloat(navigator.appVersion);
    var objOffsetVersion;
    var legacyEditorURL;
    if (window.location.hostname) {
      legacyEditorURL =
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/information/unsupportedbrowsers.aspx";
    } else {
      legacyEditorURL =
        window.location.origin + "/information/unsupportedbrowsers.aspx";
    }
    // In Microsoft internet explorer
    if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
      objfullVersion = objAgent.substring(objOffsetVersion + 5);
      if (objfullVersion.substring(0, objfullVersion.indexOf(".")) <= 9) {
        window.location = legacyEditorURL;
      }
    }
    // In Safari
    else if ((objOffsetVersion = objAgent.indexOf("Safari")) != -1) {
      objfullVersion = objAgent.substring(objOffsetVersion + 7);
      if ((objOffsetVersion = objAgent.indexOf("Version")) != -1) {
        objfullVersion = objAgent.substring(objOffsetVersion + 8);
        if (objfullVersion.substring(0, objfullVersion.indexOf(".")) <= 8) {
          window.location = legacyEditorURL;
        }
      }
    }
    Promise.all([
      localizationPromise, userClaimsPromise
    ])
      .then(function (claims) {
        return Promise.all([
          getExperimentsPromise(DFW.userId)
        ]);
      })
      .then(function (data) {
        getUserPrefPromise.then(function (data) {
          // any action here
        });
        // isUserPremium(DFW.userId,DFW.Config.portalId,DFW.Config.apiPathV1);
      });
  }

  window.onload = checkBrowserCompatibility();

  function callAjax(
    url,
    method,
    async,
    withCredentials,
    callback,
    resolve,
    data
  ) {
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        if (callback)
          if (resolve) {
            callback(xmlhttp.responseText, resolve);
          } else {
            callback(xmlhttp.responseText);
          }
      }
    };
    xmlhttp.open(method, url, async);
    if (withCredentials) xmlhttp.withCredentials = true;

    if (data) {
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(data);
    } else {
      xmlhttp.send();
    }
  }

  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.onload = resolve;
      script.onerror = reject;
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  }

  function addLinkTag(rel, path) {
    var _linkTag = document.createElement('link');
    _linkTag.rel = rel;
    _linkTag.href = path
    if (!document.head) {
      document.getElementsByTagName('head')[0].appendChild(_linkTag);
    }
    else {
      document.head.appendChild(_linkTag);
    }
  };
  function renderDownloadFunnelWidget(data) {
   // DFW.isPremium = true;
    DFW.isModalOpen = true;
    DFW.isSpecialUser = IsSVGEnabled(DFW.email, DFW.Config.emailDomain);
    var widgetProps = {
      selector: DFW.Selector,
      localization: DFW.Localization,
      config: DFW.Config,
      userProps: {
        userId: DFW.userId, isPremium: DFW.isPremium, email: DFW.emailParam ? DFW.emailParam : DFW.email, resumeGuid: DFW.ResumeGuid, resumeName: DFW.ResumeName, isSurveyMandatory: false
        , userName: DFW.userName, surveyViewed: DFW.SurveyViewed, expVariant: getBoldProAdVariant() || DFW.DF_Exp_Var, screenName: DFW.ScreenName, templateName: DFW.TemplateName, isAgent: DFW.isAgent, productCD: DFW.productCD,
        firstName: DFW.firstName, showSocialCard: DFW.showSocialCard, lastName: DFW.lastName,
        showResumeTracking: DFW.showResumeTracking, showPreDownloadPopup: DFW.showPreDownloadPopup, resumeReason: DFW.resumeReasonOption, boldProfilePublished: DFW.isWebsitePublished, isDFBoldProAdExp: DFW.isDFBoldProAdExp, isMobileDownloadFunnel: DFW.isMobileDownloadFunnel, methodOption: DFW.methodOption, resumeCheckDFAdExpVariant: DFW.resumeCheckDFAdExpVariant, resumeCheckAdSlotMinScoreReq: DFW.Config.resumeCheckAdSlotMinScoreReq, countryCd: DFW.countryCd, resumeScore: DFW.resumeScore, isINTLMobile: DFW.isINTLMobile,
        isBoldProAdBaselined: DFW.Config.isBoldProAdBaselined || false
      },
      isModalOpen: DFW.isModalOpen,
      TrackDFWWidgetEvent: TrackDFWWidgetEventCallback,
      SetUserPref: SetUserPreference,
      onWebsiteLinkToggle: DFW.onWebsiteLinkToggle,
      onRepublishWebsite: DFW.onRepublishWebsite,
      ErrorCallBack: DFW.ErrorCallBack,
      SuccessCallBack: DFW.SuccessCallBack,
      MobileCloseCallBack: DFW.MobileCloseCallBack,
      MobileOpenCallBack: DFW.MobileOpenCallBack,
      stopDownloadedEvent: DFW.stopDownloadedEvent,
      stopEmailedEvent: DFW.stopEmailedEvent,
      renderCount: DFW.renderCount++,
      resumeId: DFW.ResumeGuid,
      docType:DFW.docType==DFW.DocType.Letter?DFW.DocType.Letter:DFW.DocType.Resume,
      selectedFileType:DFW.selectedFileFormat||DFW.FileExtension.PDF,
      colorProps: DFW.colorProps,
      dimensions: DFW.dimensions, 
      enableQuickClose: DFW.enableQuickClose,
      isPopupCentered: DFW.isPopupCentered,
      customBackdropColor: DFW.customBackdropColor
    }
    var downloadFunnelWidget = OBLibDFW.default.DownloadFunnel.new(widgetProps);
    downloadFunnelWidget.render();

    function getBoldProAdVariant(){
        if(DFW.Config.isBoldProAdBaselined && DFW.DF_Exp_AdSlot < 3)
          return '2';
        return DFW.DF_Exp_AdSlot;
    }
  };


  var localizationPromise = new Promise(function (resolve, reject) {
    var configUrl = "";
    if (DFW.isTestBed) {
      var configUrl = isPseudoLocalization() ? DFW.LocalBaseurl + "blobcontent/config_dev/pseudo_config_" + DFW.PortalCd + ".json" : DFW.LocalBaseurl + "blobcontent/config_dev/config_" + DFW.PortalCd + ".json";
    } else
      configUrl = isPseudoLocalization() ? (DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/pseudo_config_" + DFW.PortalCd + ".json" : (DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/config_" + DFW.PortalCd + ".json";
    callAjax(
      configUrl,
      "GET",
      false,
      false,
      handleLocalizationConfig,
      resolve
    );
  });
  function handleLocalizationConfig(result, resolve) {
    var data = JSON.parse(result);
    if (data && data.Localization) {
      DFW.Localization = data.Localization;
      DFW.Config = data.Config;
      if(DFW.downloadFunnelV2) {
        DFW.Config.moreSurveyOption = true;
        DFW.Config.isAppMessagingView = true;
      }
      window.globalCompVars = window.globalCompVars || {};
      window.globalCompVars.BaseApiUrl = data.Config.apiPathV1;
      window.globalCompVars.BaseApiUrlV2 = data.Config.apiPathV2;
      DFW.showResumeTracking = data.Config.baselineResumeButton || false;
    }
    if (resolve) resolve(data);
  }
  var userClaimsPromise = new Promise(function (resolve, reject) {
    callAjax(
      DFW.Baseurl +
      "signin/accounts/v4/getclaims",
      "POST",
      false,
      true,
      handleClaims,
      resolve
    );
  });

  var getUserPrefPromise = new Promise(function (resolve, reject) {
    callAjax(
      DFW.Baseurl +
      "eb/api/v1/userpreferences/" + DFW.userId + '?' +
      encodeURI(document.referrer) +
      "&cookieEnabled=" +
      navigator.cookieEnabled,
      "GET",
      false,
      true,
      handlePreferences,
      resolve
    );
  });

  var getUserDocument = function (url) {
    return new Promise(function (resolve, reject) {
      callAjax(
        DFW.Baseurl + "eb/api/v1/documents/" + DFW.userId + '/' + DFW.ResumeGuid,
        "GET",
        false,
        true,
        handleDocument,
        resolve
      );
    });
  }

  var getResumeTrackingInfo = function (url) {
    return new Promise(function (resolve, reject) {
      callAjax(
        DFW.Config.resumeBaseUrl + "resumebutton/getresumetracking/resumeid/" + DFW.ResumeGuid,
        "GET",
        false,
        true,
        handleResumeTrackingInfo,
        resolve
      );
    });
  }

  function handleResumeTrackingInfo(result, resolve) {
    var resumeTrackingInfo = JSON.parse(result);
    if (resumeTrackingInfo) {
      const emptyButtonTrackingInfo = Array.isArray(resumeTrackingInfo.buttonTrackingInfo) &&
        resumeTrackingInfo.buttonTrackingInfo.find(x => !x.uniquedId);
      const nonEmptyTrackingCount = Array.isArray(resumeTrackingInfo.buttonTrackingInfo) &&
        resumeTrackingInfo.buttonTrackingInfo.filter(x => x.uniquedId).length;
      resolve({ emptyButtonTrackingInfo, nonEmptyTrackingCount });
    }
  }

  function handleDocument(result, resolve) {
    var document = JSON.parse(result);
    if (document && document.id) {
      const hasButtons = Array.isArray(document.sections) &&
        document.sections.findIndex(x => x.sectionTypeCD === 'BUTN') > -1;
      resolve(hasButtons);
    }
  }

  function handlePreferences(result, resolve) {
    var data = JSON.parse(result);
    if (data) {
      // if (data.find(item => item.code == DFW.Config.surveyUserPref && item.value == "1")) {
      //     DFW.SurveyViewed = true;
      // }
      if (data.find(function (item) {
        return item.code == DFW.Config.surveyUserPref && item.value == "1";
      })) {
        DFW.SurveyViewed = true;
      }
      else {
        DFW.SurveyViewed = false;
      }
    }
  }

  // function isUserPremium(userUid,productId,baseApi) {
  //     callAjax(
  //     baseApi +
  //     "users/ispremium/" +
  //     userUid +
  //     "/" +
  //     productId,
  //     "GET",
  //     true,
  //     true,
  //     premiumUserDetail
  //     );
  // }
  // function premiumUserDetail(result, resolve) {
  //     var isPremiumUser = false;
  //     isPremiumUser = JSON.parse(result);
  //     DFW.isPremium=isPremiumUser;
  // }
  const SCExperimentID = 'd57a4dd6-f8b6-40d9-a465-9de5b282f14a';
  function getUserExperimentVariant(experimentId) {
    let experimentDetails = {};
    let variant = getDisableRunTestVariant(experimentId);
    if (variant < 0 && RTN.UserExperiments && RTN.UserExperiments.length > 0) {
      experimentDetails = RTN.UserExperiments.filter(exp => exp.experiment_uid == experimentId)[0];
      variant = experimentDetails && experimentDetails.variant ? experimentDetails.variant : -1;
    }
    return variant;
  }

  function getUrlParam(key) {
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString(),
      domain = "domain=" + window.location.hostname.substring(window.location.hostname.indexOf("."));
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + domain;
  }

  function isPseudoLocalization() {
    if (GetQueryString("pseudolocal") == 1 || readCookie("pseudolocal") == 1) {
      if (readCookie("pseudolocal") == null) {
        setCookie("pseudolocal", "1", 18000);
      }
      return true;
    }
    else return false;
  }
  function getDisableRunTestVariant(expId) {
    let caseIndex = -1;
    let disabletests, runtest;
    let urlParamDisabletests = getUrlParam('disabletests');
    let urlParamRunTest = getUrlParam('runtest');

    let cookievalDisbaleTest = readCookie('disabletests');
    let cookieValRunTest = readCookie('runtest');

    if (!!urlParamDisabletests && !!urlParamRunTest) {
      disabletests = parseInt(urlParamDisabletests);
      runtest = urlParamRunTest;
      //write cookie 
      setCookie("disabletests", disabletests, 1);
      setCookie("runtest", runtest, 1)
    }
    else if (cookieValRunTest && cookievalDisbaleTest) {
      disabletests = cookievalDisbaleTest;
      runtest = cookieValRunTest;
    }
    if (runtest) {
      let tests = runtest.split(',');
      if (disabletests && disabletests == 1) {
        let result = tests.map(test => {
          caseIndex = test.indexOf(expId + "_") > -1 ? test.charAt(test.length - 1) : caseIndex;
          return test;
        });
      }
    }
    return parseInt(caseIndex);
  }

  var getExperimentsPromise = function (userID) {
    return new Promise(function (resolve, reject) {
      if (DFW.viewVariation|| DFW.Config.disbaleGetExperiment) {
        resolve(true);
      }
      else if (RTN.UserExperiments) {
        let viewVariationId = -1;
        viewVariationId = getUserExperimentVariant(SCExperimentID);
        DFW.showSocialCard = viewVariationId > 2;
        DFW.showPreDownloadPopup = DFW.Config.rnaUpdateDFExpId && getUserExperimentVariant(DFW.Config.rnaUpdateDFExpId) > 3;
        DFW.isDFBoldProAdExp = DFW.Config.boldProDFAdExp && getUserExperimentVariant(DFW.Config.boldProDFAdExp) > 2;
        DFW.Config.boldProDFAdExp ? DFW.DF_Exp_AdSlot = getUserExperimentVariant(DFW.Config.boldProDFAdExp) : '';  
        DFW.isResumeCheckDFAdExp = DFW.Config.resumeCheckDFAdExp && getUserExperimentVariant(DFW.Config.resumeCheckDFAdExp) > 2;   
        if (DFW.isResumeCheckDFAdExp) {
          DFW.resumeCheckDFAdExpVariant = getUserExperimentVariant(DFW.Config.resumeCheckDFAdExp);
          resolve(true);
        }
        else {
          resolve(true);
        }            
      }
      else {
        callAjax(
          DFW.Baseurl +
          'eb/api/v1/users/' + userID + '/experiments?status=all',
          "GET",
          false,
          true,
          function (data) {
            if (data) {
              RTN.UserExperiments = typeof data === 'object' ? data : JSON.parse(data);
              let viewVariationId = -1;
              viewVariationId =!DFW.Config.disbaleSocialCard&& getUserExperimentVariant(SCExperimentID);
              DFW.showSocialCard = viewVariationId > 2;
              DFW.showPreDownloadPopup = DFW.Config.rnaUpdateDFExpId && getUserExperimentVariant(DFW.Config.rnaUpdateDFExpId) > 3;
              DFW.isDFBoldProAdExp = DFW.Config.boldProDFAdExp && getUserExperimentVariant(DFW.Config.boldProDFAdExp) > 2;
              DFW.Config.boldProDFAdExp ? DFW.DF_Exp_AdSlot = getUserExperimentVariant(DFW.Config.boldProDFAdExp) : '';
              DFW.isResumeCheckDFAdExp = DFW.Config.resumeCheckDFAdExp && getUserExperimentVariant(DFW.Config.resumeCheckDFAdExp) > 2;  
              if (DFW.isResumeCheckDFAdExp) {
                DFW.resumeCheckDFAdExpVariant = getUserExperimentVariant(DFW.Config.resumeCheckDFAdExp);
                  resolve && resolve(true);
              }
              else {
                resolve && resolve(true);
              }             
            }
            else {
              reject && reject();
            }
          }
        );
      }
    });
  }

  function handleClaims(result, resolve) {
    var data = JSON.parse(result);
    data = data ? data.claims : "";
    if (data && data.user_uid) {
      DFW.userId = data.user_uid;
      DFW.email = data.email;
      let name = !!data.firstName ? data.firstName + ' ' : '';
      let lastName = !!data.lastName ? data.lasttName + ' ' : '';
      DFW.firstName = name.trim();
      DFW.lastName = lastName.trim();
      if (!!data.lastName) {
        name = name + data.lastName;
      }

      DFW.userName = name.trim();
      DFW.isAgent = data.proxy_user == "True" ? true : false;
    }
  }

  function SetUserPreference() {
    let payload = {
      'code': DFW.Config.surveyUserPref,
      'created_on': new Date().toDateString(),
      'value': 1
    };
    callAjax(
      DFW.Baseurl +
      "eb/api/v1/userpreferences?user_uid=" + DFW.userId + "&portalCd=" + DFW.Config.portalCd +
      "&cookieEnabled=" +
      navigator.cookieEnabled,
      "POST",
      false,
      true,
      setSurveyVisibility,
      true,
      JSON.stringify(payload)
    );
  }

  function setSurveyVisibility(response, resolve) {
    if (resolve) {
      DFW.SurveyViewed = true;
    }
  }
  function IsSVGEnabled(emailId, emailDomain) {
    if (emailId != '' && emailId != null) {
      let isBoldUser = emailId.includes(emailDomain);
      if (isBoldUser) {
        return true;
      }
      let svgDownload = GetQueryString('svgDownload');
      if (svgDownload && svgDownload == '1') {
        return true;
      }
    }
    return false;
  }
  function GetQueryString(key) {

    var urlParams = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.href);
    let value = urlParams ? decodeURI(urlParams[1]) || 0 : null;
    return (value ? value : null);
  }

  function TrackDFWWidgetEventCallback(eventName, eventProps) {
    eventProps["Platform"] = "Web";
    eventProps["Portal"] = DFW.Config.portal;
    eventProps["Login Status"] = "TRUE";
    if (DFW.isTestBed || (typeof analytics != "undefined" && typeof mixpanel != "undefined" && typeof mixpanel.get_distinct_id != "undefined")) {
      TrackEvents(eventName, eventProps, DFW.userId);
    }
    else {
      var analyticsLoaded = setInterval(function () {
        if (typeof analytics != "undefined" && typeof mixpanel != "undefined" && typeof mixpanel.get_distinct_id != "undefined") {
          TrackEvents(eventName, eventProps, DFW.userId);
          clearInterval(analyticsLoaded);
        }
      }, 100);
    }
  }
  scope.RenderDownloadFunnel = function (data) {
    var packageLoaded = setInterval(function () {
      if (DFW.BundleLoaded) {
        clearInterval(packageLoaded);
        renderDownloadFunnelWidget(data);
      }
    }, 10);
  }
  return scope;
})(DFW.Widget || {});