(function() {
  var regionCodes = "AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW".split(" ");
  var regionMeta = {
    AF:["Asia/Kabul","AFN"],AX:["Europe/Mariehamn","EUR"],AL:["Europe/Tirane","ALL"],DZ:["Africa/Algiers","DZD"],AS:["Pacific/Pago_Pago","USD"],AD:["Europe/Andorra","EUR"],AO:["Africa/Luanda","AOA"],AI:["America/Anguilla","XCD"],AQ:["Antarctica/Troll","USD"],AG:["America/Antigua","XCD"],AR:["America/Argentina/Buenos_Aires","ARS"],AM:["Asia/Yerevan","AMD"],AW:["America/Aruba","AWG"],AU:["Australia/Sydney","AUD"],AT:["Europe/Vienna","EUR"],AZ:["Asia/Baku","AZN"],
    BS:["America/Nassau","BSD"],BH:["Asia/Bahrain","BHD"],BD:["Asia/Dhaka","BDT"],BB:["America/Barbados","BBD"],BY:["Europe/Minsk","BYN"],BE:["Europe/Brussels","EUR"],BZ:["America/Belize","BZD"],BJ:["Africa/Porto-Novo","XOF"],BM:["Atlantic/Bermuda","BMD"],BT:["Asia/Thimphu","BTN"],BO:["America/La_Paz","BOB"],BQ:["America/Kralendijk","USD"],BA:["Europe/Sarajevo","BAM"],BW:["Africa/Gaborone","BWP"],BV:["Europe/Oslo","NOK"],BR:["America/Sao_Paulo","BRL"],IO:["Indian/Chagos","USD"],BN:["Asia/Brunei","BND"],BG:["Europe/Sofia","BGN"],BF:["Africa/Ouagadougou","XOF"],BI:["Africa/Bujumbura","BIF"],
    CV:["Atlantic/Cape_Verde","CVE"],KH:["Asia/Phnom_Penh","KHR"],CM:["Africa/Douala","XAF"],CA:["America/Toronto","CAD"],KY:["America/Cayman","KYD"],CF:["Africa/Bangui","XAF"],TD:["Africa/Ndjamena","XAF"],CL:["America/Santiago","CLP"],CN:["Asia/Shanghai","CNY"],CX:["Indian/Christmas","AUD"],CC:["Indian/Cocos","AUD"],CO:["America/Bogota","COP"],KM:["Indian/Comoro","KMF"],CG:["Africa/Brazzaville","XAF"],CD:["Africa/Kinshasa","CDF"],CK:["Pacific/Rarotonga","NZD"],CR:["America/Costa_Rica","CRC"],CI:["Africa/Abidjan","XOF"],HR:["Europe/Zagreb","EUR"],CU:["America/Havana","CUP"],CW:["America/Curacao","ANG"],CY:["Asia/Nicosia","EUR"],CZ:["Europe/Prague","CZK"],
    DK:["Europe/Copenhagen","DKK"],DJ:["Africa/Djibouti","DJF"],DM:["America/Dominica","XCD"],DO:["America/Santo_Domingo","DOP"],EC:["America/Guayaquil","USD"],EG:["Africa/Cairo","EGP"],SV:["America/El_Salvador","USD"],GQ:["Africa/Malabo","XAF"],ER:["Africa/Asmara","ERN"],EE:["Europe/Tallinn","EUR"],SZ:["Africa/Mbabane","SZL"],ET:["Africa/Addis_Ababa","ETB"],
    FK:["Atlantic/Stanley","FKP"],FO:["Atlantic/Faroe","DKK"],FJ:["Pacific/Fiji","FJD"],FI:["Europe/Helsinki","EUR"],FR:["Europe/Paris","EUR"],GF:["America/Cayenne","EUR"],PF:["Pacific/Tahiti","XPF"],TF:["Indian/Kerguelen","EUR"],GA:["Africa/Libreville","XAF"],GM:["Africa/Banjul","GMD"],GE:["Asia/Tbilisi","GEL"],DE:["Europe/Berlin","EUR"],GH:["Africa/Accra","GHS"],GI:["Europe/Gibraltar","GIP"],GR:["Europe/Athens","EUR"],GL:["America/Nuuk","DKK"],GD:["America/Grenada","XCD"],GP:["America/Guadeloupe","EUR"],GU:["Pacific/Guam","USD"],GT:["America/Guatemala","GTQ"],GG:["Europe/Guernsey","GBP"],GN:["Africa/Conakry","GNF"],GW:["Africa/Bissau","XOF"],GY:["America/Guyana","GYD"],
    HT:["America/Port-au-Prince","HTG"],HM:["Indian/Kerguelen","AUD"],VA:["Europe/Vatican","EUR"],HN:["America/Tegucigalpa","HNL"],HK:["Asia/Hong_Kong","HKD"],HU:["Europe/Budapest","HUF"],IS:["Atlantic/Reykjavik","ISK"],IN:["Asia/Kolkata","INR"],ID:["Asia/Jakarta","IDR"],IR:["Asia/Tehran","IRR"],IQ:["Asia/Baghdad","IQD"],IE:["Europe/Dublin","EUR"],IM:["Europe/Isle_of_Man","GBP"],IL:["Asia/Jerusalem","ILS"],IT:["Europe/Rome","EUR"],
    JM:["America/Jamaica","JMD"],JP:["Asia/Tokyo","JPY"],JE:["Europe/Jersey","GBP"],JO:["Asia/Amman","JOD"],KZ:["Asia/Almaty","KZT"],KE:["Africa/Nairobi","KES"],KI:["Pacific/Tarawa","AUD"],KP:["Asia/Pyongyang","KPW"],KR:["Asia/Seoul","KRW"],KW:["Asia/Kuwait","KWD"],KG:["Asia/Bishkek","KGS"],LA:["Asia/Vientiane","LAK"],LV:["Europe/Riga","EUR"],LB:["Asia/Beirut","LBP"],LS:["Africa/Maseru","LSL"],LR:["Africa/Monrovia","LRD"],LY:["Africa/Tripoli","LYD"],LI:["Europe/Vaduz","CHF"],LT:["Europe/Vilnius","EUR"],LU:["Europe/Luxembourg","EUR"],
    MO:["Asia/Macau","MOP"],MG:["Indian/Antananarivo","MGA"],MW:["Africa/Blantyre","MWK"],MY:["Asia/Kuala_Lumpur","MYR"],MV:["Indian/Maldives","MVR"],ML:["Africa/Bamako","XOF"],MT:["Europe/Malta","EUR"],MH:["Pacific/Majuro","USD"],MQ:["America/Martinique","EUR"],MR:["Africa/Nouakchott","MRU"],MU:["Indian/Mauritius","MUR"],YT:["Indian/Mayotte","EUR"],MX:["America/Mexico_City","MXN"],FM:["Pacific/Pohnpei","USD"],MD:["Europe/Chisinau","MDL"],MC:["Europe/Monaco","EUR"],MN:["Asia/Ulaanbaatar","MNT"],ME:["Europe/Podgorica","EUR"],MS:["America/Montserrat","XCD"],MA:["Africa/Casablanca","MAD"],MZ:["Africa/Maputo","MZN"],MM:["Asia/Yangon","MMK"],
    NA:["Africa/Windhoek","NAD"],NR:["Pacific/Nauru","AUD"],NP:["Asia/Kathmandu","NPR"],NL:["Europe/Amsterdam","EUR"],NC:["Pacific/Noumea","XPF"],NZ:["Pacific/Auckland","NZD"],NI:["America/Managua","NIO"],NE:["Africa/Niamey","XOF"],NG:["Africa/Lagos","NGN"],NU:["Pacific/Niue","NZD"],NF:["Pacific/Norfolk","AUD"],MK:["Europe/Skopje","MKD"],MP:["Pacific/Saipan","USD"],NO:["Europe/Oslo","NOK"],OM:["Asia/Muscat","OMR"],
    PK:["Asia/Karachi","PKR"],PW:["Pacific/Palau","USD"],PS:["Asia/Gaza","ILS"],PA:["America/Panama","PAB"],PG:["Pacific/Port_Moresby","PGK"],PY:["America/Asuncion","PYG"],PE:["America/Lima","PEN"],PH:["Asia/Manila","PHP"],PN:["Pacific/Pitcairn","NZD"],PL:["Europe/Warsaw","PLN"],PT:["Europe/Lisbon","EUR"],PR:["America/Puerto_Rico","USD"],QA:["Asia/Qatar","QAR"],RE:["Indian/Reunion","EUR"],RO:["Europe/Bucharest","RON"],RU:["Europe/Moscow","RUB"],RW:["Africa/Kigali","RWF"],
    BL:["America/St_Barthelemy","EUR"],SH:["Atlantic/St_Helena","SHP"],KN:["America/St_Kitts","XCD"],LC:["America/St_Lucia","XCD"],MF:["America/Marigot","EUR"],PM:["America/Miquelon","EUR"],VC:["America/St_Vincent","XCD"],WS:["Pacific/Apia","WST"],SM:["Europe/San_Marino","EUR"],ST:["Africa/Sao_Tome","STN"],SA:["Asia/Riyadh","SAR"],SN:["Africa/Dakar","XOF"],RS:["Europe/Belgrade","RSD"],SC:["Indian/Mahe","SCR"],SL:["Africa/Freetown","SLE"],SG:["Asia/Singapore","SGD"],SX:["America/Lower_Princes","ANG"],SK:["Europe/Bratislava","EUR"],SI:["Europe/Ljubljana","EUR"],SB:["Pacific/Guadalcanal","SBD"],SO:["Africa/Mogadishu","SOS"],ZA:["Africa/Johannesburg","ZAR"],GS:["Atlantic/South_Georgia","GBP"],SS:["Africa/Juba","SSP"],ES:["Europe/Madrid","EUR"],LK:["Asia/Colombo","LKR"],SD:["Africa/Khartoum","SDG"],SR:["America/Paramaribo","SRD"],SJ:["Arctic/Longyearbyen","NOK"],SE:["Europe/Stockholm","SEK"],CH:["Europe/Zurich","CHF"],SY:["Asia/Damascus","SYP"],
    TW:["Asia/Taipei","TWD"],TJ:["Asia/Dushanbe","TJS"],TZ:["Africa/Dar_es_Salaam","TZS"],TH:["Asia/Bangkok","THB"],TL:["Asia/Dili","USD"],TG:["Africa/Lome","XOF"],TK:["Pacific/Fakaofo","NZD"],TO:["Pacific/Tongatapu","TOP"],TT:["America/Port_of_Spain","TTD"],TN:["Africa/Tunis","TND"],TR:["Europe/Istanbul","TRY"],TM:["Asia/Ashgabat","TMT"],TC:["America/Grand_Turk","USD"],TV:["Pacific/Funafuti","AUD"],
    UG:["Africa/Kampala","UGX"],UA:["Europe/Kyiv","UAH"],AE:["Asia/Dubai","AED"],GB:["Europe/London","GBP"],US:["America/New_York","USD"],UM:["Pacific/Wake","USD"],UY:["America/Montevideo","UYU"],UZ:["Asia/Tashkent","UZS"],VU:["Pacific/Efate","VUV"],VE:["America/Caracas","VES"],VN:["Asia/Ho_Chi_Minh","VND"],VG:["America/Tortola","USD"],VI:["America/St_Thomas","USD"],WF:["Pacific/Wallis","XPF"],EH:["Africa/El_Aaiun","MAD"],YE:["Asia/Aden","YER"],ZM:["Africa/Lusaka","ZMW"],ZW:["Africa/Harare","ZWL"]
  };

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function hideLegacyPanels() {
    for (var id = 1969; id <= 1978; id += 1) {
      var element = document.getElementById("u" + id);
      if (element) element.style.display = "none";
    }
  }

  function switchControl(name, checked) {
    return "<label class=\"create-merchant-switch\"><input type=\"checkbox\" name=\"" + name + "\"" + (checked ? " checked" : "") + "><span></span><em>" + (checked ? "启用" : "停用") + "</em></label>";
  }

  function row(label, control) {
    return "<div class=\"create-merchant-row\"><div class=\"create-merchant-label\">" + label + "</div><div class=\"create-merchant-control\">" + control + "</div></div>";
  }

  function input(name, value, placeholder, disabled) {
    return "<input name=\"" + name + "\" value=\"" + (value || "") + "\" placeholder=\"" + (placeholder || "") + "\"" + (disabled ? " disabled" : "") + ">";
  }

  function select(name, options, value) {
    return "<select name=\"" + name + "\">" + options.map(function(item) {
      var selected = item === value ? " selected" : "";
      return "<option value=\"" + item + "\"" + selected + ">" + item + "</option>";
    }).join("") + "</select>";
  }

  function regionName(code) {
    try {
      return new Intl.DisplayNames(["zh-CN"], { type: "region" }).of(code) || code;
    } catch (error) {
      return code;
    }
  }

  function countrySelect(value) {
    return "<select name=\"country\">" + regionCodes.map(function(code) {
      var selected = code === value ? " selected" : "";
      var meta = regionMeta[code] || ["UTC", "USD"];
      return "<option value=\"" + code + "\"" + selected + ">" + meta[1] + "/" + regionName(code) + "</option>";
    }).join("") + "</select>";
  }

  function countryRegionControl(value) {
    return "<div class=\"create-merchant-country-line\">" +
      countrySelect(value) +
      "<div class=\"create-merchant-region-meta\"><span>时区</span><strong data-country-timezone></strong></div>" +
      "<div class=\"create-merchant-region-meta\"><span>币种</span><input name=\"currency\" disabled></div>" +
    "</div>";
  }

  function syncCountryMeta(page) {
    var country = page.querySelector("[name='country']");
    var timezone = page.querySelector("[data-country-timezone]");
    var currency = page.querySelector("[name='currency']");
    if (!country || !timezone || !currency) return;
    var meta = regionMeta[country.value] || ["UTC", "USD"];
    timezone.textContent = timezoneOffsetText(meta[0]);
    currency.value = meta[1];
  }

  function timezoneOffsetText(timeZone) {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timeZone,
        timeZoneName: "shortOffset"
      }).formatToParts(new Date());
      var part = parts.filter(function(item) { return item.type === "timeZoneName"; })[0];
      var value = part ? part.value.replace("GMT", "") : "";
      if (!value) return "UTC +00:00";
      var sign = value.charAt(0) === "-" ? "-" : "+";
      var offset = value.replace("+", "").replace("-", "");
      var segments = offset.split(":");
      var hour = String(Number(segments[0]) || 0).padStart(2, "0");
      var minute = String(Number(segments[1]) || 0).padStart(2, "0");
      return "UTC " + sign + hour + ":" + minute;
    } catch (error) {
      return "UTC +00:00";
    }
  }

  function generateApiKey() {
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var value = "";
    for (var i = 0; i < 32; i += 1) {
      value += chars[Math.floor(Math.random() * chars.length)];
    }
    return value;
  }

  function showFieldError(input, text) {
    var control = input.closest(".create-merchant-control");
    if (!control) return;
    control.classList.add("has-error");
    var error = control.querySelector("[data-field-error]");
    if (!error) {
      error = document.createElement("strong");
      error.setAttribute("data-field-error", "");
      control.appendChild(error);
    }
    error.textContent = text;
  }

  function clearFieldError(input) {
    var control = input.closest(".create-merchant-control");
    if (!control) return;
    control.classList.remove("has-error");
    var error = control.querySelector("[data-field-error]");
    if (error) error.textContent = "";
  }

  function validate(page) {
    var required = ["merchantName", "account"];
    var ok = true;
    required.forEach(function(name) {
      var field = page.querySelector("[name='" + name + "']");
      if (field && !field.value.trim()) {
        showFieldError(field, "请填写内容");
        ok = false;
      }
    });
    return ok;
  }

  function ensureTopbar(base) {
    if (base.querySelector(".unified-topbar")) return;
    var wrapper = document.createElement("div");
    wrapper.className = "unified-topbar";
    wrapper.style.left = "1034px";
    wrapper.style.top = "48px";
    wrapper.innerHTML =
      "<a class=\"unified-topbar__message\" href=\"消息页.html\" title=\"消息\">" +
        "<span class=\"unified-topbar__message-icon\" aria-hidden=\"true\"></span>" +
        "<span class=\"unified-topbar__message-label\">消息</span>" +
        "<span class=\"unified-topbar__message-badge\">12</span>" +
      "</a>" +
      "<select class=\"unified-topbar__language\" aria-label=\"语言\">" +
        "<option value=\"中文\">中文</option>" +
        "<option value=\"English\">English</option>" +
      "</select>" +
      "<div class=\"unified-topbar__account\">" +
        "<span class=\"unified-topbar__account-label\">当前账号</span>" +
        "<span class=\"unified-topbar__account-name\">qq1234567</span>" +
      "</div>" +
      "<button class=\"unified-topbar__account-toggle\" type=\"button\" aria-label=\"账号菜单\" aria-expanded=\"false\">" +
        "<img class=\"unified-topbar__account-arrow\" src=\"images/page_1/u8.svg\" alt=\"\">" +
      "</button>" +
      "<div class=\"unified-topbar__account-menu\" role=\"menu\">" +
        "<button type=\"button\" role=\"menuitem\">个人中心</button>" +
        "<button type=\"button\" role=\"menuitem\">退出登录</button>" +
      "</div>";
    var toggle = wrapper.querySelector(".unified-topbar__account-toggle");
    var menu = wrapper.querySelector(".unified-topbar__account-menu");
    toggle.addEventListener("click", function(event) {
      event.stopPropagation();
      var isOpen = wrapper.classList.toggle("unified-topbar--menu-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    menu.addEventListener("click", function(event) {
      event.stopPropagation();
      wrapper.classList.remove("unified-topbar--menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
    base.appendChild(wrapper);
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".create-merchant-page")) return;

    hideLegacyPanels();
    ensureTopbar(base);

    var page = document.createElement("div");
    page.className = "create-merchant-page";
    page.innerHTML =
      "<div class=\"game-records-titlebar create-merchant-titlebar\"><h1>创建商户</h1></div>" +
      "<div class=\"create-merchant-card\">" +
        "<div class=\"create-merchant-section-title\">基础信息</div>" +
        "<div class=\"create-merchant-table\">" +
          row("状态", "<div class=\"create-merchant-status-group\"><div><b>商户状态</b>" + switchControl("merchantEnabled", true) + "</div><div><b>游戏状态</b>" + switchControl("gameEnabled", true) + "</div></div>") +
          row("商户名称", input("merchantName", "", "请输入商户名称")) +
          row("商户账号", "<div class=\"create-merchant-account-line\">" + input("account", "", "请输入商户账号") + "<span>新商户初始密码：Az123456#</span></div>") +
          row("商户API密匙", "<div class=\"create-merchant-inline\">" + input("apiKey", generateApiKey(), "", true) + "<button type=\"button\" data-action=\"api-key\">重新生成</button></div>") +
          row("国家名称", countryRegionControl("IN")) +
          row("钱包类型", select("walletType", ["单一钱包", "转账钱包"], "单一钱包")) +
          row("联系方式", "<div class=\"create-merchant-contact\">" + input("contactName", "", "联系人") + input("contactValue", "", "联系方式") + "</div>") +
          row("告警ChatId", input("chatId", "", "请输入ChatId")) +
          row("获取玩家信息接口地址", input("playerApi", "http://42.51.44.28:8017/api/NewClient/GetPlayer", "")) +
          row("获取玩家余额接口地址", input("balanceApi", "http://42.51.44.28:8017/api/NewClient/GetBalance", "")) +
          row("获取变更余额接口地址", input("changeApi", "http://42.51.44.28:8017/api/NewClient/ChangeBalance", "")) +
          row("商户类型", "<div class=\"create-merchant-type\"><label><input type=\"radio\" name=\"merchantType\" value=\"预充值商户\" checked><span>预充值商户</span></label><label><input type=\"radio\" name=\"merchantType\" value=\"月结商户\"><span>月结商户</span></label></div>") +
        "</div>" +
        "<div class=\"create-merchant-foot\"><button type=\"button\" data-action=\"cancel\">取消</button><button type=\"button\" class=\"is-primary\" data-action=\"save\">保存</button></div>" +
      "</div>";

    base.appendChild(page);
    syncCountryMeta(page);

    page.addEventListener("click", function(event) {
      var action = event.target.closest("[data-action]");
      if (!action) return;
      var type = action.getAttribute("data-action");
      if (type === "back" || type === "cancel") {
        window.location.href = "商户列表.html";
      }
      if (type === "api-key") {
        page.querySelector("[name='apiKey']").value = generateApiKey();
      }
      if (type === "save" && validate(page)) {
        window.location.href = "商户列表.html";
      }
    });

    page.addEventListener("input", function(event) {
      if (event.target.matches("input, select")) clearFieldError(event.target);
    });

    page.addEventListener("change", function(event) {
      if (event.target.matches(".create-merchant-switch input")) {
        event.target.parentElement.querySelector("em").textContent = event.target.checked ? "启用" : "停用";
      }
      if (event.target.matches("[name='country']")) {
        syncCountryMeta(page);
      }
    });
  }

  onReady(buildPage);
})();
