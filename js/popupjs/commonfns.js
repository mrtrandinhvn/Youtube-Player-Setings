// quality option elements
var qualityValueElements;
// local setting object
var youtubeDefaultQualityObj = { defaultQualty: 360 };
var chromeStorage = chrome.storage.sync;
//#region Utilities
// click to choose an option
function click_SelectOption(event) {
    setDefaultQuality(event.currentTarget.dataset.quality);
}

function setDefaultQuality(value) {
    youtubeDefaultQualityObj.defaultQualty = value;
    updateSettingObj();
    updateSelectedOption();
}
// Update local setting object to match value in localStorage
function updateSettingObj() {
    chromeStorage.set({ youtubeDefaultQualityObj: youtubeDefaultQualityObj }, function () {

    });
}

// Update selected setting: add "selected" css class to selected option
function updateSelectedOption() {
    for (var i = 0; i < qualityValueElements.length; i++) {
        if (qualityValueElements[i].dataset.quality == youtubeDefaultQualityObj.defaultQualty) {
            qualityValueElements[i].className = "qualityValue selected";
        } else {
            qualityValueElements[i].className = "qualityValue";
        }
    }
}
//#endregion utilities

//#region onLoaded
function bindEventToElements() {
    qualityValueElements = document.getElementsByClassName("qualityValue");
    for (var i = 0; i < qualityValueElements.length; i++) {
        // click
        qualityValueElements[i].addEventListener("click", click_SelectOption);
    }
}
function loadSettings() {
    chromeStorage.get(null, function (data) {
        if (data.youtubeDefaultQualityObj) {
            youtubeDefaultQualityObj = data.youtubeDefaultQualityObj;
        }
        updateSelectedOption();
    });
}
//#endregion onLoaded