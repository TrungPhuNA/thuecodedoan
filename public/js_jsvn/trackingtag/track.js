// Version: v1.0.1
// Date: 11:08 24/03/2020
let Track = (function () {
    const defaultOptions = {
        campaign_id: '',
        is_reoccur: 1,
        is_lastclick: 1,
        click_id: 'click_id',
    };

    let options;

    let clickIdValue = '';

    let campaignIdValue = '';

    let is_reoccurValue = '';

    const init = function (customOptions) {
        options = Object.assign(defaultOptions, customOptions);

        if (!options.campaign_id) {
            setCampaignId();
            if (campaignIdValue === '') {
                options.error({
                    message: 'The campaign_id is required.'
                });
                return;
            }
        } else {
            campaignIdValue = options.campaign_id;
        }
        setCookie('track_campaign_id', campaignIdValue, 30);

        const currentClickId = getCookie('track_click_id');
        if (options.is_lastclick === 0 && currentClickId) {
            // do nothing
        } else {
            setClickId();
            if (clickIdValue === '') {
                if (!getCookie('track_click_id')) {
                    options.error({
                        message: 'The click id not found.'
                    });
                } else {
                    clickIdValue = getCookie('track_click_id');
                }
            }
            setCookie('track_click_id', clickIdValue, 30);
        }

        // is_reoccur
        if (!options.is_reoccur) {
            setCampaignId();
            if (is_reoccurValue === '') {
                options.error({
                    message: 'The is_reoccur is required.'
                });
                return;
            }
        } else {
            is_reoccurValue = options.is_reoccur;
        }
        setCookie('track_is_reoccur', is_reoccurValue, 30);
    };

    const setClickId = function () {
        const query = location.search.substr(1);
        query.split('&').forEach(function (item) {
            const key = item.split('=')[0];
            const value = decodeURI(item.split('=')[1]);

            if (key === options.click_id) {
                clickIdValue = value;
            }
        });
    };

    const setCampaignId = function () {
        const query = location.search.substr(1);
        query.split('&').forEach(function (item) {
            const key = item.split('=')[0];
            const value = decodeURI(item.split('=')[1]);

            if (key === 'campaign_id') {
                campaignIdValue = value;
            }
        });
    };

    const setCookie = function (key, value, expiresLength) {
        const now = new Date().getTime();
        const expires = new Date(now + (expiresLength * 86400000));
        document.cookie = key + '=' + value + '; expires=' + expires.toUTCString();
    };

    const getCookie = function (key) {
        let result;

        const cookie = document.cookie.split('; ');

        cookie.forEach(function (item) {
            const k = item.split('=')[0];
            const v = item.split('=')[1];

            if (k === key) {
                result = v;
            }
        });

        return result;
    };

    return {
        init
    };

})();
