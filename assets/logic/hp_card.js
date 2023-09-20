/* JS for tab "homepage" reminder & card */

import { vns_method_to_btn_name } from './anicard.js';

// homepage card class
class Homepage_Card {
    constructor(parameters = { 
        card_id, title, VNS_tag, VNS_ambiguity, EL_tag, AVT_tag, how, why, 
        eg_title, eg_source, eg_url, eg_year, eg_category, eg_subcategory, examplePic, description, count,link
    }) {
        this.parameters = {};
        this.parameters = parameters;
    }

    _createCard () {
        let deck_single_node = document.createElement("div");
        let card_inner_node = document.createElement("div");
        let card_front_node = document.createElement("div");
        let card_back_node = document.createElement("div");
        let card_front_header = this._createCard_header();
        let card_back_header = card_front_header.cloneNode(true);
        deck_single_node.classList.add("col-xl-4", "col-lg-6", "col-sm-12", "card-deck-single");
        card_inner_node.classList.add("card-inner", `el-${this.parameters["EL_tag"].replace(/\s+/g, "-")}`);
        card_front_node.classList.add("card", "front");
        card_back_node.classList.add("card", "back");

        deck_single_node.setAttribute("name", "card_" + this.parameters["card_id"]);

        // front
        let front_nodeList = [
            card_front_header, this._createCard_frontImg(),
            this._createCard_frontBody(), this._createCard_footer(1)
        ];
        front_nodeList.forEach((node, i, nodeList) => card_front_node.appendChild(node));

        // back
        let back_nodeList = [
            card_back_header, this._createCard_backImgBox(),
            this._createCard_backBody(), this._createCard_footer(0)
        ];
        back_nodeList.forEach((node, i, nodeList) => card_back_node.appendChild(node));

        // insert to card-inner
        [card_front_node, card_back_node].forEach(
            (node, i, nodeList) => card_inner_node.appendChild(node)
        );
        deck_single_node.appendChild(card_inner_node);
        return deck_single_node;
    }

    _get_aim_deck () {
        if(this.parameters["VNS_tag"]) {
            return this.parameters["VNS_tag"];
        }
        return "";
    }

    _get_param(param_key) {
        param_key = param_key + "" || "card_id";
        if(Object.keys(this.parameters).indexOf(param_key) < 0) {
            return -1;
        }
        return this.parameters[param_key];
    }

    /**
    * <div class="card-header">
    *     <div class="header-text">
    *         <div class="header-text-title">Pulse</div>
    *         <div class="header-text-class">The elements of visualization</div>
    *     </div>
    *     <span class="header-symbol"></span>
    * </div> 
    * */
    _createCard_header () {
        let card_header_node = document.createElement("div");
        let header_text_node = document.createElement("div");
        let header_symbol_node = document.createElement("span");  // 缺了icon图片定义
        let title_html = `<div class="header-text-title">${vns_method_to_btn_name(this.parameters["title"])}</div>`;
        let class_html = `<div class="header-text-class">${vns_method_to_btn_name(this.parameters["EL_tag"])}</div>`;

        card_header_node.classList.add("card-header");
        header_text_node.classList.add("header-text");
        header_symbol_node.classList.add("header-symbol");

        // header_text_node.innerHTML = title_html + class_html;
        header_text_node.innerHTML = title_html;

        [header_text_node, header_symbol_node].forEach((node, i, nodeList) => card_header_node.appendChild(node));
        return card_header_node;
    }

    /**
     * front
    * <div class="card-frontImg">
    *     <img class="card-img front-gif" src="./assets/image/fail_loading.svg">
    *     <img class="card-img front-preview" src="./assets/image/loading.svg">
    * </div> 
    * */

    _createCard_frontImg () {
        let card_frontImg_node = document.createElement("div");
        let front_preview_html = `<a href="${this.parameters["link"]}" target="_blank"><img class="card-img front-preview" src="./assets/card_preview/${this.parameters["examplePic"]}"></a>`;  // 缺少正面预览png
    
        card_frontImg_node.classList.add("card-frontImg");
        card_frontImg_node.innerHTML = front_preview_html;
    
        return card_frontImg_node;
    }
    
