var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/Utils/Math/Point.ts
var Point2D = class {
  constructor(x, y) {
    this.arr = [x, y];
  }
  static get zero() {
    return new Point2D(0, 0);
  }
  static fromIPoint(i) {
    return new Point2D(i.x, i.y);
  }
  static fromArray(arr) {
    return new Point2D(arr[0], arr[1]);
  }
  static fromNumber(n) {
    return new Point2D(n, n);
  }
  static getRandom(min = null, max = null) {
    if (max === null) {
      if (min !== null) {
        max = min;
        min = 0;
      } else {
        max = 1;
        min = 0;
      }
    }
    min = min || 0;
    return new Point2D(Math.random() * (max - min) + min, Math.random() * (max - min) + min);
  }
  get x() {
    return this.arr[0];
  }
  set x(value) {
    this.arr[0] = value;
  }
  get y() {
    return this.arr[1];
  }
  set y(value) {
    this.arr[1] = value;
  }
  clone() {
    return new Point2D(this.x, this.y);
  }
  setXY(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  get max() {
    return Math.max(this.x, this.y);
  }
  get min() {
    return Math.min(this.x, this.y);
  }
  set(point) {
    this.x = point.x;
    this.y = point.y;
    return this;
  }
  offset(offset) {
    this.x += offset.x;
    this.y += offset.y;
    return this;
  }
  identity() {
    let rotation = Math.atan2(this.y, this.x);
    return new Point2D(Math.cos(rotation), Math.sin(rotation));
  }
  nOffset(offset) {
    this.x -= offset.x;
    this.y -= offset.y;
    return this;
  }
  add(other) {
    return this.clone().offset(other);
  }
  sub(other) {
    return this.clone().nOffset(other);
  }
  subXY(x, y) {
    return this.sub(new Point2D(x, y));
  }
  mul(other) {
    return new Point2D(this.x * other.x, this.y * other.y);
  }
  scale(n) {
    return new Point2D(this.x * n, this.y * n);
  }
  toString() {
    return `[${this.x}, ${this.y}]`;
  }
  euclideanDistance(other) {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }
  manhattanDistance(other) {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }
  angleTo(other) {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }
};

// src/Utils/Math/TransformMatrix2D.ts
var TransformMatrix2D = class {
  constructor(m11, m12, m21, m22, dx, dy) {
    this.arr = [];
    this.arr = [
      [m11, m12, dx],
      [m21, m22, dy],
      [0, 0, 1]
    ];
  }
  get m11() {
    return this.arr[0][0];
  }
  set m11(value) {
    this.arr[0][0] = value;
  }
  get m12() {
    return this.arr[0][1];
  }
  set m12(value) {
    this.arr[0][1] = value;
  }
  get m21() {
    return this.arr[1][0];
  }
  set m21(value) {
    this.arr[1][0] = value;
  }
  get m22() {
    return this.arr[1][1];
  }
  set m22(value) {
    this.arr[1][1] = value;
  }
  get dx() {
    return this.arr[0][2];
  }
  set dx(value) {
    this.arr[0][2] = value;
  }
  get dy() {
    return this.arr[1][2];
  }
  set dy(value) {
    this.arr[1][2] = value;
  }
  static makeFromArray(arr) {
    return new TransformMatrix2D(arr[0][0], arr[0][1], arr[1][0], arr[1][1], arr[0][2], arr[1][2]);
  }
  get(x, y) {
    return this.arr[x][y];
  }
  set(x, y, value) {
    this.arr[x][y] = value;
  }
  static identity() {
    return new TransformMatrix2D(1, 0, 0, 1, 0, 0);
  }
  static zero() {
    return new TransformMatrix2D(0, 0, 0, 0, 0, 0);
  }
  static translation(x, y) {
    return new TransformMatrix2D(1, 0, 0, 1, x, y);
  }
  static translationFromPoint(point) {
    return TransformMatrix2D.translation(point.x, point.y);
  }
  static rotation(angle) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    return new TransformMatrix2D(cos, -sin, sin, cos, 0, 0);
  }
  static scale(x, y) {
    return new TransformMatrix2D(x, 0, 0, y, 0, 0);
  }
  static scaleFromPoint(point) {
    return TransformMatrix2D.scale(point.x, point.y);
  }
  clone() {
    return new TransformMatrix2D(this.m11, this.m12, this.m21, this.m22, this.dx, this.dy);
  }
  multiply(other) {
    let newMatrix = TransformMatrix2D.zero();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let dotProduct = 0;
        for (let k = 0; k < 3; k++) {
          dotProduct += this.get(i, k) * other.get(k, j);
        }
        newMatrix.set(i, j, dotProduct);
      }
    }
    return newMatrix;
  }
  offsetXY(x, y) {
    return this.multiply(TransformMatrix2D.translation(x, y));
  }
  offsetPoint(point) {
    return this.offsetXY(point.x, point.y);
  }
  rotate(angle) {
    return this.multiply(TransformMatrix2D.rotation(angle));
  }
  scale(x, y) {
    return this.multiply(TransformMatrix2D.scale(x, y));
  }
  toString() {
    return `(${this.m11}, ${this.m12}, ${this.dx})
(${this.m21}, ${this.m22}, ${this.dy})`;
  }
};

// src/Drawer/CubismCanvasState.ts
var CubismCanvasState = class {
  constructor(canvas, ctx) {
    this._translates = [TransformMatrix2D.identity()];
    this._saves = [];
    this._needsRedraw = true;
    this.canvas = canvas;
    this.ctx = ctx;
  }
  get translates() {
    return this._translates;
  }
  translate(translateMatrix) {
    this.translates.push(translateMatrix);
    this.setCtxTransform(translateMatrix);
  }
  offset(offset) {
    let translateMatrix = this.translateMatrix.clone().offsetPoint(offset);
    this.translate(translateMatrix);
  }
  rotate(angle) {
    let translateMatrix = this.translateMatrix.clone().rotate(angle);
    this.translate(translateMatrix);
  }
  scale(scale) {
    let translateMatrix = this.translateMatrix.clone().scale(scale.x, scale.y);
    this.translate(translateMatrix);
  }
  save() {
    this._saves.push(this.translateMatrix.clone());
  }
  restoreSave() {
    let lastSave = this._saves.pop();
    if (lastSave) {
      this.setCtxTransform(lastSave);
    }
  }
  setCtxTransform(t) {
    this.ctx.setTransform(t.m11, t.m12, t.m21, t.m22, t.dx, t.dy);
  }
  restoreTranslate() {
    let lastTranslate = this.popTranslate();
    this.setCtxTransform(lastTranslate);
  }
  get translateMatrix() {
    return this.translates[this.translates.length - 1];
  }
  popTranslate() {
    if (this.translates.length > 1) {
      return this.translates.pop();
    }
    return this.translates[0];
  }
  get needsRedraw() {
    return this._needsRedraw;
  }
  set needsRedraw(value) {
    this._needsRedraw = value;
  }
};

// src/CubismPart.ts
var CubismPart = class {
  constructor() {
    this._cubism = null;
  }
  get cubism() {
    return this.getCubism();
  }
  set cubism(cubism) {
    this.setCubism(cubism);
  }
  setCubism(cubism) {
    this._cubism = cubism;
  }
  getCubism() {
    if (this._cubism === null) {
      throw new Error(`Cubism is not set for ${this.className}`);
    }
    return this._cubism;
  }
  get className() {
    return this.constructor.name;
  }
  toString() {
    return `${this.className}(${this._cubism === null ? this._cubism : "NO CUBISM"})`;
  }
};

// src/Constants/EventKeys.ts
var EventKeys = class {
};
EventKeys.ON_MOVE = "onMove";
EventKeys.ON_DOWN = "onDown";
EventKeys.ON_UP = "onUp";
EventKeys.GLOBAL_ON_POINTER_CHANGE = "redraw";
EventKeys.FPS_UPDATE = "FPS_EVENT";
EventKeys.ON_POINTER_EVENT = "onPointerEvent";
EventKeys.ON_CLICK = "onClick";
EventKeys.ON_DOUBLE_CLICK = "onDoubleClick";
EventKeys.ON_DRAG = "onDrag";
EventKeys.ON_DRAG_START = "onDragStart";
EventKeys.ON_DRAG_END = "onDragEnd";
EventKeys.ON_DRAG_ENTER = "onDragEnter";
EventKeys.ON_DRAG_LEAVE = "onDragLeave";
EventKeys.ON_DRAG_OVER = "onDragOver";
EventKeys.ON_DROP = "onDrop";
EventKeys.ON_PARENT_MOVE = "onParentMove";
EventKeys.ON_PARENT_DOWN = "onParentDown";
EventKeys.ON_PARENT_UP = "onParentUp";
EventKeys.ON_PARENT_CLICK = "onParentClick";
EventKeys.ON_ENTER = "onEnter";
EventKeys.ON_LEAVE = "onLeave";
EventKeys.FRAME_UPDATE = "onFrameUpdate";
EventKeys.FIX_UPDATE = "onFixUpdate";
EventKeys.REDRAW = "onRedraw";
EventKeys.POINTER_DOWN = "onMouseDown";
EventKeys.POINTER_UP = "onMouseUp";
EventKeys.POINTER_MOVE = "onMouseMove";
EventKeys.SECOND_UPDATE = "onSecondUpdate";
EventKeys.MINUTE_UPDATE = "onMinuteUpdate";
EventKeys.HOUR_UPDATE = "onHourUpdate";
EventKeys.DRAW_COUNT_UPDATE = "onDrawCountUpdate";

