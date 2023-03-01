import {WebSvgIcon} from "./SVGIcon";
import BasicIcon from "./BasicIcon";
import BasicTheme from "../../Theme/BasicTheme";
import {Colors} from "../../Constants/Colors";

export class MaterialIcons extends BasicIcon {
    svgImg: HTMLImageElement;

    theme: BasicTheme = new BasicTheme().setFillStyle(Colors.blue700).setStrokeStyle(Colors.blue200);

    constructor(iconName: string) {
        super();

        this.svgImg = new Image()
        let iconUrl = "https://fonts.gstatic.com/s/i/materialicons/" + iconName + "/v8/20px.svg"

        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", iconUrl, false); // false for synchronous request
        xmlHttp.send(null);
        let rawSvg = xmlHttp.responseText;
        this.svgImg.src = "data:image/svg+xml;base64," + btoa(rawSvg);
    }

    draw() {
        this.c.offset(this.position);
        this.c.setFillStyle(this.theme.fillStyle);
        this.c.drawImage(this.svgImg, 0, 0, this.width, this.height);
        this.c.restoreTranslate();
    }

    static get add() {
        return new MaterialIcons("add");
    }

    static get close() {
        return new MaterialIcons("close");
    }

    static get done() {
        return new MaterialIcons("done");
    }

    static get edit() {
        return new MaterialIcons("edit");
    }

    static get menu() {
        return new MaterialIcons("menu");
    }

    static get more_vert() {
        return new MaterialIcons("more_vert");
    }

    static get search() {
        return new MaterialIcons("search");
    }

    static get remove() {
        return new MaterialIcons("remove");
    }

    static get settings() {
        return new MaterialIcons("settings");
    }

    static get arrow_back() {
        return new MaterialIcons("arrow_back");
    }

    static get arrow_forward() {
        return new MaterialIcons("arrow_forward");
    }
    static get undo() {
        return new MaterialIcons("undo");
    }
    static get redo() {
        return new MaterialIcons("redo");
    }
    static get save() {
        return new MaterialIcons("save");
    }
    static get delete() {
        return new MaterialIcons("delete");
    }
    static get add_circle() {
        return new MaterialIcons("add_circle");
    }
    static get remove_circle() {
        return new MaterialIcons("remove_circle");
    }
    static get pencil() {
        return MaterialIcons.edit;
    }
    static get clear() {
        return new MaterialIcons("clear");
    }
    static get check() {
        return new MaterialIcons("check");
    }
    static get check_circle() {
        return new MaterialIcons("check_circle");
    }
    static get cancel() {
        return new MaterialIcons("cancel");
    }
    static get move() {
        return MaterialIcons.open_with;
    }
    static get open_with() {
        return new MaterialIcons("open_with");
    }
    static get zoom_in() {
        return new MaterialIcons("zoom_in");
    }
    static get zoom_out() {
        return new MaterialIcons("zoom_out");
    }
    static get play_arrow() {
        return new MaterialIcons("play_arrow");
    }
}