    // _createCard_frontImg () {
    //     let card_frontImg_node = document.createElement("div");
    //     // let front_gif_html = `<img class="card-img front-gif" src="./assets/corpus_img/${this.parameters["examplePic"]}" alt="./assets/image/fail_loading.svg">`;  // 缺少正面gif
    //     let front_preview_html = `<img class="card-img front-preview" src="./assets/corpus_img/${this.parameters["examplePic"]}">`  // 缺少正面预览png

    //     card_frontImg_node.classList.add("card-frontImg");
    //     card_frontImg_node.innerHTML = front_preview_html;
    //     // card_frontImg_node.innerHTML = front_gif_html + front_preview_html;

    //     return card_frontImg_node;
    // }

    /**
     * back
    * <div class="card-imgBox">
    *     <img class="card-img back-gif" src="./assets/image/fail_loading.svg">
    *     <div class="img-cover">
    *         <div class="img-cover-mask"></div>
    *         <span class="img-cover-overlay" type="button" data-toggle="modal" data-target="#zooming-modal"></span>
    *     </div>
    * </div>
    * */
    _createCard_backImgBox () {
        let card_imgBox_node = document.createElement("div");
        // this._back_gif_name = this.parameters["VNS_ambiguity"] == 0 ? `back_${this.parameters["card_id"]}.gif`: `back_${this.parameters["card_id"]}_${this.parameters["VNS_tag"]}.gif`;
        // let back_gif_html = `<img class="card-img back-gif" src=${file_exist("./assets/back_gif_s/", [`back_${this.parameters["card_id"]}.gif`, `back_${this.parameters["card_id"]}_${this.parameters["VNS_tag"]}.gif`])} alt="./assets/image/fail_loading.svg">`;  // 缺少反面gif
        let back_gif_html = `<img class="card-img back-gif" src="./assets/back_gif_s/${this._back_gif_name}" alt="Image loading error.">`;  // 缺少反面gif
        let img_cover_node = document.createElement("div");
        let img_cover_mask_html = `<div class="img-cover-mask"></div>`;
        // let img_cover_overlay_node = document.createElement("span");
        let img_cover_overlay_html = `<span class="img-cover-overlay" type="button" data-toggle="modal" data-target="#zooming-modal"></span>`;
        // const overlay_attr = {
        //     "type": "button",
        //     "data-toggle": "modal",
        //     "data-target": "#zooming-modal"
        // }

        card_imgBox_node.classList.add("card-imgBox");
        img_cover_node.classList.add("img-cover");
        // img_cover_overlay_node.classList.add("img-cover-overlay");
        // Object.keys(overlay_attr).forEach(
        //     (key, i, keyArray) => img_cover_overlay_node.setAttribute(key, overlay_attr[key])
        // );

        img_cover_node.innerHTML = img_cover_mask_html + img_cover_overlay_html;
        card_imgBox_node.innerHTML = back_gif_html;
        card_imgBox_node.appendChild(img_cover_node);
        return card_imgBox_node;
    }

    /**
     * front
    <div class="card-body">
        <div class="card-body-subtitle">HOW</div>
        <p class="card-body-text">Expand and contract rhythmically.</p>
        <div class="card-body-subtitle">WHY</div>
        <p class="card-body-text">Size contrast is a common way of attracting attention
            and conveying importance.
        </p>
        <div class="card-body-subtitle">Applicable Visualization Techniques</div>
        <p class="card-body-text">Size contrast is a common way of attracting attention
            and conveying importance.
        </p>
    </div>
    */
    _createCard_frontBody () {
        let card_body_node = document.createElement("div");
        let card_frontBody_titleHtml = `<div class="card-body-subtitle">${this.parameters["description"]}</div>`
        // let card_frontBody_titleHtml = "";
        // let card_frontBody_textHtml = "";
        // let card_body_front_textArray = [
        //     this.parameters["how"], this.parameters["why"], this.parameters["AVT_tag"]
        // ];

        card_body_node.classList.add("card-body");

        // Homepage_Card.card_body_front_titleArray.forEach((title, i, titleList) => {
        //     if(card_body_front_textArray[i] === "") {
        //         return ;
        //     }

        //     card_frontBody_titleHtml = `<div class="card-body-subtitle">${title}</div>`;
        //     card_frontBody_textHtml = `<p class="card-body-text">${card_body_front_textArray[i]}</p>`;
        //     card_body_node.innerHTML  += (card_frontBody_titleHtml + card_frontBody_textHtml); 
        // });
        card_body_node.innerHTML += card_frontBody_titleHtml
        
        return card_body_node;
    }

