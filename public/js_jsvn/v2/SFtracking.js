var SF = {
    cookie_duration: 30,
    tracking_url: 'https://service-api.scalef.com/api/v1/tracking-tag',
    aff_utm_source: "SF",
    aff_utm_sources: ["SF", "SCALEF", "ACCESSTRADE", "accesstrade"],
    aff_source_param: "utm_source",
    aff_sid_param: "click_id",
    is_reoccur: 1,
    is_lastclick: 1,
    campaign_id: 0,
    cookie_domain: null,

    success_page: "thank_you",
    shop_id: null,
    init: function () {
        var query_string = this.get_script_qs();
        var pa = query_string.split("?").pop().split("&");
        var kv = [];
        for (var j = 0; j < pa.length; j++) {
            kv = pa[j].split("=");
            switch (kv[0]) {
                case "cookie_duration":
                    this.cookie_duration = parseInt(kv[1]);
                    break;
                case "is_reoccur":
                    this.is_reoccur = parseInt(kv[1]);
                    break;
                case "is_lastclick":
                    this.is_lastclick = parseInt(kv[1]);
                    break;
                case "success_page":
                    this.success_page = kv[1];
                    break;
                case "shop_id":
                    this.shop_id = kv[1];
                    break;
                case "cookie_domain":
                    this.cookie_domain = kv[1];
                    break;
                case "aff_source_param":
                    this.aff_source_param = kv[1];
                    break;
                case "campaign_id":
                    this.campaign_id = kv[1];
                    break;
                case "tracking_url":
                    this.tracking_url = kv[1];
                    break;
            }
        }
    },
 	get_script_qs: function() {
        var target = document.currentScript || (function() {
            var scripts = document.getElementsByTagName('script');
            var last_script = scripts[scripts.length - 1];
            if( last_script.src != "" && last_script.src.indexOf("/haravan_tracking_v1.js") > -1 ) {
                return last_script;
            }
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src.indexOf("/haravan_tracking_v1.js") > -1) {
                    return scripts[i];
                }
            }
            return {src: ''};
        })();
        return target.src.replace(/^[^\?]+\??/,'');
    },
    check_scope: function() {
        let a = this.get_cookie("_aff_network") || this.get_param(this.aff_source_param);
        return a == this.aff_utm_source;

    },
    track: function() {
        let a = this.get_param(this.aff_sid_param);
        let b = this.get_param(this.aff_source_param);
        if (this.is_lastclick) {
            if (b == this.aff_utm_source || this.aff_utm_sources.indexOf(b) != -1) {
                this.set_cookie("_aff_network", b, this.cookie_duration);
                if (a) {
                    this.set_cookie("_click_id", a, this.cookie_duration)
                }
            } else {
                if (b) {
                    this.set_cookie("_aff_network", "", 0);
                    this.set_cookie("_click_id", "", 0)
                }
            }
        } else {
            if (b == this.aff_utm_source || !this.get_cookie("_aff_network")) {
                this.set_cookie("_aff_network", b, this.cookie_duration);
                if (a) {
                    this.set_cookie("_click_id", a, this.cookie_duration)
                }
            }
        }
    },
    is_in_app_browser: function() {
        let a = navigator.userAgent || "";
        if (a.match(/FBAN\/FBIOS/i)) {
            return true
        }
        if (a.match(/FBAN\/MessengerForiOS/i)) {
            return true
        }
        if (a.match(/FBMD\/iPhone/i)) {
            return true
        }
        if (a.match(/FBSN\/iOS/i)) {
            return true
        }
        return false
    },
    track_order: function(p) {
        let date = new Date();
        let s = p.sale_time ? p.sale_time :date.toISOString();
        let d = p.order_items ? p.order_items : [];
        let f = p.order_id ? p.order_id : "";
        let q = p.phone ? p.phone : "";
        let w = p.name ? p.name : "unknow";
        let k = p.amount ? p.amount : 0;
        let y = p.shop_type ? p.shop_type : 'unknow';
        let m = p.discount ? p.discount : 0;
        let c = this.get_cookie('_click_id');
        let t = "";
        let o = this.get_cookie("_aff_network");
        let h = [];
        let g = "";
        let e = d.length;
        for (let q = 0; q < e; q++) {
            let l = d[q].itemid;
            let j = d[q].quantity;
            let n = d[q].price;
            let c = d[q].catid;
            let s = d[q].cat_name ? d[q].cat_name : "";
            let e = d[q].name ? d[q].name : "";
            let u = d[q].sku ? d[q].sku : "";
            t += ("&products[]=$id:" + l + "$quantity:" + j + "$price:" + n + "$category_id:" + c + "$category_name:" + s + "$sku:" + u + "$name:" + e)
        }
        if (h.length > 0) {
            g = "&" + h.join("&")
        }
        let b =  this.tracking_url + "?transaction_id=" + f;
        b += "&currency=VND" ;
        b += "&phone=" + q ;
        b += "&discount=" + m ;
        b += "&shop_type=" + y ;
        b += "&name=" + w ;
        b += "&click_id=" + c + "&aff_source=" + o;
        b += "&campaign_id=" + this.campaign_id + "&sale_time=" + s;
        b += t + g;
        if (!navigator.sendBeacon || this.is_in_app_browser()) {
            let u = document.createElement("img");
            u.width = 1;
            u.height = 1;
            u.border = 0;
            u.src = b;
            document.body.appendChild(u);
            console.log("[SF] Pixel tracking url: " + u.src)
        } else {
            navigator.sendBeacon(b);
            console.log("[SF] Postback tracking url: " + b)
        }
        if (!this.is_reoccur) {
            this.set_cookie("_aff_network", "", 0);
            this.set_cookie("_click_id", "", 0)
        }
    },
    get_param: function(c, b) {
        if (!b) {
            b = location.href
        }
        c = c.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let a = "[\\?&]" + c + "=([^&#]*)";
        let e = new RegExp(a);
        let d = e.exec(b);
        return d == null ? null : d[1]
    },
    set_cookie: function(g, b, c) {
        let f = new Date();
        f.setTime(f.getTime() + (c * 24 * 60 * 60 * 1000));
        let a = "expires=" + f.toUTCString();
        cookie_domain = this.cookie_domain || window.location.hostname;
        document.cookie = g + "=" + b + "; " + a + ";domain=" + cookie_domain + "; path=/"
    },
    get_cookie: function(d) {
        let b = d + "=";
        let a = document.cookie.split(";");
        for (let e = 0; e < a.length; e++) {
            let f = a[e];
            while (f.charAt(0) == " ") {
                f = f.substring(1)
            }
            if (f.indexOf(b) == 0) {
                return f.substring(b.length, f.length)
            }
        }
        return undefined
    },
    prepare_order: function (order_data, shop_type) {
        var prepare_data_order_items = []
        var order_id = '';
        var customer_name = '';
        order_data.checkout.line_items.map((v, i) =>{
            let sf_item = {
                itemid: (i+1)+v.product_id,
                quantity: v.quantity,
                sku: encodeURIComponent(v.sku),
                price: v.price,
                name: encodeURIComponent(v.title),
                cat_name: encodeURIComponent(v.type),
                catid: encodeURIComponent(v.type)
            }
            prepare_data_order_items.push(sf_item);
        });
        if (shop_type == 'Shopify') {
            order_id = 'undefined';
            order_id = document.getElementsByClassName("os-order-number")[0].innerText.replace(/\D/g, "");
            order_id += '_' + order_data.checkout.order_id;
            customer_name = order_data.checkout.billing_address.first_name + ' ' + order_data.checkout.billing_address.last_name
        }
        if (shop_type == 'Haravan') {
            order_id = order_data.checkout.order_number.replace(/\D/g, "");
            order_id += '_' + order_data.checkout.order_id;
            customer_name = order_data.checkout.billing_address.full_name;
        }
            var sf_order_info={
                order_id: encodeURIComponent(order_id + '_' + btoa(shop_type)),
                name: encodeURIComponent(customer_name),
                sale_time: order_data.checkout.created_at,
                phone: order_data.checkout.billing_address.phone,
                discount: (order_data.checkout.discount != null) ? order_data.checkout.discount.amount: 0,
                order_items:prepare_data_order_items,
                shop_type:shop_type,
            };
        
        return sf_order_info;
    },
    track_thank_you_page: function () {
        console.log("[SF] Tracking conversion...");
        var pathArray = window.location.pathname.split('/');
        var last_part = pathArray[pathArray.length - 1];
        var get_utm_source = this.get_cookie("_aff_network");

        if (last_part == this.success_page && get_utm_source == "SF") {
            var sid = this.get_cookie('_click_id');
            if (!sid) {
                console.log("[SF] There is no session id found");
                return false;
            }

            var order_data = null;
            var shop_type = '';
            if (typeof Shopify !== "undefined") {
                    order_data = Shopify;
                    shop_type = 'Shopify';
            }
            if (typeof Haravan !== "undefined") {
                order_data = Haravan;
                shop_type = 'Haravan';
            }
            if (typeof Haravan === "undefined" && typeof Shopify === "undefined") {
                console.log("[SF] There is no Haravan order info");
               
                return false;
            }


            if (order_data !== null) {
                var sf_order_info = SF.prepare_order(order_data, shop_type);
                console.log("[SF] Tracking order...");
                SF.track_order(sf_order_info);
            }
        }
    }
};

SF.init();
SF.track();
SF.track_thank_you_page();
