// Version: v1.0.1
// Date: 11:08 18/09/2019
let D2C = (function () {
    const defaultOptions = {
        tracking_url: 'https://service-api.accesstrade.vn/api/v1',
        // element
        element_name: '.at_name',
        element_phone: '.at_phone',
        element_note: '.at_note',
        element_submit: '.submit',
        // utm
        utm_source: 'utm_source',
        utm_medium: 'utm_medium',
        utm_content: 'utm_content',
        utm_campaign: 'utm_campaign',
        sub: 'sub',
        sub1: 'sub1',
        sub2: 'sub2',
        sub3: 'sub3',
        sub4: 'sub4',
        note: 'note',
        error: function (errors) {
            console.log(errors);
        },
        success: function (data) {
            console.log(data);
        },
        submit: function (submit) {
            submit.parentElement.removeAttribute("onclick");
        },
        language: 'en',
        price_index: 1,
        cookie_expires: 3,
        click_id: 'click_id',
        ad_space_default_id: 3
    };

    let utmSourceValue = '';

    let utmMediumValue = '';

    let utmContentValue = '';

    let utmCampaignValue = '';

    let subValue = '';

    let sub1Value = '';

    let sub2Value = '';

    let sub3Value = '';

    let sub4Value = '';

    let nameValue;

    let phoneValue;

    let noteValue;

    let errorMessages = {
        en: {
            name: {
                required: 'The name field is required.',
                regex: 'The name format is invalid.'
            },
            phone: {
                required: 'The phone field is required.',
                regex: 'The phone format is invalid.',
                exist: 'The selected phone already exists in the system. Please wait 3 days to continue. '
            }
        },
        vi: {
            name: {
                required: 'Trường tên là bắt buộc.',
                regex: 'Định dạng tên không hợp lệ.'
            },
            phone: {
                required: 'Trường điện thoại là bắt buộc.',
                regex: 'Định dạng điện thoại không hợp lệ.',
                exist: 'Điện thoại được chọn đã tồn tại trong hệ thống. Vui lòng đợi 3 ngày để tiếp tục. '
            }
        }
    };

    let errors = {
        name: [],
        phone: []
    };

    let options;

    let clickIdValue = '';

    let adSpaceIdValue = '';

    let campaignIdValue = '';

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

        if (!options.ad_space_id) {
            setAdSpaceId();
            if (adSpaceIdValue === '') {
                setClickId();
                if (clickIdValue === '') {
                    if (!getCookie('d2c_click_id')) {
                        if (options.ad_space_default_id === '') {
                            options.error({
                                message: 'The ad_space_default_id is required.'
                            });
                            return;
                        } else {
                            adSpaceIdValue = options.ad_space_default_id;
                        }
                    } else {
                        clickIdValue = getCookie('d2c_click_id');
                    }
                }
                setCookie('d2c_click_id', clickIdValue, 30);
            }
        } else {
            adSpaceIdValue = options.ad_space_id;
        }

        window.onload = function () {
            setUTM();
            let allButtons = document.querySelectorAll(options.element_submit);
            for (let i = 0; i < allButtons.length; i++) {
                allButtons[i].addEventListener('click', function() {
                    let submit = allButtons[i];
                    options.submit(submit);
                    setFormData(submit);
                    resetErrors();
                    validateFormData(() => {
                        createConversion();
                    });
                });
            }
        };
    };

    const resetErrors = function () {
        errors = {
            name: [],
            phone: []
        };
    };

    const setUTM = function () {
        const query = location.search.substr(1);
        query.split('&').forEach(function (item) {
            const key = item.split('=')[0];
            const value = decodeURI(item.split('=')[1]);

            if (key === options.utm_source) {
                utmSourceValue = value;
            }

            if (key === options.utm_medium) {
                utmMediumValue = value;
            }

            if (key === options.utm_content) {
                utmContentValue = value;
            }

            if (key === options.utm_campaign) {
                utmCampaignValue = value;
            }

            if (key === options.sub) {
                subValue = value;
            }

            if (key === options.sub1) {
                sub1Value = value;
            }

            if (key === options.sub2) {
                sub2Value = value;
            }

            if (key === options.sub3) {
                sub3Value = value;
            }

            if (key === options.sub4) {
                sub4Value = value;
            }
        });
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

    const setAdSpaceId = function () {
        const query = location.search.substr(1);
        query.split('&').forEach(function (item) {
            const key = item.split('=')[0];
            const value = decodeURI(item.split('=')[1]);

            if (key === 'ad_space_id') {
                adSpaceIdValue = value;
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

    const setFormData = function (submit) {
        var form = submit.closest("form");

        // name
        nameValue = (form.querySelector(options.element_name)).value;

        // phone
        phoneValue = (form.querySelector(options.element_phone)).value;


        if (form.querySelector(options.element_note)) {
            noteValue = (form.querySelector(options.element_note)).value;
        } else {
            noteValue = '';
        }
    };

    const validateFormData = function (success, error = options.error) {
        if (nameValue === '') {
            console.log(errorMessages[options.language].name.required);
            errors.name.push(errorMessages[options.language].name.required);
        }
        /*if (nameValue !== '' && !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệếỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/.test(nameValue)) {
            console.log(errorMessages[options.language].name.regex);
            errors.name.push(errorMessages[options.language].name.regex);
        }*/
        if (phoneValue === '') {
            console.log(errorMessages[options.language].phone.required);
            errors.phone.push(errorMessages[options.language].phone.required);
        }
        if (phoneValue !== '' && !/^[0-9]+$/.test(phoneValue)) {
            console.log(errorMessages[options.language].phone.regex);
            errors.phone.push(errorMessages[options.language].phone.regex);
        }
        if (phoneValue === getCookie('d2c_phone')) {
            const now = new Date().getTime();
            const expires = new Date(getCookie('d2c_phone_expires')).getTime();
            const distance = expires - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            console.log(errorMessages[options.language].phone.exist + '(' + days + "d " + hours + "h " + minutes + "m" + ')');
            errors.phone.push(errorMessages[options.language].phone.exist + '(' + days + "d " + hours + "h " + minutes + "m" + ')');
        }
        if (errors.name.length > 0 || errors.phone.length > 0) {
            error(errors);
        } else {
            success();
        }
    };

    const createConversion = function () {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);

                if (response.status === 'error') {
                    console.log(response);
                    return;
                } else if (response.status === 'fail') {
                    options.error(response.data);
                    return;
                } else if (response.status === 'success') {
                    setCookie('d2c_phone', phoneValue, options.cookie_expires);

                    const now = new Date().getTime();
                    const expires = new Date(now + (options.cookie_expires * 86400000));
                    setCookie('d2c_phone_expires', expires.toUTCString());

                    options.success(response.data);
                }
            } else {
                //console.log(this.responseText);
            }
        };

        const params = {
            utm_source: utmSourceValue,
            utm_medium: utmMediumValue,
            utm_content: utmContentValue,
            utm_campaign: utmCampaignValue,
            sub: subValue,
            sub1: sub1Value,
            sub2: sub2Value,
            sub3: sub3Value,
            sub4: sub4Value,
        };

        const query = Object.entries(params).map((item) => item.map(encodeURI).join('=')).join('&');

        let trackingUrl = '';
        if (adSpaceIdValue !== '') {
            trackingUrl = options.tracking_url + '/campaigns/' + campaignIdValue + '/ad-spaces/' + adSpaceIdValue + '?' + query;
        } else {
            trackingUrl = options.tracking_url + '/campaigns/' + campaignIdValue + '/clicks/' + clickIdValue + '?' + query;
        }

        xhttp.open('POST', trackingUrl, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('name=' + nameValue + '&phone=' + phoneValue + '&note=' + noteValue + '&price_index=' + options.price_index);
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