    /**
     * back
     * <div class="card-body">
     *      <h6 class="card-body-subtitle">Inequality: how wealth is distributed in the UK - animated video</h6>
     *      <div class="card-body-caption">
     *          <div><span>Source: </span>The Guardian</div>
     *          <div><span>Year: </span>2013</div>
     *          <div><span>Category: </span>Social Sciences</div>
     *          <div><span>Subcategory: </span>Economics</div>
     *      </div>
     *  </div>
     */
    _createCard_backBody () {
        let card_body_node = document.createElement("div");
        let card_body_subtitle_html = `<h6 class="card-body-subtitle">${this.parameters["eg_title"]}</h6>`;
        let card_body_caption_node = document.createElement("div");
        let caption_item_html = "";
        let caption_valueArr = [
            this.parameters["eg_source"], this.parameters["eg_year"], 
            this.parameters["eg_category"], this.parameters["eg_subcategory"]
        ];

        card_body_node.classList.add("card-body");
        card_body_caption_node.classList.add("card-body-caption");
        
        Homepage_Card.caption_keyArr.forEach((key, i, keyList) => {
            if(caption_valueArr[i] === "") {
                return ;
            }

            caption_item_html = `<div><span>${key}: </span>${caption_valueArr[i]}</div>`;
            card_body_caption_node.innerHTML += caption_item_html;
        });
        card_body_node.innerHTML = card_body_subtitle_html;
        card_body_node.appendChild(card_body_caption_node);
        return card_body_node;
    }

    /* 
    * front
    * <div class="card-footer">
    *     <span class="card-footer-num">NO. 1</span>
    *     <button class="card-footer-bottom">View examples</button>
    * </div>

    * back
    * <div class="card-footer">
    *     <a href="https://www.theguardian.com/commentisfree/video/2013/oct/08/inequality-how-wealth-distributed-uk-animated-video" target="_blank">
    *         <span class="card-footer-url"></span>URL
    *     </a>
    *     <button class="card-footer-bottom">Back to front</button>
    * </div>
    */
    _createCard_footer (direction = 1) {

        let left_html = "";
        let button_text = "";
        let card_footer_bottom_html = "";
        let card_footer_node = document.createElement("div");

        if(direction > 0) {
            // positive
            left_html = `<span class="card-footer-num">NO. ${this.parameters["card_id"]}</span>`;
            // button_text = "View examples";
        } else {
            // negative
            left_html = `<a href="${this.parameters["eg_url"]}" target="_blank"><span class="card-footer-url"></span>URL</a>`;
            // button_text = "Back to front";
        }
        
        // card_footer_bottom_html = `<button class="card-footer-bottom">${button_text}</button>`;
        card_footer_bottom_html = `<span style="font-weight: 400; font-size: 12px">count: ${this.parameters["count"]}</span>`
        card_footer_node.classList.add("card-footer");

        card_footer_node.innerHTML = left_html + card_footer_bottom_html;
        return card_footer_node;
    }
}

Homepage_Card.card_body_front_titleArray = ["HOW", "WHY", "Applicable Visualization Techniques"];
Homepage_Card.caption_keyArr = ["Source", "Year", "Category", "Subcategory"];

