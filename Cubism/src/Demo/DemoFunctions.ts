import {Cubism} from "../Cubism";
import {initConsole} from "../Utils/Debug/DebugConsole";
import PointerHandlerParentElement from "../Elements/Basic/PointerHanderParentElement";
import RecursiveRect from "../Elements/Fancy/RecursiveRect";
import {ChangingRainbowBackground} from "../Elements/Fancy/ChangingRainbowBackground";
import {Point2D} from "../Utils/Math/Point";
import {demoFunction} from "./DemoDecorators";
import {EventKeys} from "../Constants/EventKeys";
import SizeKeys from "../Constants/SizeKeys";
import CanvasRecorder from "./CanvasRecorder";
import {PointerInteractThemeElement} from "../Elements/Basic/PointerInteractThemeElement";
import {VerticalLayout} from "../Elements/Layouts/VerticalLayout";
import {RectElement} from "../Elements/RectElement";
import {CircleElement} from "../Elements/CircleElement";
import {HorizontalLayout} from "../Elements/Layouts/HorizontalLayout";
import {Background} from "../Elements/Background";
import {Colors} from "../Constants/Colors";
import {ButtonElement} from "../Elements/ButtonElement";
import {CloseIcon} from "../Elements/Icons/CloseIcon";
import {AddIcon} from "../Elements/Icons/AddIcon";
import {OkIcon} from "../Elements/Icons/OkIcon";
import {ZoomInIcon} from "../Elements/Icons/ZoomInIcon";
import {UnknownIcon} from "../Elements/Icons/UnknownIcon";
import {CubismElement} from "../Elements/Basic/CubismElement";
import {WebSvgIcon} from "../Elements/Icons/SVGIcon";
import {MaterialIcons} from "../Elements/Icons/MaterialIcons";
import {DraggableCircle} from "../Elements/DraggableCircle";
import {CurveElement} from "../Elements/CurveElement";
import {CurveCanvas} from "../Elements/Fancy/CurveCanvas";
import {CubismAnimation} from "../Animation/Animation";

console.log("loading DemoFunctions.ts ...");

class DemoFunctions {
    @demoFunction()
    testFunction() {
        console.log("demoFunction");
        console.log();
    }