// src/Drawer/CubismCanvasDrawer.ts
var CubismCanvasDrawer = class extends CubismPart {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.state = new CubismCanvasState(canvas, this.ctx);
  }
  get eventSystem() {
    return this.cubism.eventSystem;
  }
  setCubism(cubism) {
    super.setCubism(cubism);
    this.registerFrameUpdate();
  }
  get width() {
    return this.canvas.width;
  }
  set width(width) {
    this.canvas.width = width;
  }
  get height() {
    return this.canvas.height;
  }
  set height(height) {
    this.canvas.height = height;
  }
  registerFrameUpdate() {
    this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.frameUpdate.bind(this));
  }
  frameUpdate() {
    if (this.state.needsRedraw) {
      this.triggerRedraw();
      this.state.needsRedraw = false;
    }
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = this.cubism.width;
  }
  setFillStyle(style) {
    this.ctx.fillStyle = style;
  }
  setStrokeStyle(style) {
    this.ctx.strokeStyle = style;
  }
  setStrokeWidth(width) {
    this.ctx.lineWidth = width;
  }
  offset(offset) {
    this.state.offset(offset);
  }
  offsetXY(x, y) {
    this.state.offset(new Point2D(x, y));
  }
  rotate(angle) {
    this.state.rotate(angle);
  }
  scale(scale) {
    if (typeof scale === "number") {
      scale = Point2D.fromNumber(scale);
    }
    this.state.scale(scale);
  }
  restoreTranslate() {
    this.state.restoreTranslate();
  }
  fillText(text, x, y) {
    this.ctx.fillText(text, x, y);
  }
  drawLineWithPoints(begin, end) {
    this.drawLine(begin.x, begin.y, end.x, end.y);
  }
  drawLine(beginX, beginY, endX, endY) {
    this.ctx.beginPath();
    this.ctx.moveTo(beginX, beginY);
    this.ctx.lineTo(endX, endY);
    this.closeDraw();
  }
  drawCircle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.closeDraw();
  }
  drawPoint(point, radius = 5) {
    this.drawCircle(point.x, point.y, radius);
  }
  drawShape(points) {
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    this.closeDraw();
  }
  drawRectWithPoints(p1, p2 = null) {
    if (p2 === null) {
      this.drawRect(0, 0, p1.x, p1.y);
    } else {
      this.drawRect(p1.x, p1.y, p2.x, p2.y);
    }
  }
  drawRect(x, y, width, height) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(width, y);
    this.ctx.lineTo(width, height);
    this.ctx.lineTo(x, height);
    this.closeDraw();
  }
  drawPathString(path) {
    this.drawPath(new Path2D(path));
  }
  drawPath(path) {
    this.ctx.stroke(path);
  }
  closeDraw() {
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
  setFont(font) {
    this.ctx.font = font;
  }
  setRedraw(redraw) {
    this.state.needsRedraw = redraw;
  }
  measureText(text) {
    return this.ctx.measureText(text);
  }
  triggerRedraw() {
    this.eventSystem.triggerEvent(EventKeys.REDRAW);
  }
  drawSVG(svg) {
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svg);
    this.ctx.drawImage(img, 0, 0);
  }
  drawImage(image, x = 0, y = 0, width = 0, height = 0) {
    this.ctx.drawImage(image, x, y, width, height);
  }
  drawArrow(pos, rotation, length = 10) {
    this.state.save();
    this.offset(pos);
    this.rotate(rotation);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(length, 0);
    this.ctx.lineTo(length - 5, -5);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(length, 0);
    this.ctx.lineTo(length - 5, 5);
    this.restoreTranslate();
    this.restoreTranslate();
    this.state.restoreSave();
    this.closeDraw();
  }
};

// src/Events/CubismEventSystem.ts
var CubismEventSystem = class extends CubismPart {
  constructor() {
    super(...arguments);
    this._globalEventListeners = {};
  }
  getEvent(event) {
    if (this._globalEventListeners[event] === void 0) {
      this._globalEventListeners[event] = [];
      this._globalEventListeners[event].push(() => {
      });
    }
    return this._globalEventListeners[event];
  }
  registerEvent(eventKey, callback) {
    this.getEvent(eventKey).push(callback);
  }
  triggerEvent(eventKey, ...args) {
    this.getEvent(eventKey).forEach((callback) => {
      callback(...args);
    });
  }
  unregisterEvent(eventKey, callback) {
    this._globalEventListeners[eventKey].splice(this._globalEventListeners[eventKey].indexOf(callback), 1);
  }
  removeEvent(event) {
    this._globalEventListeners[event] = [];
  }
  removeAllEvents() {
    for (const event in this._globalEventListeners) {
      this.removeEvent(event);
    }
    this._globalEventListeners = {};
  }
  hasEvent(event) {
    return this._globalEventListeners[event] !== void 0;
  }
};

// src/Datatypes/PointerPoint.ts
var PointerPoint = class extends Point2D {
  constructor(x, y, pressure) {
    super(x, y);
    this.pressure = pressure;
  }
  static createFromPointerEvent(e) {
    return new PointerPoint(e.offsetX, e.offsetY, e.pressure);
  }
  toString() {
    return `(x:${this.x}, y:${this.y}, p:${this.pressure})`;
  }
  sub(other) {
    return new PointerPoint(this.x - other.x, this.y - other.y, this.pressure);
  }
  get pressed() {
    return this.pressure > 0;
  }
};

// src/Global/Outer/CubismOuterGlobal.ts
var CubismOuterGlobal = class {
  constructor() {
    this._cubismInstances = {};
  }
  static get instance() {
    if (!CubismOuterGlobal._instance) {
      CubismOuterGlobal._instance = new CubismOuterGlobal();
    }
    return CubismOuterGlobal._instance;
  }
  static getCubismInstance(key) {
    return CubismOuterGlobal.instance._cubismInstances[key];
  }
  static registerCubismInstance(key, app) {
    if (CubismOuterGlobal.instance._cubismInstances[key] === void 0) {
      CubismOuterGlobal.instance._cubismInstances[key] = app;
    } else {
      console.log("Replacing cubism instance with key " + key);
      this.getCubismInstance(key).destroy();
      CubismOuterGlobal.instance._cubismInstances[key] = app;
    }
  }
};

// src/CubismElementManger.ts
var CubismElementManger = class {
  constructor() {
    this._elementsWithId = {};
    this._elementsWithClass = {};
  }
  registerElementId(id, element) {
    console.log("registering element with id " + id);
    if (this._elementsWithId[id] === void 0) {
      this._elementsWithId[id] = element;
    } else {
      throw new Error("Element with that id already exists");
    }
  }
  getElementById(id) {
    return this._elementsWithId[id];
  }
  removeElementWithId(id) {
    delete this._elementsWithId[id];
  }
  registerElementClass(className, element) {
    if (this._elementsWithClass[className] === void 0) {
      this._elementsWithClass[className] = [];
    }
    this._elementsWithClass[className].push(element);
  }
  getElementsByClass(className) {
    return this._elementsWithClass[className];
  }
  removeElementWithClass(className, element) {
    this._elementsWithClass[className].splice(this._elementsWithClass[className].indexOf(element), 1);
  }
  removeClass(className) {
    delete this._elementsWithClass[className];
  }
};

// src/CubismEventManager.ts
var CubismEventManager = class extends CubismPart {
  constructor() {
    super(...arguments);
    this.frameCount = 0;
    this.drawCount = 0;
  }
  get eventSystem() {
    return this.cubism.eventSystem;
  }
  initializeFixedUpdate(timeInterval = 1e3 / 60) {
    setInterval(this.doFixUpdate.bind(this), timeInterval);
    return this;
  }
  doFixUpdate() {
    this.eventSystem.triggerEvent(EventKeys.FIX_UPDATE);
  }
  initializeFrameUpdate() {
    this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
    window.requestAnimationFrame(this.doFrameUpdate.bind(this));
    return this;
  }
  doFrameUpdate() {
    this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
    window.requestAnimationFrame(this.doFrameUpdate.bind(this));
  }
  initializeSecondUpdate() {
    setInterval(this.triggerSecondUpdate.bind(this), 1e3);
    return this;
  }
  triggerSecondUpdate() {
    this.eventSystem.triggerEvent(EventKeys.SECOND_UPDATE);
  }
  initializeFPSCounter() {
    if (!this.eventSystem.hasEvent(EventKeys.SECOND_UPDATE)) {
      this.initializeSecondUpdate();
    }
    if (!this.eventSystem.hasEvent(EventKeys.FRAME_UPDATE)) {
      this.initializeFrameUpdate();
    }
    this.eventSystem.registerEvent(EventKeys.SECOND_UPDATE, this.triggerFPSUpdate.bind(this));
    this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.incrementFrameCount.bind(this));
    return this;
  }
  triggerFPSUpdate() {
    this.eventSystem.triggerEvent(EventKeys.FPS_UPDATE, this.frameCount);
    this.frameCount = 0;
  }
  incrementFrameCount() {
    this.frameCount++;
  }
  initializeAlwaysRedraw() {
    this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.triggerRedraw.bind(this));
    return this;
  }
  triggerRedraw() {
    this.eventSystem.triggerEvent(EventKeys.REDRAW);
  }
  stopAlwaysRedraw() {
    this.eventSystem.unregisterEvent(EventKeys.FRAME_UPDATE, this.triggerRedraw.bind(this));
    return this;
  }
  initializeDrawsPerSecondCounter() {
    this.eventSystem.registerEvent(EventKeys.REDRAW, this.onRedraw.bind(this));
    if (!this.eventSystem.hasEvent(EventKeys.SECOND_UPDATE)) {
      this.initializeSecondUpdate();
    }
    this.eventSystem.registerEvent(EventKeys.SECOND_UPDATE, this.doDrawCountUpdate.bind(this));
    return this;
  }
  onRedraw() {
    this.drawCount++;
  }
  doDrawCountUpdate() {
    this.eventSystem.triggerEvent(EventKeys.DRAW_COUNT_UPDATE, this.drawCount);
    this.drawCount = 0;
  }
};