Homepage_Card.prototype._bindEvents = function () {

// 为 card-frontImg 添加点击事件以导航到URL


    let that = this;
    const this_card_node = this._deck_single_node;
    const card_inner_node = this_card_node.querySelector(".card-inner");
    const front_trans_button = card_inner_node.querySelector(".front .card-footer-bottom");
    const back_trans_button = card_inner_node.querySelector(".back .card-footer-bottom");
    const front_img = card_inner_node.querySelector(".front .card-frontImg");
    
    // const front_preview_img = this_card_node.querySelector("img.front-preview");
    const back_img_box = this_card_node.querySelector(".card-imgBox");
    const back_img_cover = back_img_box.querySelector(".img-cover");
    const back_gif_zooming = back_img_cover.querySelector(".img-cover-overlay");
    const modal_title_node = document.querySelector(".modal-title");




    // card footer button
    // front_trans_button.addEventListener("click", () => {
    //     if(!card_inner_node.classList.contains("turned-over")) {
    //         card_inner_node.classList.add("turned-over");
    //     }
    // });
    // back_trans_button.addEventListener("click", () => {
    //     if(card_inner_node.classList.contains("turned-over")) {
    //         card_inner_node.classList.remove("turned-over");
    //     }
    // });

    // card footer URL
    $(card_inner_node.querySelector(".card-footer a")).tooltip({ title: "watch full video" });

    // front gif static preview
    // front_img.addEventListener("mouseover", () => {
    //     front_img.querySelector("img.front-gif").style.visibility = "none";
    //     $(front_img).find("img.front-preview").fadeTo("fast", 0);
    // });
    // front_img.addEventListener("mouseout", () => {
    //     front_img.querySelector("img.front-gif").style.visibility = "block";
    //     $(front_img).find("img.front-preview").fadeTo("fast", 1);
    // });

    // back gif zooming in modal window
    $(back_img_box).hover(
        function () {
            $(back_img_cover).fadeTo("fast", 1);
        },
        function () {
            $(back_img_cover).fadeTo("fast", 0);
        }
    );

    // modal window
    $(back_gif_zooming).tooltip({ title: "zoom in" });
    back_gif_zooming.addEventListener("click", () => {
        $('#zooming-modal').modal({
            backdrop: true,
            keyboard: false,
            focus: true,
            show: true
        });

        document.querySelector(".modal-body > img").setAttribute("src", `./assets/back_gif_s/${this._back_gif_name}`);
        document.querySelector(".modal-content").classList.add(this.parameters["VNS_tag"]);
        modal_title_node.innerText = this.parameters["eg_title"];
        modal_title_node.setAttribute("href", this.parameters["eg_url"]);
    });
    // $('#zooming-modal').on('show.bs.modal', function() {
    //     let img = new Image();
    //     img.src = `./assets/back_gif_s/${that._back_gif_name}`;
    //     document.querySelector(".modal-title").innerHTML = that.parameters["card_title"];
    //     $(img).on("load", function(){$(".modal-body > img").replaceWith(img);});
    // });
    

}

Homepage_Card.prototype.appendTo = function (parentNode) {
    if(!(parentNode instanceof HTMLElement)) {
        console.error(`${parentNode} is not a DOM node!`);
        return false;
    }

    this._deck_single_node = this._createCard();
    this._bindEvents();
    
    parentNode.appendChild(this._deck_single_node);
    return true;
}


/**
 * <div class="display-reminder active-sticky">
        <div class="reminder-head">
            <span class="reminder-symbol"></span>
            <span class="reminder-title">Emphasis (13)</span>
        </div>
        <div class="reminder-desc">
            ······ ······ ······
        </div>
    </div>
 */
// homepage reminder class
class Homepage_Reminder {
    constructor({VNS_tag, VNS_desc, VNS_num}) {
        this._VNS_tag = VNS_tag + "";
        this._VNS_num = VNS_num + "";
        this._VNS_desc = VNS_desc + "";
    }