    @demoFunction("This is a demo function")
    staticRecursiveRect() {
        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new PointerHandlerParentElement(
                null,
                new ChangingRainbowBackground()
                    .setSizeFromXY(SizeKeys
                        .MATCH_PARENT, SizeKeys.MATCH_PARENT)
                    .setLightness(70).setSaturation(80)
                    .setChangingSpeed(0.1)
                ,
                new RecursiveRect()
                    .setWiggleStrength(2)
                    .setSizeFromXY(200, 200)
                    .setPosFromXY(100, 100)
                    .setRelativePosition(new Point2D(100, 100))
                    .setRecursionCount(20)
            )
        )
    }

    @demoFunction(
        "This is an animated recursive rectangle.",
        "Try to drag it around and see what happens."
    )
    animatedRecursiveRect() {
        let app = Cubism.createFromId("mainCanvas");

        app.init(
            new PointerHandlerParentElement(
                null,
                new ChangingRainbowBackground()
                    .setSizeFromXY(SizeKeys.MATCH_PARENT, SizeKeys.MATCH_PARENT)
                    .setLightness(70).setSaturation(80)
                    .setChangingSpeed(0.1)
                ,
                new RecursiveRect()
                    .setWiggleStrength(2)
                    .setSizeFromXY(200, 200)
                    .setPosFromXY(100, 100)
                    .setRelativePosition(new Point2D(100, 100))
                    .setRecursionCount(10)
            ).setId("parent")
        )

        app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps: number) => {
            if (document.getElementById("fps") === null) {
                let fpsCounter = document.createElement("div");
                fpsCounter.id = "fps";
                document.getElementById("controlDiv")?.appendChild(fpsCounter);
            }
            document.getElementById("fps")!.innerHTML = "FPS: " + fps;
            //
            // StaticDemo.i.controlDiv.appendChild(fpsCounter);
            // fpsCounter.innerText = `FPS: ${fps}`;
            // console.log(fps);
        });
        app.initializer.initializeAlwaysRedraw(); // Redraw every frame, by default it only redraws when the elements change
        app.initializer.initializeFPSCounter(); // Show FPS
    }


    // @demoFunction("Demo function for events")
    eventDemo() {
        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new PointerHandlerParentElement(
                null,
                new CircleElement()
                    .setWidth(200).setHeight(200)
                    .setPosFromXY(100, 100)
            )
        )
        app.initializer.initializeFPSCounter();
        app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps: number) => {
            if (document.getElementById("fps") === null) {
                let fpsCounter = document.createElement("div");
                fpsCounter.id = "fps";
                document.getElementById("controlDiv")?.appendChild(fpsCounter);
            }
            document.getElementById("fps")!.innerHTML = "FPS: " + fps;
        });
        app.initializer.initializeDrawsPerSecondCounter();
        app.eventSystem.registerEvent(EventKeys.DRAW_COUNT_UPDATE, (draws: number) => {
            // console.log(draws);
            if (document.getElementById("draws") === null) {
                let drawsCounter = document.createElement("div");
                drawsCounter.id = "draws";
                document.getElementById("controlDiv")?.appendChild(drawsCounter);
            }
            document.getElementById("draws")!.innerHTML = "DFS(Draws per second): " + draws;
        });
    }


    @demoFunction("Demo function for theme changing")
    themedElements() {
        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new PointerHandlerParentElement(
                "PointerHandlerParentElement",
                new Background().setColor(Colors.blue700),
                new VerticalLayout("Outer Vertical Layout",
                    new RectElement()
                        .setWidth(100).setHeight(50),
                    new CircleElement()
                        .setWidth(100).setHeight(100),
                    new HorizontalLayout(
                        "Inner Horizontal Layout",
                        new RectElement()
                            .setWidth(100).setHeight(100),
                        new RectElement()
                            .setWidth(100).setHeight(100),
                        new CircleElement()
                            .setWidth(100).setHeight(100),
                    )
                ).setPosFromXY(50, 75)
            ).setPosFromXY(0, 0)
        )
    }

    @demoFunction()
    buttonAndLayoutDemo() {
        let app = Cubism.createFromId("mainCanvas");

        let verticalLayout = new VerticalLayout("Add Button Vertical Layout");

        let itemList: CubismElement[] = [];
        let horizontalLayout = new HorizontalLayout("Horizontal Layout",
            new ButtonElement("AddBtn").setWidth(100).setHeight(50)
                .setIcon(new AddIcon()).setText("Add")
                .setOnClick(() => {
                    console.log("Add button clicked");
                    let item = new ButtonElement().setWidth(250).setHeight(50).setText(`Item ${itemList.length + 1}`);
                    itemList.push(item);
                    verticalLayout.addChildren(item);
                }),
            new ButtonElement("RemoveBtn").setWidth(150).setHeight(50)
                .setIcon(new CloseIcon()).setText("Remove")

                .setOnClick(() => {
                        console.log("Remove button clicked");
                        if (itemList.length > 0) {
                            verticalLayout.removeChild(itemList.pop() as CubismElement);
                        }
                    }
                )
        );
        app.init(
            new VerticalLayout(null,
                horizontalLayout, verticalLayout
            ).setPosFromXY(75, 25)
        )
    }

    @demoFunction()
    SvgTest() {
        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new VerticalLayout(
                "SVG Test",
                new ButtonElement().setWidth(120).setHeight(50).setIcon(MaterialIcons.add).setText("Add"),
                new ButtonElement().setWidth(120).setHeight(50).setIcon(MaterialIcons.arrow_back).setText("arrow_back"),
                new ButtonElement().setWidth(120).setHeight(50).setIcon(MaterialIcons.edit).setText("Edit"),
                new ButtonElement().setWidth(120).setHeight(50).setIcon(MaterialIcons.search).setText("Search"),
            )
        )
    }

    @demoFunction()
    CurveDemo() {
        let app = Cubism.createFromId("mainCanvas");
        app.width = 500;
        app.height = 500;

        let points: DraggableCircle[] = [];


        let root = new PointerHandlerParentElement("Root")

        function addPoint() {
            let point = new DraggableCircle()
                .setPosFromPoint(Point2D.getRandom(100, 400));
            points.push(point);
            root.addChildren(point);
        }

        function removePoint() {
            if (points.length > 0) {
                root.removeChild(points.pop() as CubismElement);
            }
        }

        root.addChildren(
            new Background().setColor(Colors.white),
            // new DraggableCircle().setSizeFromXY(10, 10).setPosFromXY(100, 100),ss
            new CurveElement(null, points),
            new ButtonElement().setWidth(150).setHeight(50).setIcon(MaterialIcons.add).setText("Add Point").setPosFromXY(0, 450)
                .setOnClick(() => {
                    addPoint();
                }),
            new ButtonElement().setWidth(190).setHeight(50).setIcon(MaterialIcons.remove).setText("Remove Point").setPosFromXY(150, 450)
                .setOnClick(() => {
                    removePoint();
                })
        )


        for (let i = 0; i < 6; i++) {
            addPoint();
        }

        app.init(root)
    }

    @demoFunction("Try to draw something with the mouse", "You can also try to change the drawing by changing to the moving mode.", "After drawing, you can click the play button to see the animation.")
    curveCanvas() {
        let app = Cubism.createFromId("mainCanvas");
        let width = 500;
        let height = 500;
        app.width = width;
        app.height = height;

        let curveCanvas = new CurveCanvas().setWidth(width).setHeight(height).setPosFromXY(0, 50);


        let modeBtn = new ButtonElement().setWidth(200).setHeight(50).setIcon(MaterialIcons.pencil).setText("Drawing Mode").setPosFromXY(0, 0)
            .setOnClick(() => {
                console.log(`Current mode: ${curveCanvas._currMode}`);
                if (curveCanvas._currMode === curveCanvas.mode.draw) {
                    console.log("curveCanvas._currMode === curveCanvas.mode.draw")
                }
                if (curveCanvas._currMode === curveCanvas.mode.move) {
                    console.log("curveCanvas._currMode === curveCanvas.mode.move")
                }
                if (curveCanvas._currMode === curveCanvas.mode.draw) {
                    modeBtn.setIcon(MaterialIcons.move);
                    modeBtn.setText("Move Mode");
                    curveCanvas.changeToMoveMode()
                } else {
                    console.log("Switching to drawing mode");
                    modeBtn.setIcon(MaterialIcons.pencil);
                    modeBtn.setText("Drawing Mode");
                    curveCanvas.changeToDrawMode();
                }
            })

        let undoBtn = new ButtonElement().setWidth(100).setHeight(50).setIcon(MaterialIcons.undo).setText("Undo").setOnClick(() => {
            console.log("Undo");
            curveCanvas.undo();
        }).setPosFromXY(200, 0);
        let playBtn = new ButtonElement().setWidth(100).setHeight(50).setIcon(MaterialIcons.play_arrow).setText("Play").setOnClick(() => {
            console.log("Play");
            curveCanvas.playAnimation();
        }).setPosFromXY(300, 0);

        let deleteBtn = new ButtonElement().setWidth(100).setHeight(50).setIcon(MaterialIcons.delete).setText("Clear").setOnClick(() => {
            console.log("Delete");
            curveCanvas.clear();
        }).setPosFromXY(400, 0);

        app.init(
            new PointerHandlerParentElement(
                "SVG Test",
                new Background().setColor(Colors.blue100),
                // new CubismAnimation(100).setPlaying(true),
                curveCanvas,
                undoBtn,
                modeBtn,
                playBtn,
                deleteBtn
            )
        )
    }
}

function main() {
    initConsole();
}

main();