// src/Cubism.ts
var Cubism = class extends CubismElementManger {
  constructor(canvas) {
    super();
    this._root = null;
    this.canvas = canvas;
    this.eventSystem = new CubismEventSystem();
    this.canvasDrawer = new CubismCanvasDrawer(canvas);
    this._initializer = new CubismEventManager();
    this.initParts(this.canvasDrawer, this.eventSystem, this.initializer);
    this.registerRedraw();
    this.registerGlobalPointerEvents();
    if (canvas.id === null || canvas.id === void 0 || canvas.id === "") {
      throw new Error("Canvas must have an id");
    }
    this.cubismId = canvas.id;
    CubismOuterGlobal.registerCubismInstance(this.cubismId, this);
  }
  get width() {
    return this.canvas.width;
  }
  set width(width) {
    this.canvas.width = width;
  }
  get height() {
    return this.canvas.height;
  }
  set height(height) {
    this.canvas.height = height;
  }
  get initializer() {
    return this._initializer;
  }
  get rootElement() {
    if (this._root === null) {
      throw new Error("Root is not set");
    }
    return this._root;
  }
  set rootElement(root) {
    this.initParts(root);
    this._root = root;
  }
  registerGlobalPointerEvents() {
    this.canvas.onpointermove = (e) => {
      this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
    this.canvas.onpointerdown = (e) => {
      this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
    this.canvas.onpointerup = (e) => {
      this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    };
  }
  registerRootElementPointerEvents() {
    this.eventSystem.registerEvent(EventKeys.ON_POINTER_EVENT, (point) => {
      this.rootElement.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
    });
  }
  registerRedraw() {
    this.eventSystem.registerEvent(EventKeys.REDRAW, this.redraw.bind(this));
  }
  static createFromCanvas(canvas) {
    return new Cubism(canvas);
  }
  static createFromId(id) {
    return Cubism.createFromCanvas(document.getElementById(id));
  }
  init(root) {
    this.rootElement = root;
    this.initRootElement();
    this.initializer.initializeFrameUpdate();
    this.registerRootElementPointerEvents();
    this.canvasDrawer.setRedraw(true);
  }
  initRootElement() {
    console.log("init root element");
    this.rootElement.resize(
      new Point2D(this.canvas.width, this.canvas.height)
    );
  }
  redraw() {
    this.canvasDrawer.clear();
    if (this.rootElement) {
      this.rootElement.draw();
    }
  }
  initParts(...parts) {
    parts.forEach(
      (part) => {
        part.cubism = this;
      }
    );
  }
  destroy() {
    console.log(`Destroying [${this}]`);
    this.eventSystem.removeAllEvents();
    this.canvasDrawer.clear();
  }
  toString() {
    return `Cubism [${this.cubismId}]`;
  }
};

// src/Utils/Debug/DebugConsole.ts
function initConsole() {
  let w = window;
  w.test = () => {
    console.log("test");
  };
  w.cubismGlobal = CubismOuterGlobal.instance;
  w.root = CubismOuterGlobal.getCubismInstance("mainCanvas").rootElement;
}

// src/Constants/SizeKeys.ts
var SizeKeys = class {
};
SizeKeys.DEFAULT_PADDING = 10;
SizeKeys.DEFAULT_MARGIN = 10;
SizeKeys.DEFAULT_BORDER = 1;
SizeKeys.MATCH_PARENT = -1;

// src/Utils/Decorators/NeedsRedraw.ts
function needsRedrawAccessor(needsRedrawGet = false, needsRedrawSet = true) {
  return function(target, propertyKey, descriptor) {
    if (descriptor) {
      if (descriptor.set && needsRedrawSet) {
        let oldSet = descriptor.set;
        descriptor.set = function(value) {
          oldSet.call(this, value);
          setRedrawHelper(this);
        };
      }
      if (descriptor.get && needsRedrawGet) {
        let oldGet = descriptor.get;
        descriptor.get = function() {
          setRedrawHelper(this);
          return oldGet.call(this);
        };
      }
    }
  };
}
function setRedrawHelper(descriptor) {
  if (descriptor instanceof CubismPart) {
    if (descriptor._cubism) {
      descriptor._cubism.canvasDrawer.setRedraw(true);
    }
  } else {
    console.log("this is not a CubismPart");
    throw new Error("this is not a CubismPart");
  }
}

// src/Elements/Basic/CubismElement.ts
var CubismElement = class extends CubismEventSystem {
  constructor(elementId = null) {
    super();
    this._position = new Point2D(0, 0);
    this._size = new Point2D(SizeKeys.MATCH_PARENT, SizeKeys.MATCH_PARENT);
    this._absSize = new Point2D(0, 0);
    this._anchor = new Point2D(0, 0);
    this.elementId = null;
    this.needsResize = true;
    this.elementId = elementId;
    this.onCreate();
  }
  onCreate() {
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(anchor) {
    this._anchor = anchor;
  }
  setId(id) {
    this.elementId = id;
    if (this._cubism) {
      this._cubism.registerElementId(id, this);
    }
    return this;
  }
  setCubism(cubism) {
    super.setCubism(cubism);
    if (this.elementId !== null) {
      this.setId(this.elementId);
    }
  }
  set position(pos) {
    this._position = pos;
  }
  get position() {
    return this._position;
  }
  get size() {
    return this._size;
  }
  set size(size) {
    this.setSizeFromXY(size.x, size.y);
  }
  setSizeFromXY(x, y) {
    this.size.x = x;
    this.size.y = y;
    this.needsResize = true;
    return this;
  }
  get absSize() {
    return this._absSize;
  }
  set absSize(size) {
    this._absSize = size;
    this.c.setRedraw(true);
  }
  get height() {
    return this.size.y;
  }
  set height(y) {
    this.setSizeFromXY(this.width, y);
  }
  get width() {
    return this.size.x;
  }
  set width(x) {
    this.setSizeFromXY(x, this.height);
  }
  get absWidth() {
    return this.absSize.x;
  }
  set absWidth(x) {
    this.absSize.x = x;
  }
  get absHeight() {
    return this.absSize.y;
  }
  set absHeight(y) {
    this.absSize.y = y;
  }
  setWidth(width) {
    this.width = width;
    this.needsResize = true;
    return this;
  }
  setHeight(height) {
    this.height = height;
    return this;
  }
  setPosFromPoint(pos) {
    this.position = pos;
    return this;
  }
  setPosFromXY(x, y) {
    this.position.x = x;
    this.position.y = y;
    return this;
  }
  get centerPoint() {
    return new Point2D(this.position.x + this.width / 2, this.position.y + this.height / 2);
  }
  resize(targetSize) {
    this.resizeFromXY(targetSize.x, targetSize.y);
  }
  resizeFromXY(x, y) {
    this.absWidth = x;
    this.absHeight = y;
    this.needsResize = false;
  }
  get c() {
    if (!this.cubism) {
      console.log(this.cubism);
      throw new Error(`Cubism instance not set for ${this}`);
    }
    return this.cubism.canvasDrawer;
  }
  draw() {
  }
  toString() {
    return `[${this.elementId ? this.elementId : "NO ID"}]: ${this.className} abs(${this.absWidth}x${this.absHeight}) rel(${this.width}x${this.height})`;
  }
};
__decorateClass([
  needsRedrawAccessor()
], CubismElement.prototype, "anchor", 1);
__decorateClass([
  needsRedrawAccessor()
], CubismElement.prototype, "position", 1);
__decorateClass([
  needsRedrawAccessor()
], CubismElement.prototype, "absSize", 1);

// src/Elements/Basic/CubismParentElement.ts
var CubismParentElement = class extends CubismElement {
  constructor(elementId = null, ...children) {
    super(elementId);
    this.children = [];
    this.addChildren(...children);
  }
  resize(targetSize) {
    super.resize(targetSize);
    this.updateChildrenShape();
  }
  updateChildrenShape() {
    this.updateChildrenSize();
    this.updateChildrenPosition();
  }
  updateChildrenPosition() {
  }
  updateChildrenSize() {
    for (let child of this.children) {
      let x = child.width;
      let y = child.height;
      if (x === SizeKeys.MATCH_PARENT) {
        x = this.absWidth;
      }
      if (y === SizeKeys.MATCH_PARENT) {
        y = this.absHeight;
        console.log("this.absHeight", this.absHeight);
      }
      child.resize(new Point2D(x, y));
    }
  }
  addChildren(...children) {
    if (children === void 0) {
      console.log("children is undefined");
      return this;
    }
    for (let child of children) {
      this.children.push(child);
      if (this._cubism) {
        child.setCubism(this.cubism);
        this.updateChildrenShape();
      }
    }
    return this;
  }
  removeChild(child) {
    let index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }
  removeChildren(children) {
    for (let child of children) {
      this.removeChild(child);
    }
  }
  draw() {
    super.draw();
    this.drawChildren();
  }
  drawChildren() {
    this.c.offset(this.position);
    for (let child of this.children) {
      child.draw();
    }
    this.c.restoreTranslate();
  }
  setCubism(cubism) {
    super.setCubism(cubism);
    this.setChildrenCubism(cubism);
  }
  setChildrenCubism(cubism) {
    for (let child of this.children) {
      child.setCubism(cubism);
    }
  }
};

// src/Elements/Basic/PointerHanderParentElement.ts
var PointerHandlerParentElement = class extends CubismParentElement {
  constructor(id = null, ...children) {
    super(id, ...children);
    this._dragPoint = null;
    this._pointerWasInRange = false;
    this._hovered = false;
    this._pressed = false;
    this.registerEvent(EventKeys.ON_POINTER_EVENT, this.onPointerEvent.bind(this));
    this.internalAddChildren();
  }
  get pressed() {
    return this._pressed;
  }
  set pressed(value) {
    this._pressed = value;
  }
  get hovered() {
    return this._hovered;
  }
  set hovered(value) {
    this._hovered = value;
  }
  internalAddChildren() {
  }
  onDown(point) {
  }
  onUp(point) {
  }
  onLeave(point) {
  }
  onEnter(point) {
  }
  onMove(point) {
  }
  onParentMove(point) {
  }
  onPointerEvent(point) {
    this.triggerThisPointerEvent(point);
    this.triggerChildrenPointerEvent(point.sub(this.position));
  }
  triggerThisPointerEvent(point) {
    this.onParentMove(point);
    if (this.pointerInRange(point)) {
      if (!this._pointerWasInRange) {
        this.onEnter(point);
      }
      this._pointerWasInRange = true;
      this.onMove(point);
      if (!point.pressed) {
        this.hovered = true;
      }
      if (point.pressed && !this.pressed) {
        this.onDown(point);
        this._dragPoint = point;
        this.pressed = true;
      }
      if (!point.pressed && this.pressed) {
        this.onUp(point);
        this._dragPoint = null;
        this.pressed = false;
      }
    } else {
      this.hovered = false;
      if (this._pointerWasInRange) {
        this.onLeave(point);
        this._pointerWasInRange = false;
      }
    }
  }
  triggerChildrenPointerEvent(point) {
    if (this.pointerInRange(point)) {
      for (let child of this.children) {
        child.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
      }
    }
  }
  pointerInRange(point) {
    if (point.x >= this.position.x && point.x <= this.absWidth + this.position.x) {
      if (point.y >= this.position.y && point.y <= this.absHeight + this.position.y) {
        return true;
      }
    }
    return false;
  }
};

// src/Constants/Colors.ts
var Colors = class {
};
Colors.black = "#000000";
Colors.white = "#ffffff";
Colors.pureRed = "#ff0000";
Colors.pureGreen = "#00ff00";
Colors.pureBlue = "#0000ff";
Colors.pureYellow = "#ffff00";
Colors.pureCyan = "#00ffff";
Colors.pureMagenta = "#ff00ff";
Colors.orange = "#ff8000";
Colors.purple = "#8000ff";
Colors.pink = "#ff0080";
Colors.brown = "#804000";
Colors.grey100 = "#efefef";
Colors.grey200 = "#a0a0a0";
Colors.grey300 = "#808080";
Colors.grey400 = "#606060";
Colors.grey500 = "#404040";
Colors.grey600 = "#202020";
Colors.grey700 = "#000000";
Colors.blue100 = "#a6d5ff";
Colors.blue200 = "#7ec0ff";
Colors.blue300 = "#57abff";
Colors.blue400 = "#2e96ff";
Colors.blue500 = "#0080ff";
Colors.blue600 = "#0060cc";
Colors.blue700 = "#004099";
Colors.green100 = "#a6ffcc";
Colors.green200 = "#7effa6";
Colors.green300 = "#57ff80";
Colors.green400 = "#2eff5a";
Colors.green500 = "#00ff00";
Colors.green600 = "#00cc00";
Colors.green700 = "#009900";
Colors.red100 = "#ffcccc";
Colors.red200 = "#ff9999";
Colors.red300 = "#ff6666";
Colors.red400 = "#ff3333";
Colors.red500 = "#ff0000";
Colors.red600 = "#cc0000";
Colors.red700 = "#990000";
Colors.yellow100 = "#ffffcc";
Colors.yellow200 = "#ffff99";
Colors.yellow300 = "#ffff66";
Colors.yellow400 = "#ffff33";
Colors.yellow500 = "#ffff00";
Colors.yellow600 = "#cccc00";
Colors.yellow700 = "#999900";
Colors.cyan100 = "#ccffff";
Colors.cyan200 = "#99ffff";
Colors.cyan300 = "#66ffff";
Colors.cyan400 = "#33ffff";
Colors.cyan500 = "#00ffff";
Colors.cyan600 = "#00cccc";
Colors.cyan700 = "#009999";
Colors.magenta100 = "#ffccff";
Colors.magenta200 = "#ff99ff";
Colors.magenta300 = "#ff66ff";
Colors.magenta400 = "#ff33ff";
Colors.magenta500 = "#ff00ff";
Colors.magenta600 = "#cc00cc";
Colors.magenta700 = "#990099";
Colors.orange100 = "#ffcc99";
Colors.orange200 = "#ff9966";
Colors.orange300 = "#ff9933";
Colors.orange400 = "#ff9900";
Colors.orange500 = "#ff8000";
Colors.orange600 = "#cc6600";
Colors.orange700 = "#994c00";
Colors.purple100 = "#cc99ff";
Colors.purple200 = "#9966ff";
Colors.purple300 = "#9933ff";
Colors.purple400 = "#9900ff";
Colors.purple500 = "#8000ff";
Colors.purple600 = "#6600cc";
Colors.purple700 = "#4c0099";
Colors.pink100 = "#ff99cc";
Colors.pink200 = "#ff6699";
Colors.pink300 = "#ff3399";
Colors.pink400 = "#ff0099";
Colors.pink500 = "#ff0080";
Colors.pink600 = "#cc0066";
Colors.pink700 = "#99004c";
Colors.brown100 = "#cc9966";
Colors.brown200 = "#996633";
Colors.brown300 = "#994c00";
Colors.brown400 = "#993300";
Colors.brown500 = "#804000";
Colors.brown600 = "#663300";
Colors.brown700 = "#4c2600";
Colors.lightGray = "#c0c0c0";
Colors.darkGray = "#404040";
Colors.lightRed = "#ff8080";
Colors.lightGreen = "#80ff80";
Colors.lightBlue = "#8080ff";
Colors.lightYellow = "#ffff80";
Colors.lightCyan = "#80ffff";
Colors.lightMagenta = "#ff80ff";
Colors.darkRed = "#800000";
Colors.darkGreen = "#008000";
Colors.darkBlue = "#000080";
Colors.darkYellow = "#808000";
Colors.darkCyan = "#008080";
Colors.darkMagenta = "#800080";
Colors.transparent = "rgba(0,0,0,0)";
Colors.transparentBlack = "rgba(0,0,0,0.5)";
Colors.transparentWhite = "rgba(255,255,255,0.5)";
Colors.transparentRed = "rgba(255,0,0,0.5)";
Colors.transparentGreen = "rgba(0,255,0,0.5)";
Colors.transparentBlue = "rgba(0,0,255,0.5)";
Colors.transparentYellow = "rgba(255,255,0,0.5)";
Colors.transparentCyan = "rgba(0,255,255,0.5)";
Colors.transparentMagenta = "rgba(255,0,255,0.5)";
Colors.transparentOrange = "rgba(255,128,0,0.5)";
Colors.transparentPurple = "rgba(128,0,255,0.5)";
Colors.transparentPink = "rgba(255,0,128,0.5)";

// src/Utils/Physics/Physics2D/PhysicalPoint2D.ts
var PhysicalPoint2D = class extends Point2D {
  constructor() {
    super(...arguments);
    this.velocity = new Point2D(0, 0);
    this.resistance = 0;
    this.velocityScale = 0;
  }
  setVelocity(velocity) {
    this.velocity = velocity;
    return this;
  }
  setResistance(resistance) {
    this.resistance = resistance;
    return this;
  }
  impulse(impulse) {
    this.velocity.offset(impulse);
    this.velocityScale = 1;
    return this;
  }
  update() {
    if (this.velocityScale > 0) {
      this.velocity = this.velocity.scale(this.velocityScale);
      this.velocityScale -= this.resistance;
    }
    if (this.velocityScale < 0) {
      this.velocityScale = 0;
    }
    if (this.velocityScale == 0) {
      this.velocity.setXY(0, 0);
    }
    this.offset(this.velocity);
  }
};

// src/Elements/Fancy/RecursiveRect.ts
var RecursiveRect = class extends PointerHandlerParentElement {
  constructor() {
    super(...arguments);
    this.lastPoint = null;
    this.relativePosition = new Point2D(200, 200);
    this.frameCount = 0;
    this._position = new PhysicalPoint2D(0, 0).setResistance(1e-3);
    this.recursionCount = 0;
    this.wiggleStrength = 0.1;
  }
  get position() {
    return this._position;
  }
  set position(point) {
    this._position = point;
  }
  setRecursionCount(recursionCount) {
    this.recursionCount = recursionCount;
    return this;
  }
  wiggle() {
    if (this.frameCount % 120 == 0) {
      let range = this.wiggleStrength * Math.random();
      this.position.impulse(new Point2D(range * (Math.random() - 0.5), range * (Math.random() - 0.5)));
    }
  }
  setWiggleStrength(strength) {
    this.wiggleStrength = strength;
    return this;
  }
  setRelativePosition(point) {
    this.relativePosition = point;
    return this;
  }
  draw() {
    this.frameCount++;
    this.c.offset(this.position);
    this.position.update();
    if (!this.pressed) {
      this.wiggle();
    }
    if (this.pressed) {
      this.frameCount = 0;
    }
    this.c.setFillStyle(Colors.green100);
    this.c.setStrokeWidth(2);
    this.c.setStrokeStyle(Colors.green700);
    let relaPos = this.position.sub(this.relativePosition);
    let relaSpeed = 0.2;
    let relaSize = 10;
    this.c.drawRect(0, 0, this.width, this.height);
    for (let i = 1; i < this.recursionCount + 1; i++) {
      let relaSpeedI = relaSpeed * i;
      let relaSizeI = relaSize * i;
      this.c.offset(relaPos.scale(relaSpeedI));
      this.c.drawRect(relaSizeI, relaSizeI, this.width - relaSizeI, this.height - relaSizeI);
      this.c.restoreTranslate();
    }
    this.c.restoreTranslate();
  }
  onMove(point) {
    if (point.pressure > 0) {
      if (!this.lastPoint) {
        this.lastPoint = point.sub(this.position);
      }
      this.position.set(point.sub(this.lastPoint));
    } else {
      this.lastPoint = null;
    }
  }
};
__decorateClass([
  needsRedrawAccessor(true, true)
], RecursiveRect.prototype, "position", 1);

// src/Elements/Fancy/ChangingRainbowBackground.ts
var ChangingRainbowBackground = class extends CubismElement {
  constructor() {
    super(...arguments);
    this.frameCount = 0;
    this.saturation = 70;
    this.lightness = 90;
    this.changingSpeed = 0.2;
  }
  setSaturation(s) {
    if (s > 100) {
      s = 100;
    }
    this.saturation = s;
    return this;
  }
  setChangingSpeed(speed) {
    this.changingSpeed = speed;
    return this;
  }
  setLightness(l) {
    if (l > 100) {
      l = 100;
    }
    this.lightness = l;
    return this;
  }
  draw() {
    this.frameCount++;
    this.c.offset(this.position);
    let currHue = this.frameCount * this.changingSpeed % 360;
    let currColor = `hsl(${currHue}, ${this.saturation}%, ${this.lightness}%)`;
    this.c.setFillStyle(currColor);
    this.c.setStrokeWidth(0);
    this.c.setStrokeStyle(currColor);
    this.c.drawRect(0, 0, this.absWidth, this.absHeight);
    this.c.restoreTranslate();
  }
};

// src/Demo/CanvasRecorder.ts
var CanvasRecorder = class {
  constructor(canvas, fps = 60) {
    this.recorder = null;
    this.chunks = [];
    this.videoStream = null;
    this.isRecording = false;
    if (typeof canvas === "string") {
      let tempCanvas = document.getElementById(canvas);
      if (!tempCanvas) {
        throw new Error("Canvas not found");
      }
      this.canvas = tempCanvas;
    } else {
      this.canvas = canvas;
    }
    this.fps = fps;
  }
  startRecording(fileName = "video", fileType = "webm") {
    this.videoStream = this.canvas.captureStream(this.fps);
    this.recorder = new MediaRecorder(this.videoStream);
    this.chunks = [];
    this.recorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };
    this.recorder.start();
    this.recorder.onstop = () => {
      console.log("Recording stopped");
      let blob = new Blob(this.chunks, { type: `video/${fileType}` });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.${fileType}`;
      a.click();
      URL.revokeObjectURL(url);
    };
    this.isRecording = true;
  }
  stopRecording() {
    if (this.recorder) {
      if (this.recorder.state === "recording") {
        console.log("is recording");
        this.recorder.stop();
      }
    }
    this.isRecording = false;
  }
};

// src/Demo/StaticDemo.ts
var StaticDemo = class {
  constructor() {
    this._demoFunctions = {};
    this.selector = document.getElementById("selector");
    this.codeText = document.getElementById("codeText");
    this.descriptionText = document.getElementById("descriptionText");
    this.controlDiv = document.getElementById("controlDiv");
    this.currDemoFunction = null;
    this.hotReloadCheckbox = null;
    this.updateButton = null;
    this.canvasRecorder = new CanvasRecorder("mainCanvas");
    this.initSelector();
    this.initCodeText();
    this.resetControlsDiv();
    this.resetCanvas();
    this.initRecorder();
  }
  initRecorder() {
    let recordBtn = document.getElementById("recordBtn");
    let recordText = "Start Recording";
    let stopText = "Stop";
    recordBtn.innerText = recordText;
    recordBtn.onclick = () => {
      if (this.canvasRecorder.isRecording) {
        this.canvasRecorder.stopRecording();
        recordBtn.innerText = recordText;
      } else {
        this.canvasRecorder.startRecording(`${this.selector.value}-${new Date().toLocaleString()}`, "mp4");
        recordBtn.innerText = stopText;
      }
    };
  }
  initControlDiv() {
    this.initHotReload();
    this.initUpdateButton();
  }
  resetControlsDiv() {
    this.controlDiv.innerHTML = "";
    this.initControlDiv();
  }
  initHotReload() {
    let hotReload = document.createElement("input");
    hotReload.type = "checkbox";
    hotReload.id = "hotReloadCheckbox";
    hotReload.checked = true;
    this.hotReloadCheckbox = hotReload;
    let hotReloadLabel = document.createElement("label");
    hotReloadLabel.htmlFor = "hotReloadCheckbox";
    hotReloadLabel.innerHTML = "Hot Reload";
    hotReloadLabel.style.marginRight = "10px";
    this.controlDiv.appendChild(hotReload);
    this.controlDiv.appendChild(hotReloadLabel);
  }
  initCodeText() {
    this.codeText.onchange = this.onCodeTextChange.bind(this);
    this.codeText.oninput = this.onCodeTextInput.bind(this);
  }
  initUpdateButton() {
    let updateButton = document.createElement("button");
    updateButton.innerHTML = "Reload";
    updateButton.onclick = this.updateButtonOnClick.bind(this);
    this.updateButton = updateButton;
    this.controlDiv.appendChild(updateButton);
  }
  updateButtonOnClick() {
    this.updateCurrDemoFunction();
  }
  updateCurrDemoFunction() {
    console.log("updateCurrDemoFunction");
    CubismOuterGlobal.getCubismInstance("mainCanvas").destroy();
    this.resetCanvas();
    let currName = this.selector.value;
    this._demoFunctions[currName].setFunctionThroughFormattedString(this.codeText.value);
    this.setCurrentDemoCode(this.selector.value);
    this.resetControlsDiv();
  }
  onCodeTextInput() {
    if (this.hotReloadCheckbox && this.hotReloadCheckbox.checked) {
      this.updateCurrDemoFunction();
    }
  }
  onCodeTextChange() {
  }
  initSelector() {
    this.selector.onchange = this.onSelectorChange.bind(this);
    this.selector.onload = this.onSelectorChange.bind(this);
  }
  resetCanvas() {
    let canvas = document.getElementById("mainCanvas");
    canvas.width = 400;
    canvas.height = 400;
  }
  setCurrentDemoCode(name) {
    this.codeText.value = this._demoFunctions[name].toString();
    this.selector.value = name;
    this.descriptionText.innerHTML = this._demoFunctions[name].description;
    this.currDemoFunction = this._demoFunctions[name];
    this.runCurrentDemo();
  }
  runCurrentDemo() {
    if (this.currDemoFunction) {
      this.currDemoFunction.run();
    }
  }
  addDemoFunction(name, func, description = "[No description]") {
    let option = document.createElement("option");
    option.text = name;
    this.selector.add(option);
    this._demoFunctions[name] = new DemoFunction(func, name, description);
    this.setCurrentDemoCode(name);
  }
  onSelectorChange() {
    let selected = this.selector.options[this.selector.selectedIndex].text;
    console.log(`selected: ${selected}`);
    this.setCurrentDemoCode(selected);
    this.updateCurrDemoFunction();
  }
  createFunctionFromString(s) {
    return new Function(s);
  }
  static get i() {
    if (!StaticDemo._instance) {
      StaticDemo._instance = new StaticDemo();
    }
    return StaticDemo._instance;
  }
};
var DemoFunction = class {
  constructor(func, funcName, description) {
    this.func = func;
    this.funcName = funcName;
    this.description = description;
  }
  toString() {
    return this.functionToFormattedString(this.funcName, this.func);
  }
  functionToFormattedString(funcName, func) {
    let s = func.toString();
    s = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
    s = s.replace(/;/g, ";\n");
    s = s.replace(/^\s*\n/gm, "");
    s = s.replace(/\n\s*$/gm, "");
    let leadingSpacesCount = 0;
    if (s.length > 0) {
      while (s[leadingSpacesCount] === " ") {
        leadingSpacesCount++;
      }
    }
    let p = `^ {${leadingSpacesCount}}`;
    s = s.replace(new RegExp(p, "gm"), "");
    let lines = s.split("\n");
    let newString = "";
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (i == 0) {
        newString += line;
      } else {
        let currLeadingSpacesCount = 0;
        while (line[currLeadingSpacesCount] === " ") {
          currLeadingSpacesCount++;
        }
        if (currLeadingSpacesCount === 0 && line.length > 0 && !(line[0] === "}" || line[0] === ")")) {
          newString += `
`;
        }
        let spaces = new Array(currLeadingSpacesCount + 5).join(" ");
        let lineToAppend = line.replace(/\(\)\./gm, `()
${spaces}.`);
        newString += "\n" + lineToAppend;
      }
    }
    return newString;
  }
  setFunction(func) {
    this.func = func;
  }
  setFunctionThroughFormattedString(s) {
    this.func = new Function(s);
  }
  toFunction() {
    return this.func;
  }
  run() {
    this.func();
  }
};

// src/Demo/DemoDecorators.ts
function demoFunction(...descriptionLines) {
  return function(target, propertyKey, descriptor) {
    let demo = StaticDemo.i;
    let currFunction = target[propertyKey];
    if (descriptionLines.length === 0) {
      descriptionLines.push("[No description]");
    }
    let description = "Description:\n" + descriptionLines.join("\n");
    let name = propertyKey.replace(/([A-Z])/g, " $1").trim();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    demo.addDemoFunction(name, currFunction, description);
  };
}

// src/Elements/Layouts/LayoutElement.ts
var LayoutElement = class extends PointerHandlerParentElement {
  getMaxElementWidth() {
    let maxWidth = 0;
    for (let child of this.children) {
      if (child.absWidth > maxWidth) {
        maxWidth = child.absWidth;
      }
    }
    return maxWidth;
  }
  getCumulativeWidth() {
    let width = 0;
    for (let child of this.children) {
      width += child.absWidth;
    }
    return width;
  }
  getMaxElementHeight() {
    let maxHeight = 0;
    for (let child of this.children) {
      if (child.absHeight > maxHeight) {
        maxHeight = child.absHeight;
      }
    }
    return maxHeight;
  }
  getCumulativeHeight() {
    let height = 0;
    for (let child of this.children) {
      height += child.absHeight;
    }
    return height;
  }
  pointerInRange(point) {
    return true;
  }
};

// src/Elements/Layouts/VerticalLayout.ts
var VerticalLayout = class extends LayoutElement {
  updateChildrenPosition() {
    let maxChildWidth = 0;
    super.updateChildrenPosition();
    let x = 0;
    let y = 0;
    for (let child of this.children) {
      child.position = new Point2D(x, y);
      if (child instanceof LayoutElement) {
        child.height = child.getCumulativeHeight();
        child.width = child.getCumulativeWidth();
      }
      if (child.width > maxChildWidth) {
        maxChildWidth = child.width;
      }
      y += child.height;
    }
    this.absWidth = maxChildWidth;
    this.absHeight = y;
  }
  getCumulativeWidth() {
    return this.getMaxElementWidth();
  }
};

// src/Theme/BasicTheme.ts
var BasicTheme = class {
  constructor() {
    this.fillStyle = Colors.white;
    this.strokeStyle = Colors.blue700;
    this.lineWidth = 2;
  }
  setFillStyle(fillStyle) {
    this.fillStyle = fillStyle;
    return this;
  }
  setStrokeStyle(strokeStyle) {
    this.strokeStyle = strokeStyle;
    return this;
  }
  setLineWidth(width) {
    this.lineWidth = width;
    return this;
  }
  static get default() {
    return new BasicTheme();
  }
  static get transparent() {
    return new BasicTheme().setLineWidth(0).setFillStyle(Colors.transparent).setStrokeStyle(Colors.transparent);
  }
  static get hover() {
    return new BasicTheme().setFillStyle(Colors.grey100);
  }
  static get pressed() {
    return new BasicTheme().setFillStyle(Colors.grey200);
  }
};

// src/Constants/ThemeKeys.ts
var ThemeKeys = class {
};
ThemeKeys.ON_HOVER_THEME = "ON_HOVER_THEME";
ThemeKeys.ON_DOWN_THEME = "ON_DOWN_THEME";
ThemeKeys.DEFAULT_THEME = "DEFAULT_THEME";

// src/Elements/Basic/ThemedElement.ts
var ThemedElement = class extends PointerHandlerParentElement {
  get themes() {
    if (this._themes === void 0) {
      this._themes = {};
    }
    return this._themes;
  }
  setTheme(name, theme) {
    this.themes[name] = theme;
    return this;
  }
  onCreate() {
    super.onCreate();
    this.setTheme(ThemeKeys.DEFAULT_THEME, BasicTheme.default);
    this.currTheme = this.themes[ThemeKeys.DEFAULT_THEME];
  }
  get currTheme() {
    if (this._currTheme === void 0) {
      this._currTheme = new BasicTheme();
    }
    return this._currTheme;
  }
  set currTheme(theme) {
    this._currTheme = theme;
  }
  updateCanvasDrawerTheme() {
    if (this.currTheme) {
      this.c.setFillStyle(this.currTheme.fillStyle);
      this.c.setStrokeStyle(this.currTheme.strokeStyle);
      this.c.setStrokeWidth(this.currTheme.lineWidth);
    } else {
      console.log("No theme set for element");
    }
  }
  draw() {
    super.draw();
    this.updateCanvasDrawerTheme();
  }
};
__decorateClass([
  needsRedrawAccessor()
], ThemedElement.prototype, "currTheme", 1);

// src/Elements/Basic/PointerInteractThemeElement.ts
var PointerInteractThemeElement = class extends ThemedElement {
  onCreate() {
    super.onCreate();
    this.setTheme(ThemeKeys.ON_DOWN_THEME, BasicTheme.pressed);
    this.setTheme(ThemeKeys.ON_HOVER_THEME, BasicTheme.hover);
  }
  onDown(point) {
    super.onDown(point);
    this.currTheme = this.themes[ThemeKeys.ON_DOWN_THEME];
  }
  onUp(point) {
    super.onUp(point);
    this.currTheme = this.themes[ThemeKeys.ON_HOVER_THEME];
  }
  onEnter(point) {
    super.onEnter(point);
    this.currTheme = this.themes[ThemeKeys.ON_HOVER_THEME];
  }
  onLeave(point) {
    super.onLeave(point);
    this.currTheme = this.themes[ThemeKeys.DEFAULT_THEME];
  }
};

// src/Elements/RectElement.ts
var RectElement = class extends PointerInteractThemeElement {
  draw() {
    super.draw();
    let c = this.c;
    c.offset(this.position);
    c.drawRectWithPoints(this.absSize);
    c.restoreTranslate();
  }
};

// src/Elements/CircleElement.ts
var CircleElement = class extends PointerInteractThemeElement {
  draw() {
    super.draw();
    let c = this.c;
    c.offset(this.position);
    c.drawCircle(this.width / 2, this.height / 2, this.size.min / 2);
    c.restoreTranslate();
  }
  pointerInRange(point) {
    let radius = this.size.min / 2;
    let dist = this.centerPoint.euclideanDistance(point);
    return dist <= radius;
  }
};

// src/Elements/Layouts/HorizontalLayout.ts
var HorizontalLayout = class extends LayoutElement {
  updateChildrenPosition() {
    let maxChildHeight = 0;
    super.updateChildrenPosition();
    let x = 0;
    let y = 0;
    for (let child of this.children) {
      child.position = new Point2D(x, y);
      if (child instanceof LayoutElement) {
        child.height = child.getCumulativeHeight();
        child.width = child.getCumulativeWidth();
      }
      if (child.height > maxChildHeight) {
        maxChildHeight = child.height;
      }
      x += child.width;
    }
    this.absHeight = maxChildHeight;
    this.absWidth = x;
  }
  getCumulativeHeight() {
    return this.getMaxElementHeight();
  }
};

// src/Elements/Background.ts
var Background = class extends CubismElement {
  constructor() {
    super(...arguments);
    this.color = Colors.white;
  }
  setColor(color) {
    this.color = color;
    return this;
  }
  draw() {
    super.draw();
    this.c.setFillStyle(this.color);
    this.c.drawRect(0, 0, this.cubism.width, this.cubism.height);
  }
};

// src/Theme/FontTheme.ts
var FontTheme = class extends BasicTheme {
  constructor() {
    super(...arguments);
    this.fontSize = 20;
    this.fontFamily = "Arial";
  }
  setFontSize(size) {
    this.fontSize = size;
    return this;
  }
  setFontFamily(fontFamily) {
    this.fontFamily = fontFamily;
    return this;
  }
  static get default() {
    return new FontTheme().setFillStyle(Colors.black);
  }
};

// src/Elements/TextElement.ts
var TextElement = class extends CubismElement {
  constructor(content, id = null) {
    super(id);
    this.theme = FontTheme.default;
    this.content = "NO CONTENT";
    this.content = content;
  }
  setFontSize(size) {
    this.theme.fontSize = size;
  }
  get height() {
    return this.theme.fontSize;
  }
  draw() {
    super.draw();
    let c = this.c;
    c.setFont(`${this.theme.fontSize}px ${this.theme.fontFamily}`);
    c.offset(this.position);
    c.setFillStyle(this.theme.fillStyle);
    c.setStrokeStyle(this.theme.strokeStyle);
    let textWidth = c.measureText(this.content).width;
    let textHeight = this.theme.fontSize;
    c.fillText(this.content, 0, textHeight);
    c.restoreTranslate();
  }
};

// src/Elements/ButtonElement.ts
var ButtonElement = class extends PointerInteractThemeElement {
  constructor() {
    super(...arguments);
    this._icon = null;
    this._text = null;
    this._onClick = () => {
    };
    this.iconXOffset = 10;
    this.textXOffset = 10;
  }
  set icon(icon) {
    this._icon = icon;
    if (icon !== null) {
      icon.position.x = this.iconXOffset;
      icon.position.y = this.size.y / 2 - icon.height / 2;
      this.addChildren(icon);
    }
  }
  get icon() {
    return this._icon;
  }
  get text() {
    return this._text;
  }
  set text(text) {
    this._text = text;
    if (text !== null) {
      text.position.x = this.textXOffset;
      text.position.y = this.size.y / 2 - text.height / 2 - 2;
      if (this.icon !== null) {
        text.position.x += this.icon.width + this.iconXOffset;
      }
      this.addChildren(text);
    }
  }
  setOnClick(func) {
    this._onClick = func;
    return this;
  }
  onUp(point) {
    super.onUp(point);
    this._onClick(point);
  }
  draw() {
    this.updateCanvasDrawerTheme();
    this.c.offset(this.position);
    this.c.drawRectWithPoints(this.size);
    if (this.icon !== null) {
      this.icon.draw();
    }
    if (this.text !== null) {
      this.text.draw();
    }
    this.c.restoreTranslate();
  }
  setIcon(icon) {
    this.icon = icon;
    return this;
  }
  setText(text) {
    if (typeof text === "string") {
      text = new TextElement(text);
    }
    this.text = text;
    return this;
  }
};

// src/Elements/Icons/BasicIcon.ts
var BasicIcon = class extends CubismElement {
  constructor() {
    super(...arguments);
    this._size = new Point2D(20, 20);
  }
  draw() {
    super.draw();
    this.c.offset(this.position);
    this.drawIcon();
    this.c.restoreTranslate();
  }
  drawIcon() {
    throw new Error("Not implemented");
  }
};

// src/Elements/Icons/CloseIcon.ts
var CloseIcon = class extends BasicIcon {
  drawIcon() {
    let size = this.size.min;
    this.c.ctx.beginPath();
    this.c.ctx.moveTo(0, 0);
    this.c.ctx.lineTo(size, size);
    this.c.ctx.moveTo(size, 0);
    this.c.ctx.lineTo(0, size);
    this.c.ctx.stroke();
  }
};

// src/Elements/Icons/AddIcon.ts
var AddIcon = class extends BasicIcon {
  drawIcon() {
    let size = this.size.min;
    this.c.ctx.beginPath();
    this.c.ctx.moveTo(0, size / 2);
    this.c.ctx.lineTo(size, size / 2);
    this.c.ctx.moveTo(size / 2, 0);
    this.c.ctx.lineTo(size / 2, size);
    this.c.ctx.stroke();
  }
};

// src/Elements/Icons/MaterialIcons.ts
var MaterialIcons = class extends BasicIcon {
  constructor(iconName) {
    super();
    this.theme = new BasicTheme().setFillStyle(Colors.blue700).setStrokeStyle(Colors.blue200);
    this.svgImg = new Image();
    let iconUrl = "https://fonts.gstatic.com/s/i/materialicons/" + iconName + "/v8/20px.svg";
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", iconUrl, false);
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
};

// src/Elements/DraggableCircle.ts
var DraggableCircle = class extends CircleElement {
  constructor() {
    super(...arguments);
    this._isDragging = false;
    this._dragStartPoint = null;
    this._dragStartPos = null;
  }
  get x() {
    return this.centerPoint.x;
  }
  get y() {
    return this.centerPoint.y;
  }
  onCreate() {
    super.onCreate();
    this.setSizeFromXY(20, 20);
  }
  get isDragging() {
    return this._isDragging;
  }
  onDown(point) {
    super.onDown(point);
    this._isDragging = true;
    this._dragStartPoint = point;
    this._dragStartPos = this.position;
  }
  onUp(point) {
    super.onUp(point);
    this._isDragging = false;
    this._dragStartPoint = null;
    this._dragStartPos = null;
  }
  onMove(point) {
    super.onMove(point);
  }
  onParentMove(point) {
    super.onParentMove(point);
    if (this._isDragging) {
      if (this._dragStartPoint !== null && this._dragStartPos !== null) {
        let diff = point.sub(this._dragStartPoint);
        this.position = this._dragStartPos.add(diff);
      }
    }
  }
};

// src/Utils/Math/NNMatrix.ts
var IJMatrix = class {
  constructor(rows, cols) {
    this.arr = [];
    for (let i = 0; i < rows; i++) {
      this.arr.push([]);
      for (let j = 0; j < cols; j++) {
        this.arr[i].push(0);
      }
    }
  }
  setIJ(i, j, value) {
    this.arr[i][j] = value;
    return this;
  }
  getIJ(i, j) {
    return this.arr[i][j];
  }
  set(arr) {
    let i = 0;
    for (let row of this.arr) {
      for (let j = 0; j < row.length; j++) {
        row[j] = arr[i];
        i++;
      }
    }
    return this;
  }
  setFrom2DArray(arr) {
    this.arr = arr;
    return this;
  }
  multiply(other) {
    let result = new IJMatrix(this.arr.length, other.arr[0].length);
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < other.arr[0].length; j++) {
        for (let k = 0; k < this.arr[0].length; k++) {
          result.arr[i][j] += this.arr[i][k] * other.arr[k][j];
        }
      }
    }
    return result;
  }
};

// src/Curve/Curve2D/Cubic.ts
function cubic(cubicFunctionBasis, pointMatrix, t) {
  let b = cubicFunctionBasis(t);
  let result = new IJMatrix(1, 2);
  for (let i = 0; i < 4; i++) {
    result.setIJ(0, 0, result.getIJ(0, 0) + pointMatrix.getIJ(i, 0) * b.getIJ(0, i));
    result.setIJ(0, 1, result.getIJ(0, 1) + pointMatrix.getIJ(i, 1) * b.getIJ(0, i));
  }
  return result;
}
function hermite(t) {
  return new IJMatrix(1, 4).set(
    [
      2 * t * t * t - 3 * t * t + 1,
      t * t * t - 2 * t * t + t,
      -2 * t * t * t + 3 * t * t,
      t * t * t - t * t
    ]
  );
}
function dHermite(t) {
  return new IJMatrix(1, 4).set(
    [
      6 * t ** 2 - 6 * t,
      3 * t ** 2 - 4 * t + 1,
      -6 * t ** 2 + 6 * t,
      3 * t ** 2 - 2 * t
    ]
  );
}

// src/Elements/CurveElement.ts
var CurveElement = class extends CubismElement {
  constructor(id = null, points = []) {
    super(id);
    this._points = points;
  }
  get points() {
    return this._points;
  }
  onCreate() {
    super.onCreate();
    this.width = 500;
    this.height = 500;
  }
  draw() {
    super.draw();
    for (let p of this.points) {
      this.c.drawPoint(p);
    }
    let step = 0.1;
    let lastD = Point2D.zero;
    for (let i = 0; i < this.points.length - 1; i++) {
      let p0 = Point2D.fromIPoint(this.points[i]);
      let p1 = Point2D.fromIPoint(this.points[i + 1]);
      let t = 0;
      let lastPoint = p0;
      let d0 = lastD;
      let d1 = null;
      if (i < this.points.length - 2) {
        let p2 = Point2D.fromIPoint(this.points[i + 2]);
        d1 = p2.sub(p0).scale(0.5);
      } else {
        d1 = p1.sub(p0).scale(0.5);
      }
      if (i > 0) {
        let tangent = this.getTangent(t, p0, p1, d0, d1);
        let rotation = -Math.atan2(tangent.y, tangent.x);
        this.c.offsetXY(100, 100);
        this.c.restoreTranslate();
        this.c.drawArrow(Point2D.fromIPoint(this.points[i]), rotation, 30);
      }
      while (t < 1) {
        let point = this.getPoint(t, p0, p1, d0, d1);
        this.c.drawLineWithPoints(lastPoint, point);
        lastPoint = point;
        t += step;
      }
      lastD = d1;
    }
  }
  getTangent(t, p0, p1, d0, d1) {
    let pointMatrix = new IJMatrix(4, 2).set([
      p0.x,
      p0.y,
      d0.x,
      d0.y,
      p1.x,
      p1.y,
      d1.x,
      d1.y
    ]);
    let out = cubic(dHermite, pointMatrix, t);
    return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
  }
  getPoint(t, p0, p1, d0, d1) {
    let pointMatrix = new IJMatrix(4, 2).set([
      p0.x,
      p0.y,
      d0.x,
      d0.y,
      p1.x,
      p1.y,
      d1.x,
      d1.y
    ]);
    let out = cubic(hermite, pointMatrix, t);
    return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
  }
};

// src/Animation/Animation.ts
var CubismAnimation = class extends CubismPart {
  constructor(cubism, endFrame = 0) {
    super();
    this._isPlaying = false;
    this._currFrame = 0;
    this._animationCallBacks = [];
    this.setCubism(cubism);
    this._endFrame = endFrame;
  }
  setPlaying(playing) {
    this._isPlaying = playing;
    if (playing) {
      this.cubism.initializer.initializeAlwaysRedraw();
      this.cubism.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.play.bind(this));
    }
    return this;
  }
  setAnimationEvent(callback) {
    this._animationCallBacks.push(callback);
  }
  onAnimationUpdate() {
    for (const callback of this._animationCallBacks) {
      callback(this._currFrame);
    }
  }
  play() {
    this.onAnimationUpdate();
    this._currFrame++;
    if (this._currFrame > this._endFrame) {
      this._isPlaying = false;
      this._currFrame = 0;
      this.cubism.initializer.stopAlwaysRedraw();
    }
  }
};

// src/Elements/Fancy/CurveCanvas.ts
var CurveCanvas = class extends PointerHandlerParentElement {
  constructor() {
    super(...arguments);
    this._curves = [];
    this._drawing = false;
    this._isPlayingAnimation = false;
    this.animationLength = 50;
    this.circleSize = 20;
    this.mode = {
      draw: 0,
      move: 1
    };
    this._currMode = this.mode.draw;
  }
  set currMode(mode) {
    console.log("Setting mode to: ", mode);
    this._currMode = mode;
  }
  get currMode() {
    return this._currMode;
  }
  set drawing(drawing) {
    this._drawing = drawing;
  }
  changeToMoveMode() {
    this.currMode = this.mode.move;
  }
  changeToDrawMode() {
    this.currMode = this.mode.draw;
  }
  get drawing() {
    return this._drawing;
  }
  onDown(point) {
    super.onDown(point);
    this.drawing = true;
    if (this._currMode === this.mode.draw) {
      this._curves.push([point.sub(this.position)]);
    }
  }
  onUp(point) {
    super.onUp(point);
    if (this._currMode === this.mode.draw) {
      this._curves[this._curves.length - 1].push(point.sub(this.position));
      this._curves[this._curves.length - 1].push(point.sub(this.position));
    }
    this.drawing = false;
  }
  playAnimation() {
    console.log("Playing animation");
    if (this._isPlayingAnimation) {
      return;
    }
    if (this._curves.length === 0) {
      return;
    }
    let animation = new CubismAnimation(this.cubism, this.animationLength);
    this._isPlayingAnimation = true;
    animation.setAnimationEvent(this.animationCallback.bind(this));
    animation.setPlaying(true);
    this.c.setRedraw(true);
  }
  animationCallback(t) {
    if (t === this.animationLength) {
      this._isPlayingAnimation = false;
      return;
    }
    let ratio = t / this.animationLength;
    if (this._curves.length === 0) {
      console.log("No curves");
      return;
    }
    this.c.offset(this.position);
    for (let i = 0; i < this._curves.length; i++) {
      let curve = this._curves[i];
      let currColor = `hsl(${(1 - i / (this._curves.length - 1)) * 360}, ${35}%, ${70}%)`;
      this.c.setStrokeStyle(currColor);
      this.drawHermitCurve(curve, ratio);
    }
    this.c.restoreTranslate();
  }
  onMove(point) {
    super.onMove(point);
    let relaPoint = point.sub(this.position);
    if (this.drawing) {
      if (this._currMode === this.mode.draw) {
        let lastCurve = this._curves[this._curves.length - 1];
        let lastPoint = lastCurve[lastCurve.length - 1];
        if (Point2D.fromIPoint(lastPoint).manhattanDistance(relaPoint) > 100) {
          lastCurve.push(relaPoint);
        }
      }
      if (this._currMode === this.mode.move) {
        let dragPoint = null;
        for (let curve of this._curves) {
          for (let point2 of curve) {
            if (Point2D.fromIPoint(point2).euclideanDistance(relaPoint) < this.circleSize) {
              dragPoint = point2;
              break;
            }
          }
        }
        if (dragPoint !== null) {
          dragPoint.x = relaPoint.x;
          dragPoint.y = relaPoint.y;
        }
      }
    }
    this.c.setRedraw(true);
  }
  undo() {
    if (this._curves.length > 0) {
      this._curves.pop();
      console.log(this._curves);
      console.log("Undoing");
    }
    this.c.setRedraw(true);
  }
  clear() {
    while (this._curves.length > 0) {
      this.undo();
    }
    this.c.setRedraw(true);
  }
  draw() {
    super.draw();
    this.c.offset(this.position);
    this.c.setStrokeStyle(Colors.white);
    this.c.setFillStyle(Colors.white);
    this.c.drawRect(0, 0, this.size.x, this.size.y);
    this.c.setStrokeStyle(Colors.black);
    if (this._isPlayingAnimation) {
      this.c.restoreTranslate();
      return;
    }
    if (this.currMode === this.mode.move) {
      this.c.setStrokeStyle(Colors.blue700);
      this.c.setStrokeWidth(3);
    }
    if (this.currMode === this.mode.draw) {
      this.c.setStrokeWidth(4);
    }
    for (let curve of this._curves) {
      this.drawHermitCurve(curve);
      if (this._currMode === this.mode.move) {
        for (let point of curve) {
          this.c.drawPoint(point, this.circleSize);
        }
      }
    }
    this.c.restoreTranslate();
  }
  drawHermitCurve(points, ratio = 1) {
    let lastD = Point2D.zero;
    let fullEnd = points.length;
    let end = Math.floor(fullEnd * ratio);
    if (fullEnd < 1) {
      return;
    }
    for (let i = 1; i < end; i++) {
      let p0 = Point2D.fromIPoint(points[i - 1]);
      let p1 = Point2D.fromIPoint(points[i]);
      let t = 0;
      let d0 = lastD;
      let d1 = null;
      if (i < end - 3) {
        let p2 = Point2D.fromIPoint(points[i + 1]);
        d1 = p2.sub(p0).scale(0.5);
      } else {
        d1 = p1.sub(p0).scale(0.5);
      }
      let segEnd = 1;
      let isEdge = false;
      if (this._isPlayingAnimation) {
        if (i === end - 1) {
          isEdge = true;
          segEnd = fullEnd * ratio - end;
        }
      }
      let lastPoint = p0;
      let step = 0.05;
      while (t <= segEnd + step) {
        let point = this.getPoint(t, p0, p1, d0, d1);
        if (this._isPlayingAnimation) {
          this.c.setStrokeWidth(3);
        }
        this.c.drawLineWithPoints(lastPoint, point);
        lastPoint = point;
        t += step;
      }
      if (this._isPlayingAnimation) {
        let point = this.getPoint(t, p0, p1, d0, d1);
        if (isEdge) {
          let tangent = this.getTangent(t, p0, p1, d0, d1);
          let rotation = -Math.atan2(tangent.y, tangent.x);
          this.c.setStrokeWidth(2);
          this.c.setFillStyle(Colors.white);
          this.c.drawArrow(point, rotation, 20);
        }
      }
      lastD = d1;
    }
  }
  getTangent(t, p0, p1, d0, d1) {
    let pointMatrix = new IJMatrix(4, 2).set([
      p0.x,
      p0.y,
      d0.x,
      d0.y,
      p1.x,
      p1.y,
      d1.x,
      d1.y
    ]);
    let out = cubic(dHermite, pointMatrix, t);
    return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
  }
  getPoint(t, p0, p1, d0, d1) {
    let pointMatrix = new IJMatrix(4, 2).set([
      p0.x,
      p0.y,
      d0.x,
      d0.y,
      p1.x,
      p1.y,
      d1.x,
      d1.y
    ]);
    let out = cubic(hermite, pointMatrix, t);
    return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
  }
};

// src/Demo/DemoFunctions.ts
console.log("loading DemoFunctions.ts ...");
var DemoFunctions = class {
  testFunction() {
    console.log("demoFunction");
    console.log();
  }
  staticRecursiveRect() {
    let app = Cubism.createFromId("mainCanvas");
    app.init(
      new PointerHandlerParentElement(
        null,
        new ChangingRainbowBackground().setSizeFromXY(SizeKeys.MATCH_PARENT, SizeKeys.MATCH_PARENT).setLightness(70).setSaturation(80).setChangingSpeed(0.1),
        new RecursiveRect().setWiggleStrength(2).setSizeFromXY(200, 200).setPosFromXY(100, 100).setRelativePosition(new Point2D(100, 100)).setRecursionCount(20)
      )
    );
  }
  animatedRecursiveRect() {
    let app = Cubism.createFromId("mainCanvas");
    app.init(
      new PointerHandlerParentElement(
        null,
        new ChangingRainbowBackground().setSizeFromXY(SizeKeys.MATCH_PARENT, SizeKeys.MATCH_PARENT).setLightness(70).setSaturation(80).setChangingSpeed(0.1),
        new RecursiveRect().setWiggleStrength(2).setSizeFromXY(200, 200).setPosFromXY(100, 100).setRelativePosition(new Point2D(100, 100)).setRecursionCount(10)
      ).setId("parent")
    );
    app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps) => {
      var _a;
      if (document.getElementById("fps") === null) {
        let fpsCounter = document.createElement("div");
        fpsCounter.id = "fps";
        (_a = document.getElementById("controlDiv")) == null ? void 0 : _a.appendChild(fpsCounter);
      }
      document.getElementById("fps").innerHTML = "FPS: " + fps;
    });
    app.initializer.initializeAlwaysRedraw();
    app.initializer.initializeFPSCounter();
  }
  eventDemo() {
    let app = Cubism.createFromId("mainCanvas");
    app.init(
      new PointerHandlerParentElement(
        null,
        new CircleElement().setWidth(200).setHeight(200).setPosFromXY(100, 100)
      )
    );
    app.initializer.initializeFPSCounter();
    app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps) => {
      var _a;
      if (document.getElementById("fps") === null) {
        let fpsCounter = document.createElement("div");
        fpsCounter.id = "fps";
        (_a = document.getElementById("controlDiv")) == null ? void 0 : _a.appendChild(fpsCounter);
      }
      document.getElementById("fps").innerHTML = "FPS: " + fps;
    });
    app.initializer.initializeDrawsPerSecondCounter();
    app.eventSystem.registerEvent(EventKeys.DRAW_COUNT_UPDATE, (draws) => {
      var _a;
      if (document.getElementById("draws") === null) {
        let drawsCounter = document.createElement("div");
        drawsCounter.id = "draws";
        (_a = document.getElementById("controlDiv")) == null ? void 0 : _a.appendChild(drawsCounter);
      }
      document.getElementById("draws").innerHTML = "DFS(Draws per second): " + draws;
    });
  }
  themedElements() {
    let app = Cubism.createFromId("mainCanvas");
    app.init(
      new PointerHandlerParentElement(
        "PointerHandlerParentElement",
        new Background().setColor(Colors.blue700),
        new VerticalLayout(
          "Outer Vertical Layout",
          new RectElement().setWidth(100).setHeight(50),
          new CircleElement().setWidth(100).setHeight(100),
          new HorizontalLayout(
            "Inner Horizontal Layout",
            new RectElement().setWidth(100).setHeight(100),
            new RectElement().setWidth(100).setHeight(100),
            new CircleElement().setWidth(100).setHeight(100)
          )
        ).setPosFromXY(50, 75)
      ).setPosFromXY(0, 0)
    );
  }
  buttonAndLayoutDemo() {
    let app = Cubism.createFromId("mainCanvas");
    let verticalLayout = new VerticalLayout("Add Button Vertical Layout");
    let itemList = [];
    let horizontalLayout = new HorizontalLayout(
      "Horizontal Layout",
      new ButtonElement("AddBtn").setWidth(100).setHeight(50).setIcon(new AddIcon()).setText("Add").setOnClick(() => {
        console.log("Add button clicked");
        let item = new ButtonElement().setWidth(250).setHeight(50).setText(`Item ${itemList.length + 1}`);
        itemList.push(item);
        verticalLayout.addChildren(item);
      }),
      new ButtonElement("RemoveBtn").setWidth(150).setHeight(50).setIcon(new CloseIcon()).setText("Remove").setOnClick(
        () => {
          console.log("Remove button clicked");
          if (itemList.length > 0) {
            verticalLayout.removeChild(itemList.pop());
          }
        }
      )
    );
    app.init(
      new VerticalLayout(
        null,
        horizontalLayout,
        verticalLayout
      ).setPosFromXY(75, 25)
    );
  }
  SvgTest() {
    let app = Cubism.createFromId("mainCanvas");
    app.init(
      new VerticalLayout(
        "SVG Test",
        new ButtonElement().setWidth(120).setHeight(50).setIcon(MaterialIcons.add).setText("Add"),
        new ButtonElement().setWidth(120).setHeight(50).setIcon(MaterialIcons.arrow_back).setText("arrow_back"),
        new ButtonElement().setWidth(120).setHeight(50).setIcon(MaterialIcons.edit).setText("Edit"),
        new ButtonElement().setWidth(120).setHeight(50).setIcon(MaterialIcons.search).setText("Search")
      )
    );
  }
  CurveDemo() {
    let app = Cubism.createFromId("mainCanvas");
    app.width = 500;
    app.height = 500;
    let points = [];
    let root = new PointerHandlerParentElement("Root");
    function addPoint() {
      let point = new DraggableCircle().setPosFromPoint(Point2D.getRandom(100, 400));
      points.push(point);
      root.addChildren(point);
    }
    function removePoint() {
      if (points.length > 0) {
        root.removeChild(points.pop());
      }
    }
    root.addChildren(
      new Background().setColor(Colors.white),
      new CurveElement(null, points),
      new ButtonElement().setWidth(150).setHeight(50).setIcon(MaterialIcons.add).setText("Add Point").setPosFromXY(0, 450).setOnClick(() => {
        addPoint();
      }),
      new ButtonElement().setWidth(190).setHeight(50).setIcon(MaterialIcons.remove).setText("Remove Point").setPosFromXY(150, 450).setOnClick(() => {
        removePoint();
      })
    );
    for (let i = 0; i < 6; i++) {
      addPoint();
    }
    app.init(root);
  }
  curveCanvas() {
    let app = Cubism.createFromId("mainCanvas");
    let width = 500;
    let height = 500;
    app.width = width;
    app.height = height;
    let curveCanvas = new CurveCanvas().setWidth(width).setHeight(height).setPosFromXY(0, 50);
    let modeBtn = new ButtonElement().setWidth(200).setHeight(50).setIcon(MaterialIcons.pencil).setText("Drawing Mode").setPosFromXY(0, 0).setOnClick(() => {
      console.log(`Current mode: ${curveCanvas._currMode}`);
      if (curveCanvas._currMode === curveCanvas.mode.draw) {
        console.log("curveCanvas._currMode === curveCanvas.mode.draw");
      }
      if (curveCanvas._currMode === curveCanvas.mode.move) {
        console.log("curveCanvas._currMode === curveCanvas.mode.move");
      }
      if (curveCanvas._currMode === curveCanvas.mode.draw) {
        modeBtn.setIcon(MaterialIcons.move);
        modeBtn.setText("Move Mode");
        curveCanvas.changeToMoveMode();
      } else {
        console.log("Switching to drawing mode");
        modeBtn.setIcon(MaterialIcons.pencil);
        modeBtn.setText("Drawing Mode");
        curveCanvas.changeToDrawMode();
      }
    });
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
        curveCanvas,
        undoBtn,
        modeBtn,
        playBtn,
        deleteBtn
      )
    );
  }
};
__decorateClass([
  demoFunction()
], DemoFunctions.prototype, "testFunction", 1);
__decorateClass([
  demoFunction("This is a demo function")
], DemoFunctions.prototype, "staticRecursiveRect", 1);
__decorateClass([
  demoFunction(
    "This is an animated recursive rectangle.",
    "Try to drag it around and see what happens."
  )
], DemoFunctions.prototype, "animatedRecursiveRect", 1);
__decorateClass([
  demoFunction("Demo function for theme changing")
], DemoFunctions.prototype, "themedElements", 1);
__decorateClass([
  demoFunction()
], DemoFunctions.prototype, "buttonAndLayoutDemo", 1);
__decorateClass([
  demoFunction()
], DemoFunctions.prototype, "SvgTest", 1);
__decorateClass([
  demoFunction()
], DemoFunctions.prototype, "CurveDemo", 1);
__decorateClass([
  demoFunction("Try to draw something with the mouse", "You can also try to change the drawing by changing to the moving mode.", "After drawing, you can click the play button to see the animation.")
], DemoFunctions.prototype, "curveCanvas", 1);
function main() {
  initConsole();
}
main();
//# sourceMappingURL=es-build.js.map