    _createReminder (methodToReminderTitle = str => str) {
        let reminder_node = document.createElement("div");
        let reminder_bg_node = document.createElement("div");
        let reminder_content_node = document.createElement("div");
        let reminder_head_node = document.createElement("div");
        let reminder_desc_node = document.createElement("div");
        let reminder_symbol_html = `<span class="reminder-symbol"></span>`;
        let reminder_title_html = `<span class="reminder-title">${methodToReminderTitle(this._VNS_tag)}&nbsp;</span>
            <span class='reminder-sum'>(${this._VNS_num})</span>
            <span class='reminder-sum-s'>SUM: ${this._VNS_num}</span>`;
        reminder_node.classList.add("display-reminder");
        // reminder_bg_node.classList.add("reminder-bg");
        reminder_content_node.classList.add("reminder-content");
        // reminder_node.classList.add("display-reminder", "active-sticky");
        reminder_head_node.classList.add("reminder-head");
        reminder_desc_node.classList.add("reminder-desc");
        
        reminder_head_node.innerHTML = reminder_symbol_html + reminder_title_html;
        reminder_desc_node.innerHTML = this._VNS_desc;
        reminder_content_node.appendChild(reminder_head_node);
        reminder_content_node.appendChild(reminder_desc_node);
        reminder_node.appendChild(reminder_bg_node);
        reminder_node.appendChild(reminder_content_node);
        return reminder_node;
    }
}

Homepage_Reminder.prototype._bindEvents = function () {
    let that = this;
    // scroll
    const CARD_DISPLAY_NODE = document.querySelector("#card-display-ex");
    // const reminder_bg_node = reminder_node.querySelector(".reminder-bg");
    
    
    const event_callback = function () {
        if(that._reminder_node) {
            const reminder_node = that._reminder_node;
            // console.log(reminder_node);
            
            if(reminder_node.nextElementSibling) {
                const card_deck_node = reminder_node.nextElementSibling;

                let distance_to_top = card_deck_node.getBoundingClientRect().top - reminder_node.getBoundingClientRect().bottom;
                // console.log(distance_to_top);
                if(distance_to_top < -3 && !reminder_node.classList.contains("active-sticky")) {
                    reminder_node.classList.add("active-sticky");
                } else if(distance_to_top >= -3 && reminder_node.classList.contains("active-sticky")) {
                    reminder_node.classList.remove("active-sticky");
                }
    
            // if(reminder_node.nextElementSibling && reminder_node.querySelector(".reminder-title").innerHTML == "Emphasis (15)" ) {
                let distance_to_bottom = card_deck_node.getBoundingClientRect().bottom - reminder_node.getBoundingClientRect().top;
                // if ((distance_to_bottom < CARD_DISPLAY_NODE.offsetHeight * 0.5) && !reminder_node.classList.contains("hidden-sticky")) {
                if ((distance_to_bottom < CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.5) && !reminder_node.classList.contains("hidden-sticky")) {
                    reminder_node.classList.add("hidden-sticky");
                    // console.log(distance_to_bottom)
                // } else if ((distance_to_bottom >= CARD_DISPLAY_NODE.offsetHeight * 0.5) && reminder_node.classList.contains("hidden-sticky")) {
                } else if ((distance_to_bottom >= CARD_DISPLAY_NODE.parentElement.offsetHeight * 0.5) && reminder_node.classList.contains("hidden-sticky")) {
                    reminder_node.classList.remove("hidden-sticky");
                }
            }
        }
        
    }

    event_callback();
    // CARD_DISPLAY_NODE.addEventListener("scroll", event_callback);
    CARD_DISPLAY_NODE.parentElement.addEventListener("scroll", event_callback);
}

Homepage_Reminder.prototype.appendTo = function (parentNode, nextNode, methodToReminderTitle) {
    if(!(parentNode instanceof HTMLElement) || !(nextNode instanceof HTMLElement)) {
        console.error(`Either ${parentNode} or ${nextNode} is not a DOM element!`);
        return false;
    }

    this._reminder_node = this._createReminder(methodToReminderTitle);
    this._bindEvents();

    parentNode.insertBefore(this._reminder_node, nextNode);
    return true;
}


export {
    Homepage_Card as Homepage_Card,
    Homepage_Reminder as Homepage_Reminder
};
